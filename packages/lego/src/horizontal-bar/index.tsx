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
import { TooltipOption, XAXisOption } from 'echarts/types/dist/shared';
import { merge } from 'lodash-es';

import useBaseChartConfig from '../hooks/useBaseChartConfig';
import useChartLoop from '../hooks/useChartLoop';
import useTheme from '../hooks/useTheme';

// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
type ECOption = echarts.ComposeOption<
  PictorialBarSeriesOption | TooltipComponentOption | GridComponentOption | SingleAxisComponentOption
>;

// 注册必须的组件
echarts.use([TooltipComponent, GridComponent, SingleAxisComponent, PictorialBarChart, CanvasRenderer, SVGRenderer]);

export interface HorizontalBarProps {
  unit?: string;
  max: number;
  seriesData: {
    name: string;
    data: { name: string; value: number | string }[];
  };
  style?: CSSProperties;
  /** 控制是否自动轮播 */
  autoLoop?: boolean;
  /** 自动轮播的时长，默认为2s */
  duration?: number;
  config?: ECOption;
  inModal?: boolean;
  /** 图表交互事件 */
  onEvents?: Record<string, (params?: any) => void>;
  /** 图表渲染器 */
  renderer?: 'canvas' | 'svg';
}

/**
 * 水平条形图，对应figma柱状图5
 */
export default forwardRef<ReactEcharts, HorizontalBarProps>(
  ({ unit, max, seriesData, style, autoLoop, duration = 2000, config, inModal = false, onEvents, renderer }, ref) => {
    const theme = useTheme();
    const baseChartConfig = useBaseChartConfig(inModal, unit);
    const echartsRef = useChartLoop(ref, seriesData.data, autoLoop, duration);

    const option = merge(
      {
        legend: {
          ...baseChartConfig.legend,
        },
        grid: {
          ...baseChartConfig.grid,
          top: seriesData.name ? 20 : 0,
          left: '10%',
          right: '10%',
        },
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
              ${params[0]?.seriesName}：${params[0]?.data?.value || params[0]?.data} ${
                unit ?? params[0]?.data?.unit ?? ''
              }
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
        xAxis: {
          max,
          name: unit,
          nameLocation: 'end',
          nameTextStyle: {
            ...theme.typography[inModal ? 'p0' : 'p2'],
            color: theme.colors.gray100,
          },
          splitLine: {
            show: false,
          },
          axisLine: {
            ...(baseChartConfig.xAxis as XAXisOption).axisLine,
            show: true,
          },
          axisLabel: {
            ...theme.typography[inModal ? 'p0' : 'p2'],
            show: true,
            color: theme.colors.gray100,
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
              ...theme.typography[inModal ? 'p0' : 'p2'],
              color: theme.colors.gray100,
              formatter: '{b}',
              position: 'left',
              distance: 20, // 向右偏移位置
              show: true,
            },
            symbolRepeat: 'fixed',
            symbolMargin: 1,
            symbol: 'rect',
            symbolClip: true,
            symbolSize: [3, 8],
            symbolPosition: 'start',
            symbolBoundingData: max * 0.96,
            data: seriesData.data,
            z: 3,
            animationEasing: 'elasticOut',
          },
          {
            name: seriesData.name,
            type: 'pictorialBar',
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                { offset: 0, color: '#0F2623' },
                { offset: 1, color: '#3BFFBA' },
              ]),
              opacity: 0.2,
            },
            symbolRepeat: 'fixed',
            symbolMargin: 1,
            symbol: 'rect',
            symbolClip: true,
            symbolSize: [3, 8],
            symbolPosition: 'start',
            symbolBoundingData: max * 0.96,
            data: seriesData.data.map(() => max),
            z: 2,
            animationEasing: 'elasticOut',
          },
          {
            name: seriesData.name,
            type: 'pictorialBar',
            itemStyle: {
              color: 'rgba(9, 63, 160, 0.57)',
            },
            symbol: 'path://M 0 0 L 8 0 C 8 0 8 1 7.5 1 L -1 1 C -1 1 -1 0 -0.5 0',
            symbolSize: ['102%', 24],
            symbolOffset: ['-3%', 0],
            symbolBoundingData: max,
            data: seriesData.data.map(() => max),
            z: 1,
            animation: false,
          },
        ],
      },
      config
    );

    return (
      <ReactEcharts
        ref={echartsRef}
        echarts={echarts}
        option={option}
        style={style}
        onEvents={onEvents}
        opts={{ renderer }}
      />
    );
  }
);
