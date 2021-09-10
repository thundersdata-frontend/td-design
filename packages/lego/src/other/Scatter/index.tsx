import React, { CSSProperties, useMemo } from 'react';
import ReactEcharts from 'echarts-for-react';
import * as echarts from 'echarts/core';
import {
  ScatterChart,
  // 系列类型的定义后缀都为 SeriesOption
  ScatterSeriesOption,
} from 'echarts/charts';
import {
  TooltipComponent,
  TooltipComponentOption,
  // 组件类型的定义后缀都为 ComponentOption
  GridComponent,
  GridComponentOption,
  SingleAxisComponent,
  SingleAxisComponentOption,
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import { merge } from 'lodash-es';
import createLinearGradient from '../../utils/createLinearGradient';
import useTheme from '../../hooks/useTheme';
import useBaseChartConfig from '../../hooks/useBaseChartConfig';
import useChartLoop from '../../hooks/useChartLoop';

// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
type ECOption = echarts.ComposeOption<
  ScatterSeriesOption | TooltipComponentOption | GridComponentOption | SingleAxisComponentOption
>;

// 注册必须的组件
echarts.use([TooltipComponent, GridComponent, SingleAxisComponent, ScatterChart, CanvasRenderer]);

/**
 * 直角坐标系散点图，对应Figma其他图7
 */
export default ({
  unit,
  xAxisData,
  seriesData,
  style,
  autoLoop,
  duration = 2000,
  config,
}: {
  unit?: string;
  xAxisData: string[];
  seriesData: { name: string; data: (string | number)[][] }[];
  style?: CSSProperties;
  /** 控制是否自动轮播 */
  autoLoop?: boolean;
  /** 自动轮播的时长，默认为2s */
  duration?: number;
  config?: ECOption;
}) => {
  const theme = useTheme();
  const baseChartConfig = useBaseChartConfig();
  const echartsRef = useChartLoop(xAxisData, autoLoop, duration);

  const option = useMemo(() => {
    return merge(
      {
        color: [
          createLinearGradient(theme.colors.primary50),
          createLinearGradient(theme.colors.primary100),
          createLinearGradient(theme.colors.primary200),
          createLinearGradient(theme.colors.primary300),
          createLinearGradient(theme.colors.primary400),
          createLinearGradient(theme.colors.primary500),
        ],
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
    theme.colors.primary100,
    theme.colors.primary200,
    theme.colors.primary300,
    theme.colors.primary400,
    theme.colors.primary50,
    theme.colors.primary500,
    unit,
    xAxisData,
    config,
  ]);

  return <ReactEcharts ref={echartsRef} echarts={echarts} option={option} style={style} />;
};
