---
title: Passcode - 密码/验证码组件
nav:
  title: RN组件
  path: /react-native
group:
  title: Feedback
  path: /feedback
---

# Passcode 密码/验证码组件

## 效果演示

### 1. 基本

## API

### Passcode (继承自 `TextInputProps`)

| 属性                       | 必填    | 说明                   | 类型                     | 默认值      |
| -------------------------- | ------- | ---------------------- | ------------------------ | ----------- |
| autofillFromClipboard      | `false` | 自动从粘贴板填充验证码 | `boolean`                |             |
| autofillListenerIntervalMS | `false` | 自动填充的时间间隔     | `number`                 | `1000`      |
| keyboardType               | `false` | 键盘类型               | `KeyboardType`           | `phone-pad` |
| style                      | `false` | 容器样式               | `ViewStyle`              |             |
| focusStyle                 | `false` | 聚焦的某个输入框的样式 | `ViewStyle`              |             |
| value                      | `false` | 当前输入的验证码       | `string`                 |             |
| onChange                   | `false` | 验证码输入回调         | `(code: string) => void` |             |
| inputContainerStyle        | `false` | 输入框容器样式         | `ViewStyle`              |             |
| inputStyle                 | `false` | 输入框样式             | `TextStyle`              |             |
| count                      | `false` | 验证码长度             | `number`                 | `6`         |
| onFinish                   | `false` | 验证码输入完成后的回调 | `() => void`             |             |

### PasswordInputRef

| 属性     | 说明                 | 类型            |
| -------- | -------------------- | --------------- |
| reset    | 重置验证码           | `() => void;`   |
| focus    | 聚焦验证码           | `() => void;`   |
| getValue | 获取当前输入的验证码 | `() => string;` |

## 主题相关属性

| 属性 | 说明 | 普通模式 | 暗黑模式 |
| ---- | ---- | -------- | -------- |

_palette 和 darkPalette 的定义详见[内置主题](/react-native/theme)_
