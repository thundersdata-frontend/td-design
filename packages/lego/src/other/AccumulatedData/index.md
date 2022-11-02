---
title: 累计数据
nav:
  title: 大屏素材库
  path: /screen
group:
  title: 其它
---

# 基本的数据展示

## API

| 属性         | 必填    | 说明         | 类型                                                         | 默认值  |
| ------------ | ------- | ------------ | ------------------------------------------------------------ | ------- |
| data         | `true`  | 数据         | `{ name: string; value: string \| number; unit?: string }[]` |         |
| numberScroll | `false` | 数字是否滚动 | `boolean`                                                    | `false` |

## 效果图 1

<code src="../../../example/AccumulatedDataDemo/demo1.tsx" background="#040727">

## 效果图 2(数字滚动)

<code src="../../../example/AccumulatedDataDemo/demo2.tsx" background="#040727">
