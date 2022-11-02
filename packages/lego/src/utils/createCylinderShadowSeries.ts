import { Theme } from '../theme';
import createLinearGradient from './createLinearGradient';

export default function createCylinderShadowSeries(
  theme: Theme,
  baseBarConfig: any,
  seriesData: BarSeriesData,
  max: number
) {
  const { name = '', data = [] } = seriesData || { name: '', data: [] };
  return [
    {
      name,
      type: 'pictorialBar',
      symbolSize: [20, 8],
      symbolOffset: [0, 4],
      z: 1,
      silent: true,
      color: theme.colors.assist700,
      data: data,
      animation: false,
      barGap: '-100%',
      barCateGoryGap: '-100%',
    },
    {
      name,
      type: 'bar',
      barWidth: 20,
      z: 2,
      data: data,
      animation: false,
      emphasis: {
        itemStyle: {
          shadowBlur: 20,
          shadowColor: 'rgba(255, 255, 255, 1)',
        },
      },
    },
    {
      name,
      type: 'pictorialBar',
      symbolSize: [20, 8],
      symbolOffset: [0, -4],
      symbolPosition: 'end',
      z: 3,
      silent: true,
      color: createLinearGradient(theme.colors.primary50, false),
      data: data,
      label: {
        show: true,
        position: 'top',
        ...baseBarConfig.label,
      },
    },
    {
      name,
      type: 'bar',
      barWidth: 20,
      barGap: '-100%',
      z: 2,
      silent: true,
      data: data.map(() => max),
      itemStyle: {
        color: createLinearGradient(theme.colors.primary50),
        opacity: 0.2,
      },
      animation: false,
      emphasis: {
        itemStyle: {
          shadowBlur: 20,
          shadowColor: 'rgba(255, 255, 255, 1)',
        },
      },
    },
    {
      name,
      type: 'pictorialBar',
      symbolSize: [20, 8],
      symbolOffset: [0, -4],
      symbolPosition: 'end',
      z: 3,
      silent: true,
      color: theme.colors.assist50,
      data: data.map(() => max),
    },
  ];
}
