---
title: 象形柱状图
nav:
  title: 大屏素材库
  path: /screen
group:
  title: 柱状图
---

# 象形柱状图

## API

| 属性 | 必填 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- | --- |
| xAxisData | `true` | x 轴数据 | `any[]` |  |
| unit | `false` | 单位 | `string` |  |
| name | `false` | 图例名称 | `string` |  |
| data | `true` | 图表数据 | `(string \| number \| { name: string; value: string \| number; unit: string })[]` |
| style | `false` | 自定义样式 | `CSSProperties` |  |
| autoLoop | `false` | 控制是否自动轮播 | `boolean` |  |
| duration | `false` | 自动轮播的时长 | `number` | `2000` |
| config | `false` | 自定义 Echarts 配置 | `ECOption` |  |
| inModal | `false` | 是否在弹窗内显示 | `boolean` | `false` |
| showYAxisLine | `false` | 控制是否显示 y 轴的线 | `boolean` | `true` |
| barColors | `false` | 自定义颜色 | `[string, string][]` |  |
| onEvents | `false` | 图表交互事件 | `Record<string, (params?: any) => void>` |  |
| renderer | `false` | 图表渲染器 | `canvas \| svg` | `canvas` |

## 效果图 1

<code src="../../example/PictorialBarDemo/demo1.tsx" background="#040727">

## 效果图 2

<code src="../../example/PictorialBarDemo/demo2.tsx" background="#040727">

## 效果图 3

<code src="../../example/PictorialBarDemo/demo3.tsx" background="#040727">

## 效果图 4 自动轮播

<code src="../../example/PictorialBarDemo/demo4.tsx" background="#040727">

## 效果图 5 (轮播两次后停止)

<code src="../../example/PictorialBarDemo/demo5.tsx" background="#040727">

## 效果图 6 (弹窗)

<code src="../../example/PictorialBarDemo/demo6.tsx" background="#040727">

## 效果图 7 (手动控制图表轮播)

<code src="../../example/PictorialBarDemo/demo7.tsx" background="#040727">

## 效果图 8 (SVG 渲染器)

<code src="../../example/PictorialBarDemo/demo8.tsx" background="#040727">
