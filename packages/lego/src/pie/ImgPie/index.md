---
title: 带图片的饼图
nav:
  title: 大屏素材库
  path: /screen
group:
  title: 饼图
---

# 带图片的饼图

| 属性     | 必填    | 说明                | 类型                                     | 默认值 |
| -------- | ------- | ------------------- | ---------------------------------------- | ------ |
| data     | `true`  | 图表数据            | `{ name: string; value: string }[]`      |        |
| style    | `false` | 自定义样式          | `CSSProperties`                          |        |
| imgStyle | `false` | 图片自定义样式      | `CSSProperties`                          |        |
| autoLoop | `false` | 控制是否自动轮播    | `boolean`                                |        |
| config   | `false` | 自定义 Echarts 配置 | `ECOption`                               |        |
| onEvents | `false` | 自定义事件          | `Record<string, (params?: any) => void>` |        |

## 效果图 1

<code src="../../../example/ImgPieDemo/demo1.tsx" background="#040727">

## 效果图 2 (手动控制图表轮播)

<code src="../../../example//ImgPieDemo/demo2.tsx" background="#040727">
