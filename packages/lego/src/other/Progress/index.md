---
title: 进度条图
nav:
  title: 大屏素材库
  path: /screen
group:
  title: 其他
  order: 5
---

# 进度条图

## API

| 属性     | 必填    | 说明                | 类型                                     | 默认值  |
| -------- | ------- | ------------------- | ---------------------------------------- | ------- |
| name     | `false` | 图例名称            | `string`                                 |         |
| data     | `true`  | 图表数据            | `{ name: string; value: number \| string }[]`      |         |
| style    | `false` | 自定义样式          | `CSSProperties`                          |         |
| config   | `false` | 自定义 Echarts 配置 | `ECOption`                               |         |
| inModal  | `false` | 是否在弹窗内显示    | `boolean`                                | `false` |
| onEvents | `false` | 自定义事件          | `Record<string, (params?: any) => void>` |         |

## 效果图 1

<code src="../../../example/ProgressDemo/demo1.tsx" background="#040727">

## 效果图 2 (弹窗)

<code src="../../../example/ProgressDemo/demo2.tsx" background="#040727">
