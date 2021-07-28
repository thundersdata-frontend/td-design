import * as echarts from 'echarts';
import { DataSourceProps } from './index';

const pie_colors = [
  new echarts.graphic.LinearGradient(0, 0, 0, 1, [
    { offset: 0, color: '#00B8FF' },
    { offset: 1, color: '#188AF3' },
  ]),
  new echarts.graphic.LinearGradient(0, 0, 0, 1, [
    { offset: 0, color: '#FFD600' },
    { offset: 1, color: '#FF8400' },
  ]),
  new echarts.graphic.LinearGradient(0, 0, 0, 1, [
    { offset: 0, color: '#F154CB' },
    { offset: 1, color: '#A22ADE' },
  ]),
  new echarts.graphic.LinearGradient(0, 0, 0, 1, [
    { offset: 0, color: '#567FFB' },
    { offset: 1, color: '#2F54D8' },
  ]),
  new echarts.graphic.LinearGradient(0, 0, 0, 1, [
    { offset: 0, color: '#1CB7A4' },
    { offset: 1, color: '#9DE4DE' },
  ]),
  new echarts.graphic.LinearGradient(0, 0, 0, 1, [
    { offset: 0, color: '#00EE00' },
    { offset: 1, color: '#00AD14' },
  ]),
];

export default (
  {
    series = [
      {
        data: [],
      },
    ],
  }: DataSourceProps = {},
  inModal = false
) => {
  const { data } = series[0];
  return {
    tooltip: {
      show: false,
    },
    legend: {
      show: false,
    },
    series: [
      {
        type: 'pie',
        color: pie_colors,
        data,
        clockwise: false,
        startAngle: 45,
        radius: inModal ? 100 : 70,
        center: ['52%', inModal ? '45%' : '45%'],
        labelLine: {
          lineStyle: {
            color: '#4B94C5',
          },
        },
        itemStyle: {
          borderWidth: 1,
          borderColor: '#fff',
        },
        label: {
          color: '#fff',
          backgroundColor: 'rgba(38, 104, 217, 0.4)',
          borderWidth: 1,
          borderColor: 'rgba(114, 214, 251, 0.6)',
          padding: 6,
          borderRadius: 4,
          fontSize: inModal ? 16 : 12,
          formatter: '{b} {c}台\n{d}%',
        },
      },
    ],
  };
};
