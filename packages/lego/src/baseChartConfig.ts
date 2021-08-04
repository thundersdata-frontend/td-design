import theme from './theme';
import * as echarts from 'echarts/core';
import {
  TooltipComponentOption,
  // 组件类型的定义后缀都为 ComponentOption
  GridComponentOption,
  LegendComponentOption,
  SingleAxisComponentOption,
} from 'echarts/components';

// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
type ECOption = echarts.ComposeOption<
  TooltipComponentOption | GridComponentOption | LegendComponentOption | SingleAxisComponentOption
>;

/**
 * 柱状图的基础配置，如坐标轴样式、文字样式、tooltip样式等
 */
export default {
  legend: {
    top: 0,
    right: 0,
    itemWidth: 12,
    itemHeight: 12,
    textStyle: {
      color: theme.colors.gray100,
      ...theme.typography.p2,
    },
  },
  grid: {
    left: '1%',
    right: '1%',
    top: 60,
    bottom: 10,
    containLabel: true,
  },
  xAxis: {
    type: 'category',
    axisLine: {
      show: false,
      lineStyle: {
        width: 1,
        color: theme.colors.gray200,
      },
    },
    axisTick: {
      show: false,
    },
    axisLabel: {
      ...theme.typography.p2,
      color: theme.colors.gray100,
      interval: 0,
    },
    axisPointer: {
      show: false,
    },
  },
  yAxis: {
    type: 'value',
    nameLocation: 'end',
    nameTextStyle: {
      ...theme.typography.p2,
      color: theme.colors.gray100,
    },
    axisLine: {
      show: false,
    },
    axisTick: {
      show: false,
    },
    axisLabel: {
      ...theme.typography.p2,
      color: theme.colors.gray100,
    },
    splitLine: {
      lineStyle: {
        width: 1,
        color: theme.colors.gray200,
      },
    },
  },
} as ECOption;
