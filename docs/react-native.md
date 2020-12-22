---
nav:
  title: RN组件
  path: /react-native
order: 0
---

# React Native Components

## 特性和优势

- UI 样式高度可配置，拓展性强，轻松适应各类产品风格
- 基于 React Native 的 iOS / Android 多平台支持，组件丰富，能全面覆盖各类场景
- 使用 TypeScript 开发，提供类型定义文件，支持类型及属性智能提示，方便业务开发
- 全面兼容 react 和 react-native
- 基于 react-navigation 做路由跳转

## 适用场景

- 适合于中大型产品应用
- 适合于基于 react-native 的终端应用
- 适合不同 UI 风格的高度定制需求的应用

## 快速上手

_在开始之前，推荐先学习 [React](https://reactjs.org/) 和 [React Native](http://reactnative.dev/)。并确认 Node.js 已经升级到 v12.x 或以上。_

### 1. 新建一个项目(推荐使用[typescript](https://www.typescriptlang.org/)进行应用开发)

```js
npx react-native init ProjectName --template react-native-template-typescript
```

### 2. 安装组件库

```js
yarn add @td-design/react-native
```

### 3. 使用

1. 项目入口文件配置

_我们推荐在项目里面使用[react-native-safe-area-context](https://github.com/th3rdwave/react-native-safe-area-context)来处理全面屏问题。_

```tsx | pure
import { ThemeProvider } from '@td-design/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';

import MainStack from './stacks/MainStack';

const App = () => {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <NavigationContainer>
          {/** 路由栈 */}
          <MainStack />
        </NavigationContainer>
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

export default App;
```

2. 组件使用

```tsx | pure
import React from 'react';
import { Flex, Text } from '@td-design/react-native';

const HelloWorld = () => {
  return (
    <Flex flex={1}>
      <Text>Hello, world</Text>
    </Flex>
  );
};

export default HelloWorld;
```
