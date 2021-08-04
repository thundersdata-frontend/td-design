import React, { useMemo } from 'react';
import ReactEcharts from 'echarts-for-react';
import * as echarts from 'echarts/core';
import { LineChart, LineSeriesOption } from 'echarts/charts';
import { TooltipComponent, TooltipComponentOption, GridComponent, GridComponentOption } from 'echarts/components';

import baseChartConfig from '../../baseChartConfig';
import theme from '../../theme';
import baseLineConfig from '../../baseLineConfig';

type ECOption = echarts.ComposeOption<LineSeriesOption | TooltipComponentOption | GridComponentOption>;

echarts.use([TooltipComponent, GridComponent, LineChart]);

/** 折线图1 */
export default ({
  xAxisData,
  yAxis,
  seriesData,
}: {
  xAxisData: string[];
  yAxis: { name: string }[];
  seriesData: { name: string; data: number[]; yAxisIndex: number }[];
}) => {
  const option = useMemo(() => {
    return {
      color: [theme.colors.primary200, theme.colors.primary50],
      legend: {
        ...baseChartConfig.legend,
      },
      grid: {
        ...baseChartConfig.grid,
      },
      xAxis: {
        type: 'category',
        ...baseChartConfig.xAxis,
        data: xAxisData,
      },
      yAxis: yAxis.slice(0, 2).map((item, index) => ({
        ...baseChartConfig.yAxis,
        ...item,
        splitLine: {
          show: index === 0 ? true : false,
          lineStyle: {
            width: 1,
            color: theme.colors.gray200,
          },
        },
      })),
      series: seriesData.slice(0, 2).map((item, index) => ({
        ...item,
        ...baseLineConfig,
        smooth: true,
        lineStyle: {
          width: 3,
          shadowBlur: 11,
          shadowColor: index === 0 ? theme.colors.assist600 : theme.colors.assist500,
        },
        itemStyle: {
          borderColor: index === 0 ? theme.colors.primary200 : theme.colors.primary50,
          borderWidth: 2,
        },
        emphasis: {
          lineStyle: {
            shadowBlur: 11,
            shadowColor: index === 0 ? theme.colors.assist600 : theme.colors.assist500,
          },
        },
        areaStyle: {
          normal: {
            color: index === 0 ? theme.colors.assist300 : theme.colors.assist400,
            shadowColor: index === 0 ? theme.colors.assist600 : theme.colors.assist500,
          },
        },
      })),
    } as ECOption;
  }, [xAxisData, yAxis, seriesData]);

  return <ReactEcharts echarts={echarts} option={option} />;
};
