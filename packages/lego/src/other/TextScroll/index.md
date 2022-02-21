---
title: 文字滚动
nav:
  title: 大屏素材库
  path: /screen
group:
  title: 其他
---

# 文字滚动

## API

| 属性         | 必填    | 说明                                   | 类型            | 默认值  |
| ------------ | ------- | -------------------------------------- | --------------- | ------- |
| texts        | `true`  | 文字数组                               | `string[]`      |         |
| scrollSpeed  | `false` | 滚动速度，通过时间控制，单位 s         | `number`        | `5`     |
| delay        | `false` | 文字滚动的延迟时间，单位 s             | `number`        | `2`     |
| textStyle    | `false` | 文字的样式                             | `CSSProperties` |         |
| contentStyle | `false` | 内容的样式，主要用于设置文字滚动的高度 | `CSSProperties` |         |
| inModal      | `false` | 是否在弹窗中                           | `boolean`       | `false` |

## 效果图 1

<code src="../../../example/TextScrollDemo/demo1.tsx" background="#040727">

## 效果图 2

<code src="../../../example/TextScrollDemo/demo2.tsx" background="#040727">

## 效果图 3 (弹窗)

<code src="../../../example/TextScrollDemo/demo3.tsx" background="#040727">
