---
title: 环形图
nav:
  title: 大屏素材库
  path: /screen
group:
  title: 饼图
  order: 4
---

# 基本的饼图

## API

| 属性 | 必填 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- | --- |
| data | `true` | 图表数据 | `{ value: string \| number; name: string; percent?: number; itemStyle?: any }[]` |  |
| unit | `false` | 单位 | `string` |  |
| onlyPercentage | `false` | 不显示数值 | `boolean` | `false` |
| style | `false` | 自定义样式 | `CSSProperties` |  |
| autoLoop | `false` | 控制是否自动轮播 | `boolean` | `false` |
| duration | `false` | 自动轮播的时长 | `number` | `2000` |
| config | `false` | 自定义 Echarts 配置 | `ECOption` |  |
| legendPosition | `false` | 自定义图例的位置 | `right` \| `bottom` | `right` |
| pieColors | `false` | 自定义颜色 | `[string, string][]` |  |
| onEvents | `false` | 图表交互事件 | `Record<string, (params?: any) => void>` |  |
| renderer | `false` | 图表渲染器 | `canvas \| svg` | `canvas` |

## 效果图 1

<code src="../../example/BasePieDemo/demo1.tsx" background="#040727">

## 效果图 2

<code src="../../example/BasePieDemo/demo2.tsx" background="#040727">

## 效果图 3

<code src="../../example/BasePieDemo/demo3.tsx" background="#040727">

## 效果图 4 (手动控制图表轮播)

<code src="../../example/BasePieDemo/demo4.tsx" background="#040727">

## 效果图 5（图例在下方）

<code src="../../example/BasePieDemo/demo5.tsx" background="#040727">

## 效果图 6（不显示具体数值）

<code src="../../example/BasePieDemo/demo6.tsx" background="#040727">

## 效果图 7（SVG 渲染器）

<code src="../../example/BasePieDemo/demo7.tsx" background="#040727">
