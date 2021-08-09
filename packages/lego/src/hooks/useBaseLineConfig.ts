import {
  // 系列类型的定义后缀都为 SeriesOption
  LineSeriesOption,
} from 'echarts/charts';
import { useMemo } from 'react';
import useTheme from './useTheme';

/**
 * 柱状图的基础配置，如坐标轴样式、文字样式、tooltip样式等
 */
export default function useBaseLineConfig() {
  const theme = useTheme();
  const option: LineSeriesOption = useMemo(
    () => ({
      type: 'line',
      symbol: 'circle',
      symbolSize: 8,
      connectNulls: true,
      label: {
        ...theme.typography.p2,
        color: theme.colors.gray100,
      },
      lineStyle: {
        width: 3,
      },
    }),
    [theme.colors.gray100, theme.typography.p2]
  );

  return option;
}
