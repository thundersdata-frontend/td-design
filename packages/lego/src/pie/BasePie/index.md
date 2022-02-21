---
title: 环形图
nav:
  title: 大屏素材库
  path: /screen
group:
  title: 饼图
  order: 4
---

# 基本的饼图

| 属性 | 必填 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- | --- |
| data | `true` | 图表数据 | `{ value: string \| number; name: string; percent?: number; itemStyle?: any }[]` |  |
| unit | `false` | 线图单位 | `string` |  |
| style | `false` | 自定义样式 | `CSSProperties` |  |
| autoLoop | `false` | 控制是否自动轮播 | `boolean` |  |
| duration | `false` | 自动轮播的时长 | `number` | `2000` |
| config | `false` | 自定义 Echarts 配置 | `ECOption` |  |
| pieColors | `false` | 自定义颜色 | `[string, string][]` |  |
| onEvents | `false` | 自定义事件 | `Record<string, (params?: any) => void>` |  |

<code src="../../../example/BasePieDemo/demo1.tsx" background="#040727">

<code src="../../../example/BasePieDemo/demo2.tsx" background="#040727">

<code src="../../../example/BasePieDemo/demo3.tsx" background="#040727">

## 效果图 (手动控制图表轮播)

<code src="../../../example/BasePieDemo/demo4.tsx" background="#040727">
