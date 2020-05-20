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
 　　　|-- createStackRosePlot (南丁格尔玫瑰图)  
 　　　|-- createRadarPlot (雷达图)  
 　　　|-- createStackAreaPlot (面积图)  
 　　　|-- createScatterPlot (单象限散点图)  
 　　　|-- createCustomRangeBarPlot (区间条形图)  
 　　　|-- createRadialStackPlot (径向堆叠柱形图)  
 　　　|-- createCustomGroupedBarPlot (分组条形图)  
 　　　|-- createColumnLinePlot (柱线混合图)  
 　　　|-- createGroupedColumnLinePlot (分组柱线混合图)

## 在线文档

具体导出的组件和方法详见 <a href="https://thundersdata-frontend.github.io/charts">在线文档</a> 。
