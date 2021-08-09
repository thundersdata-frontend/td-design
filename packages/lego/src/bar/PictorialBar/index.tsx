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
import { SingleAxisComponentOption } from 'echarts';

import createLinearGradient from '../../utils/createLinearGradient';
import useTheme from '../../hooks/useTheme';
import useBaseChartConfig from '../../hooks/useBaseChartConfig';

// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
type ECOption = echarts.ComposeOption<PictorialBarSeriesOption | TooltipComponentOption | GridComponentOption>;

// 注册必须的组件
echarts.use([TooltipComponent, GridComponent, PictorialBarChart, CanvasRenderer]);

/**
 * 象形柱状图，对应figma柱状图7
 */
export default ({
  seriesData,
  unit,
  xAxisData,
  style,
}: {
  xAxisData: Pick<SingleAxisComponentOption, 'data'>;
  unit?: string;
  seriesData: { name: string; data: { name: string; value: number; unit: string }[] };
  style?: CSSProperties;
}) => {
  const theme = useTheme();
  const baseChartConfig = useBaseChartConfig();
  const option = useMemo(() => {
    const colors = [
      createLinearGradient(theme.colors.primary50),
      createLinearGradient(theme.colors.primary100),
      createLinearGradient(theme.colors.primary200),
      createLinearGradient(theme.colors.primary300),
      createLinearGradient(theme.colors.primary400),
      createLinearGradient(theme.colors.primary500),
    ];
    return {
      color: [createLinearGradient(theme.colors.primary300)],
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
      series: [
        {
          name: seriesData.name,
          type: 'pictorialBar',
          barCategoryGap: '-100%',
          symbol: 'path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z',
          data: seriesData?.data.map((item, index) => ({
            ...item,
            itemStyle: {
              opacity: 0.5,
              color: colors[index],
            },
          })),
        },
      ],
    } as ECOption;
  }, [
    theme.colors.primary50,
    theme.colors.primary100,
    theme.colors.primary200,
    theme.colors.primary300,
    theme.colors.primary400,
    theme.colors.primary500,
    baseChartConfig.grid,
    baseChartConfig.tooltip,
    baseChartConfig.xAxis,
    baseChartConfig.yAxis,
    xAxisData,
    unit,
    seriesData.name,
    seriesData?.data,
  ]);

  return <ReactEcharts echarts={echarts} option={option} style={style} />;
};
