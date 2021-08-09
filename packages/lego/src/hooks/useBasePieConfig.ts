import {
  // 系列类型的定义后缀都为 SeriesOption
  PieSeriesOption,
} from 'echarts/charts';
import { useMemo } from 'react';
import useTheme from './useTheme';

/**
 * 柱状图的基础配置，如坐标轴样式、文字样式、tooltip样式等
 */
export default function useBasePieConfig() {
  const theme = useTheme();

  const option: PieSeriesOption = useMemo(
    () => ({
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
    }),
    [theme.colors.gray100, theme.colors.gray50, theme.typography.p2]
  );

  return option;
}
