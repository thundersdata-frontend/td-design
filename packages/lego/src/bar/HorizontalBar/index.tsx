import React, { CSSProperties, forwardRef, useMemo } from 'react';
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
import useChartLoop from '../../hooks/useChartLoop';

// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
type ECOption = echarts.ComposeOption<
  PictorialBarSeriesOption | TooltipComponentOption | GridComponentOption | SingleAxisComponentOption
>;

// 注册必须的组件
echarts.use([TooltipComponent, GridComponent, SingleAxisComponent, PictorialBarChart, CanvasRenderer]);

/**
 * 水平条形图，对应figma柱状图5
 */
export default forwardRef<
  ReactEcharts,
  {
    unit?: string;
    max: number;
    seriesData: { name: string; data: { name: string; value: number }[] };
    style?: CSSProperties;
    /** 控制是否自动轮播 */
    autoLoop?: boolean;
    /** 自动轮播的时长，默认为2s */
    duration?: number;
    config?: ECOption;
    inModal?: boolean;
  }
>(({ unit, max, seriesData, style, autoLoop, duration = 2000, config, inModal = false }, ref) => {
  const theme = useTheme();
  const baseChartConfig = useBaseChartConfig(inModal);
  const echartsRef = useChartLoop(ref, seriesData.data, autoLoop, duration);

  const option = useMemo(() => {
    return merge(
      {
        legend: {
          ...baseChartConfig.legend,
        },
        grid: {
          ...baseChartConfig.grid,
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
                background: linear-gradient(180deg, ${params[0]?.color?.colorStops?.[0]?.color} 0%, ${
              params[0]?.color?.colorStops?.[1]?.color
            } 100%);
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
            show: true,
            textStyle: {
              ...theme.typography[inModal ? 'p0' : 'p2'],
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
                ...theme.typography[inModal ? 'p0' : 'p2'],
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
            name: seriesData.name,
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
    baseChartConfig.legend,
    baseChartConfig.grid,
    baseChartConfig.tooltip,
    baseChartConfig.xAxis,
    max,
    unit,
    theme.typography,
    theme.colors.gray100,
    inModal,
    seriesData.data,
    seriesData.name,
    config,
  ]);

  return <ReactEcharts ref={echartsRef} echarts={echarts} option={option} style={style} />;
});
