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

### 2. 安装前置依赖

由于我们的组件库里依赖了其他库，所以您必须首先安装这些前置依赖库

**1. 组件库使用了`react-native-vector-icons`作为图标库，所以您需要接着安装`react-native-vector-icons`。请按照[react-native-vector-icons](https://github.com/oblador/react-native-vector-icons)进行配置**

**2. 组件库强制绑定了`react-navigation`作为导航库，所以您需要接着安装`react-navigation`。请按照[react-navigation](https://reactnavigation.org/docs/getting-started)进行配置**

_如果您的 APP 里还用到了 Tabs，请继续安装_

```code
yarn add @react-navigation/bottom-tabs
```

_如果您的 APP 里还用到了 Drawer，请继续安装_

```code
yarn add @react-navigation/drawer
```

### 3. 安装组件库

```js
yarn add @td-design/react-native
```

**组件库依赖的`rn-fetch-blob`需要手动添加到 ios/Podfile。它看起来像这样：**

```
require_relative '../node_modules/react-native/scripts/react_native_pods'
require_relative '../node_modules/@react-native-community/cli-platform-ios/native_modules'

platform :ios, '10.0'

target 'rnTemplate' do
  config = use_native_modules!

  use_react_native!(:path => config["reactNativePath"])

  # add here
  pod 'rn-fetch-blob',
    :path => '../node_modules/rn-fetch-blob'

  target 'rnTemplateTests' do
    inherit! :complete
    # Pods for testing
  end

  # Enables Flipper.
  #
  # Note that if you have use_frameworks! enabled, Flipper will not work and
  # you should disable these next few lines.
  use_flipper!
  post_install do |installer|
    flipper_post_install(installer)
  end
end

target 'rnTemplate-tvOS' do
  # Pods for rnTemplate-tvOS

  target 'rnTemplate-tvOSTests' do
    inherit! :search_paths
    # Pods for testing
  end
end
```

相应地，你需要对安卓进行权限配置。找到`AndroidManifest.xml`文件，添加以下权限：

```code
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
<uses-permission android:name="android.permission.ACCESS_WIFI_STATE" />
<!-- 文件权限 -->
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.DOWNLOAD_WITHOUT_NOTIFICATION" />
```

**组件库依赖了`react-native-image-picker`，所以您需要按照它的文档对`Info.plist`做一下配置：**

- 如果允许用户从图库选择照片或者视频，需要添加`NSPhotoLibraryUsageDescription`配置：

```code
<key>NSPhotoLibraryUsageDescription</key>
<string>是否允许APP访问图库</string>
```

- 如果允许用户使用摄像头进行拍照，需要添加`NSCameraUsageDescription`配置：

```code
<key>NSCameraUsageDescription</key>
<string>是否允许APP使用摄像头</string>
```

- 如果允许用户使用摄像头进行视频，需要添加`NSCameraUsageDescription`和`NSMicrophoneUsageDescription`配置：

```code
<key>NSMicrophoneUsageDescription</key>
<string>是否允许APP使用摄像头</string>
```

- 如果允许用户保存图片或者视频，需要添加`NSPhotoLibraryUsageDescription`配置：

```code
<key>NSPhotoLibraryUsageDescription</key>
<string>是否允许APP保存图片和视频到图库</string>
```

相应地，你需要对安卓进行权限配置。找到`AndroidManifest.xml`文件，添加以下权限：

```code
<!-- 摄像头权限 -->
<uses-permission android:name="android.permission.CAMERA" />
```

### 4. 使用

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
