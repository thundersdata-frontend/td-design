import * as echarts from 'echarts/core';

/**
 * 根据颜色和渐变方向生成渐变色
 * @param color : 渐变颜色，是一个长度为2的数组
 * @param horizontal 水平渐变；默认为true
 */
export default function createLinearGradient(color: string[], vertical = true) {
  if (!color || color.length !== 2) return color;
  if (!vertical) {
    return new echarts.graphic.LinearGradient(0, 0, 1, 0, [
      { offset: 0, color: color[0] },
      { offset: 1, color: color[1] },
    ]);
  }

  return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
    { offset: 0, color: color[0] },
    { offset: 1, color: color[1] },
  ]);
}
