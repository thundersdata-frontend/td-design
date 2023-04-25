import createLinearGradient from './createLinearGradient';

export default function createStackSeries(
  chartColor: any[],
  baseBarConfig: any,
  seriesData: { name: string; data: (number | string)[] }[],
  totalData: number[],
  unit?: string
) {
  return [
    // 底部垫片
    {
      z: 3,
      type: 'pictorialBar',
      symbolPosition: 'end',
      data: seriesData[0].data.map(() => 1),
      symbol: 'circle',
      symbolOffset: [0, '-50%'],
      symbolSize: [20, 10],
      symbolRotate: 0,
      itemStyle: {
        normal: {
          borderWidth: 0,
          color: chartColor[0][0],
        },
      },
      animation: false,
    },
    {
      name: seriesData[0].name,
      type: 'bar',
      stack: 'account',
      barWidth: 20,
      itemStyle: {
        color: createLinearGradient(chartColor[0]),
      },
      data: seriesData[0].data?.map(i => ({ value: i, unit })),
      emphasis: {
        itemStyle: {
          shadowBlur: 20,
          shadowColor: 'rgba(255, 255, 255, 1)',
        },
      },
      animation: false,
    },
    // 中间垫片
    {
      z: 3,
      type: 'pictorialBar',
      symbolPosition: 'end',
      data: seriesData[0].data?.map(i => ({ value: i, unit })),
      symbol: 'circle',
      symbolOffset: [0, '-50%'],
      symbolSize: [20, 10],
      symbolRotate: 0,
      itemStyle: {
        color: chartColor[1][0],
      },
      animation: false,
    },
    {
      name: seriesData[1].name,
      type: 'bar',
      stack: 'account',
      barWidth: 20,
      itemStyle: {
        color: createLinearGradient(chartColor[1]),
      },
      data: seriesData[1].data?.map(i => ({ value: i, unit })),
      emphasis: {
        itemStyle: {
          shadowBlur: 20,
          shadowColor: 'rgba(255, 255, 255, 1)',
        },
      },
      animation: false,
    },
    // 顶部垫片
    {
      z: 3,
      type: 'pictorialBar',
      symbolPosition: 'end',
      data: totalData,
      symbol: 'circle',
      symbolOffset: [0, '-50%'],
      symbolSize: [20, 10],
      itemStyle: {
        color: chartColor[1][1],
      },
      label: {
        show: true,
        position: 'top',
        ...baseBarConfig.label,
      },
      animation: false,
    },
  ];
}
