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

使用本组件需要单独安装：**yarn add @td-design/react-native-passcode**

## 效果演示

### 1. 基本

## API

### Passcode

| 属性       | 必填    | 说明                 | 类型                         | 默认值  |
| ---------- | ------- | -------------------- | ---------------------------- | ------- |
| length     | `false` | 密码框长度           | `number`                     | `6`     |
| onDone     | `false` | 按键完成事件回调事件 | `(password: string) => void` |         |
| clean      | `false` | 是否清除             | `boolean`                    | `true`  |
| onChange   | `false` | 密码改变事件回调事件 | `(password: string) => void` |         |
| showCursor | `false` | 是否显示光标         | `boolean`                    | `false` |
| ref        | `false` | 获取 input 的 ref    | `PasswordInputRef`           | `false` |

### PasswordInputRef

| 属性  | 说明              | 类型         |
| ----- | ----------------- | ------------ |
| show  | 显示键盘          | `() => void` |
| hide  | 隐藏键盘          | `() => void` |
| clean | 清除 imput 的输入 | `() => void` |

### passwordModal

| 属性       | 必填    | 说明                 | 类型                         | 默认值  |
| ---------- | ------- | -------------------- | ---------------------------- | ------- |
| title      | `false` | 密码框标题           | `string`                     |         |
| length     | `false` | 密码框长度           | `number`                     | `6`     |
| onChange   | `false` | 密码改变事件回调事件 | `(password: string) => void` |         |
| showCursor | `false` | 是否显示光标         | `boolean`                    | `false` |

## 主题相关属性

| 属性 | 说明 | 普通模式 | 暗黑模式 |
| ---- | ---- | -------- | -------- |

_palette 和 darkPalette 的定义详见[内置主题](/react-native/theme)_
