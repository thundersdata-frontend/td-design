---
title: 浮动球
nav:
  title: 大屏素材库
  path: /screen
group:
  title: 其它
---

# 基本的数据展示

主要用于 3 ~ 4 组数据的场景，大于 4 组数据按照 4 组数据显示。

## API

| 属性       | 必填    | 说明         | 类型                                                                | 默认值 |
| ---------- | ------- | ------------ | ------------------------------------------------------------------- | ------ |
| dataSource | `true`  | 标题         | `{value: string \| number;label: string;element?: ReactElement;}[]` |        |
| maxCount   | `false` | 最大展示数量 | `number`                                                            |        |
| className  | `false` | 自定义样式名 | `string`                                                            |        |
| style      | `false` | 自定义样式   | `CSSProperties`                                                     |        |

## 3 组数据

<code src="../../../example/FloatBallDemo/demo1.tsx" background="#040727">

## 4 组数据

<code src="../../../example/FloatBallDemo/demo2.tsx" background="#040727">

## 限制最大显示个数为 3 组数据

<code src="../../../example/FloatBallDemo/demo3.tsx" background="#040727">

## 自定义内部内容

<code src="../../../example/FloatBallDemo/demo4.tsx" background="#040727">
