import React, { CSSProperties, forwardRef } from 'react';

import * as echarts from 'echarts/core';
import ReactEcharts from 'echarts-for-react';
import {
  CustomChart, // 系列类型的定义后缀都为 SeriesOption
  CustomSeriesOption,
} from 'echarts/charts';
import {
  // 组件类型的定义后缀都为 ComponentOption
  GridComponent,
  GridComponentOption,
  TooltipComponent,
  TooltipComponentOption,
} from 'echarts/components';
import { CanvasRenderer, SVGRenderer } from 'echarts/renderers';
import { TooltipOption, YAXisOption } from 'echarts/types/dist/shared';
import { merge } from 'lodash-es';

import useBaseBarConfig from '../../hooks/useBaseBarConfig';
import useBaseChartConfig from '../../hooks/useBaseChartConfig';
import useChartLoop from '../../hooks/useChartLoop';
import useStyle from '../../hooks/useStyle';
import useTheme from '../../hooks/useTheme';
import createStackSeries from '../../utils/createStackSeries';

// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
type ECOption = echarts.ComposeOption<CustomSeriesOption | TooltipComponentOption | GridComponentOption>;

// 注册必须的组件
echarts.use([TooltipComponent, GridComponent, CustomChart, CanvasRenderer, SVGRenderer]);

export interface StackBarProps {
  xAxisData: string[];
  unit?: string;
  seriesData: { name: string; data: (number | string)[] }[];
  seriesColor?: [[string, string], [string, string]];
  style?: CSSProperties;
  /** 控制是否自动轮播 */
  autoLoop?: boolean;
  /** 自动轮播的时长，默认为2s */
  duration?: number;
  config?: ECOption;
  inModal?: boolean;
  /** 控制是否显示y轴的线，默认显示 */
  showYAxisLine?: boolean;
  /** 图表交互事件 */
  onEvents?: Record<string, (params?: any) => void>;
  /** 图表渲染器 */
  renderer?: 'canvas' | 'svg';
}

/**
 * 带阴影柱状堆叠图，对应figma柱状图2
 */
export default forwardRef<ReactEcharts, StackBarProps>(
  (
    {
      xAxisData,
      seriesData,
      seriesColor,
      unit,
      style,
      autoLoop,
      duration = 2000,
      config,
      inModal = false,
      showYAxisLine = true,
      onEvents,
      renderer = 'canvas',
    },
    ref
  ) => {
    const theme = useTheme();
    const baseBarConfig = useBaseBarConfig(inModal);
    const baseChartConfig = useBaseChartConfig(inModal, unit);
    const echartsRef = useChartLoop(ref, xAxisData, autoLoop, duration);
    const { style: modifiedStyle } = useStyle(style);

    const chartColor = seriesColor || [theme.colors.primary50, theme.colors.primary300];
    const totalData: number[] = [];
    for (let i = 0; i < xAxisData.length; i++) {
      const element = +seriesData[0].data[i] + +seriesData[1].data[i];
      totalData.push(element);
    }

    const option = merge(
      {
        legend: {
          ...baseChartConfig.legend,
        },
        grid: {
          ...baseChartConfig.grid,
        },
        tooltip: {
          ...baseChartConfig.tooltip,
          axisPointer: {
            ...(baseChartConfig.tooltip as TooltipOption).axisPointer,
            type: 'shadow',
          },
        },
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
        series: createStackSeries(chartColor, baseBarConfig, seriesData, totalData, unit),
      },
      config
    );

    return (
      <div style={modifiedStyle}>
        <ReactEcharts
          ref={echartsRef}
          echarts={echarts}
          option={option}
          style={{ width: modifiedStyle.width, height: modifiedStyle.height }}
          onEvents={onEvents}
          opts={{ renderer }}
        />
      </div>
    );
  }
);
