import React, { CSSProperties, useMemo } from 'react';
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
import { SingleAxisComponentOption } from 'echarts';

import baseChartConfig from '../../baseChartConfig';
import theme from '../../theme';
import createCuboidSeries from '../../utils/createCuboidSeries';
import createLinearGradient from '../../utils/createLinearGradient';

// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
type ECOption = echarts.ComposeOption<CustomSeriesOption | TooltipComponentOption | GridComponentOption>;

// 注册必须的组件
echarts.use([TooltipComponent, GridComponent, CustomChart, CanvasRenderer]);

/**
 * 长方体柱状图，对应figma柱状图4
 */
export default ({
  xAxisData,
  unit,
  name,
  data,
  style,
}: {
  xAxisData: Pick<SingleAxisComponentOption, 'data'>;
  unit?: string;
  name?: string;
  data: number[];
  style?: CSSProperties;
}) => {
  const option = useMemo(() => {
    return {
      color: [createLinearGradient(theme.colors.primary300)],
      legend: {
        ...baseChartConfig.legend,
      },
      grid: {
        ...baseChartConfig.grid,
      },
      tooltip: { ...baseChartConfig.tooltip },
      xAxis: {
        type: 'category',
        data: xAxisData,
        ...baseChartConfig.xAxis,
      },
      yAxis: {
        name: unit,
        ...baseChartConfig.yAxis,
      },
      series: [createCuboidSeries({ name, data })],
    } as ECOption;
  }, [data, name, unit, xAxisData]);

  return <ReactEcharts echarts={echarts} option={option} style={style} />;
};
