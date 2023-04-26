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
      symbolSize: ['100%', 10],
      symbolOffset: [0, '50%'],
      z: 1,
      silent: true,
      color: theme.colors.assist700,
      data: data,
      animation: false,
      barMaxWidth: 20,
      barGap: '-100%',
      barCateGoryGap: '-100%',
    },
    {
      name,
      type: 'bar',
      barMaxWidth: 20,
      z: 2,
      data: data,
      animation: false,
      emphasis: {
        itemStyle: {
          shadowBlur: 20,
          shadowColor: 'rgba(255, 255, 255, 1)',
        },
      },
      barGap: '-100%',
    },
    {
      name,
      type: 'pictorialBar',
      symbolSize: ['100%', 10],
      symbolOffset: [0, '-50%'],
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
      barMaxWidth: 20,
      barGap: '-100%',
    },
    {
      name,
      type: 'bar',
      barMaxWidth: 20,
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
      symbolSize: ['100%', 10],
      symbolOffset: [0, '-50%'],
      symbolPosition: 'end',
      z: 3,
      silent: true,
      color: theme.colors.assist50,
      data: data.map(() => max),
      barGap: '-100%',
      barMaxWidth: 20,
    },
  ];
}
