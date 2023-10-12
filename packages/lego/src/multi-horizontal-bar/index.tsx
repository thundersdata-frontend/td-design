import React, { CSSProperties, forwardRef } from 'react';

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
  SingleAxisComponent,
  SingleAxisComponentOption,
  TooltipComponent,
  TooltipComponentOption,
} from 'echarts/components';
import { CanvasRenderer, SVGRenderer } from 'echarts/renderers';
import { TooltipOption, YAXisOption } from 'echarts/types/dist/shared';
import { merge } from 'lodash-es';

import useBaseChartConfig from '../hooks/useBaseChartConfig';
import useTheme from '../hooks/useTheme';
import createLinearGradient from '../utils/createLinearGradient';

// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
type ECOption = echarts.ComposeOption<
  PictorialBarSeriesOption | TooltipComponentOption | GridComponentOption | SingleAxisComponentOption
>;

// 注册必须的组件
echarts.use([TooltipComponent, GridComponent, SingleAxisComponent, PictorialBarChart, CanvasRenderer, SVGRenderer]);

export interface MultiHorizontalBarProps {
  unit?: string | [string, string];
  max: number | [number, number];
  leftData: { name: string; data: { name: string; value: number | string }[] };
  rightData: { name: string; data: { name: string; value: number | string }[] };
  style?: CSSProperties;
  config?: ECOption;
  inModal?: boolean;
  /** 图表交互事件 */
  onEvents?: Record<string, (params?: any) => void>;
  /** 图表渲染器 */
  renderer?: 'canvas' | 'svg';
}

/**
 * 双列水平条形图，对应figma柱状图6
 */
