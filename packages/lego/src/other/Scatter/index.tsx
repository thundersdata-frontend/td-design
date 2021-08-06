import React, { CSSProperties, useMemo } from 'react';
import ReactEcharts from 'echarts-for-react';
import * as echarts from 'echarts/core';
import {
  ScatterChart,
  // 系列类型的定义后缀都为 SeriesOption
  ScatterSeriesOption,
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
import baseChartConfig from '../../baseChartConfig';
import createLinearGradient from '../../utils/createLinearGradient';
import theme from '../../theme';

// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
type ECOption = echarts.ComposeOption<
  ScatterSeriesOption | TooltipComponentOption | GridComponentOption | SingleAxisComponentOption
>;

// 注册必须的组件
echarts.use([TooltipComponent, GridComponent, SingleAxisComponent, ScatterChart, CanvasRenderer]);

/**
 * 直角坐标系散点图，对应Figma其他图7
 */
export default ({
  unit,
  xAxisData,
  seriesData,
  style,
}: {
  unit?: string;
  xAxisData: string[];
  seriesData: { name: string; data: (string | number)[][] }[];
  style?: CSSProperties;
}) => {
  const option = useMemo(() => {
    return {
      color: [
        createLinearGradient(theme.colors.primary50),
        createLinearGradient(theme.colors.primary100),
        createLinearGradient(theme.colors.primary200),
        createLinearGradient(theme.colors.primary300),
        createLinearGradient(theme.colors.primary400),
        createLinearGradient(theme.colors.primary500),
      ],
      legend: {
        ...baseChartConfig.legend,
      },
      grid: {
        ...baseChartConfig.grid,
      },
      xAxis: {
        ...baseChartConfig.xAxis,
        data: xAxisData,
      },
      yAxis: {
        ...baseChartConfig.yAxis,
        name: unit,
      },
      series: seriesData.map(item => ({
        name: item.name,
        data: item.data,
        type: 'scatter',
        itemStyle: {
          opacity: 0.8,
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowOffsetY: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
        },
      })),
    } as ECOption;
  }, [seriesData, unit, xAxisData]);

  return <ReactEcharts echarts={echarts} option={option} style={style} />;
};
