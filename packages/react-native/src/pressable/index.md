---
title: Pressable - 可点击组件
nav:
  title: RN组件
  path: /react-native
group:
  title: Interaction
  path: /interaction
---

# Pressable 可点击组件

基于[React Native Pressable](https://reactnative.dev/docs/pressable)封装。

**注意：Pressable 是 react-native 在 0.63 版本引入的新功能，也意味着如果你的项目是低于 0.63 版本的话，Pressable 组件无法使用**

## 效果演示

## API

| 属性           | 必填    | 说明                               | 类型        | 默认值 |
| -------------- | ------- | ---------------------------------- | ----------- | ------ |
| onPress        | `false` | 点击事件                           | ``          |        |
| onLongPress    | `false` | 长按事件                           | ``          |        |
| disabled       | `false` | 是否禁用                           | `boolean`   |        |
| delayLongPress | `false` | 从点击状态进入长按状态的延迟时间   | `number`    | 1000   |
| activeOpacity  | `false` | 点击时的透明度                     | `number`    | 0.5    |
| pressOffset    | `false` | 手指移出组件但扔持有点击状态的距离 | `number`    | 25     |
| hitOffset      | `false` | 离组件触发 onPressIn 的距离        | `number`    | 25     |
| style          | `false` | 自定义样式                         | `ViewStyle` |        |
