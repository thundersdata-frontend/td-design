import {
  // 系列类型的定义后缀都为 SeriesOption
  PieSeriesOption,
} from 'echarts/charts';
import useTheme from './useTheme';

/**
 * 柱状图的基础配置，如坐标轴样式、文字样式、tooltip样式等
 */
export default function useBasePieConfig() {
  const theme = useTheme();

  return {
    type: 'pie',
    label: {
      ...theme.typography.p2,
      color: theme.colors.gray100,
    },
    labelLine: {
      lineStyle: {
        color: theme.colors.gray50,
        width: 1.35,
      },
    },
  } as PieSeriesOption;
}
