---
title: 带阴影圆柱图
nav:
  title: 大屏素材库
  path: /screen
group:
  title: 柱状图
---

# 带阴影圆柱图

## API

| 属性          | 必填    | 说明                  | 类型                                            | 默认值  |
| ------------- | ------- | --------------------- | ----------------------------------------------- | ------- |
| xAxisData     | `true`  | x 轴数据              | `any[]`                                         |         |
| unit          | `false` | 单位                  | `string`                                        |         |
| name          | `false` | 图例名称              | `string`                                        |         |
| max           | `true`  | 最大值                | `number`                                        |         |
| data          | `true`  | 图表数据              | `(number \| { name: string; value: number })[]` |         |
| img           | `false` | 自定义图片            | `string`                                        |         |
| imgStyle      | `false` | 自定义图片样式        | `CSSProperties`                                 |         |
| style         | `false` | 自定义样式            | `CSSProperties`                                 |         |
| autoLoop      | `false` | 控制是否自动轮播      | `boolean`                                       |         |
| duration      | `false` | 自动轮播的时长        | `number`                                        | `2000`  |
| config        | `false` | 自定义 Echarts 配置   | `ECOption`                                      |         |
| inModal       | `false` | 是否在弹窗内显示      | `boolean`                                       | `false` |
| showYAxisLine | `false` | 控制是否显示 y 轴的线 | `boolean`                                       | `true`  |
| onEvents      | `false` | 自定义事件            | `Record<string, (params?: any) => void>`        |         |

## 效果图 1

<code src="../../../example/CylinderShadowBarDemo/demo1.tsx" background="#040727">

## 效果图 2

<code src="../../../example/CylinderShadowBarDemo/demo2.tsx" background="#040727">

## 效果图 3

<code src="../../../example/CylinderShadowBarDemo/demo3.tsx" background="#040727">

## 效果图 4 自动轮播

<code src="../../../example/CylinderShadowBarDemo/demo4.tsx" background="#040727">

## 效果图 5 (轮播两次后停止)

<code src="../../../example/CylinderShadowBarDemo/demo5.tsx" background="#040727">

## 效果图 6 (弹窗)

<code src="../../../example/CylinderShadowBarDemo/demo6.tsx" background="#040727">

## 效果图 7 (手动控制图表轮播)

<code src="../../../example/CylinderShadowBarDemo/demo7.tsx" background="#040727">
