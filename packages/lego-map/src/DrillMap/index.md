---
title: 下钻地图
nav:
  title: 大屏素材库
  path: /screen
group:
  title: 地图
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
