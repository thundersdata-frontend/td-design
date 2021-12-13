---
title: Tabs - 选项卡组件
nav:
  title: RN组件
  path: /react-native
group:
  title: Other
  path: /other
---

# Tabs 选项卡组件

使用本组件需要单独安装：**yarn add @td-design/react-native-tabs**

## 效果演示

### 1. 默认效果

### 2. 显示图标

### 3. 自定义文本样式

### 4. 自定义指示器样式

## API

### Tabs

| 属性                | 必填    | 说明                     | 类型                          | 默认值    |
| ------------------- | ------- | ------------------------ | ----------------------------- | --------- |
| keyboardDismissMode | `false` | 关闭键盘模式             | 'none' \| 'on-drag' \| 'auto' | 'on-drag' |
| swipeEnabled        | `false` | 启用手势控制左右滑动     | `boolean`                     | `true`    |
| lazy                | `false` | 启用懒加载               | `boolean`                     | `false`   |
| scenes              | `true`  | 选项卡面板配置           | ``                            |           |
| activeTab           | `false` | 当前处于激活状态的选项卡 | `string`                      |           |
| bounces             | `false` | 启用回弹效果             | `boolean`                     | `false`   |
| tabBarStyle         | `false` | 选项卡标签栏样式         | `ViewStyle`                   |           |
| onTabPress          | `false` | 选择某个选项卡标签       | `() => void`                  |           |
| showIcon            | `false` | 是否显示图标             | `boolean`                     | `true`    |
| textStyle           | `false` | 标签文字样式             | `TextStyle`                   |           |
| indicatorStyle      | `false` | 指示器样式               | `ViewStyle`                   |           |

### TabsBar

| 属性            | 必填    | 说明                                       | 类型 | 默认值 |
| --------------- | ------- | ------------------------------------------ | ---- | ------ |
| navigationState | `true`  | 选项卡组件的 state，包含了 index 和 routes | ``   |        |
| bounces         | `false` | 启用回弹效果                               | ``   |        |
| tabBarStyle     | `false` | 选项卡标签栏样式                           | ``   |        |
| onTabPress      | `false` | 选择某个选项卡标签                         | ``   |        |
| showIcon        | `false` | 是否显示图标                               | ``   |        |
| textStyle       | `false` | 标签文字样式                               | ``   |        |
| indicatorStyle  | `false` | 指示器样式                                 | ``   |        |

### TabBarItem

| 属性            | 必填    | 说明                       | 类型                             | 默认值 |
| --------------- | ------- | -------------------------- | -------------------------------- | ------ |
| key             | `true`  | React.Key                  | `string`                         |        |
| title           | `true`  | 标签页文本                 | `string`                         |        |
| renderIcon      | `false` | 渲染图标                   | `(active: boolean) => ReactNode` |        |
| onPres          | `false` | 点击标签页事件             | `() => void`                     |        |
| active          | `true`  | 当前标签页是否处于激活状态 | `boolean`                        | false  |
| navigationState | `true`  |                            | ``                               |        |
| showIcon        | `false` | 是否显示图标               | `boolean`                        | `true` |
| textStyle       | `false` | 标签文字样式               | `TextStyle`                      |        |

### TabBarIndicator

| 属性 | 必填 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- | --- |
| measures | `true` | 计算拿到的各个标签栏的坐标信息 | `{left: number; top: number; width: number; height: number}[]` | `[]` |
| currentIndex | `true` | 当前处于激活状态的选项卡的 index | `number` | `0` |
| indicatorStyle | `false` | 指示器样式 | `ViewStyle` |  |

## 主题相关属性

| 属性 | 说明 | 普通模式 | 暗黑模式 |
| ---- | ---- | -------- | -------- |

_palette 和 darkPalette 的定义详见[内置主题](/react-native/theme)_
