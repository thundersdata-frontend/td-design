---
title: 下钻地图
nav:
  title: 大屏素材库
  path: /screen
group:
  title: 地图
  order: 2
---

# 下钻地图

地图下钻功能依赖于高德地图提供的 API，所以在使用前请前往[高德地图开放平台](https://lbs.amap.com/)申请。要新建两个 key, 一个是 Web 端（JS API），另一个是 Web 服务端。

然后在项目中使用：

- 如果你是 umi 项目，请在 umi 项目的配置文件（.umirc.ts 或者 config/index.ts）中配置：

```js
export default {
  // ... 其他配置
  define: {
    AMAP_DRILL_SERVER_KEY: '你申请的Web服务端的key',
    AMAP_DRILL_JS_KEY: '你申请的Web JS API的key',
    AMAP_DRILL_JS_SECRET: '你申请的Web JS API的secret',
  },
};
```

- 如果你是 webpack 项目，请在 webpack 配置文件中配置：

```js
new webpack.DefinePlugin({
  AMAP_DRILL_SERVER_KEY: '你申请的Web服务端的key',
  AMAP_DRILL_JS_KEY: '你申请的Web JS API的key',
  AMAP_DRILL_JS_SECRET: '你申请的Web JS API的secret',
});
```

如果是 ts 项目的话，还需要在你的项目的.d.ts 文件进行配置：

```ts
declare const AMAP_DRILL_SERVER_KEY: string;
declare const AMAP_DRILL_JS_KEY: string;
declare const AMAP_DRILL_JS_SECRET: string;
```

## API

| 属性        | 必填    | 说明               | 类型                                     | 默认值   |
| ----------- | ------- | ------------------ | ---------------------------------------- | -------- |
| adcode      | `false` | 地图行政区划 code  | `string`                                 | `100000` |
| top         | `false` | 和顶部的距离       | `number`                                 | `40`     |
| zoom        | `false` | 地图缩放           | `number`                                 | `1`      |
| showLabel   | `false` | 显示地名           | `boolean`                                | `false`  |
| labelSize   | `false` | 地名字体大小       | `number`                                 | `16`     |
| silent      | `false` | 是否禁用图表交互   | `boolean`                                | `false`  |
| simple      | `false` | 是否以简单地图展示 | `boolean`                                | `false`  |
| enableDrill | `false` | 允许下钻           | `boolean`                                | `true`   |
| config      | `false` | 图表配置           | `Partial<EChartsOption>`                 |          |
| style       | `false` | 自定义样式         | `CSSProperties`                          |          |
| onEvents    | `false` | 自定义事件         | `Record<string, (params?: any) => void>` |          |

## 默认效果

<code src="../../example/DrillMapDemo/demo1.tsx" background="#040727">

## 禁用下钻

<code src="../../example/DrillMapDemo/demo2.tsx" background="#040727">

## 初始地图为四川省

<code src="../../example/DrillMapDemo/demo3.tsx" background="#040727">

## 初始地图为四川省 (简单地图)

<code src="../../example/DrillMapDemo/demo4.tsx" background="#040727">

## 地图放大 1.2 倍

<code src="../../example/DrillMapDemo/demo5.tsx" background="#040727">
