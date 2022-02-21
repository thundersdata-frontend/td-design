---
title: 3D立体饼图
nav:
  title: 大屏素材库
  path: /screen
group:
  title: 饼图
---

# 3D 立体饼图

| 属性        | 必填    | 说明            | 类型                                     | 默认值 |
| ----------- | ------- | --------------- | ---------------------------------------- | ------ |
| seriesData  | `true`  | 图表数据        | `{ name: string; value: string }[]`      |        |
| style       | `false` | 自定义样式      | `CSSProperties`                          |        |
| barConfig   | `false` | 3D 饼图纵向配置 | `ECOption`                               |        |
| pieConfig   | `false` | 3D 饼图配置     | `ECOption`                               |        |
| autoLoop    | `false` | 是否自动切换    | `boolean`                                |        |
| isFlat      | `false` | 是否扁平        | `boolean`                                | `true` |
| loopSpeed   | `false` | 切换速度        | `number`                                 | `2000` |
| coefficient | `false` | 高度系数        | `number`                                 | `1`    |
| onEvents    | `false` | 自定义事件      | `Record<string, (params?: any) => void>` |        |

## 效果图 1

<code src="../../../example/ThreeDimensionalPieDemo/demo1.tsx" background="#040727">

## 根据数量有高低

<code src="../../../example/ThreeDimensionalPieDemo/demo2.tsx" background="#040727">
