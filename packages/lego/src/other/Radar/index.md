---
title: 雷达图
nav:
  title: 大屏素材库
  path: /screen
group:
  title: 其他
---

# 雷达图

## API

| 属性 | 必填 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- | --- |
| seriesData | `true` | 图表数据 | `{ name: string; data: { name: string; unit: string; value: string }[] }[]` |  |
| indicatorData | `true` | 雷达指标数据 | `{ name: string; max: string; unit: string }[]` |  |
| style | `false` | 自定义样式 | `CSSProperties` |  |
| config | `false` | 自定义 Echarts 配置 | `ECOption` |  |
| inModal | `false` | 是否在弹窗内显示 | `boolean` | `false` |
| radarColors | `false` | 自定义颜色 | `[string, string][]` |  |
| onEvents | `false` | 图表交互事件 | `Record<string, (params?: any) => void>` |  |
| renderer | `false` | 图表渲染器 | `canvas \| svg` | `canvas` |

## 效果图 1

<code src="../../../example/RadarDemo/demo1.tsx" background="#040727">

## 效果图 2 (弹窗)

<code src="../../../example/RadarDemo/demo2.tsx" background="#040727">

## 效果图 3 (SVG 渲染器)

<code src="../../../example/RadarDemo/demo3.tsx" background="#040727">
