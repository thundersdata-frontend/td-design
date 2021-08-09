import React, { CSSProperties, useMemo } from 'react';
import ReactEcharts from 'echarts-for-react';
import * as echarts from 'echarts/core';
import {
  LineChart,
  LineSeriesOption,
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
import { SingleAxisComponentOption } from 'echarts';
import { YAXisOption } from 'echarts/types/dist/shared';

import baseChartConfig from '../../baseChartConfig';
import theme from '../../theme';
import baseLineConfig from '../../baseLineConfig';
import createCuboidSeries from '../../utils/createCuboidSeries';
import createLinearGradient from '../../utils/createLinearGradient';

// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
type ECOption = echarts.ComposeOption<
  LineSeriesOption | CustomSeriesOption | TooltipComponentOption | GridComponentOption
>;

// 注册必须的组件
echarts.use([TooltipComponent, GridComponent, LineChart, CustomChart, CanvasRenderer]);

/**
 * 长方体柱状图，对应figma柱状图4
 */
export default ({
  xAxisData,
  yAxis = [],
  barData,
  lineData,
  style,
}: {
  xAxisData: Pick<SingleAxisComponentOption, 'data'>;
  yAxis: Pick<SingleAxisComponentOption, 'name' | 'type'>[];
  lineData: { name: string; data: number[] };
  barData: { name: string; data: number[] };
  style?: CSSProperties;
}) => {
  const option = useMemo(() => {
    return {
      color: [createLinearGradient(theme.colors.primary200), createLinearGradient(theme.colors.primary300)],
      legend: {
        ...baseChartConfig.legend,
      },
      grid: {
        ...baseChartConfig.grid,
      },
      xAxis: {
        type: 'category',
        data: xAxisData,
        ...baseChartConfig.xAxis,
      },
      yAxis: [
        // 第一个是柱图
        {
          ...yAxis[0],
          ...baseChartConfig.yAxis,
          nameTextStyle: {
            ...(baseChartConfig.yAxis as YAXisOption).nameTextStyle,
            padding: [0, 40, 0, 0],
          },
        },
        // 第二个是线图
        {
          ...yAxis[1],
          ...baseChartConfig.yAxis,
          nameTextStyle: {
            ...(baseChartConfig.yAxis as YAXisOption).nameTextStyle,
            padding: [0, 0, 0, 30],
          },
          splitLine: {
            show: false,
          },
        },
      ],
      series: [
        {
          name: lineData.name,
          data: lineData.data,
          ...baseLineConfig,
          yAxisIndex: 1,
        },
        createCuboidSeries(barData),
      ],
    } as ECOption;
  }, [barData, lineData, xAxisData, yAxis]);

  return <ReactEcharts echarts={echarts} option={option} style={style} />;
};
