import React, { CSSProperties, forwardRef, useMemo, useCallback, ForwardedRef } from 'react';
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

import useTheme from '../../hooks/useTheme';
import useBaseChartConfig from '../../hooks/useBaseChartConfig';
import useBaseLineConfig from '../../hooks/useBaseLineConfig';
import useChartLoop from '../../hooks/useChartLoop';
import createCuboidSeries from '../../utils/createCuboidSeries';
import createLinearGradient from '../../utils/createLinearGradient';
import createCylinderSeries from '../../utils/createCylinderSeries';
import createCylinderShadowSeries from '../../utils/createCylinderShadowSeries';
import useBaseBarConfig from '../../hooks/useBaseBarConfig';
import createSliceSeries from '../../utils/createSliceSeries';
import createStackSeries from '../../utils/createStackSeries';

// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
type ECOption = echarts.ComposeOption<
  LineSeriesOption | CustomSeriesOption | TooltipComponentOption | GridComponentOption
>;

// 注册必须的组件
echarts.use([TooltipComponent, GridComponent, LineChart, CustomChart, CanvasRenderer]);

type CuboidBarParams = {
  barType: 'cuboidBar';
  barData: BarSeriesData;
};

type CylinderBarParams = {
  barType: 'cylinderBar';
  barData: BarSeriesData[];
};

type CylinderShadowBarParams = {
  barType: 'cylinderShadowBar';
  barData: BarSeriesData;
};

type StackBarParams = {
  barType: 'stackBar';
  barData: BarSeriesData[];
};

type SliceBarParams = {
  barType: 'sliceBar';
  barData: BarSeriesData;
};

type Params = CuboidBarParams | CylinderBarParams | CylinderShadowBarParams | StackBarParams | SliceBarParams;

type GetValueType<TType extends Params['barType']> = Extract<Params, { barType: TType }>['barData'];

