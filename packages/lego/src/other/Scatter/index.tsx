import * as echarts from 'echarts/core';
import ReactEcharts from 'echarts-for-react';
import {
  ScatterChart, // 系列类型的定义后缀都为 SeriesOption
  ScatterSeriesOption,
} from 'echarts/charts';
import {
  // 组件类型的定义后缀都为 ComponentOption
  GridComponent,
  GridComponentOption,
  SingleAxisComponent,
  SingleAxisComponentOption,
  TooltipComponent,
  TooltipComponentOption,
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import { YAXisOption } from 'echarts/types/dist/shared';
import { merge } from 'lodash-es';
import React, { CSSProperties, forwardRef, useMemo } from 'react';

import useBaseChartConfig from '../../hooks/useBaseChartConfig';
import useChartLoop from '../../hooks/useChartLoop';
import useTheme from '../../hooks/useTheme';
import createLinearGradient from '../../utils/createLinearGradient';

// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
type ECOption = echarts.ComposeOption<
  ScatterSeriesOption | TooltipComponentOption | GridComponentOption | SingleAxisComponentOption
>;

// 注册必须的组件
echarts.use([TooltipComponent, GridComponent, SingleAxisComponent, ScatterChart, CanvasRenderer]);

export interface ScatterProps {
  unit?: string;
  xAxisData: string[];
  seriesData: { name: string; data: (string | number)[] }[];
  style?: CSSProperties;
  /** 控制是否自动轮播 */
  autoLoop?: boolean;
  /** 自动轮播的时长，默认为2s */
  duration?: number;
  config?: ECOption;
  inModal?: boolean;
  /** 控制是否显示y轴的线，默认显示 */
  showYAxisLine?: boolean;
  scatterColors?: [string, string][];
  onEvents?: Record<string, (params?: any) => void>;
}

/**
 * 直角坐标系散点图，对应Figma其他图7
 */
export default forwardRef<ReactEcharts, ScatterProps>(
  (
    {
      unit,
      xAxisData,
      seriesData,
      style,
      autoLoop,
      duration = 2000,
      config,
      inModal = false,
      showYAxisLine = true,
      scatterColors = [],
      onEvents,
    },
    ref
  ) => {
    const theme = useTheme();
    const baseChartConfig = useBaseChartConfig(inModal, unit);
    const echartsRef = useChartLoop(ref, xAxisData, autoLoop, duration);

    const baseColors = useMemo(() => {
      if (scatterColors?.length > 0 && scatterColors?.length >= seriesData?.length) {
        return scatterColors;
      }
      return [
        theme.colors.primary50,
        theme.colors.primary100,
        theme.colors.primary200,
        theme.colors.primary300,
        theme.colors.primary400,
        theme.colors.primary500,
      ];
    }, [
      scatterColors,
      seriesData?.length,
      theme.colors.primary200,
      theme.colors.primary50,
      theme.colors.primary100,
      theme.colors.primary300,
      theme.colors.primary400,
      theme.colors.primary500,
    ]);

    const colors = useMemo(() => baseColors.map(item => createLinearGradient(item)), [baseColors]);

    const option = useMemo(() => {
      return merge(
        {
          color: colors,
          legend: {
            ...baseChartConfig.legend,
          },
          grid: {
            ...baseChartConfig.grid,
          },
          tooltip: { ...baseChartConfig.tooltip },
          xAxis: {
            ...baseChartConfig.xAxis,
            data: xAxisData,
          },
          yAxis: {
            ...baseChartConfig.yAxis,
            name: unit,
            axisLine: {
              ...(baseChartConfig.yAxis as YAXisOption).axisLine,
              show: showYAxisLine,
            },
          },
          series: seriesData.map(item => ({
            name: item.name,
            data: item.data,
            type: 'scatter',
            itemStyle: {
              opacity: 0.8,
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          })),
        },
        config
      ) as ECOption;
    }, [
      baseChartConfig.grid,
      baseChartConfig.legend,
      baseChartConfig.tooltip,
      baseChartConfig.xAxis,
      baseChartConfig.yAxis,
      seriesData,
      colors,
      unit,
      xAxisData,
      config,
      showYAxisLine,
    ]);

    return <ReactEcharts ref={echartsRef} echarts={echarts} option={option} style={style} onEvents={onEvents} />;
  }
);
