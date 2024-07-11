import React, { CSSProperties, forwardRef } from 'react';

import * as echarts from 'echarts/core';
import ReactEcharts from 'echarts-for-react';
import {
  BarChart, // 系列类型的定义后缀都为 SeriesOption
  BarSeriesOption,
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
import { CanvasRenderer, SVGRenderer } from 'echarts/renderers';
import { merge } from 'lodash-es';

import useBaseBarConfig from '../hooks/useBaseBarConfig';
import useBaseChartConfig from '../hooks/useBaseChartConfig';
import useTheme from '../hooks/useTheme';
import createLinearGradient from '../utils/createLinearGradient';

// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
type ECOption = echarts.ComposeOption<
  BarSeriesOption | TooltipComponentOption | GridComponentOption | SingleAxisComponentOption
>;

// 注册必须的组件
echarts.use([TooltipComponent, GridComponent, SingleAxisComponent, BarChart, CanvasRenderer, SVGRenderer]);

export interface ProgressProps {
  name: string;
  data: { name: string; value: number | string }[];
  style?: CSSProperties;
  config?: ECOption;
  inModal?: boolean;
  /** 图表交互事件 */
  onEvents?: Record<string, (params?: any) => void>;
  /** 图表渲染器 */
  renderer?: 'canvas' | 'svg';
  /** 显示模式： percentage百分比； normal数字 */
  mode: 'percentage' | 'normal';
}

/**
 * 进度条图，对应Figma其他图6
 */
export default forwardRef<ReactEcharts, ProgressProps>(
  (
    {
      name,
      data,
      style = { width: 300, height: 300 },
      config,
      inModal = false,
      mode = 'percentage',
      onEvents,
      renderer = 'canvas',
    },
    ref
  ) => {
    const theme = useTheme();
    const baseChartConfig = useBaseChartConfig(inModal);
    const baseBarConfig = useBaseBarConfig(inModal);

    const option = merge(
      {
        legend: {
          ...baseChartConfig.legend,
        },
        grid: {
          ...baseChartConfig.grid,
          left: '5%',
          right: '5%',
          top: 20,
          bottom: 0,
        },
        xAxis: {
          show: false,
        },
        yAxis: [
          {
            type: 'category',
            data,
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
            name,
            type: 'bar',
            barWidth: 6,
            yAxisIndex: 0,
            data: data,
            z: 3,
            barCategoryGap: '30%',
            label: {
              ...baseBarConfig.label,
              offset: [-5, -3],
              position: 'insideBottomLeft',
              formatter: '{b}',
            },
            itemStyle: {
              color: createLinearGradient(theme.colors.primary50, false),
              borderRadius: 11,
            },
          },
          {
            name,
            type: 'bar',
            barWidth: 6,
            yAxisIndex: 0,
            barGap: '-100%',
            barCategoryGap: '30%',
            z: 2,
            silent: true,
            data: data.map(item => ({
              name: item.value + (mode === 'percentage' ? '%' : ''),
              value: mode === 'percentage' ? 100 : Math.max(...data.map(item => +item.value)) * 2.5,
            })),
            label: {
              ...baseBarConfig.label,
              position: 'insideBottomRight',
              offset: [5, -3],
              formatter: '{b}',
            },
            itemStyle: {
              color: createLinearGradient(theme.colors.primary100, false),
              borderRadius: 11,
            },
          },
          {
            name,
            type: 'scatter',
            data,
            yAxisIndex: 0,
            symbolSize: 10,
            itemStyle: {
              color: theme.colors.assist1000,
              opacity: 1,
              borderWidth: 0.5,
              borderColor: theme.colors.gray50,
            },
            z: 4,
          },
        ],
      },
      config
    );

    return (
      <ReactEcharts ref={ref} echarts={echarts} option={option} style={style} onEvents={onEvents} opts={{ renderer }} />
    );
  }
);
