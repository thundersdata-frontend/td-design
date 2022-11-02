import * as echarts from 'echarts/core';
import ReactEcharts from 'echarts-for-react';
import {
  PictorialBarChart, // 系列类型的定义后缀都为 SeriesOption
  PictorialBarSeriesOption,
} from 'echarts/charts';
import {
  // 组件类型的定义后缀都为 ComponentOption
  GridComponent,
  GridComponentOption,
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
type ECOption = echarts.ComposeOption<PictorialBarSeriesOption | TooltipComponentOption | GridComponentOption>;

// 注册必须的组件
echarts.use([TooltipComponent, GridComponent, PictorialBarChart, CanvasRenderer]);

export interface PictorialBarProps {
  xAxisData: any[];
  name: string;
  unit?: string;
  data: (string | number | { name: string; value: string | number; unit: string })[];
  style?: CSSProperties;
  /** 控制是否自动轮播 */
  autoLoop?: boolean;
  /** 自动轮播的时长，默认为2s */
  duration?: number;
  config?: ECOption;
  inModal?: boolean;
  /** 控制是否显示y轴的线，默认显示 */
  showYAxisLine?: boolean;
  barColors?: [string, string][];
  onEvents?: Record<string, (params?: any) => void>;
}

/**
 * 象形柱状图，对应figma柱状图7
 */
export default forwardRef<ReactEcharts, PictorialBarProps>(
  (
    {
      name,
      data,
      unit,
      xAxisData,
      style,
      autoLoop,
      duration = 2000,
      config,
      showYAxisLine = true,
      inModal = false,
      barColors = [],
      onEvents,
    },
    ref
  ) => {
    const theme = useTheme();
    const baseChartConfig = useBaseChartConfig(inModal, unit);
    const echartsRef = useChartLoop(ref, xAxisData, autoLoop, duration);

    const baseColors = useMemo(() => {
      if (barColors?.length > 0 && barColors?.length >= data?.length) {
        return barColors;
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
      barColors,
      data?.length,
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
          grid: {
            ...baseChartConfig.grid,
          },
          tooltip: { ...baseChartConfig.tooltip },
          xAxis: {
            type: 'category',
            data: xAxisData,
            ...baseChartConfig.xAxis,
          },
          yAxis: {
            name: unit,
            ...baseChartConfig.yAxis,
            axisLine: {
              ...(baseChartConfig.yAxis as YAXisOption).axisLine,
              show: showYAxisLine,
            },
          },
          series: [
            {
              name,
              type: 'pictorialBar',
              barCategoryGap: '-100%',
              symbol: 'path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z',
              data: data.map((item, index) => ({
                ...(typeof item === 'object' ? item : { value: item, unit }),
                itemStyle: {
                  opacity: 0.5,
                  color: colors[index],
                },
              })),
            },
          ],
        },
        config
      ) as ECOption;
    }, [
      colors,
      baseChartConfig.grid,
      baseChartConfig.tooltip,
      baseChartConfig.xAxis,
      baseChartConfig.yAxis,
      xAxisData,
      unit,
      name,
      data,
      config,
      showYAxisLine,
    ]);

    return <ReactEcharts ref={echartsRef} echarts={echarts} option={option} style={style} onEvents={onEvents} />;
  }
);
