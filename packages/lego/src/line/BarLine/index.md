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

| 属性 | 必填 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- | --- |
| xAxisData | `true` | x 轴数据 | `any[]` |  |
| yAxis | `true` | y 轴配置 | `YAXisOption[]` |  |
| lineData | `true` | 线图数据 | `{ name: string; data: number[] }` |  |
| lineUnit | `false` | 线图单位 | `string` |  |
| barType | `false` | 柱图形状 | `string` | `cuboidBar` |
| barData | `true` | 柱图数据 | `BarSeriesData \| BarSeriesData[]` |  |
| barUnit | `false` | 柱图单位 | `string` |  |
| max | `false` | 柱图最大值（仅在 barType 为 cylinderShadowBar ｜ sliceBar 时需要） | `number` |  |
| style | `false` | 自定义样式 | `CSSProperties` |  |
| autoLoop | `false` | 控制是否自动轮播 | `boolean` |  |
| duration | `false` | 自动轮播的时长 | `number` | `2000` |
| config | `false` | 自定义 Echarts 配置 | `ECOption` |  |
| inModal | `false` | 是否在弹窗内显示 | `boolean` | `false` |
| showYAxisLine | `false` | 控制是否显示 y 轴的线 | `boolean` | `true` |
| shadow | `false` | 是否显示 areaStyle | `boolean` | `false` |
| smooth | `false` | 折线是否平滑 | `boolean` | `false` |
| onEvents | `false` | 自定义事件 | `Record<string, (params?: any) => void>` |  |

## 效果图 1 (长方体柱状图)

<code src="../../../example/BarLineDemo/demo1.tsx" background="#040727">

## 效果图 2（分组圆柱图）

<code src="../../../example/BarLineDemo/demo2.tsx" background="#040727">

## 效果图 3 (带阴影圆柱图)

<code src="../../../example/BarLineDemo/demo3.tsx" background="#040727">

## 效果图 4（叠片柱状图）

<code src="../../../example/BarLineDemo/demo4.tsx" background="#040727">

## 效果图 5 (堆叠圆柱图)

<code src="../../../example/BarLineDemo/demo5.tsx" background="#040727">

## 效果图 6 自动轮播效果

<code src="../../../example/BarLineDemo/demo6.tsx" background="#040727">

## 效果图 7 (轮播两次后停止)

<code src="../../../example/BarLineDemo/demo7.tsx" background="#040727">

## 效果图 8 (弹窗)

<code src="../../../example/BarLineDemo/demo8.tsx" background="#040727">

## 效果图 9 (手动控制图表轮播)

<code src="../../../example/BarLineDemo/demo9.tsx" background="#040727">

## 效果图 10 (显示阴影效果)

<code src="../../../example/BarLineDemo/demo10.tsx" background="#040727">

## 效果图 11 (折线平滑)

<code src="../../../example/BarLineDemo/demo11.tsx" background="#040727">
