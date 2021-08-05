import * as echarts from 'echarts';

export function generateLinear(color: string[]) {
  return new echarts.graphic.LinearGradient(
    0,
    0,
    0,
    1,
    [
      {
        offset: 0,
        color: color[0],
      },
      {
        offset: 1,
        color: color[1],
      },
    ],
    false
  );
}