export interface BarLineProps<TType extends Params['barType']> {
  xAxisData: any[];
  yAxis: YAXisOption[];
  lineData: { name: string; data: (number | string | null)[] };
  lineUnit?: string;
  barUnit?: string;
  style?: CSSProperties;
  // 柱状图类型
  barType?: TType;
  // barType = cylinderShadowBar | sliceBar 时需要
  max?: number;
  barData: GetValueType<TType>;
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
function BarLine<TType extends Params['barType']>(
  {
    xAxisData,
    yAxis,
    barType,
    barData,
    max,
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
  }: BarLineProps<TType>,
  ref: ForwardedRef<ReactEcharts>
) {
  const theme = useTheme();
  const baseBarConfig = useBaseBarConfig(inModal);
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

  const createOption = useCallback(() => {
    switch (barType) {
      // 长方体柱状图
      case 'cuboidBar':
      default:
        return {
          color: [createLinearGradient(theme.colors.primary300), createLinearGradient(theme.colors.primary200)],
          series: [createCuboidSeries(theme, barData as BarSeriesData, barUnit), lineSeries],
        };

      // 分组圆柱图
      case 'cylinderBar':
        return {
          color: [
            createLinearGradient(theme.colors.primary50),
            createLinearGradient(theme.colors.primary300),
            createLinearGradient(theme.colors.primary200),
          ],
          series: [
            ...(barData as BarSeriesData[])
              .slice(0, 2)
              .map(item => createCylinderSeries(theme, { ...item, unit: barUnit }, 0)),
            lineSeries,
          ],
        };

      // 带阴影圆柱图
      case 'cylinderShadowBar':
        return {
          color: [createLinearGradient(theme.colors.primary50), createLinearGradient(theme.colors.primary200)],
          series: [...createCylinderShadowSeries(theme, baseBarConfig, barData as BarSeriesData, max ?? 0), lineSeries],
          tooltipFormatter: {
            formatter: function (params: any) {
              const str = `
                  <div style="display: flex; align-items: center;">
                    <div style="
                      width: 7px;
                      height: 7px;
                      background: linear-gradient(180deg, ${params[0]?.color} 0%, ${params[0]?.color} 100%);
                      margin-right: 4px;
                      border-radius: 7px;
                    "></div>
                    ${params[0]?.seriesName}：${params[0]?.data?.value || params[0]?.data} ${
                barUnit ?? params[0]?.data?.unit ?? ''
              }
                  </div>
                  <div style="display: flex; align-items: center;">
                  <div style="
                    width: 7px;
                    height: 7px;
                    background: linear-gradient(180deg, ${params?.[5]?.color?.colorStops?.[0]?.color} 0%, ${
                params?.[5]?.color?.colorStops?.[1]?.color
              } 100%);
                    margin-right: 4px;
                    border-radius: 7px;
                  "></div>
                  ${params?.[5]?.seriesName}：${params?.[5]?.value} ${lineUnit ?? params?.[5]?.data?.unit ?? ''}
                </div>
                `;

              return `
                  <div style="
                    background: linear-gradient(180deg, rgba(18, 81, 204, 0.9) 0%, rgba(12, 49, 117, 0.9) 100%);
                    border: 1px solid #017AFF;
                    color: #fff;
                    font-size: ${inModal ? '18px' : '14px'};
                    line-height: ${inModal ? '25px' : '22px'};
                    padding: 5px;
                    border-radius: 6px;
                  ">
                    <div>${params[0]?.name}</div>
                    ${str}
                  </div>
                `;
            },
          },
        };

      // 叠片柱状图
      case 'sliceBar':
        return {
          color: [createLinearGradient(theme.colors.primary200)],
          series: [...createSliceSeries(theme, barData as BarSeriesData, max ?? 0), lineSeries],
          tooltipFormatter: {
            formatter: function (params: any) {
              const str = `
                  <div style="display: flex; align-items: center;">
                    <div style="
                      width: 7px;
                      height: 7px;
                      background: linear-gradient(180deg, ${params[0]?.color?.colorStops?.[0]?.color} 0%, ${
                params[0]?.color?.colorStops?.[1]?.color
              } 100%);
                      margin-right: 4px;
                      border-radius: 7px;
                    "></div>
                    ${params[0]?.seriesName}：${params[0]?.data?.value || params[0]?.data} ${
                barUnit ?? params[0]?.data?.unit ?? ''
              }
                  </div>
                  <div style="display: flex; align-items: center;">
                  <div style="
                    width: 7px;
                    height: 7px;
                    background: linear-gradient(180deg, ${params?.[2]?.color?.colorStops?.[0]?.color} 0%, ${
                params?.[2]?.color?.colorStops?.[1]?.color
              } 100%);
                    margin-right: 4px;
                    border-radius: 7px;
                  "></div>
                  ${params?.[2]?.seriesName}：${params?.[2]?.value} ${lineUnit ?? params?.[2]?.data?.unit ?? ''}
                </div>
                `;

              return `
                  <div style="
                    background: linear-gradient(180deg, rgba(18, 81, 204, 0.9) 0%, rgba(12, 49, 117, 0.9) 100%);
                    border: 1px solid #017AFF;
                    color: #fff;
                    font-size: ${inModal ? '18px' : '14px'};
                    line-height: ${inModal ? '25px' : '22px'};
                    padding: 5px;
                    border-radius: 6px;
                  ">
                    <div>${params[0]?.name}</div>
                    ${str}
                  </div>
                `;
            },
          } as any,
        };

      // 堆叠圆柱图
      case 'stackBar':
        const totalData: number[] = [];
        for (let i = 0; i < xAxisData.length; i++) {
          const element = +barData[0].data[i] + +barData[1].data[i];
          totalData.push(element);
        }
        return {
          color: [createLinearGradient(theme.colors.primary200)],
          series: [
            ...createStackSeries(
              [theme.colors.primary50, theme.colors.primary300],
              baseBarConfig,
              barData as any,
              totalData,
              barUnit
            ),
            lineSeries,
          ],
        };
    }
  }, [barType, theme, barData, barUnit, lineSeries, baseBarConfig, max, lineUnit, inModal, xAxisData.length]);

  const option = useMemo(() => {
    const { series, color, tooltipFormatter } = createOption();

    return merge(
      {
        color,
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
          ...(tooltipFormatter ?? {}),
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
        series,
      },
      config
    ) as ECOption;
  }, [
    createOption,
    baseChartConfig.legend,
    baseChartConfig.grid,
    baseChartConfig.tooltip,
    baseChartConfig.xAxis,
    baseChartConfig.yAxis,
    xAxisData,
    yAxis,
    showYAxisLine,
    config,
  ]);

  return (
    <ReactEcharts
      ref={echartsRef}
      notMerge={true}
      echarts={echarts}
      option={option}
      style={style}
      onEvents={onEvents}
    />
  );
}

export default forwardRef(BarLine);

const getAreaColorsByIndex = (colors: [string, string]) => {
  const _color = [Color(colors[1]).alpha(0).string(), Color(colors[0]).alpha(0.4).string()];
  return createLinearGradient(_color);
};
