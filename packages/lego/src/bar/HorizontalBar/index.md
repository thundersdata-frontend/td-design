---
title: 条形图
nav:
  title: 大屏素材库
  path: /screen
group:
  title: 条形图
---

# 条形图

## API

| 属性       | 必填    | 说明                | 类型                                                        | 默认值   |
| ---------- | ------- | ------------------- | ----------------------------------------------------------- | -------- |
| unit       | `false` | 单位                | `string`                                                    |          |
| max        | `true`  | 最大值              | `number`                                                    |          |
| seriesData | `true`  | 图表数据            | `{ name: string; data: { name: string; value: number }[] }` |          |
| style      | `false` | 自定义样式          | `CSSProperties`                                             |          |
| autoLoop   | `false` | 控制是否自动轮播    | `boolean`                                                   |          |
| duration   | `false` | 自动轮播的时长      | `number`                                                    | `2000`   |
| config     | `false` | 自定义 Echarts 配置 | `ECOption`                                                  |          |
| inModal    | `false` | 是否在弹窗内显示    | `boolean`                                                   | `false`  |
| onEvents   | `false` | 图表交互事件        | `Record<string, (params?: any) => void>`                    |          |
| renderer   | `false` | 图表渲染器          | `canvas \| svg`                                             | `canvas` |

## 效果图 1

<code src="../../../example/HorizontalBarDemo/demo1.tsx" background="#040727">

## 效果图 2 - 修改图表配置项

<code src="../../../example/HorizontalBarDemo/demo2.tsx" background="#040727">

## 效果图 3 自动轮播

<code src="../../../example/HorizontalBarDemo/demo3.tsx" background="#040727">

## 效果图 4 (轮播两次后停止)

<code src="../../../example/HorizontalBarDemo/demo4.tsx" background="#040727">

## 效果图 5 (弹窗)

<code src="../../../example/HorizontalBarDemo/demo5.tsx" background="#040727">

## 效果图 6 (手动控制图表轮播)

<code src="../../../example//HorizontalBarDemo/demo6.tsx" background="#040727">

## 效果图 7 (SVG 渲染器)

<code src="../../../example//HorizontalBarDemo/demo7.tsx" background="#040727">
