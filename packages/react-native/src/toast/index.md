---
title: Toast - 提示组件
nav:
  title: RN组件
  path: /react-native
group:
  title: Feedback
  path: /feedback
---

# Toast 提示组件

## 效果演示

## API

| 属性      | 必填    | 说明                 | 类型                          | 默认值 |
| --------- | ------- | -------------------- | ----------------------------- | ------ |
| position  | `false` | 显示位置             | `top` \| `middle` \| `bottom` |        |
| duration  | `false` | 提示显示时长（毫秒） | `number`                      | `3000` |
| content   | `false` | 提示框内容           | `ReactNode`                   |        |
| mask      | `false` | 提示框关闭后回调     | `boolean`                     |        |
| indicator | `false` | 提示框点击后回调     | `boolean`                     |        |

`duration` 有两个常量值：

- Toast.SHORT = 3000
- Toast.LONG = 5000
