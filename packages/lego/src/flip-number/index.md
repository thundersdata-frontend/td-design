---
title: 翻牌器
nav:
  title: 大屏素材库
  path: /screen
group:
  title: 数字
---

# 数据展示

## API

| 属性          | 必填    | 说明                                   | 类型                        | 默认值 |
| ------------- | ------- | -------------------------------------- | --------------------------- | ------ |
| auto          | `false` | 是否自动                               | `boolean`                   |        |
| decimals      | `false` | 要显示的小数位数                       | `number`                    |        |
| delay         | `false` | 开始转换前的延迟（以秒为单位）         | `number`                    |        |
| duration      | `false` | 持续时间（以秒为单位）                 | `number`                    |        |
| preserveValue | `false` | 保存先前结束的数字以从中开始每个新动画 | `number`                    |        |
| separator     | `false` | 指定千位分隔符的字符                   | `string`                    |        |
| start         | `true`  | 开始值                                 | `number`                    |        |
| end           | `true`  | 目标值                                 | `number`                    |        |
| useEasing     | `false` | 启用缓动。设置 false 为线性过渡        | `boolean`                   |        |
| formattingFn  | `false` | 自定义数字格式的功能                   | `(value: number) => string` |        |
| onEnd         | `false` | 过渡结束时的回调函数                   | `() => void`                |        |
| onStart       | `false` | 转换开始时的回调函数                   | `() => void`                |        |
| onPause       | `false` | 暂停或恢复时的回调函数                 | `() => void`                |        |
| onReset       | `false` | 复位时的回调函数                       | `() => void`                |        |
| onUpdate      | `false` | 更新回调函数                           | `() => void`                |        |
| style         | `false` | 容器样式                               | `CSSProperties`             |        |
| className     | `false` | 自定义类名                             | `string`                    |        |

## 1 常规

<code src="../../example/FlipNumberDemo/demo1.tsx" background="#040727">

## 2 千位分隔

<code src="../../example/FlipNumberDemo/demo2.tsx" background="#040727">

## 3 文字样式

<code src="../../example/FlipNumberDemo/demo3.tsx" background="#040727">

## 4 手动触发

<code src="../../example/FlipNumberDemo/demo4.tsx" background="#040727">
