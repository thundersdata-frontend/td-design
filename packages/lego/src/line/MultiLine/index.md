---
title: 多折线图
nav:
  title: 大屏素材库
  path: /screen
group:
  title: 折线图
---

# 多折线图

## API

| 属性 | 必填 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- | --- |
| xAxisData | `true` | x 轴数据 | `string[]` |  |
| yAxis | `true` | y 轴配置 | `{ name: string }[]` |  |
| seriesData | `true` | 图表数据 | `{ name: string; data: { name: string; value: string \| number }[]; yAxisIndex: number }[]` |  |
| style | `false` | 自定义样式 | `CSSProperties` |  |
| autoLoop | `false` | 控制是否自动轮播 | `boolean` |  |
| duration | `false` | 自动轮播的时长 | `number` | `2000` |
| config | `false` | 自定义 Echarts 配置 | `ECOption` |  |
| inModal | `false` | 是否在弹窗内显示 | `boolean` | `false` |
| showYAxisLine | `false` | 控制是否显示 y 轴的线 | `boolean` | `true` |
| onEvents | `false` | 自定义事件 | `Record<string, (params?: any) => void>` |  |
| lineColors | `false` | 自定义颜色 | `[string, string][]` |  |

## 效果图 1

<code src="../../../example/MultiLineDemo/demo1.tsx" background="#040727">

## 效果图 2

<code src="../../../example/MultiLineDemo/demo2.tsx" background="#040727">

## 效果图 3

<code src="../../../example/MultiLineDemo/demo3.tsx" background="#040727">

## 效果图 4

<code src="../../../example/MultiLineDemo/demo4.tsx" background="#040727">

## 效果图 5

<code src="../../../example/MultiLineDemo/demo5.tsx" background="#040727">

## 效果图 6 (自动轮播)

<code src="../../../example/MultiLineDemo/demo6.tsx" background="#040727">

## 效果图 7 (轮播两次后停止)

<code src="../../../example/MultiLineDemo/demo7.tsx" background="#040727">

## 效果图 8 (弹窗)

<code src="../../../example/MultiLineDemo/demo8.tsx" background="#040727">

## 效果图 9 (手动控制图表轮播)

<code src="../../../example/MultiLineDemo/demo9.tsx" background="#040727">

## 效果图 10 (控制是否显示 y 轴的线，默认显示，控制为不显示)

<code src="../../../example/MultiLineDemo/demo10.tsx" background="#040727">
