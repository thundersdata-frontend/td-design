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

import useBaseChartConfig from '../hooks/useBaseChartConfig';
import useChartLoop from '../hooks/useChartLoop';
import useTheme from '../hooks/useTheme';
import createCylinderBarSeries from '../utils/createCylinderSeries';
import createLinearGradient from '../utils/createLinearGradient';

// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
type ECOption = echarts.ComposeOption<CustomSeriesOption | TooltipComponentOption | GridComponentOption>;

// 注册必须的组件
echarts.use([TooltipComponent, GridComponent, CustomChart, CanvasRenderer, SVGRenderer]);

export interface CylinderBarProps {
  xAxisData: any[];
  seriesData: BarSeriesData[];
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
 * 圆柱体柱状图，对应figma柱状图1
 */
export default forwardRef<ReactEcharts, CylinderBarProps>(
  (
    {
      xAxisData,
      seriesData = [{ unit: '' }, { unit: '' }],
      style,
      /** 控制是否自动轮播 */
      autoLoop,
      /** 自动轮播的时长，默认为2s */
      duration,
      config,
      inModal,
      showYAxisLine = true,
      onEvents,
      renderer = 'canvas',
    },
    ref
  ) => {
    const theme = useTheme();
    const colors = [createLinearGradient(theme.colors.primary50), createLinearGradient(theme.colors.primary300)];

    const baseChartConfig = useBaseChartConfig(inModal);
    const echartsRef = useChartLoop(ref, xAxisData, autoLoop, duration);

    const data = seriesData.slice(0, 2);
    // 根据data里面的unit，判断有几个y轴
    const yAxisCount = data[0].unit === data[1].unit ? 1 : 2;
    const yAxis =
      yAxisCount === 1
        ? [
            {
              name: data[0].unit,
              ...baseChartConfig.yAxis,
              axisLine: {
                ...(baseChartConfig.yAxis as YAXisOption).axisLine,
                show: showYAxisLine,
              },
            },
          ]
        : data.map(item => ({
            name: item.unit,
            ...baseChartConfig.yAxis,
            axisLine: {
              ...(baseChartConfig.yAxis as YAXisOption).axisLine,
              show: showYAxisLine,
            },
          }));

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
        yAxis,
        series: createCylinderBarSeries(data as BarSeriesData[], colors, yAxisCount),
      },
      config
    );

    return (
      <ReactEcharts
        ref={echartsRef}
        notMerge
        echarts={echarts}
        option={option}
        style={style}
        onEvents={onEvents}
        opts={{ renderer }}
      />
    );
  }
);
