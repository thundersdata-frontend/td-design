---
title: 词云图
nav:
  title: 大屏素材库
  path: /screen
group:
  title: 其他
---

# 词云图

## API

| 属性     | 必填    | 说明             | 类型                                     | 默认值   |
| -------- | ------- | ---------------- | ---------------------------------------- | -------- |
| data     | `true`  | 图表数据         | `{ name: string; value: number }[]`      |          |
| width    | `false` | 词云图宽度       | `number`                                 |          |
| height   | `false` | 词云图高度       | `number`                                 |          |
| config   | `false` | 自定义词云图配置 | `any`                                    |          |
| onEvents | `false` | 图表交互事件     | `Record<string, (params?: any) => void>` |          |
| renderer | `false` | 图表渲染器       | `canvas \| svg`                          | `canvas` |

## 效果图 1

<code src="../../../example/WordCloudDemo/demo1.tsx" background="#040727">

## 效果图 2 (SVG 渲染器)

<code src="../../../example/WordCloudDemo/demo2.tsx" background="#040727">
