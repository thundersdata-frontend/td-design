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
import { LabelFormatterCallback, SingleAxisComponentOption } from 'echarts';
import { CallbackDataParams } from 'echarts/types/dist/shared';

import baseChartConfig from '../../baseChartConfig';
import theme from '../../theme';
import createLinearGradient from '../../utils/createLinearGradient';

// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
type ECOption = echarts.ComposeOption<CustomSeriesOption | TooltipComponentOption | GridComponentOption>;

// 注册必须的组件
echarts.use([TooltipComponent, GridComponent, CustomChart, CanvasRenderer]);

/**
 * 圆柱体柱状图，对应figma柱状图1
 */
export default ({
  xAxisData,
  unit,
  seriesData,
  labelFormatter,
  style,
}: {
  xAxisData: Pick<SingleAxisComponentOption, 'data'>;
  unit?: string;
  seriesData: { name: string; data: { name: string; value: number }[] }[];
  labelFormatter?: string | LabelFormatterCallback<CallbackDataParams>;
  style?: CSSProperties;
}) => {
  const option = useMemo(() => {
    return {
      color: [createLinearGradient(theme.colors.primary50), createLinearGradient(theme.colors.primary300)],
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
      yAxis: {
        name: unit,
        ...baseChartConfig.yAxis,
      },
      series: seriesData
        .slice(0, 2)
        .map((item, index) => [
          {
            type: 'pictorialBar',
            symbolSize: [20, 10],
            symbolOffset: index === 0 ? [-13, 5] : [13, 5],
            z: 1,
            color: index === 0 ? theme.colors.assist700 : theme.colors.assist800,
            data: item.data,
            animation: false,
            barGap: '-100%',
            barCateGoryGap: '-100%',
          },
          {
            name: item.name,
            type: 'bar',
            barWidth: 20,
            barGap: '30%',
            z: 2,
            data: item.data,
          },
          {
            type: 'pictorialBar',
            symbolSize: [20, 10],
            symbolOffset: index === 0 ? [-13, -5] : [13, -5],
            symbolPosition: 'end',
            z: 3,
            color: index === 0 ? createLinearGradient(theme.colors.primary50, false) : theme.colors.assist900,
            data: item.data,
            animation: false,
          },
        ])
        .flat(),
    } as ECOption;
  }, [seriesData, unit, xAxisData]);

  return <ReactEcharts echarts={echarts} option={option} style={style} />;
};
