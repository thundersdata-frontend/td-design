---
title: 地图
nav:
  title: 大屏素材库
  path: /screen
group:
  title: 其他
  order: 2
---

# 地图

## API

| 属性 | 必填 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- | --- |
| geoCode | `false` | 地图行政区划 code | `string` | `100000` |
| showLabel | `false` | 显示地名 | `boolean` | `false` |
| labelSize | `false` | 地名字体大小 | `number` | `16` |
| mapSilent | `false` | 是否禁用图表交互 | `boolean` | `false` |
| enableDrill | `false` | 允许下钻 | `boolean` | `false` |
| zoom | `false` | 控制缩放比例 | `number` | `1.2` |
| drilledZoom | `false` | 下钻后的缩放比例 | `number` | `0.8` |
| mapJson | `false` | 本地地图 Json(如果传了就用本地的) | `any` |  |
| pointData | `false` | 点数据 | `{ name: string; value: number[] }[]` |  |
| lineData | `false` | 飞线数据 | `{coords: number[][];}[]` |  |
| pointConfig | `false` | 点相关配置 | `Partial<EffectScatterSeriesOption>` |  |
| linesConfig | `false` | 飞线相关配置 | `Partial<LinesSeriesOption>` |  |
| otherSeriesConfig | `false` | 其他自定义图表系列配置 | `EChartsOption['series']` |  |
| config | `false` | 图表配置 | `Partial<EChartsOption>` |  |
| mapSeriesConfig | `false` | map series 配置,传入对象只修改最后一层 MapSeries，传入数组可分别按顺序改变共 4 层 MapSeries | `Partial<MapSeriesOption> \| Partial<MapSeriesOption>[]` |  |
| style | `false` | 自定义样式 | `CSSProperties` |  |
| returnBtnStyle | `false` | 返回按钮样式 | `CSSProperties` |  |
| returnBtnText | `false` | 返回按钮文本 | `string` |  |
| onEvents | `false` | 自定义事件 | `Record<string, (params?: any) => void>` |  |
| onDrill | `false` | 点击下钻后的事件 | `(currentTarget: MapInfoItem, mapInfoList: MapInfoItem[]) => void` |  |

## 默认效果

<code src="../../../example/MapDemo/demo1.tsx" background="#040727">

## 使用本地 MapJson(地图加载速度更快)

<code src="../../../example/MapDemo/demo2.tsx" background="#040727">

## 加点和线并加一些点线配置

点和线的配置可以参考 [Echarts](https://echarts.apache.org/zh/option.html#series-effectScatter.symbol) 里 effectScatter 和 lines 的 series 相关配置。

<code src="../../../example/MapDemo/demo3.tsx" background="#040727">

## 杭州市地图（传入当地行政区划代码）

<code src="../../../example/MapDemo/demo4.tsx" background="#040727">

## 显示 label，并控制字体大小

这是比较简单的调整 label 的方法。

<code src="../../../example/MapDemo/demo5.tsx" background="#040727">

## 缩放 0.8 倍,并修改 mapSeriesConfig

修改 mapSeriesConfig 也可以调整 label 的具体样式及 map series 其他配置（参考 [Echarts](https://echarts.apache.org/zh/option.html#series-map.type)），传入对象只修改最后一层 MapSeries，传入数组可分别按顺序改变共 4 层 MapSeries。

<code src="../../../example/MapDemo/demo6.tsx" background="#040727">

## 允许下钻并监听事件

<code src="../../../example/MapDemo/demo7.tsx" background="#040727">

## 地图图表交互

<code src="../../../example/MapDemo/demo8.tsx" background="#040727">

## 自定义其他 series（支持数组）

<code src="../../../example/MapDemo/demo9.tsx" background="#040727">
