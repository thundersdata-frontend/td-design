---
title: 视频
nav:
  title: 大屏素材库
  path: /screen
group:
  title: 视频
---

# 视频

## API (继承自 xgplayer)

| 属性 | 必填 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- | --- |
| id | `true` | 唯一 id 值 | `string` |  |
| videoUrls | `true` | 视频路径数组 | `string[]` |  |
| definitionList | `false` | 清晰度视频数组,顺序应与 videoUrls 保持一致 | `{name: string; url: string}[][]` |  |
| isLoop | `false` | 是否循环播放 | `boolean` | `true` |
| visible | `false` | 是否可见 | `boolean` | `true` |
| muted | `false` | 是否静音播放 | `boolean` | `false` |
| videoInit | `false` | 初始化显示首帧 | `boolean` | `true` |
| enableMemory | `false` | 是否允许记忆播放 | `boolean` | `false` |
| lastPlayTimeHideDelay | `false` | 记忆提示文字展示时长(s) | `number` | `5` |
| currentIndex | `false` | 手动控制当前播放集数 | `number` |  |
| setCurrentIndex | `false` | 控制当前播放视频 | `(currentIndex: number) => void` |  |
| style | `false` | 自定义样式 | `CSSProperties` |  |
| className | `false` | 自定义类名 | `string` |  |

## 基本使用

默认循环播放。

**注：因为浏览器的限制，用户必须手动点击播放以后才能允许自动播放视频，或者设置视频为静音(muted)**

<code src="../../example/VideoDemo/demo1.tsx" background="#fff">

## 自定义设置宽高

<code src="../../example/VideoDemo/demo2.tsx" background="#fff">

## 启用记忆播放

下次开始播放时可以自动跳转到对应集数和进度。

<code src="../../example/VideoDemo/demo3.tsx" background="#fff">

## 自动播放（静音）

<code src="../../example/VideoDemo/demo4.tsx" background="#fff">

## 禁用循环播放

<code src="../../example/VideoDemo/demo5.tsx" background="#fff">

## 按钮控制播放第几集

<code src="../../example/VideoDemo/demo6.tsx" background="#fff">

## 按钮点击出现视频弹窗

<code src="../../example/VideoDemo/demo7.tsx" background="#fff">

## 配置清晰度

传入清晰度视频数组 definitionList,顺序应与 videoUrls 保持一致,当只有一个清晰度源的时候清晰度配置会默认隐藏。

<code src="../../example/VideoDemo/demo8.tsx" background="#fff">

## 视频数组为空

<code src="../../example/VideoDemo/demo9.tsx" background="#fff">
