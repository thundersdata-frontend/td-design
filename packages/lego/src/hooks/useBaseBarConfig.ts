import {
  // 系列类型的定义后缀都为 SeriesOption
  BarSeriesOption,
} from 'echarts/charts';
import { useMemo } from 'react';
import useTheme from './useTheme';

/**
 * 柱状图的基础配置，如坐标轴样式、文字样式、tooltip样式等
 */
export default function useBaseBarConfig() {
  const theme = useTheme();
  const option: BarSeriesOption = useMemo(
    () => ({
      type: 'bar',
      label: {
        show: true,
        ...theme.typography.p2,
        color: theme.colors.gray100,
      },
    }),
    [theme.colors.gray100, theme.typography.p2]
  );

  return option;
}
