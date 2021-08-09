import React, { CSSProperties, useMemo } from 'react';
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
import { LabelFormatterCallback } from 'echarts';
import { CallbackDataParams, YAXisOption } from 'echarts/types/dist/shared';

import { imgLeftData, imgRightData } from './img';
import baseChartConfig from '../../baseChartConfig';
import theme from '../../theme';

// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
type ECOption = echarts.ComposeOption<
  PictorialBarSeriesOption | TooltipComponentOption | GridComponentOption | SingleAxisComponentOption
>;

// 注册必须的组件
echarts.use([TooltipComponent, GridComponent, SingleAxisComponent, PictorialBarChart, CanvasRenderer]);

/**
 * 双列水平条形图，对应figma柱状图6
 */
export default ({
  unit = '',
  max,
  labelFormatter,
  leftData,
  rightData,
  style,
}: {
  unit?: string | [string, string];
  max: number | [number, number];
  leftData: { name: string; data: { name: string; value: number }[] };
  rightData: { name: string; data: { name: string; value: number }[] };
  labelFormatter?: string | LabelFormatterCallback<CallbackDataParams>;
  style?: CSSProperties;
}) => {
  const leftUnit = typeof unit === 'string' ? unit : unit[0];
  const rightUnit = typeof unit === 'string' ? unit : unit[1];
  const leftMax = typeof max === 'number' ? max : max[0];
  const rightMax = typeof max === 'number' ? max : max[1];

  const option = useMemo(() => {
    return {
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
      tooltip: { ...baseChartConfig.tooltip },
      xAxis: [
        {
          type: 'value',
          inverse: true,
          name: leftUnit,
          nameGap: 5,
          nameLocation: 'end',
          nameTextStyle: {
            ...theme.typography.p2,
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
            ...theme.typography.p2,
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
            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
              { offset: 0, color: '#FEB01E' },
              { offset: 1, color: '#F2F756' },
            ]),
          },
          symbolRepeat: 'fixed',
          symbolMargin: 2,
          symbol: 'rect',
          symbolClip: true,
          symbolSize: [3, 8],
          symbolOffset: [-18, 0],
          symbolPosition: 'start',
          symbolBoundingData: leftMax * 0.85,
          data: leftData.data,
          z: 3,
          animationEasing: 'elasticOut',
        },
        {
          type: 'pictorialBar',
          xAxisIndex: 0,
          yAxisIndex: 0,
          gridIndex: 0,
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
          symbolSize: [3, 8],
          symbolOffset: [-18, 0],
          symbolPosition: 'start',
          symbolBoundingData: leftMax * 0.85,
          data: leftData.data.map(() => leftMax),
          z: 2,
          animationEasing: 'elasticOut',
        },
        {
          type: 'pictorialBar',
          xAxisIndex: 0,
          yAxisIndex: 0,
          gridIndex: 0,
          symbol: 'image://' + imgLeftData,
          symbolOffset: [0, 0],
          symbolSize: ['100%', 24],
          symbolClip: true,
          symbolBoundingData: leftMax,
          data: leftData.data.map(() => leftMax),
          z: 1,
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
            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
              { offset: 0, color: '#3FA4FF' },
              { offset: 1, color: '#60F5FF' },
            ]),
          },
          symbolRepeat: 'fixed',
          symbolMargin: 2,
          symbol: 'rect',
          symbolClip: true,
          symbolSize: [3, 8],
          symbolOffset: [18, 0],
          symbolPosition: 'start',
          symbolBoundingData: rightMax * 0.85,
          data: rightData.data,
          z: 3,
          animationEasing: 'elasticOut',
        },
        {
          type: 'pictorialBar',
          xAxisIndex: 2,
          yAxisIndex: 2,
          gridIndex: 2,
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
          symbolBoundingData: rightMax * 0.85,
          data: rightData.data.map(() => rightMax),
          z: 2,
          animationEasing: 'elasticOut',
        },
        {
          type: 'pictorialBar',
          xAxisIndex: 2,
          yAxisIndex: 2,
          gridIndex: 2,
          symbol: 'image://' + imgRightData,
          symbolOffset: [0, 0],
          symbolSize: ['100%', 24],
          symbolClip: true,
          symbolBoundingData: rightMax,
          data: rightData.data.map(() => rightMax),
          z: 1,
        },
      ],
    } as ECOption;
  }, [leftData.data, leftData.name, leftMax, leftUnit, rightData.data, rightData.name, rightMax, rightUnit]);

  return <ReactEcharts echarts={echarts} option={option} style={style} />;
};

function getArrByKey(list: { name: string; value: number }[], key: string) {
  return list.map(item => item[key]);
}
