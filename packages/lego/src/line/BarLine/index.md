---
title: 柱线混合图
nav:
  title: 大屏素材库
  path: /screen
group:
  title: 线图
  order: 2
---

# 柱线混合图

## API

| 属性          | 必填    | 说明                  | 类型                                     | 默认值  |
| ------------- | ------- | --------------------- | ---------------------------------------- | ------- |
| xAxisData     | `true`  | x 轴数据              | `any[]`                                  |         |
| yAxis         | `true`  | y 轴配置              | `YAXisOption[]`                          |         |
| lineData      | `true`  | 线图数据              | `{ name: string; data: number[] }`       |         |
| lineUnit      | `false` | 线图单位              | `string`                                 |         |
| barData       | `true`  | 柱图数据              | `{ name: string; data: number[] }`       |         |
| barUnit       | `false` | 柱图单位              | `string`                                 |         |
| style         | `false` | 自定义样式            | `CSSProperties`                          |         |
| autoLoop      | `false` | 控制是否自动轮播      | `boolean`                                |         |
| duration      | `false` | 自动轮播的时长        | `number`                                 | `2000`  |
| config        | `false` | 自定义 Echarts 配置   | `ECOption`                               |         |
| inModal       | `false` | 是否在弹窗内显示      | `boolean`                                | `false` |
| showYAxisLine | `false` | 控制是否显示 y 轴的线 | `boolean`                                | `true`  |
| shadow        | `false` | 是否显示 areaStyle    | `boolean`                                | `false` |
| smooth        | `false` | 折线是否平滑          | `boolean`                                | `false` |
| onEvents      | `false` | 自定义事件            | `Record<string, (params?: any) => void>` |         |

## 效果图 1

<code src="../../../example/BarLineDemo/demo1.tsx" background="#040727">

## 效果图 2

<code src="../../../example/BarLineDemo/demo2.tsx" background="#040727">

## 效果图 3

<code src="../../../example/BarLineDemo/demo3.tsx" background="#040727">

## 效果图 4 自动轮播效果

<code src="../../../example/BarLineDemo/demo4.tsx" background="#040727">

## 效果图 5 (轮播两次后停止)

<code src="../../../example/BarLineDemo/demo5.tsx" background="#040727">

## 效果图 6 (弹窗)

<code src="../../../example/BarLineDemo/demo6.tsx" background="#040727">

## 效果图 7 (手动控制图表轮播)

<code src="../../../example/BarLineDemo/demo7.tsx" background="#040727">

## 效果图 8 (显示阴影效果)

<code src="../../../example/BarLineDemo/demo8.tsx" background="#040727">

## 效果图 9 (折线平滑)

<code src="../../../example/BarLineDemo/demo9.tsx" background="#040727">
