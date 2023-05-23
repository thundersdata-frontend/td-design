---
title: react-native组件库
toc: menu
order: 1
---

# @td-design/react-native 组件库

## 特性和优势

- 全面兼容 react 和 react-native
- UI 样式高度可配置，拓展性强，轻松适应各类产品风格
- 基于 React Native 的 iOS / Android 多平台支持，组件丰富，能全面覆盖各类场景
- 使用 TypeScript 开发，提供类型定义文件，支持类型及属性智能提示，方便业务开发

## 适用场景

- 适合于中大型产品应用
- 适合于基于 react-native 的终端应用
- 适合不同 UI 风格的定制需求的应用

## 版本要求

- `react-native` 0.63.0 版本以上

## 快速上手

_在开始之前，推荐先学习 [React](https://reactjs.org/) 和 [React Native](http://reactnative.dev/)。并确认 Node.js 已经升级到 v14.x 或以上。_

## 新建项目

推荐使用[rn-template](https://github.com/thundersdata-frontend/rn-template)作为模板进行开发。该模板内置了很多常用的功能，可以极大地提高你的项目开发进度，不需要再为搭建环境发愁。

```js | pure
npm install -g @td-design/cli

td-cli init <projectName>
```
根据提示，模板选择`app`, 分支目前支持: `main`/`0.66`/`0.67`/`0.68`/`0.69`/`0.70`/`0.71`/`0.72`。

创建成功后，全局搜索`rntemplate`，替换成你的项目名称即可。
