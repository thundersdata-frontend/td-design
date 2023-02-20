import { useMemo } from 'react';

import { PieSeriesOption } from 'echarts/charts';

import useTheme from './useTheme';

/**
 * 柱状图的基础配置，如坐标轴样式、文字样式、tooltip样式等
 */
export default function useBasePieConfig(inModal = false) {
  const theme = useTheme();

  const option: PieSeriesOption = useMemo(
    () => ({
      type: 'pie',
      label: {
        ...theme.typography[inModal ? 'p0' : 'p2'],
        color: theme.colors.gray100,
      },
      labelLine: {
        lineStyle: {
          color: theme.colors.gray50,
          width: 1.35,
        },
      },
    }),
    [inModal, theme.colors.gray100, theme.colors.gray50, theme.typography]
  );

  return option;
}
