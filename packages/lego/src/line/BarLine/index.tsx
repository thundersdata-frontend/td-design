import React, { CSSProperties, forwardRef, useMemo } from 'react';
import ReactEcharts from 'echarts-for-react';
import * as echarts from 'echarts/core';
import Color from 'color';
import {
  LineChart,
  LineSeriesOption,
  CustomChart,
  // 系列类型的定义后缀都为 SeriesOption
  CustomSeriesOption,
} from 'echarts/charts';
import {
  TooltipComponent,
  TooltipComponentOption,
  // 组件类型的定义后缀都为 ComponentOption
  GridComponent,
  GridComponentOption,
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import { YAXisOption } from 'echarts/types/dist/shared';
import { merge } from 'lodash-es';

import createCuboidSeries from '../../utils/createCuboidSeries';
import createLinearGradient from '../../utils/createLinearGradient';
import useTheme from '../../hooks/useTheme';
import useBaseChartConfig from '../../hooks/useBaseChartConfig';
import useBaseLineConfig from '../../hooks/useBaseLineConfig';
import useChartLoop from '../../hooks/useChartLoop';

// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
type ECOption = echarts.ComposeOption<
  LineSeriesOption | CustomSeriesOption | TooltipComponentOption | GridComponentOption
>;

// 注册必须的组件
echarts.use([TooltipComponent, GridComponent, LineChart, CustomChart, CanvasRenderer]);

export interface BarLineProps {
  xAxisData: any[];
  yAxis: YAXisOption[];
  lineData: { name: string; data: (number | string | null)[] };
  lineUnit?: string;
  barData: { name: string; data: (number | string)[] };
  barUnit?: string;
  style?: CSSProperties;
  /** 控制是否自动轮播 */
  autoLoop?: boolean;
  /** 自动轮播的时长，默认为2s */
  duration?: number;
  config?: ECOption;
  inModal?: boolean;
  /** 是否显示areaStyle */
  shadow?: boolean;
  /** 折线是否平滑 */
  smooth?: boolean;
  /** 控制是否显示y轴的线，默认显示 */
  showYAxisLine?: boolean;
  onEvents?: Record<string, (params?: any) => void>;
}

/**
 * 长方体柱状图，对应figma柱状图4
 */
export default forwardRef<ReactEcharts, BarLineProps>(
  (
    {
      xAxisData,
      yAxis,
      barData,
      barUnit = yAxis[0]?.name,
      lineData,
      lineUnit = yAxis[1]?.name,
      style,
      autoLoop,
      duration = 2000,
      config,
      inModal = false,
      shadow = false,
      smooth = false,
      showYAxisLine = true,
      onEvents,
    },
    ref
  ) => {
    const theme = useTheme();
    const baseChartConfig = useBaseChartConfig(inModal);
    const baseLineConfig = useBaseLineConfig();
    const echartsRef = useChartLoop(ref, xAxisData, autoLoop, duration, 1);

    const lineSeries = useMemo(() => {
      const baseLineSeries = {
        name: lineData.name,
        yAxisIndex: 1,
        data: lineData.data.map(item => ({ value: item, unit: lineUnit })),
        ...baseLineConfig,
        smooth,
      };
      return shadow
        ? {
            ...baseLineSeries,
            areaStyle: {
              color: getAreaColorsByIndex(theme.colors.primary200),
              shadowColor: Color(theme.colors.primary200).alpha(0.85).string(),
            },
          }
        : baseLineSeries;
    }, [baseLineConfig, lineData.data, lineData.name, lineUnit, shadow, smooth, theme.colors.primary200]);

    const option = useMemo(() => {
      return merge(
        {
          color: [createLinearGradient(theme.colors.primary300), createLinearGradient(theme.colors.primary200)],
          legend: {
            ...baseChartConfig.legend,
          },
          grid: {
            ...baseChartConfig.grid,
          },
          tooltip: {
            ...baseChartConfig.tooltip,
            axisPointer: {
              type: 'shadow',
            },
          },
          xAxis: {
            type: 'category',
            data: xAxisData,
            ...baseChartConfig.xAxis,
          },
          yAxis: [
            // 第一个是柱图
            {
              ...yAxis[0],
              ...baseChartConfig.yAxis,
              nameTextStyle: {
                ...(baseChartConfig.yAxis as YAXisOption).nameTextStyle,
                padding: [0, 40, 0, 0],
              },
              axisLine: {
                ...(baseChartConfig.yAxis as YAXisOption).axisLine,
                show: showYAxisLine,
              },
            },
            // 第二个是线图
            {
              ...yAxis[1],
              ...baseChartConfig.yAxis,
              nameTextStyle: {
                ...(baseChartConfig.yAxis as YAXisOption).nameTextStyle,
                padding: [0, 0, 0, 30],
              },
              axisLine: {
                ...(baseChartConfig.yAxis as YAXisOption).axisLine,
                show: showYAxisLine,
              },
              splitLine: {
                show: false,
              },
            },
          ],
          series: [createCuboidSeries(theme, barData, barUnit), lineSeries],
        },
        config
      ) as ECOption;
    }, [
      theme,
      baseChartConfig.legend,
      baseChartConfig.grid,
      baseChartConfig.tooltip,
      baseChartConfig.xAxis,
      baseChartConfig.yAxis,
      xAxisData,
      yAxis,
      barData,
      barUnit,
      lineSeries,
      config,
      showYAxisLine,
    ]);

    return <ReactEcharts ref={echartsRef} echarts={echarts} option={option} style={style} onEvents={onEvents} />;
  }
);

const getAreaColorsByIndex = (colors: [string, string]) => {
  const _color = [Color(colors[1]).alpha(0).string(), Color(colors[0]).alpha(0.4).string()];
  return createLinearGradient(_color);
};
