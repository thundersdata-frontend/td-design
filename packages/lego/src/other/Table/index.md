---
title: 表格
nav:
  title: 大屏素材库
  path: /screen
group:
  title: 其他
---

# 轮播图

## API

| 属性          | 必填    | 说明         | 类型                                           | 默认值 |
| ------------- | ------- | ------------ | ---------------------------------------------- | ------ |
| columns       | `true`  | 列数据       | `Column[]`                                     |        |
| data          | `true`  | 数据源       | `T[]`                                          |        |
| speed         | `false` | 速度（ms）   | `number`                                       |        |
| autoLoop      | `false` | 自动轮播     | `boolean`                                      |        |
| inModal       | `false` | 是否在弹窗中 | `boolean`                                      |        |
| numberOfLines | `false` | 自定义行高   | `number`                                       |        |
| colors        | `false` | 自定义颜色   | `[string, string] \| [string, string, string]` |        |

```ts
type Column<T> = {
  title: string;
  dataIndex: string;
  id?: number | string;
  width?: number;
  render?: (data: T) => ReactElement;
};
```

## 效果图 1

<code src="../../../example/TableDemo/demo1.tsx" background="#040727">

## 效果图 2 (弹窗)

<code src="../../../example/TableDemo/demo2.tsx" background="#040727">

## 自定义列数

<code src="../../../example/TableDemo/demo3.tsx" background="#040727">

## 自定义渲染函数

<code src="../../../example/TableDemo/demo4.tsx" background="#040727">

## 不滚动

<code src="../../../example/TableDemo/demo5.tsx" background="#040727">
