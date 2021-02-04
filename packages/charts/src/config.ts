/*
 * @文件描述:
 * @公司: thundersdata
 * @作者: 廖军
 * @Date: 2020-04-27 10:23:02
 * @LastEditors: 阮旭松
 * @LastEditTime: 2021-02-03 15:26:35
 */

import { registerShape } from '@antv/g2';
import { LooseObject } from '@antv/g2/lib/interface';
import { Legend } from '@antv/g2plot/lib/types/legend';

export type DataItem = Record<string, any>;

// 默认图表配置
const defaultChartConfig = { theme: 'dark', themeConfig: {} };

const { chartConfig = defaultChartConfig } = (global as unknown) as CustomWindow;

export const { theme } = chartConfig;

// 栅格size
export enum spanSizeMap {
  xs = 576,
  md = 768,
  lg = 992,
  xl = 1200,
}

// 默认主题颜色配置
const defaultThemeConfig = {
  // 暗黑主题
  dark: {
    legendColor: 'rgba(255, 255, 255, 0.6)',
    fontColor: 'rgba(255, 255, 255, 0.4)',
    // 坐标轴线颜色
    axisStyle: {
      stroke: '#666',
    },
    // grid颜色
    gridStyle: {
      stroke: '#999',
    },
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
    // 径向堆叠柱形图
    radialStackConfig: {
      // 空区的颜色
      emptyFillColor: 'rgba(255, 255, 255, 0.1)',
    },
  },
  // 白色主题
  light: {
    legendColor: '#666',
    fontColor: '#666',
    // 坐标轴线颜色
    axisStyle: {
      stroke: '#ddd',
    },
    // grid颜色
    gridStyle: {
      stroke: '#ddd',
    },
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
    // 径向堆叠柱形图
    radialStackConfig: {
      // 空区的颜色
      emptyFillColor: 'rgba(235, 248, 255, 0.7)',
    },
  },
};

// 主题颜色配置
export const themeConfig = {
  ...(defaultThemeConfig[theme] || defaultThemeConfig.dark),
  ...(chartConfig.themeConfig && chartConfig.themeConfig[theme] ? chartConfig.themeConfig[theme] : {}),
};

export interface PlotCreateProps<T> {
  dom: HTMLElement;
  data: DataItem[];
  config?: T;
  /** 自定义配置函数,传入时对 config 进行配置 */
  replaceConfig?: (config: Partial<T>) => Partial<T>;
}

export interface CustomWindow extends Window {
  chartConfig: {
    theme: string;
    themeConfig?: {
      // 对应主题色
      [name: string]: {
        [name: string]: string;
      };
    };
  };
}

// 字体配置
export const textStyle: LooseObject = {
  fontSize: 10,
  fill: themeConfig.fontColor,
};

// 坐标轴线配置
export const axisStyle = {
  style: { lineWidth: 1, stroke: themeConfig.axisStyle.stroke },
};

// 线配置
export const lineStyle = {
  visible: true,
  style: { lineWidth: 1, fill: '#666' },
};

// 图例颜色配置
export const baseLegendColor = {
  style: {
    fill: themeConfig.legendColor,
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
  position: 'bottom',
  label: baseLegendColor,
};

// 颜色配置
export const colors = ['rgba(0, 187, 255, 1)', 'rgba(51, 85, 247, 1)', 'rgba(56, 176, 59, 1)', 'rgba(254, 176, 30, 1)'];

// 通用图表颜色
export const chartColorArr = ['#02D1FF', '#FFBB04', '#F35C12', '#A72FEB', '#49D512', '#0054FF', '#009DFF'];

// 双轴折线默认颜色
export const dualLineColor = ['#5C8FF9', '#E76C5E'];

export const getResponseTextStyle = () => {
  const width = document.body.clientWidth;
  // 当设备小于md时，缩小文字
  const fontSize = width < spanSizeMap.md ? textStyle.fontSize! - 2 : textStyle.fontSize;
  return {
    fontSize,
    fill: themeConfig.fontColor,
  };
};

// 基础刻度线配置
export const baseTickLine = {
  style: { lineWidth: 0.5, stroke: themeConfig.gridStyle.stroke },
};

// 基础网格线，刻度线配置
export const baseGridLine = {
  line: { style: { lineWidth: 0.5, stroke: themeConfig.gridStyle.stroke } },
};

export const baseXAxis = {
  line: axisStyle,
  tickLine: baseTickLine,
  label: {
    style: getResponseTextStyle(),
  },
  // title: {
  //   visible: false,
  // },
};

export const baseYAxis = {
  line: axisStyle,
  tickLine: baseTickLine,
  grid: baseGridLine,
  label: {
    style: textStyle,
    // 数值格式化为千分位
    formatter: (v: string) => `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, s => `${s},`),
  },
  // title: {
  //   visible: false,
  // },
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
    cursor: 'pointer',
  },
};

// 基础配置
export const baseConfig: LooseObject = {
  padding: [20, 50, 70, 50],
  forceFit: true,
  xAxis: baseXAxis,
  yAxis: baseYAxis,
  legend: baseLegend,
  responsive: true,
};

// 饼图系列-基础配置
export const basePieConfig: LooseObject = {
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
  grid: null,
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
        // eslint-disable-next-line dot-notation
        path = this['parsePath'](path); // 将 0 - 1 转化为画布坐标

        const group = container.addGroup();
        const height = (path[1][2] - path[2][2]) * 0.7;
        const width = name !== 'border-radius-reverse' ? path[1][1] - path[0][1] : path[0][1] - path[1][1];
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
