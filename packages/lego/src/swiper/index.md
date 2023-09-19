---
title: 轮播图
nav:
  title: 大屏素材库
  path: /screen
group:
  title: 其他
---

# 轮播图

## API

| 属性           | 必填    | 说明                               | 类型               | 默认值 |
| -------------- | ------- | ---------------------------------- | ------------------ | ------ |
| imgs           | `false` | 需要轮播的图片                     | `string[]`         |        |
| list           | `false` | 解决除图片轮播之外的情况           | `ReactNode[]`      |        |
| style          | `false` | img 的样式，主要为宽度和高度       | `CSSProperties`    |        |
| autoplay       | `false` | 是否自动播放，delay 为切换速度(ms) | `{delay: number;}` |        |
| imgNumPerSlide | `false` | 每次轮播时展示几张图片             | `number`           |        |
| pagination     | `false` | 分页器配置                         | `any`              |        |

## 效果图 1

<code src="../../example/SwiperDemo/demo1.tsx" background="#040727">

## 效果图 2

<code src="../../example/SwiperDemo/demo2.tsx" background="#040727">

## 效果图 3

<code src="../../example/SwiperDemo/demo3.tsx" background="#040727">
