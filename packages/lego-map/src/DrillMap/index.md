---
title: 下钻地图
nav:
  title: 大屏素材库
  path: /screen
group:
  title: 地图
  order: 2
---

# 下钻地图

## API

| 属性        | 必填    | 说明                                 | 类型                                     | 默认值   |
| ----------- | ------- | ------------------------------------ | ---------------------------------------- | -------- |
| amapKey     | `true`  | 调用高德地图 web 服务 API 需要的 key | `string`                                 |          |
| adcode      | `false` | 地图行政区划 code                    | `string`                                 | `100000` |
| top         | `false` | 和顶部的距离                         | number                                   | `40`     |
| showLabel   | `false` | 显示地名                             | `boolean`                                | `false`  |
| labelSize   | `false` | 地名字体大小                         | `number`                                 | `16`     |
| silent      | `false` | 是否禁用图表交互                     | `boolean`                                | `false`  |
| enableDrill | `false` | 允许下钻                             | `boolean`                                | `false`  |
| config      | `false` | 图表配置                             | `Partial<EChartsOption>`                 |          |
| style       | `false` | 自定义样式                           | `CSSProperties`                          |          |
| onEvents    | `false` | 自定义事件                           | `Record<string, (params?: any) => void>` |          |

## 默认效果

<code src="../../example/DrillMapDemo/demo1.tsx" background="#040727">

## 禁用下钻

<code src="../../example/DrillMapDemo/demo2.tsx" background="#040727">

## 初始地图为四川省

<code src="../../example/DrillMapDemo/demo3.tsx" background="#040727">
