import React, { CSSProperties, useMemo } from 'react';
import ReactEcharts from 'echarts-for-react';
import * as echarts from 'echarts/core';
import {
  PictorialBarChart,
  // 系列类型的定义后缀都为 SeriesOption
  PictorialBarSeriesOption,
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
import { TooltipOption, XAXisOption } from 'echarts/types/dist/shared';
import { merge } from 'lodash-es';

import { imgData } from './img';
import useTheme from '../../hooks/useTheme';
import useBaseChartConfig from '../../hooks/useBaseChartConfig';

// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
type ECOption = echarts.ComposeOption<
  PictorialBarSeriesOption | TooltipComponentOption | GridComponentOption | SingleAxisComponentOption
>;

// 注册必须的组件
echarts.use([TooltipComponent, GridComponent, SingleAxisComponent, PictorialBarChart, CanvasRenderer]);

/**
 * 水平条形图，对应figma柱状图5
 */
export default ({
  unit,
  max,
  seriesData,
  style,
  config,
}: {
  unit?: string;
  max: number;
  seriesData: { name: string; data: { name: string; value: number }[] };
  style?: CSSProperties;
  config?: ECOption;
}) => {
  const theme = useTheme();
  const baseChartConfig = useBaseChartConfig();
  const option = useMemo(() => {
    return merge(
      {
        legend: {
          ...baseChartConfig.legend,
        },
        grid: {
          ...baseChartConfig.grid,
          left: '8%',
          right: '4%',
        },
        tooltip: {
          ...baseChartConfig.tooltip,
          axisPointer: {
            ...(baseChartConfig.tooltip as TooltipOption).axisPointer,
            type: 'shadow',
          },
        },
        xAxis: {
          max,
          name: unit,
          splitLine: {
            show: false,
          },
          axisLine: {
            ...(baseChartConfig.xAxis as XAXisOption).axisLine,
            show: true,
          },
          axisLabel: {
            show: true,
            textStyle: {
              ...theme.typography.p2,
              color: theme.colors.gray100,
            },
          },
          axisTick: {
            show: true,
          },
        },
        yAxis: [
          {
            type: 'category',
            data: seriesData.data.map(item => item.name),
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              show: false,
            },
            inverse: true,
          },
        ],
        series: [
          {
            name: seriesData.name,
            type: 'pictorialBar',
            silent: true,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                { offset: 0, color: '#3FA4FF' },
                { offset: 1, color: '#60F5FF' },
              ]),
            },
            label: {
              formatter: '{b}',
              textStyle: {
                ...theme.typography.p2,
                color: theme.colors.gray100,
              },
              position: 'left',
              distance: 10, // 向右偏移位置
              show: true,
            },
            symbolRepeat: 'fixed',
            symbolMargin: 2,
            symbol: 'rect',
            symbolClip: true,
            symbolSize: [3, 8],
            symbolOffset: [18, 0],
            symbolPosition: 'start',
            symbolBoundingData: max * 0.92,
            data: seriesData.data,
            z: 3,
            animationEasing: 'elasticOut',
          },
          {
            type: 'pictorialBar',
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                { offset: 0, color: '#0F2623' },
                { offset: 1, color: '#3BFFBA' },
              ]),
              opacity: 0.2,
            },
            symbolRepeat: 'fixed',
            symbolMargin: 2,
            symbol: 'rect',
            symbolClip: true,
            symbolOffset: [18, 0],
            symbolSize: [3, 8],
            symbolPosition: 'start',
            symbolBoundingData: max * 0.92,
            data: seriesData.data.map(() => max),
            z: 2,
            animationEasing: 'elasticOut',
          },
          {
            type: 'pictorialBar',
            symbol: 'image://' + imgData,
            symbolOffset: [0, 0],
            symbolSize: ['100%', 24],
            symbolClip: true,
            symbolBoundingData: max,
            data: seriesData.data.map(() => max),
            z: 1,
          },
        ],
      },
      config
    ) as ECOption;
  }, [
    baseChartConfig.grid,
    baseChartConfig.legend,
    baseChartConfig.tooltip,
    baseChartConfig.xAxis,
    max,
    seriesData.data,
    seriesData.name,
    theme.colors.gray100,
    theme.typography.p2,
    unit,
    config,
  ]);

  return <ReactEcharts echarts={echarts} option={option} style={style} />;
};
