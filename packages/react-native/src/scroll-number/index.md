---
title: ScrollNumber - 滚动数字组件
nav:
  title: RN组件
  path: /react-native
group:
  title: Other
  path: /other
---

# ScrollNumber 滚动数字组件

## 效果演示

## API

| 属性           | 必填    | 说明                                     | 类型                   | 默认值   |
| -------------- | ------- | ---------------------------------------- | ---------------------- | -------- |
| numberRange    | `false` | 滚动的文字区间。默认是 0-9 的数字        | `string[]`             | `[0-9]`  |
| value          | `true`  | 当前值                                   | `string`               | ``       |
| height         | `false` | 显示高度（不传的时候默认计算文字的高度） | ``                     | `number` |
| containerStyle | `false` | 容器样式                                 | `ViewStyle`            | ``       |
| textStyle      | `false` | 文字样式                                 | `TextStyle`            | ``       |
| animationType  | `false` | 滚动动画类型                             | `'timing' \| 'spring'` | `timing` |
