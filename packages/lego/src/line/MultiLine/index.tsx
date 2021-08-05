import React, { CSSProperties, useMemo } from 'react';
import ReactEcharts from 'echarts-for-react';
import * as echarts from 'echarts/core';
import { LineChart, LineSeriesOption } from 'echarts/charts';
import { TooltipComponent, TooltipComponentOption, GridComponent, GridComponentOption } from 'echarts/components';

import baseChartConfig from '../../baseChartConfig';
import theme from '../../theme';
import baseLineConfig from '../../baseLineConfig';
import { YAXisOption } from 'echarts/types/dist/shared';
import createLinearGradient from '../../utils/createLinearGradient';

type ECOption = echarts.ComposeOption<LineSeriesOption | TooltipComponentOption | GridComponentOption>;

echarts.use([TooltipComponent, GridComponent, LineChart]);

/** 折线图1 */
export default ({
  xAxisData,
  yAxis,
  seriesData,
  style,
}: {
  xAxisData: string[];
  yAxis: { name: string }[];
  seriesData: { name: string; data: number[]; yAxisIndex: number }[];
  style?: CSSProperties;
}) => {
  const getColorsByIndex = (index: number) => {
    return index === 0 ? theme.colors.assist600 : theme.colors.assist500;
  };

  const option = useMemo(() => {
    return {
      color: [createLinearGradient(theme.colors.primary200), createLinearGradient(theme.colors.primary50)],
      legend: {
        ...baseChartConfig.legend,
      },
      grid: {
        ...baseChartConfig.grid,
        left: '3%',
        right: '3%',
      },
      xAxis: {
        type: 'category',
        ...baseChartConfig.xAxis,
        data: xAxisData,
      },
      yAxis: yAxis.slice(0, 2).map((item, index) => ({
        ...baseChartConfig.yAxis,
        ...item,
        nameTextStyle: {
          ...(baseChartConfig.yAxis as YAXisOption).nameTextStyle,
          padding: index === 0 ? [0, 40, 0, 0] : [0, 0, 0, 40],
        },
        splitLine: {
          ...(baseChartConfig.yAxis as YAXisOption).splitLine,
          show: index === 0 ? true : false,
        },
      })),
      series: seriesData.slice(0, 2).map((item, index) => ({
        ...item,
        ...baseLineConfig,
        smooth: true,
        lineStyle: {
          width: 3,
          shadowBlur: 11,
          shadowColor: getColorsByIndex(index),
        },
        itemStyle: {
          borderColor:
            index === 0 ? createLinearGradient(theme.colors.primary200) : createLinearGradient(theme.colors.primary50),
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
            color: index === 0 ? theme.colors.assist300 : theme.colors.assist400,
            shadowColor: getColorsByIndex(index),
          },
        },
      })),
    } as ECOption;
  }, [xAxisData, yAxis, seriesData]);

  return <ReactEcharts style={style} echarts={echarts} option={option} />;
};
