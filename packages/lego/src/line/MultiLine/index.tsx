import * as echarts from 'echarts/core';
import Color from 'color';
import ReactEcharts from 'echarts-for-react';
import { LineChart, LineSeriesOption } from 'echarts/charts';
import { GridComponent, GridComponentOption, TooltipComponent, TooltipComponentOption } from 'echarts/components';
import { YAXisOption } from 'echarts/types/dist/shared';
import { merge } from 'lodash-es';
import React, { CSSProperties, forwardRef, useMemo } from 'react';

import useBaseChartConfig from '../../hooks/useBaseChartConfig';
import useBaseLineConfig from '../../hooks/useBaseLineConfig';
import useChartLoop from '../../hooks/useChartLoop';
import useTheme from '../../hooks/useTheme';
import createLinearGradient from '../../utils/createLinearGradient';

type ECOption = echarts.ComposeOption<LineSeriesOption | TooltipComponentOption | GridComponentOption>;

echarts.use([TooltipComponent, GridComponent, LineChart]);

export interface MultiLineProps {
  xAxisData: string[];
  yAxis: { name: string }[];
  seriesData: {
    name: string;
    data: { name: string; value: string | number | null }[];
    yAxisIndex: number;
  }[];
  style?: CSSProperties;
  /** 控制是否自动轮播 */
  autoLoop?: boolean;
  /** 自动轮播的时长，默认为2s */
  duration?: number;
  config?: ECOption;
  inModal?: boolean;
  onEvents?: Record<string, (params?: any) => void>;
  lineColors?: [string, string][];
  /** 控制是否显示y轴的线，默认显示 */
  showYAxisLine?: boolean;
}

/** 折线图1 */
export default forwardRef<ReactEcharts, MultiLineProps>(
  (
    {
      xAxisData,
      yAxis,
      seriesData,
      style,
      autoLoop,
      duration = 2000,
      config,
      inModal = false,
      onEvents,
      lineColors = [],
      showYAxisLine = true,
    },
    ref
  ) => {
    const theme = useTheme();
    const baseChartConfig = useBaseChartConfig(inModal);
    const baseLineConfig = useBaseLineConfig(inModal);
    const echartsRef = useChartLoop(ref, xAxisData, autoLoop, duration);

    const baseColors = useMemo(() => {
      if (lineColors?.length > 0 && seriesData?.length === lineColors?.length) {
        return lineColors;
      }
      return [
        theme.colors.primary200,
        theme.colors.primary50,
        theme.colors.primary100,
        theme.colors.primary300,
        theme.colors.primary400,
        theme.colors.primary500,
      ];
    }, [
      lineColors,
      seriesData?.length,
      theme.colors.primary200,
      theme.colors.primary50,
      theme.colors.primary100,
      theme.colors.primary300,
      theme.colors.primary400,
      theme.colors.primary500,
    ]);

    const colors = useMemo(() => baseColors.map(item => createLinearGradient(item)), [baseColors]);

    const option = useMemo(() => {
      const getColorsByIndex = (index: number) => {
        return Color(baseColors[index][0]).alpha(0.85).string();
      };

      const getAreaColorsByIndex = (index: number) => {
        const _color = [Color(baseColors[index][1]).alpha(0).string(), Color(baseColors[index][0]).alpha(0.4).string()];
        return createLinearGradient(_color);
      };
      return merge(
        {
          color: colors,
          legend: {
            ...baseChartConfig.legend,
          },
          grid: {
            ...baseChartConfig.grid,
            left: '3%',
            right: '3%',
          },
          tooltip: { ...baseChartConfig.tooltip },
          xAxis: {
            type: 'category',
            ...baseChartConfig.xAxis,
            data: xAxisData,
          },
          yAxis: yAxis.map((item, index) => ({
            ...baseChartConfig.yAxis,
            ...item,
            axisLine: {
              ...(baseChartConfig.yAxis as YAXisOption).axisLine,
              show: showYAxisLine,
            },
            nameTextStyle: {
              ...(baseChartConfig.yAxis as YAXisOption).nameTextStyle,
              padding: index === 0 ? [0, 40, 0, 0] : [0, 0, 0, 40],
            },
            splitLine: {
              ...(baseChartConfig.yAxis as YAXisOption).splitLine,
              show: index === 0 ? true : false,
            },
          })),
          series: seriesData.map((item, index) => {
            const data = item.data.map(ele => ({
              name: ele.name,
              value: ele.value ? +ele.value : 0,
              unit: yAxis[item.yAxisIndex]?.name,
            }));
            return {
              ...item,
              ...baseLineConfig,
              data,
              smooth: true,
              lineStyle: {
                width: 3,
                shadowBlur: 11,
                shadowColor: getColorsByIndex(index),
              },
              itemStyle: {
                borderColor: colors[index],
                borderWidth: 2,
              },
              emphasis: {
                lineStyle: {
                  shadowBlur: 11,
                  shadowColor: getColorsByIndex(index),
                },
              },
              areaStyle: {
                color: getAreaColorsByIndex(index),
                shadowColor: getColorsByIndex(index),
              },
            };
          }),
        },
        config
      ) as ECOption;
    }, [
      colors,
      baseChartConfig.legend,
      baseChartConfig.grid,
      baseChartConfig.tooltip,
      baseChartConfig.xAxis,
      baseChartConfig.yAxis,
      xAxisData,
      yAxis,
      seriesData,
      config,
      baseColors,
      baseLineConfig,
      showYAxisLine,
    ]);

    return (
      <ReactEcharts ref={echartsRef} style={style} echarts={echarts} notMerge option={option} onEvents={onEvents} />
    );
  }
);
