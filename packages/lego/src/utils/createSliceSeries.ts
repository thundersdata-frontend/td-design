import createLinearGradient from './createLinearGradient';
import { Theme } from '../theme';

export default function createSliceSeries(theme: Theme, seriesData: BarSeriesData, max: number) {
  const { name = '', data = [] } = seriesData || { name: '', data: [] };

  return [
    {
      name,
      type: 'pictorialBar',
      silent: true,
      itemStyle: {
        color: createLinearGradient(theme.colors.primary50),
      },
      symbolRepeat: 'fixed',
      symbolMargin: 2,
      symbol: 'rect',
      symbolClip: true,
      symbolSize: [16, 2],
      symbolPosition: 'start',
      symbolBoundingData: max,
      data,
      z: 2,
      animationEasing: 'elasticOut',
    },
    {
      name,
      type: 'pictorialBar',
      itemStyle: {
        color: createLinearGradient(theme.colors.primary100),
        opacity: 0.2,
      },
      symbolRepeat: 'fixed',
      symbolMargin: 2,
      symbol: 'rect',
      symbolClip: true,
      symbolSize: [16, 2],
      symbolPosition: 'start',
      symbolBoundingData: max,
      data: data.map(() => max),
      z: 1,
      animationEasing: 'elasticOut',
    },
  ];
}
