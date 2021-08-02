import theme from './theme';
import {
  // 系列类型的定义后缀都为 SeriesOption
  BarSeriesOption,
} from 'echarts/charts';

/**
 * 柱状图的基础配置，如坐标轴样式、文字样式、tooltip样式等
 */
export default {
  series: {
    type: 'bar',
    label: {
      ...theme.typography.p2,
      color: theme.colors.gray100,
    },
  },
} as BarSeriesOption;
