---
title: 带图片的玫瑰图
nav:
  title: 大屏素材库
  path: /screen
group:
  title: 饼图
---

# 带图片的玫瑰图

| 属性       | 必填    | 说明                | 类型                                     | 默认值 |
| ---------- | ------- | ------------------- | ---------------------------------------- | ------ |
| seriesData | `true`  | 图表数据            | `{ name: string; value: string }[]`      |        |
| style      | `false` | 自定义样式          | `CSSProperties`                          |        |
| imgStyle   | `false` | 图片自定义样式      | `CSSProperties`                          |        |
| config     | `false` | 自定义 Echarts 配置 | `ECOption`                               |        |
| pieColors  | `false` | 自定义颜色          | `[string, string][]`                     |        |
| onEvents   | `false` | 自定义事件          | `Record<string, (params?: any) => void>` |        |

## 效果图 1

<code src="../../../example/ImgRosePieDemo/demo1.tsx" background="#040727">
