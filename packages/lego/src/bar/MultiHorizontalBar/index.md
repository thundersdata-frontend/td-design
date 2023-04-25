---
title: 条形对比图
nav:
  title: 大屏素材库
  path: /screen
group:
  title: 条形对比图
---

# 条形对比图

## API

| 属性      | 必填    | 说明                | 类型                                                        | 默认值   |
| --------- | ------- | ------------------- | ----------------------------------------------------------- | -------- |
| leftData  | `true`  |                     | `{ name: string; data: { name: string; value: number }[] }` |          |
| rightData | `true`  |                     | `{ name: string; data: { name: string; value: number }[] }` |          |
| unit      | `false` | 单位                | `string \| [string, string]`                                |          |
| max       | `true`  | 最大值              | `number \| [number, number]`                                |          |
| style     | `false` | 自定义样式          | `CSSProperties`                                             |          |
| config    | `false` | 自定义 Echarts 配置 | `ECOption`                                                  |          |
| inModal   | `false` | 是否在弹窗内显示    | `boolean`                                                   | `false`  |
| onEvents  | `false` | 图表交互事件        | `Record<string, (params?: any) => void>`                    |          |
| renderer  | `false` | 图表渲染器          | `canvas \| svg`                                             | `canvas` |

## 效果图 1

<code src="../../../example/MultiHorizontalBarDemo/demo1.tsx" background="#040727">

## 效果图 2 - 修改图表配置项

<code src="../../../example/MultiHorizontalBarDemo/demo2.tsx" background="#040727">

## 效果图 3 (弹窗)

<code src="../../../example/MultiHorizontalBarDemo/demo3.tsx" background="#040727">

## 效果图 4 (SVG 渲染器)

<code src="../../../example/MultiHorizontalBarDemo/demo4.tsx" background="#040727">
