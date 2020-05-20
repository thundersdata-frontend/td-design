/*
 * @文件描述:
 * @公司: thundersdata
 * @作者: 廖军
 * @Date: 2020-04-27 10:23:02
 * @LastEditors: 阮旭松
 * @LastEditTime: 2020-05-20 14:24:25
 */

import { TextStyle, DataItem, Legend } from '@antv/g2plot';
import { registerShape } from '@antv/g2';
import { ComboLegendConfig, ComboYAxisConfig } from '@antv/g2plot/lib/combo/util/interface';

export const { theme = 'dark' } = (global as unknown) as CustomWindow;

// TODO: 抽出主题配置方法
// 主题颜色配置
export const themeConfig = {
  // 暗黑主题
  dark: {
    legendColor: 'rgba(255, 255, 255, 0.6)',
    fontColor: 'rgba(255, 255, 255, 0.4)',
    // 环形图
    donutConfig: {
      stroke: '#122749',
    },
    // 注水图
    liquidConfig: {
      statistic: {
        fill: '#fff',
      },
    },
  },
  // 白色主题
  light: {
    legendColor: '#333',
    fontColor: '#333',
    // 环形图
    donutConfig: {
      stroke: '#fff',
    },
    // 注水图
    liquidConfig: {
      statistic: {
        fill: '#333',
      },
    },
  },
};

export interface PlotCreateProps<T> {
  dom: HTMLElement;
  data: DataItem[];
  config?: T;
}

export interface CustomWindow extends Window {
  theme: string;
}

// 字体配置
export const textStyle: TextStyle = {
  fontSize: 10,
  fill: themeConfig[theme].fontColor,
};

// 线配置
export const lineStyle = {
  visible: true,
  style: { lineWidth: 1, stroke: 'rgba(9, 75, 133, 1)' },
};

// 图例颜色配置
export const baseLegendColor = {
  style: {
    fill: themeConfig[theme].legendColor,
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

// 混合图图例配置
export const baseComboLegend: ComboLegendConfig = {
  text: baseLegendColor,
};

// 颜色配置
export const colors = [
  'rgba(0, 187, 255, 1)',
  'rgba(51, 85, 247, 1)',
  'rgba(56, 176, 59, 1)',
  'rgba(254, 176, 30, 1)',
];

// 通用图表颜色
export const chartColorArr = [
  '#02D1FF',
  '#FFBB04',
  '#F35C12',
  '#A72FEB',
  '#49D512',
  '#0054FF',
  '#009DFF',
];
export const baseXAxis = {
  line: lineStyle,
  tickLine: lineStyle,
  label: {
    style: textStyle,
  },
  title: {
    visible: false,
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
  title: {
    visible: false,
  },
};

// 混合图表Y轴配置
export const baseComboYAxis: ComboYAxisConfig = {
  ...baseYAxis,
  colorMapping: false,
  label: {
    style: {
      // 隐藏默认填充色
      fillOpacity: 0,
      stroke: '#666',
    },
  },
  line: {
    visible: true,
    style: {
      stroke: '#094B85',
      lineWidth: 1,
    },
  },
  tickLine: {
    visible: false,
  },
};

// 折线基础配置-混合图表
export const baseLineConfig = {
  lineSize: 2,
  point: {
    visible: true,
    size: 3,
    color: '#FEB01E',
    style: {
      stroke: '#FEB01E',
      shadowColor: '#FEB01E',
      shadowBlur: 10,
    },
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

// 混合图系列-基础配置
export const baseComboConfig = {
  padding: [20, 50, 70, 50],
  forceFit: true,
  xAxis: baseXAxis,
  lineConfig: baseLineConfig,
  yAxis: {
    leftConfig: baseComboYAxis,
    rightConfig: baseComboYAxis,
  },
  legend: baseComboLegend,
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
 * 批量全局注册 shape
 * 目前用于条形图
 * shapes:
 * border-radius:普通条形图边缘弧度
 * border-radius-reverse:分组条形图的左侧镜像边缘弧度
 * grouped-border-radius:分组条形图边缘边缘弧度
 */
const registerAllShape = () => {
  const shapeTypes = ['border-radius', 'border-radius-reverse', 'grouped-border-radius'];
  shapeTypes.forEach(name => {
    registerShape('interval', name, {
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
        const width =
          name !== 'border-radius-reverse' ? path[1][1] - path[0][1] : path[0][1] - path[1][1];
        let radius = height / 2;
        // 避免宽度过小出现锯齿
        if (height > width) {
          radius = height / 6;
        }
        group.addShape('rect', {
          attrs: {
            x: name !== 'border-radius-reverse' ? path[0][1] : path[1][1],
            y: name !== 'border-radius' ? path[0][2] - 10 : path[0][2],
            width,
            height,
            fill: cfg.color,
            radius,
          },
        });

        return group;
      },
    });
  });
};

// 批量全局注册 shape
registerAllShape();
