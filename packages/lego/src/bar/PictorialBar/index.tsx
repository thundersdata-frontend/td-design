import React, { CSSProperties, useMemo } from 'react';
import ReactEcharts from 'echarts-for-react';
import * as echarts from 'echarts/core';
import {
  PictorialBarChart,
  // 系列类型的定义后缀都为 SeriesOption
  PictorialBarSeriesOption,
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

// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
type ECOption = echarts.ComposeOption<PictorialBarSeriesOption | TooltipComponentOption | GridComponentOption>;

// 注册必须的组件
echarts.use([TooltipComponent, GridComponent, PictorialBarChart, CanvasRenderer]);

/**
 * 象形柱状图，对应figma柱状图7
 */
export default ({
  xAxisData,
  unit,
  data,
  labelFormatter,
  style,
}: {
  xAxisData: Pick<SingleAxisComponentOption, 'data'>;
  unit?: string;
  data: number[];
  labelFormatter?: string | LabelFormatterCallback<CallbackDataParams>;
  style?: CSSProperties;
}) => {
  const option = useMemo(() => {
    const colors = [
      theme.colors.primary50,
      theme.colors.primary100,
      theme.colors.primary200,
      theme.colors.primary300,
      theme.colors.primary400,
      theme.colors.primary500,
    ];
    return {
      color: [theme.colors.primary300],
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
      series: [
        {
          type: 'pictorialBar',
          barCategoryGap: '-100%',
          symbol: 'path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z',
          data: data.map((item, index) => ({
            value: item,
            itemStyle: {
              opacity: 0.5,
              color: colors[index],
            },
          })),
        },
      ],
    } as ECOption;
  }, [data, unit, xAxisData]);

  return <ReactEcharts echarts={echarts} option={option} style={style} />;
};
