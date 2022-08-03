---
title: 基础地图
nav:
  title: 大屏素材库
  path: /screen
group:
  title: 地图
  order: 1
---

# 基本地图

## API

| 属性      | 必填    | 说明             | 类型                                     | 默认值  |
| --------- | ------- | ---------------- | ---------------------------------------- | ------- |
| mapName   | `false` | 地图名字         | `string`                                 | `china` |
| mapJson   | `false` | 地图 json 数据   | `string`                                 |         |
| top       | `false` | 和顶部的距离     | number                                   | `40`    |
| showLabel | `false` | 显示地名         | `boolean`                                | `false` |
| labelSize | `false` | 地名字体大小     | `number`                                 | `16`    |
| silent    | `false` | 是否禁用图表交互 | `boolean`                                | `false` |
| config    | `false` | 图表配置         | `Partial<EChartsOption>`                 |         |
| style     | `false` | 自定义样式       | `CSSProperties`                          |         |
| onEvents  | `false` | 自定义事件       | `Record<string, (params?: any) => void>` |         |

## 默认效果

<code src="../../example/BasicMapDemo/demo1.tsx" background="#040727">

## 自定义地图

<code src="../../example/BasicMapDemo/demo2.tsx" background="#040727">

## 不显示地名

<code src="../../example/BasicMapDemo/demo3.tsx" background="#040727">

## 禁用地图交互

<code src="../../example/BasicMapDemo/demo4.tsx" background="#040727">

## 自定义地图配置

<code src="../../example/BasicMapDemo/demo5.tsx" background="#040727">

## 切换地图

<code src="../../example/BasicMapDemo/demo6.tsx" background="#040727">
