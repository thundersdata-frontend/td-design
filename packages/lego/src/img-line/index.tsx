import React, { CSSProperties, forwardRef, useMemo } from 'react';

import * as echarts from 'echarts/core';
import Color from 'color';
import ReactEcharts from 'echarts-for-react';
import { LineChart, LineSeriesOption } from 'echarts/charts';
import { GridComponent, GridComponentOption, TooltipComponent, TooltipComponentOption } from 'echarts/components';
import { CanvasRenderer, SVGRenderer } from 'echarts/renderers';
import { YAXisOption } from 'echarts/types/dist/shared';
import { merge } from 'lodash-es';

import useBaseChartConfig from '../hooks/useBaseChartConfig';
import useBaseLineConfig from '../hooks/useBaseLineConfig';
import useChartLoop from '../hooks/useChartLoop';
import useStyle from '../hooks/useStyle';
import useTheme from '../hooks/useTheme';
import createLinearGradient from '../utils/createLinearGradient';

type ECOption = echarts.ComposeOption<LineSeriesOption | TooltipComponentOption | GridComponentOption>;

echarts.use([TooltipComponent, GridComponent, LineChart, CanvasRenderer, SVGRenderer]);

export interface ImgLineProps {
  xAxisData: string[];
  yAxis: { name: string }[];
  seriesData: {
    name: string;
    data: (number | string | null)[];
    yAxisIndex: number;
  }[];
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
  /** 图表交互事件 */
  onEvents?: Record<string, (params?: any) => void>;
  /** 图表渲染器 */
  renderer?: 'canvas' | 'svg';
}

/** 带图片的折线图-对应Figma折线图2 */
export default forwardRef<ReactEcharts, ImgLineProps>(
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
      renderer = 'canvas',
    },
    ref
  ) => {
    const theme = useTheme();
    const baseChartConfig = useBaseChartConfig(inModal, unit);
    const baseLineConfig = useBaseLineConfig(inModal);

    const echartsRef = useChartLoop(ref, xAxisData, autoLoop, duration);
    const { style: modifiedStyle } = useStyle(style);

    const baseColors =
      lineColors?.length > 0 && lineColors?.length >= seriesData?.length
        ? lineColors
        : [
            theme.colors.primary200,
            theme.colors.primary50,
            theme.colors.primary100,
            theme.colors.primary300,
            theme.colors.primary400,
            theme.colors.primary500,
          ];

    const colors = baseColors.map(item => createLinearGradient(item));

    const getColorsByIndex = (index: number) => {
      return Color(baseColors[index][0]).alpha(0.85).string();
    };

    const getAreaColorsByIndex = (index: number) => {
      const _color = [Color(baseColors[index][1]).alpha(0).string(), Color(baseColors[index][0]).alpha(0.4).string()];
      return createLinearGradient(_color);
    };

    const option = merge(
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
            color: getAreaColorsByIndex(index),
            shadowColor: getColorsByIndex(index),
          },
        })),
      },
      config
    );

    return (
      <div style={modifiedStyle}>
        {img && (
          <img
            src={img}
            style={{
              position: 'absolute',
              bottom: 33,
              left: '3.6%',
              width: '94%',
              ...imgStyle,
            }}
          />
        )}
        <ReactEcharts
          ref={echartsRef}
          style={{ width: modifiedStyle.width, height: modifiedStyle.height }}
          echarts={echarts}
          option={option}
          onEvents={onEvents}
          opts={{ renderer }}
        />
      </div>
    );
  }
);
