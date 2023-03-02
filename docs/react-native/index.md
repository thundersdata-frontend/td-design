---
title: React Native组件库
toc: menu
order: 1
nav:
  title: React Native
---

# react-native 组件库

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

- `react-native` 0.61.0 版本以上

## 快速上手

_在开始之前，推荐先学习 [React](https://reactjs.org/) 和 [React Native](http://reactnative.dev/)。并确认 Node.js 已经升级到 v12.x 或以上。_

## 新建项目

### 1. 使用组件库配套模板进行快速开发 (**推荐**)

有关模板的具体情况，详见[react-native-template](/react-native/rn-template)

```js | pure
npm install -g @td-design/cli

td-cli init <projectName>
```
根据提示，模板选择`app`, 分支目前支持: `main`/`0.66`/`0.67`/`0.68`/`0.69`/`0.70`

### 2. 使用 react-native 官方脚手架初始化项目(推荐使用[typescript](https://www.typescriptlang.org/)进行应用开发)

```js | pure
npx react-native init ProjectName --template react-native-template-typescript
```

#### 2.1 安装前置依赖

由于我们的组件库里依赖了其他库，所以您必须首先安装这些前置依赖库

**[react-native-safe-area-context]()**

**[react-native-fast-image](https://github.com/DylanVann/react-native-fast-image)**

**[react-native-gesture-handler](https://github.com/software-mansion/react-native-gesture-handler)**

**[react-native-reanimated](https://github.com/software-mansion/react-native-reanimated)**

**[react-native-redash](https://github.com/wcandillon/react-native-redash)**

**[react-native-svg](https://github.com/react-native-svg/react-native-svg)**

#### 2.2. 安装组件库

```js
yarn add @td-design/react-native
```

#### 2.3 babel 配置

```js
module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    // ... 其他插件配置
    [
      'import',
      {
        libraryName: '@td-design/react-native',
        libraryDirectory: 'lib/module',
      },
      'rn',
    ],
    // reanimated配置
    'react-native-reanimated/plugin',
  ],
  // ...其他配置
};
```

#### 2.4. 代码使用

1. 项目`App.tsx`文件配置

```tsx | pure
//...其他import
import { ThemeProvider } from '@td-design/react-native';

const App = () => {
  return <ThemeProvider>{/** 其他Provider */}</ThemeProvider>;
};

export default App;
```

2. 组件使用

```tsx | pure
import { Flex, Text } from '@td-design/react-native';
import React from 'react';

const HelloWorld = () => {
  return (
    <Flex flex={1}>
      <Text>Hello, world</Text>
    </Flex>
  );
};

export default HelloWorld;
```
