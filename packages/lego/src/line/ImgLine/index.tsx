import React, { CSSProperties, useMemo, forwardRef } from 'react';
import ReactEcharts from 'echarts-for-react';
import * as echarts from 'echarts/core';
import { LineChart, LineSeriesOption } from 'echarts/charts';
import { TooltipComponent, TooltipComponentOption, GridComponent, GridComponentOption } from 'echarts/components';
import { merge } from 'lodash-es';
import Color from 'color';

import { YAXisOption } from 'echarts/types/dist/shared';
import createLinearGradient from '../../utils/createLinearGradient';
import useTheme from '../../hooks/useTheme';
import useBaseChartConfig from '../../hooks/useBaseChartConfig';
import useBaseLineConfig from '../../hooks/useBaseLineConfig';
import useChartLoop from '../../hooks/useChartLoop';
import useStyle from '../../hooks/useStyle';

type ECOption = echarts.ComposeOption<LineSeriesOption | TooltipComponentOption | GridComponentOption>;

echarts.use([TooltipComponent, GridComponent, LineChart]);

/** 带图片的折线图-对应Figma折线图2 */
export default forwardRef<
  ReactEcharts,
  {
    xAxisData: string[];
    yAxis: { name: string }[];
    seriesData: { name: string; data: number[]; yAxisIndex: number }[];
    unit?: string;
    img?: string;
    imgStyle?: CSSProperties;
    style?: CSSProperties;
    /** 控制是否自动轮播 */
    autoLoop?: boolean;
    /** 自动轮播的时长，默认为2s */
    duration?: number;
    config?: ECOption;
    inModal?: boolean;
    /** 控制是否显示y轴的线，默认显示 */
    showYAxisLine?: boolean;
    lineColors?: [string, string][];
    onEvents?: Record<string, (params?: any) => void>;
  }
>(
  (
    {
      xAxisData,
      yAxis,
      seriesData,
      unit = yAxis[0]?.name,
      img,
      imgStyle,
      style,
      autoLoop,
      duration = 2000,
      config,
      inModal = false,
      showYAxisLine = true,
      lineColors = [],
      onEvents,
    },
    ref
  ) => {
    const theme = useTheme();
    const baseChartConfig = useBaseChartConfig(inModal, unit);
    const baseLineConfig = useBaseLineConfig(inModal);

    const echartsRef = useChartLoop(ref, xAxisData, autoLoop, duration);
    const { style: modifiedStyle } = useStyle(style);

    const baseColors = useMemo(() => {
      if (lineColors?.length > 0 && lineColors?.length >= seriesData?.length) {
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
          tooltip: {
            ...baseChartConfig.tooltip,
          },
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
          series: seriesData.map((item, index) => ({
            ...item,
            ...baseLineConfig,
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
              normal: {
                color: getAreaColorsByIndex(index),
                shadowColor: getColorsByIndex(index),
              },
            },
          })),
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
      showYAxisLine,
      baseLineConfig,
    ]);

    return (
      <div style={modifiedStyle}>
        {img && <img src={img} style={{ position: 'absolute', bottom: '15%', left: '3.6%', ...imgStyle }} />}
        <ReactEcharts
          ref={echartsRef}
          style={{ width: modifiedStyle.width, height: modifiedStyle.height }}
          echarts={echarts}
          option={option}
          onEvents={onEvents}
        />
      </div>
    );
  }
);
