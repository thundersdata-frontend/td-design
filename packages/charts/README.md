# `@td-design/charts`

## 概要

基于 G2 和 G2Plot 的雷数图表组件库

## 使用方法

### 用 babel-plugin-import 引入@td-design/charts 组件样式

需要在项目根目录下`babel.config.js`文件中加入以下配置：

```js
plugins: [
    [
      'import',
      {
        libraryName: '@td-design/charts',
        customName: (name) => {
          if (name.indexOf('create') > -1) {
            return `@td-design/charts/es/utils/${name}`;
          }
          return `@td-design/charts/es/components/${name}`;
        },
        style: true,
      },
    ],
  ],
```

## API

从 `@td-design/charts` 下导出两种 API：

- DOM 组件
- 图表生成方法

全部 API 结构如下：  
@td-design/charts  
　|-- components (DOM 组件类)  
 　　　|-- ChartDom (图表组合组件)  
 　　　|-- ComBlock (组件显示的载体,包含 border )  
 　　　|-- ComCard (大屏卡片组件)  
 　　　|-- ChartPlot (图表组件)  
　|-- utils (图表生成方法)  
 　　　|-- createLinePlot (普通折线图)  
 　　　|-- createColumnPlot (普通柱状图)  
 　　　|-- createGroupColumnPlot (分组柱状图)  
 　　　|-- createDonutPlot (基础环图)  
 　　　|-- createStackColumnPlot (堆叠柱状图)  
 　　　|-- createRangeColumnPlot (区间柱状图)  
 　　　|-- createWaterfallPlot (瀑布图)  
 　　　|-- createLiquidPlot (水波图)  
 　　　|-- createDonutRosePlot (玫瑰图)  
 　　　|-- createCustomBarPlot (基础条形图)  
 　　　|-- createStackRosePlot (堆叠玫瑰图)  
 　　　|-- createRadarPlot (雷达图)  
 　　　|-- createStackAreaPlot (堆叠面积图)  
 　　　|-- createScatterPlot (单象限散点图)  
 　　　|-- createCustomRangeBarPlot (区间条形图)  
 　　　|-- createRadialStackPlot (径向堆叠柱形图)  
 　　　|-- createCustomGroupedBarPlot (分组条形图)  
 　　　|-- createColumnLinePlot (柱线混合图)  
 　　　|-- createGroupedColumnLinePlot (分组柱线混合图)  
 　　　|-- createDualLinePlot (双折线图)

## 在线文档

具体导出的组件和方法详见 <a href="https://thundersdata-frontend.github.io/td-doc/#/charts">在线文档</a> 。

## 主题切换方法

如果需要使用图表主题功能以实现主题配置或主题切换。

### 在项目中初始化/切换使用主题

#### 初始化主题

global.ts 中配置初始 theme ，这里配置了 `dark` 为初始主题：

```ts
((global as unknown) as CustomWindow).chartConfig = {
  theme: 'dark',
};
```

interfaces/common.ts 下需要新增 chartConfig 属性：

```ts
// interfaces/common.ts
export interface CustomWindow extends Window {
  // 其他配置
  chartConfig: {
    theme: string;
    themeConfig?: {
      // 对应主题色
      [name: string]: {
        [name: string]: string | string[] | number | number[];;
      };
    };
  };
}
```

#### 切换主题

1.如果需要切换主题的功能，则需要配置`chartConfig`中的`themeConfig`属性，在`themeConfig`下需要配置对应主题的属性，在 [g2plot 主题链接](https://antv-g2plot.gitee.io/zh/docs/api/options/theme) 中有所有的主题属性可配置项（colors20 暂不支持），单线图不会被应用 colors10 颜色。

比如：需要`dark`和`light`的主题切换，则可以配置`chartConfig`如下：

```ts
((global as unknown) as CustomWindow).chartConfig = {
  theme: 'dark',
  themeConfig: {
    // 暗黑主题
    dark: {
      colors10: ['red','yellow'],
      // 其他的主题属性
    },
    // 白色主题
    light: {
      colors10: ['green','blue']
    },
  },
};
```

目前主题库有`dark`和`light`，上面的属性(如`legendColor`)是全部目前图表库暴露的可配置属性，都是可选可不选的，如果不传会用默认的主题设置。如果是自定义的其他主题，图表库则会默认使用`dark`主题颜色作为模板。

2.修改全局 theme 主题名称即可。如：

```js
// 切换为 light 主题
((global as unknown) as CustomWindow).chartConfig.theme = 'light';
```