export default forwardRef<ReactEcharts, MultiHorizontalBarProps>(
  ({ unit = '', max, leftData, rightData, style, config, inModal = false, onEvents, renderer = 'canvas' }, ref) => {
    const theme = useTheme();
    const baseChartConfig = useBaseChartConfig(inModal);
    const leftUnit = typeof unit === 'string' ? unit : unit[0];
    const rightUnit = typeof unit === 'string' ? unit : unit[1];
    const leftMax = typeof max === 'number' ? max : max[0];
    const rightMax = typeof max === 'number' ? max : max[1];

    const option = merge(
      {
        legend: {
          ...baseChartConfig.legend,
        },
        grid: [
          {
            show: false,
            left: '7%',
            top: '5%',
            bottom: '10%',
            width: '40%',
          },
          {
            show: false,
            left: '50%',
            top: '5%',
            bottom: '10%',
            width: '0%',
          },
          {
            show: false,
            right: '7%',
            top: '5%',
            bottom: '10%',
            width: '40%',
          },
        ],
        tooltip: {
          ...baseChartConfig.tooltip,
          axisPointer: {
            ...(baseChartConfig.tooltip as TooltipOption).axisPointer,
            type: 'shadow',
          },
          formatter: function (params: any) {
            const str = `
            <div style="display: flex; align-items: center;">
              <div style="
                width: 7px;
                height: 7px;
                background: linear-gradient(180deg, ${params[0]?.color?.colorStops?.[0]?.color} 0%, ${params[0]?.color
                  ?.colorStops?.[1]?.color} 100%);
                margin-right: 4px;
                border-radius: 7px;
              "></div>
              ${params[0]?.seriesName}：${params[0]?.data?.value || params[0]?.data} ${params[0]?.data?.unit ?? ''}
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
        xAxis: [
          {
            type: 'value',
            inverse: true,
            name: leftUnit,
            nameGap: 5,
            nameLocation: 'end',
            nameTextStyle: {
              ...theme.typography[inModal ? 'p0' : 'p2'],
              color: theme.colors.gray100,
            },
            axisLine: {
              ...(baseChartConfig.xAxis as YAXisOption).axisLine,
              show: true,
            },
            axisTick: {
              show: true,
            },
            axisLabel: {
              ...(baseChartConfig.xAxis as YAXisOption).axisLabel,
              show: true,
            },
            splitLine: {
              show: false,
            },
          },
          {
            gridIndex: 1,
            show: false,
          },
          {
            gridIndex: 2,
            show: true,
            type: 'value',
            inverse: false,
            name: rightUnit,
            nameGap: 5,
            nameLocation: 'end',
            nameTextStyle: {
              ...theme.typography[inModal ? 'p0' : 'p2'],
              color: theme.colors.gray100,
            },
            axisLine: {
              ...(baseChartConfig.xAxis as YAXisOption).axisLine,
              show: true,
            },
            axisTick: {
              show: true,
            },
            axisLabel: {
              ...(baseChartConfig.xAxis as YAXisOption).axisLabel,
              show: true,
            },
            splitLine: {
              show: false,
            },
          },
        ],
        yAxis: [
          {
            gridIndex: 0,
            triggerEvent: true,
            inverse: true,
            data: getArrByKey(leftData.data, 'name'),
            axisLine: {
              show: false,
            },
            splitLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              show: false,
            },
          },
          {
            gridIndex: 1,
            type: 'category',
            inverse: true,
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              ...(baseChartConfig.yAxis as YAXisOption).axisLabel,
              show: true,
              interval: 0,
              align: 'auto',
              verticalAlign: 'middle',
            },
            data: getArrByKey(leftData.data, 'name'),
          },
          {
            gridIndex: 2,
            triggerEvent: true,
            inverse: true,
            data: getArrByKey(rightData.data, 'name'),
            axisLine: {
              show: false,
            },
            splitLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              show: false,
            },
          },
        ],
        series: [
          // 左侧
          {
            name: leftData.name,
            type: 'pictorialBar',
            xAxisIndex: 0,
            yAxisIndex: 0,
            gridIndex: 0,
            silent: true,
            itemStyle: {
              color: createLinearGradient(theme.colors.primary300, false),
            },
            symbolRepeat: 'fixed',
            symbolMargin: 2,
            symbol: 'rect',
            symbolClip: true,
            symbolSize: [3, 8],
            symbolOffset: [-18, 0],
            symbolPosition: 'start',
            symbolBoundingData: leftMax * 0.85,
            data: leftData.data.map(item => ({ ...item, unit: leftUnit })),
            z: 3,
            animationEasing: 'elasticOut',
          },
          {
            name: leftData.name,
            type: 'pictorialBar',
            xAxisIndex: 0,
            yAxisIndex: 0,
            gridIndex: 0,
            itemStyle: {
              color: theme.colors.assist1100,
              opacity: 0.2,
            },
            symbolRepeat: 'fixed',
            symbolMargin: 2,
            symbol: 'rect',
            symbolClip: true,
            symbolSize: [3, 8],
            symbolOffset: [-18, 0],
            symbolPosition: 'start',
            symbolBoundingData: leftMax * 0.85,
            data: leftData.data.map(() => leftMax),
            z: 2,
            animationEasing: 'elasticOut',
          },
          {
            name: leftData.name,
            type: 'pictorialBar',
            itemStyle: {
              color: 'rgba(9, 63, 160, 0.57)',
            },
            xAxisIndex: 0,
            yAxisIndex: 0,
            gridIndex: 0,
            symbol: 'path://M 0 0 L 8 0 C 8 0 8 1 7.5 1 L -1 1 C -1 1 -1 0 -0.5 0',
            symbolOffset: [0, 0],
            symbolSize: ['100%', 24],
            symbolClip: true,
            symbolBoundingData: leftMax,
            data: leftData.data.map(() => leftMax),
            z: 1,
            animation: false,
          },

          // 右侧
          {
            name: rightData.name,
            type: 'pictorialBar',
            xAxisIndex: 2,
            yAxisIndex: 2,
            gridIndex: 2,
            silent: true,
            itemStyle: {
              color: createLinearGradient(theme.colors.primary50, false),
            },
            symbolRepeat: 'fixed',
            symbolMargin: 2,
            symbol: 'rect',
            symbolClip: true,
            symbolSize: [3, 8],
            symbolOffset: [18, 0],
            symbolPosition: 'start',
            symbolBoundingData: rightMax * 0.85,
            data: rightData.data.map(item => ({
              ...item,
              unit: rightUnit,
            })),
            z: 3,
            animationEasing: 'elasticOut',
          },
          {
            name: rightData.name,
            type: 'pictorialBar',
            xAxisIndex: 2,
            yAxisIndex: 2,
            gridIndex: 2,
            itemStyle: {
              color: theme.colors.assist1100,
              opacity: 0.2,
            },
            symbolRepeat: 'fixed',
            symbolMargin: 2,
            symbol: 'rect',
            symbolClip: true,
            symbolOffset: [18, 0],
            symbolSize: [3, 8],
            symbolPosition: 'start',
            symbolBoundingData: rightMax * 0.85,
            data: rightData.data.map(() => rightMax),
            z: 2,
            animationEasing: 'elasticOut',
          },
          {
            name: rightData.name,
            type: 'pictorialBar',
            xAxisIndex: 2,
            yAxisIndex: 2,
            gridIndex: 2,
            itemStyle: {
              color: 'rgba(9, 63, 160, 0.57)',
            },
            symbol: 'path://M 0 0 L 8 0 C 8 0 8 1 7.5 1 L -1 1 C -1 1 -1 0 -0.5 0',
            symbolOffset: [0, 0],
            symbolSize: ['100%', 24],
            symbolClip: true,
            symbolBoundingData: rightMax,
            data: rightData.data.map(() => rightMax),
            z: 1,
            animation: false,
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

function getArrByKey(list: { name: string; value: number | string }[], key: string) {
  return list.map(item => item[key]);
}
