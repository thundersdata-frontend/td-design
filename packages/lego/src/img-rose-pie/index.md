---
title: 带图片的玫瑰图
nav:
  title: 大屏素材库
  path: /screen
group:
  title: 饼图
---

# 带图片的玫瑰图

## API

| 属性       | 必填    | 说明                | 类型                                     | 默认值   |
| ---------- | ------- | ------------------- | ---------------------------------------- | -------- |
| seriesData | `true`  | 图表数据            | `{ name: string; value: string }[]`      |          |
| style      | `false` | 自定义样式          | `CSSProperties`                          |          |
| imgStyle   | `false` | 图片自定义样式      | `CSSProperties`                          |          |
| autoLoop   | `false` | 控制是否自动轮播    | `boolean`                                |          |
| duration   | `false` | 自动轮播的时长      | `number`                                 | `2000`   |
| config     | `false` | 自定义 Echarts 配置 | `ECOption`                               |          |
| pieColors  | `false` | 自定义颜色          | `[string, string][]`                     |          |
| onEvents   | `false` | 图表交互事件        | `Record<string, (params?: any) => void>` |          |
| renderer   | `false` | 图表渲染器          | `canvas \| svg`                          | `canvas` |

## 效果图 1

<code src="../../example/ImgRosePieDemo/demo1.tsx" background="#040727">

## 效果图 2 (SVG 渲染器)

<code src="../../example/ImgRosePieDemo/demo2.tsx" background="#040727">
