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
  TooltipComponent,
  TooltipComponentOption,
} from 'echarts/components';
import { CanvasRenderer, SVGRenderer } from 'echarts/renderers';
import { TooltipOption, YAXisOption } from 'echarts/types/dist/shared';
import { merge } from 'lodash-es';

import useBaseChartConfig from '../../hooks/useBaseChartConfig';
import useChartLoop from '../../hooks/useChartLoop';
import useTheme from '../../hooks/useTheme';
import createSliceSeries from '../../utils/createSliceSeries';

// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
type ECOption = echarts.ComposeOption<PictorialBarSeriesOption | TooltipComponentOption | GridComponentOption>;

// 注册必须的组件
echarts.use([TooltipComponent, GridComponent, SingleAxisComponent, PictorialBarChart, CanvasRenderer, SVGRenderer]);

export interface SliceBarProps {
  unit?: string;
  xAxisData: any[];
  name?: string;
  max: number;
  data: (number | string)[];
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
 * 片状体柱状图，对应figma柱状图3
 */
export default forwardRef<ReactEcharts, SliceBarProps>(
  (
    {
      unit,
      max,
      xAxisData,
      name,
      data,
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
    const baseChartConfig = useBaseChartConfig(inModal, unit);
    const echartsRef = useChartLoop(ref, xAxisData, autoLoop, duration);

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
        series: createSliceSeries(theme, { name: name ?? '', data }, max),
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
