---
title: 地图
nav:
  title: 大屏素材库
  path: /screen
group:
  title: 其他
  order: 2
---

# 地图

## API

| 属性        | 必填    | 说明              | 类型                                     | 默认值   |
| ----------- | ------- | ----------------- | ---------------------------------------- | -------- |
| geoCode     | `false` | 地图行政区划 code | `string`                                 | `100000` |
| showLabel   | `false` | 显示地名          | `boolean`                                | `false`  |
| labelSize   | `false` | 地名字体大小      | `number`                                 | `16`     |
| silent      | `false` | 是否禁用图表交互  | `boolean`                                | `false`  |
| enableDrill | `false` | 允许下钻          | `boolean`                                | `false`  |
| config      | `false` | 图表配置          | `Partial<EChartsOption>`                 |          |
| style       | `false` | 自定义样式        | `CSSProperties`                          |          |
| onEvents    | `false` | 自定义事件        | `Record<string, (params?: any) => void>` |          |

## 默认效果

<code src="../../../example/MapDemo/demo1.tsx" background="#040727">

## 使用本地 MapJson(地图加载速度更快)

<code src="../../../example/MapDemo/demo2.tsx" background="#040727">

## 加点和线并加一些点线配置

点和线的配置可以参考 [Echarts](https://echarts.apache.org/zh/option.html#series-effectScatter.symbol) 里 effectScatter 和 lines 的 series 相关配置。

<code src="../../../example/MapDemo/demo3.tsx" background="#040727">

## 杭州市地图（传入当地行政区划代码）

<code src="../../../example/MapDemo/demo4.tsx" background="#040727">

## 显示 label，并控制字体大小

这是比较简单的调整 label 的方法。

<code src="../../../example/MapDemo/demo5.tsx" background="#040727">
