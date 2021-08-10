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
  SingleAxisComponent,
  SingleAxisComponentOption,
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

import createLinearGradient from '../../utils/createLinearGradient';
import { TooltipOption } from 'echarts/types/dist/shared';
import useTheme from '../../hooks/useTheme';
import useBaseChartConfig from '../../hooks/useBaseChartConfig';

// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
type ECOption = echarts.ComposeOption<
  PictorialBarSeriesOption | TooltipComponentOption | GridComponentOption | SingleAxisComponentOption
>;

// 注册必须的组件
echarts.use([TooltipComponent, GridComponent, SingleAxisComponent, PictorialBarChart, CanvasRenderer]);

/**
 * 片状体柱状图，对应figma柱状图3
 */
export default ({
  unit,
  max,
  xAxisData,
  seriesData,
  style,
}: {
  unit?: string;
  max: number;
  xAxisData: Pick<SingleAxisComponentOption, 'data'>;
  seriesData: { name: string; data: { name: string; value: number }[] };
  style?: CSSProperties;
}) => {
  const theme = useTheme();
  const baseChartConfig = useBaseChartConfig();
  const option = useMemo(() => {
    return {
      legend: {
        ...baseChartConfig.legend,
      },
      grid: {
        ...baseChartConfig.grid,
      },
      tooltip: {
        ...baseChartConfig.tooltip,
        axisPointer: {
          ...(baseChartConfig.tooltip as TooltipOption).axisPointer,
          type: 'shadow',
        },
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
          name: seriesData.name,
          type: 'pictorialBar',
          silent: true,
          itemStyle: {
            color: createLinearGradient(theme.colors.primary50),
          },
          symbolRepeat: 'fixed',
          symbolMargin: 2,
          symbol: 'rect',
          symbolClip: true,
          symbolSize: [16, 2],
          symbolPosition: 'start',
          symbolBoundingData: max,
          data: seriesData.data,
          z: 2,
          animationEasing: 'elasticOut',
        },
        {
          type: 'pictorialBar',
          itemStyle: {
            color: createLinearGradient(theme.colors.primary100),
            opacity: 0.2,
          },
          symbolRepeat: 'fixed',
          symbolMargin: 2,
          symbol: 'rect',
          symbolClip: true,
          symbolSize: [16, 2],
          symbolPosition: 'start',
          symbolBoundingData: max,
          data: seriesData.data.map(() => max),
          z: 1,
          animationEasing: 'elasticOut',
        },
      ],
    } as ECOption;
  }, [
    baseChartConfig.grid,
    baseChartConfig.legend,
    baseChartConfig.tooltip,
    baseChartConfig.xAxis,
    baseChartConfig.yAxis,
    max,
    seriesData.data,
    seriesData.name,
    theme.colors.primary100,
    theme.colors.primary50,
    unit,
    xAxisData,
  ]);

  return <ReactEcharts echarts={echarts} option={option} style={style} />;
};
