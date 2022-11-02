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
import { CanvasRenderer } from 'echarts/renderers';
import { TooltipOption, YAXisOption } from 'echarts/types/dist/shared';
import { merge } from 'lodash-es';
import React, { CSSProperties, forwardRef, useMemo } from 'react';

import useBaseChartConfig from '../../hooks/useBaseChartConfig';
import useChartLoop from '../../hooks/useChartLoop';
import useTheme from '../../hooks/useTheme';
import createCuboidSeries from '../../utils/createCuboidSeries';
import createLinearGradient from '../../utils/createLinearGradient';

// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
type ECOption = echarts.ComposeOption<CustomSeriesOption | TooltipComponentOption | GridComponentOption>;

// 注册必须的组件
echarts.use([TooltipComponent, GridComponent, CustomChart, CanvasRenderer]);

export interface CuboidBarProps {
  /** x轴数据 */
  xAxisData: any[];
  /** 单位 */
  unit?: string;
  /** 图例名称 */
  name?: string;
  /** 图表数据 */
  data: (number | string)[];
  /** 自定义样式 */
  style?: CSSProperties;
  /** 控制是否自动轮播 */
  autoLoop?: boolean;
  /** 自动轮播的时长，默认为2s */
  duration?: number;
  /** 自定义Echarts配置 */
  config?: ECOption;
  /** 是否在弹窗内显示 */
  inModal?: boolean;
  /** 控制是否显示y轴的线，默认显示 */
  showYAxisLine?: boolean;
  /** 自定义事件 */
  onEvents?: Record<string, (params?: any) => void>;
}

/**
 * 长方体柱状图，对应figma柱状图4
 */
const CuboidBar = forwardRef<ReactEcharts, CuboidBarProps>(
  (
    {
      xAxisData,
      unit,
      name,
      data,
      autoLoop,
      duration = 2000,
      style,
      config,
      inModal = false,
      onEvents,
      showYAxisLine = true,
    },
    ref
  ) => {
    const theme = useTheme();
    const baseChartConfig = useBaseChartConfig(inModal, unit);
    const echartsRef = useChartLoop(ref, xAxisData, autoLoop, duration);

    const option = useMemo(() => {
      return merge(
        {
          color: [createLinearGradient(theme.colors.primary300)],
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
          series: [createCuboidSeries(theme, { name: name ?? '', data })],
        },
        config
      ) as ECOption;
    }, [
      baseChartConfig.grid,
      baseChartConfig.legend,
      baseChartConfig.tooltip,
      baseChartConfig.xAxis,
      baseChartConfig.yAxis,
      data,
      name,
      theme,
      unit,
      xAxisData,
      config,
      showYAxisLine,
    ]);

    return <ReactEcharts ref={echartsRef} echarts={echarts} option={option} style={style} onEvents={onEvents} />;
  }
);

export default CuboidBar;
