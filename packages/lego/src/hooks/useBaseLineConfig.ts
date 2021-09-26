import {
  // 系列类型的定义后缀都为 SeriesOption
  LineSeriesOption,
} from 'echarts/charts';
import { useMemo } from 'react';
import useTheme from './useTheme';

/**
 * 柱状图的基础配置，如坐标轴样式、文字样式、tooltip样式等
 */
export default function useBaseLineConfig(inModal = false) {
  const theme = useTheme();
  const option: LineSeriesOption = useMemo(
    () => ({
      type: 'line',
      symbol: 'circle',
      symbolSize: 8,
      connectNulls: true,
      label: {
        ...theme.typography[inModal ? 'p0' : 'p2'],
        color: theme.colors.gray100,
      },
      lineStyle: {
        width: 3,
      },
    }),
    [inModal, theme.colors.gray100, theme.typography]
  );

  return option;
}
