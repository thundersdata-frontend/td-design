import React, { CSSProperties, ForwardedRef, forwardRef } from 'react';

import * as echarts from 'echarts/core';
import Color from 'color';
import ReactEcharts from 'echarts-for-react';
import {
  CustomChart, // 系列类型的定义后缀都为 SeriesOption
  CustomSeriesOption,
  LineChart,
  LineSeriesOption,
} from 'echarts/charts';
import {
  // 组件类型的定义后缀都为 ComponentOption
  GridComponent,
  GridComponentOption,
  TooltipComponent,
  TooltipComponentOption,
} from 'echarts/components';
import { CanvasRenderer, SVGRenderer } from 'echarts/renderers';
import { YAXisOption } from 'echarts/types/dist/shared';
import { merge } from 'lodash-es';

import useBaseBarConfig from '../../hooks/useBaseBarConfig';
import useBaseChartConfig from '../../hooks/useBaseChartConfig';
import useBaseLineConfig from '../../hooks/useBaseLineConfig';
import useChartLoop from '../../hooks/useChartLoop';
import useTheme from '../../hooks/useTheme';
import createCuboidSeries from '../../utils/createCuboidSeries';
import createCylinderBarSeries from '../../utils/createCylinderSeries';
import createCylinderShadowSeries from '../../utils/createCylinderShadowSeries';
import createLinearGradient from '../../utils/createLinearGradient';
import createSliceSeries from '../../utils/createSliceSeries';
import createStackSeries from '../../utils/createStackSeries';

// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
type ECOption = echarts.ComposeOption<
  LineSeriesOption | CustomSeriesOption | TooltipComponentOption | GridComponentOption
>;

// 注册必须的组件
echarts.use([TooltipComponent, GridComponent, LineChart, CustomChart, CanvasRenderer, SVGRenderer]);

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
  /** 图表交互事件 */
  onEvents?: Record<string, (params?: any) => void>;
  /** 图表渲染器 */
  renderer?: 'canvas' | 'svg';
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
    renderer = 'canvas',
  }: BarLineProps<TType>,
  ref: ForwardedRef<ReactEcharts>
) {
  const theme = useTheme();
  const baseBarConfig = useBaseBarConfig(inModal);
  const baseChartConfig = useBaseChartConfig(inModal);
  const baseLineConfig = useBaseLineConfig();
  const echartsRef = useChartLoop(ref, xAxisData, autoLoop, duration, 1);

  const baseLineSeries = {
    name: lineData.name,
    yAxisIndex: 1,
    data: lineData.data.map(item => ({ value: item, unit: lineUnit })),
    ...baseLineConfig,
    smooth,
    itemStyle: {
      color: createLinearGradient(theme.colors.primary200),
    },
    emphasis: {
      lineStyle: {
        shadowBlur: 11,
        shadowColor: theme.colors.assist600,
      },
    },
  };
  const lineSeries = shadow
    ? {
        ...baseLineSeries,
        areaStyle: {
          color: getAreaColorsByIndex(theme.colors.primary200),
          shadowColor: Color(theme.colors.primary200).alpha(0.85).string(),
        },
      }
    : baseLineSeries;

  const createOption = () => {
    switch (barType) {
      // 长方体柱状图
      case 'cuboidBar':
      default:
        return {
          color: [createLinearGradient(theme.colors.primary300)],
          series: [createCuboidSeries(theme, barData as BarSeriesData, barUnit), lineSeries],
        };

      // 分组圆柱图
      case 'cylinderBar':
        const cylinderBarColors = [
          createLinearGradient(theme.colors.primary50),
          createLinearGradient(theme.colors.primary300),
        ];
        const cylinderBarData = (barData as BarSeriesData[]).map(item => ({
          ...item,
          unit: barUnit,
        }));
        return {
          color: cylinderBarColors,
          series: [...createCylinderBarSeries(cylinderBarData, cylinderBarColors, 1), lineSeries],
        };

      // 带阴影圆柱图
      case 'cylinderShadowBar':
        return {
          color: [createLinearGradient(theme.colors.primary50)],
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
                    background: linear-gradient(180deg, ${params?.[5]?.color?.colorStops?.[0]?.color} 0%, ${params?.[5]
                      ?.color?.colorStops?.[1]?.color} 100%);
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
          series: [...createSliceSeries(theme, barData as BarSeriesData, max ?? 0), lineSeries],
          tooltipFormatter: {
            formatter: function (params: any) {
              const str = `
                  <div style="display: flex; align-items: center;">
                    <div style="
                      width: 7px;
                      height: 7px;
                      background: linear-gradient(180deg, ${params[0]?.color?.colorStops?.[0]?.color} 0%, ${params[0]
                        ?.color?.colorStops?.[1]?.color} 100%);
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
                    background: linear-gradient(180deg, ${params?.[2]?.color?.colorStops?.[0]?.color} 0%, ${params?.[2]
                      ?.color?.colorStops?.[1]?.color} 100%);
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
  };

  const { series, color, tooltipFormatter } = createOption();
  const option = merge(
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
  );

  return (
    <ReactEcharts
      ref={echartsRef}
      notMerge={true}
      echarts={echarts}
      option={option}
      style={style}
      onEvents={onEvents}
      opts={{ renderer }}
    />
  );
}

export default forwardRef(BarLine);

const getAreaColorsByIndex = (colors: [string, string]) => {
  const _color = [Color(colors[1]).alpha(0).string(), Color(colors[0]).alpha(0.4).string()];
  return createLinearGradient(_color);
};
