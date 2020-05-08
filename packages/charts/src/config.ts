/*
 * @文件描述:
 * @公司: thundersdata
 * @作者: 廖军
 * @Date: 2020-04-27 10:23:02
 * @LastEditors: 阮旭松
 * @LastEditTime: 2020-05-07 14:24:29
 */

import { TextStyle, DataItem, Legend } from '@antv/g2plot';
import { registerShape } from '@antv/g2';

export interface PlotCreateProps<T> {
  dom: HTMLElement;
  data: DataItem[];
  config?: T;
}

// 字体配置
export const textStyle: TextStyle = {
  fontSize: 10,
  fill: 'rgba(255, 255, 255, 0.4)',
};

// 线配置
export const lineStyle = {
  visible: true,
  style: { lineWidth: 1, stroke: 'rgba(9, 75, 133, 1)' },
};

// 图例颜色配置
export const baseLegendColor = {
  style: {
    fill: 'rgba(255, 255, 255, 0.6)',
  },
};

// 基础方形图例形状
export const baseMarker = {
  symbol: 'square',
  style: {
    r: 5,
  },
};

// 图例配置
export const baseLegend: Legend = {
  position: 'bottom-center',
  text: baseLegendColor,
};

// 颜色配置
export const colors = ['rgba(0, 187, 255, 1)', 'rgba(51, 85, 247, 1)', 'rgba(56, 176, 59, 1)', 'rgba(254, 176, 30, 1)'];

// 通用图表颜色
export const chartColorArr = ['#02D1FF', '#FFBB04', '#F35C12', '#A72FEB', '#49D512', '#0054FF', '#009DFF'];
export const baseXAxis = {
  line: lineStyle,
  tickLine: lineStyle,
  label: {
    style: textStyle,
  },
};

export const baseYAxis = {
  line: lineStyle,
  tickLine: lineStyle,
  grid: {
    visible: true,
    line: lineStyle,
  },
  label: {
    style: textStyle,
    // 数值格式化为千分位
    formatter: (v: string) => `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, s => `${s},`),
  },
};

export const basePoint = {
  visible: true,
  style: {
    lineWidth: 6,
    strokeOpacity: 0.15,
  },
};

// 基础配置
export const baseConfig = {
  padding: [20, 50, 70, 50],
  forceFit: true,
  xAxis: baseXAxis,
  yAxis: baseYAxis,
  legend: baseLegend,
  responsive: true,
};

// 饼图系列-基础配置
export const basePieConfig = {
  padding: 'auto',
  forceFit: true,
  legend: baseLegend,
  responsive: true,
};

// axis 隐藏默认
export const hideAxisConfig = {
  line: { visible: false, style: { lineWidth: 0 } },
  tickLine: { visible: false, style: { lineWidth: 0 } },
  label: {
    style: textStyle,
  },
  grid: {
    visible: false,
  },
};

/**
 * 全局注册 border-radius shape
 * 目前用于条形图
 */
registerShape('interval', 'border-radius', {
  draw(cfg, container) {
    const points = (cfg.points || []) as { x: number; y: number }[];
    let path = [];
    path.push(['M', points[0].x, points[0].y]);
    path.push(['L', points[1].x, points[1].y]);
    path.push(['L', points[2].x, points[2].y]);
    path.push(['L', points[3].x, points[3].y]);
    path.push('Z');
    path = this['parsePath'](path); // 将 0 - 1 转化为画布坐标

    const group = container.addGroup();
    const height = (path[1][2] - path[2][2]) * 0.7;
    group.addShape('rect', {
      attrs: {
        x: path[0][1],
        y: path[0][2],
        width: path[1][1] - path[0][1],
        height,
        fill: cfg.color,
        radius: height / 2,
      },
    });

    return group;
  },
});
