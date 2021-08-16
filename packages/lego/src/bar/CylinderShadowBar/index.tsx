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

import createLinearGradient from '../../utils/createLinearGradient';
import { TooltipOption } from 'echarts/types/dist/shared';
import useTheme from '../../hooks/useTheme';
import useBaseBarConfig from '../../hooks/useBaseBarConfig';
import useBaseChartConfig from '../../hooks/useBaseChartConfig';

// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
type ECOption = echarts.ComposeOption<CustomSeriesOption | TooltipComponentOption | GridComponentOption>;

// 注册必须的组件
echarts.use([TooltipComponent, GridComponent, CustomChart, CanvasRenderer]);

/**
 * 带阴影柱状堆叠图，对应figma柱状图2
 */
export default ({
  xAxisData,
  unit,
  name,
  data,
  max,
  style,
  img,
  imgStyle,
}: {
  xAxisData: SingleAxisComponentOption['data'];
  unit?: string;
  name?: string;
  max: number;
  data: (number | { name: string; value: number })[];
  style?: CSSProperties;
  img?: string;
  imgStyle?: CSSProperties;
}) => {
  const theme = useTheme();
  const baseBarConfig = useBaseBarConfig();
  const baseChartConfig = useBaseChartConfig();
  const option = useMemo(() => {
    return {
      color: [createLinearGradient(theme.colors.primary50)],
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
          type: 'pictorialBar',
          symbolSize: [20, 8],
          symbolOffset: [0, 4],
          z: 1,
          silent: true,
          color: theme.colors.assist700,
          data: data,
          animation: false,
          barGap: '-100%',
          barCateGoryGap: '-100%',
        },
        {
          name,
          type: 'bar',
          barWidth: 20,
          z: 2,
          data: data,
        },
        {
          type: 'pictorialBar',
          symbolSize: [20, 8],
          symbolOffset: [0, -4],
          symbolPosition: 'end',
          z: 3,
          silent: true,
          color: createLinearGradient(theme.colors.primary50, false),
          data: data,
          label: {
            show: true,
            position: 'top',
            ...baseBarConfig.label,
          },
        },
        {
          type: 'bar',
          barWidth: 20,
          barGap: '-100%',
          z: 2,
          silent: true,
          data: data.map(() => max),
          itemStyle: {
            color: createLinearGradient(theme.colors.primary50),
            opacity: 0.2,
          },
        },
        {
          type: 'pictorialBar',
          symbolSize: [20, 8],
          symbolOffset: [0, -4],
          symbolPosition: 'end',
          z: 3,
          silent: true,
          color: theme.colors.assist50,
          data: data.map(() => max),
        },
      ],
    } as ECOption;
  }, [
    baseBarConfig.label,
    baseChartConfig.grid,
    baseChartConfig.legend,
    baseChartConfig.tooltip,
    baseChartConfig.xAxis,
    baseChartConfig.yAxis,
    data,
    max,
    name,
    theme.colors.assist50,
    theme.colors.assist700,
    theme.colors.primary50,
    unit,
    xAxisData,
  ]);

  return (
    <div style={{ position: 'relative' }}>
      {img && <img src={img} style={{ position: 'absolute', bottom: '13%', left: '3.4%', ...imgStyle }} />}
      <ReactEcharts echarts={echarts} option={option} style={style} />;
    </div>
  );
};