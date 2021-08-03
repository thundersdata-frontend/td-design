import React, { useMemo } from 'react';
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
import { LabelFormatterCallback, SingleAxisComponentOption } from 'echarts';
import { CallbackDataParams, YAXisOption } from 'echarts/types/dist/shared';

import baseChartConfig from '../../baseChartConfig';
import theme from '../../theme';
import baseLineConfig from '../../baseLineConfig';
import createCuboidSeries from '../../utils/createCuboidSeries';

// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
type ECOption = echarts.ComposeOption<
  LineSeriesOption | CustomSeriesOption | TooltipComponentOption | GridComponentOption
>;

// 注册必须的组件
echarts.use([TooltipComponent, GridComponent, LineChart, CustomChart, CanvasRenderer]);

const CubeLeft = echarts.graphic.extendShape({
  shape: {
    x: 0,
    y: 0,
  },
  buildPath: function (ctx, shape) {
    const xAxisPoint = shape.xAxisPoint;
    const c0 = [shape.x, shape.y];
    const c1 = [shape.x - 9, shape.y - 9];
    const c2 = [xAxisPoint[0] - 9, xAxisPoint[1] - 9];
    const c3 = [xAxisPoint[0], xAxisPoint[1]];
    ctx.moveTo(c0[0], c0[1])!.lineTo(c1[0], c1[1]).lineTo(c2[0], c2[1]).lineTo(c3[0], c3[1]).closePath();
  },
});
const CubeRight = echarts.graphic.extendShape({
  shape: {
    x: 0,
    y: 0,
  },
  buildPath: function (ctx, shape) {
    const xAxisPoint = shape.xAxisPoint;
    const c1 = [shape.x, shape.y];
    const c2 = [xAxisPoint[0], xAxisPoint[1]];
    const c3 = [xAxisPoint[0] + 18, xAxisPoint[1] - 9];
    const c4 = [shape.x + 18, shape.y - 9];
    ctx.moveTo(c1[0], c1[1])!.lineTo(c2[0], c2[1]).lineTo(c3[0], c3[1]).lineTo(c4[0], c4[1]).closePath();
  },
});
const CubeTop = echarts.graphic.extendShape({
  shape: {
    x: 0,
    y: 0,
  },
  buildPath: function (ctx, shape) {
    const c1 = [shape.x, shape.y];
    const c2 = [shape.x + 18, shape.y - 9];
    const c3 = [shape.x + 9, shape.y - 18];
    const c4 = [shape.x - 9, shape.y - 9];
    ctx.moveTo(c1[0], c1[1])!.lineTo(c2[0], c2[1]).lineTo(c3[0], c3[1]).lineTo(c4[0], c4[1]).closePath();
  },
});
echarts.graphic.registerShape('CubeLeft', CubeLeft);
echarts.graphic.registerShape('CubeRight', CubeRight);
echarts.graphic.registerShape('CubeTop', CubeTop);

/**
 * 长方体柱状图，对应figma柱状图4
 */
export default ({
  xAxisData,
  yAxis = [],
  barData,
  lineData,
  labelFormatter,
}: {
  xAxisData: Pick<SingleAxisComponentOption, 'data'>;
  yAxis: Pick<SingleAxisComponentOption, 'name' | 'type'>[];
  lineData: { name: string; data: number[] };
  barData: { name: string; data: number[] };
  labelFormatter?: string | LabelFormatterCallback<CallbackDataParams>;
}) => {
  const option = useMemo(() => {
    return {
      color: [theme.colors.primary200, theme.colors.primary300],
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

  return <ReactEcharts echarts={echarts} option={option} />;
};
