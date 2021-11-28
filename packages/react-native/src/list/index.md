---
title: List - 列表组件
nav:
  title: RN组件
  path: /react-native
group:
  title: Display
  path: /display
---

# List 列表组件

## 效果演示

## List API

| 属性                | 必填    | 说明                 | 类型              | 默认值 |
| ------------------- | ------- | -------------------- | ----------------- | ------ |
| title               | `true`  | 标题                 | `ReactNode`       |        |
| items               | `true`  | 列表项               | `ListItemProps[]` |        |
| itemBackgroundColor | `false` | 统一设置列表项背景色 | `主题颜色`        |        |

## ListHeader API

| 属性        | 必填    | 说明           | 类型                   | 默认值 |
| ----------- | ------- | -------------- | ---------------------- | ------ |
| text        | `true`  | 标题文本       | `string`               |        |
| headerStyle | `false` | 标题容器的样式 | `StyleProp<ViewStyle>` |        |
| textStyle   | `false` | 标题文字的样式 | `StyleProp<TextStyle>` |        |

## 主题相关属性

| 属性 | 说明 | 普通模式 | 暗黑模式 |
| ---- | ---- | -------- | -------- |

_palette 和 darkPalette 的定义详见[内置主题](/react-native/theme)_
