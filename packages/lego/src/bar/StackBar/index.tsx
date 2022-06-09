import React, { CSSProperties, forwardRef, useMemo } from 'react';
import ReactEcharts from 'echarts-for-react';
import * as echarts from 'echarts/core';
import {
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
import { merge } from 'lodash-es';

import createLinearGradient from '../../utils/createLinearGradient';
import { TooltipOption, YAXisOption } from 'echarts/types/dist/shared';
import useTheme from '../../hooks/useTheme';
import useBaseBarConfig from '../../hooks/useBaseBarConfig';
import useBaseChartConfig from '../../hooks/useBaseChartConfig';
import useChartLoop from '../../hooks/useChartLoop';
import useStyle from '../../hooks/useStyle';

// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
type ECOption = echarts.ComposeOption<CustomSeriesOption | TooltipComponentOption | GridComponentOption>;

// 注册必须的组件
echarts.use([TooltipComponent, GridComponent, CustomChart, CanvasRenderer]);

export interface StackBarProps {
  xAxisData: string[];
  unit?: string;
  seriesData: { name: string; data: number[] }[];
  seriesColor?: [[string, string], [string, string]];
  style?: CSSProperties;
  /** 控制是否自动轮播 */
  autoLoop?: boolean;
  /** 自动轮播的时长，默认为2s */
  duration?: number;
  img?: string;
  imgStyle?: CSSProperties;
  config?: ECOption;
  inModal?: boolean;
  /** 控制是否显示y轴的线，默认显示 */
  showYAxisLine?: boolean;
  onEvents?: Record<string, (params?: any) => void>;
}

/**
 * 带阴影柱状堆叠图，对应figma柱状图2
 */
export default forwardRef<ReactEcharts, StackBarProps>(
  (
    {
      xAxisData,
      seriesData,
      seriesColor,
      unit,
      style,
      autoLoop,
      duration = 2000,
      img,
      imgStyle,
      config,
      inModal = false,
      showYAxisLine = true,
      onEvents,
    },
    ref
  ) => {
    const theme = useTheme();
    const baseBarConfig = useBaseBarConfig(inModal);
    const baseChartConfig = useBaseChartConfig(inModal, unit);
    const echartsRef = useChartLoop(ref, xAxisData, autoLoop, duration);
    const { style: modifiedStyle } = useStyle(style);

    const chartColor = useMemo(
      () => seriesColor || [theme.colors.primary50, theme.colors.primary300],
      [seriesColor, theme.colors.primary300, theme.colors.primary50]
    );
    const totalData = useMemo(() => {
      const totalData: number[] = [];
      for (let i = 0; i < xAxisData.length; i++) {
        const element = seriesData[0].data[i] + seriesData[1].data[i];
        totalData.push(element);
      }
      return totalData;
    }, [seriesData, xAxisData.length]);

    const option = useMemo(() => {
      return merge(
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
              let str = '';

              params
                .filter((item: any) => item.seriesType === 'bar')
                .forEach((item: any) => {
                  const { seriesName, value, color } = item;
                  const color1 = color.colorStops[0].color;
                  const color2 = color.colorStops[1].color;
                  str += `
                    <div style="display: flex; align-items: center;">
                      <div style="
                        width: 7px;
                        height: 7px;
                        background: linear-gradient(180deg, ${color1} 0%, ${color2} 100%);
                        margin-right: 4px;
                        border-radius: 7px;
                      "></div>
                      ${seriesName}： ${value}
                    </div>
                  `;
                });

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
          series: [
            // 底部垫片
            {
              z: 3,
              type: 'pictorialBar',
              symbolPosition: 'end',
              data: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
              symbol: 'circle',
              symbolOffset: [0, '-50%'],
              symbolSize: [26, 10],
              symbolRotate: 0,
              itemStyle: {
                normal: {
                  borderWidth: 0,
                  color: chartColor[0][0],
                },
              },
            },
            {
              name: seriesData[0].name,
              type: 'bar',
              stack: 'account',
              barWidth: 26,
              itemStyle: {
                color: createLinearGradient(chartColor[0]),
              },
              data: seriesData[0].data,
            },
            // 中间垫片
            {
              z: 3,
              type: 'pictorialBar',
              symbolPosition: 'end',
              data: seriesData[0].data,
              symbol: 'circle',
              symbolOffset: [0, '-50%'],
              symbolSize: [26, 10],
              symbolRotate: 0,
              itemStyle: {
                normal: {
                  borderWidth: 0,
                  color: chartColor[1][0],
                },
              },
            },
            {
              name: seriesData[1].name,
              type: 'bar',
              stack: 'account',
              barWidth: 26,
              itemStyle: {
                color: createLinearGradient(chartColor[1]),
              },
              data: seriesData[1].data,
            },
            // 顶部垫片
            {
              z: 3,
              type: 'pictorialBar',
              symbolPosition: 'end',
              data: totalData,
              symbol: 'circle',
              symbolOffset: [0, '-50%'],
              symbolSize: [26, 10],
              itemStyle: {
                normal: {
                  borderWidth: 0,
                  color: chartColor[1][1],
                },
              },
              label: {
                show: true,
                position: 'top',
                ...baseBarConfig.label,
              },
            },
          ],
        },
        config
      ) as ECOption;
    }, [
      baseBarConfig.label,
      baseChartConfig.grid,
      baseChartConfig.legend,
      baseChartConfig.tooltip,
      baseChartConfig.xAxis,
      baseChartConfig.yAxis,
      chartColor,
      config,
      inModal,
      seriesData,
      showYAxisLine,
      totalData,
      unit,
      xAxisData,
    ]);

    return (
      <div style={modifiedStyle}>
        {img && <img src={img} style={{ position: 'absolute', bottom: '13%', left: '3.4%', ...imgStyle }} />}
        <ReactEcharts
          ref={echartsRef}
          echarts={echarts}
          option={option}
          style={{ width: modifiedStyle.width, height: modifiedStyle.height }}
          onEvents={onEvents}
        />
      </div>
    );
  }
);
