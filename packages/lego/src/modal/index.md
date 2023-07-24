---
title: 弹窗
nav:
  title: 大屏素材库
  path: /screen
group:
  title: 其他
---

# 弹窗

## API

| 属性            | 必填    | 说明                         | 类型       | 默认值                          |
| --------------- | ------- | ---------------------------- | ---------- | ------------------------------- |
| visible         | `true`  | 弹窗是否可见                 | `boolean`  | `false`                         |
| width           | `false` | 弹窗宽度                     | `number`   | 784                             |
| height          | `false` | 弹窗高度                     | `number`   | 800                             |
| left            | `false` | 弹窗出现的位置（离左侧距离） | `number`   | （浏览器窗口宽度 - 弹窗宽度）/2 |
| top             | `false` | 弹窗出现的位置（离上侧距离） | `number`   | （浏览器窗口高度 - 弹窗高度）/2 |
| onClose         | `true`  | 弹窗关闭                     | `Function` |                                 |
| backgroundImage | `false` | 弹窗背景图                   | `string`   |                                 |

## 效果图 1

<code src="../../example/ModalDemo/demo1.tsx" background="#040727">
