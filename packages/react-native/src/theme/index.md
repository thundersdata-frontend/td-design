---
title: Theme - 内置主题
nav:
  title: RN 组件
  path: /react-native
group:
  title: Theme
  path: /theme
  order: 1
---

# Theme 主题

## 距离

| 名称  | 说明   | 值   |
| ----- | ------ | ---- |
| `xxs` | 特别小 | `3`  |
| `xs`  | 一般小 | `4`  |
| `s`   | 小     | `8`  |
| `m`   | 中等   | `12` |
| `l`   | 大     | `16` |
| `xl`  | 一般大 | `20` |
| `xxl` | 特别大 | `24` |

## 圆角

| 名称     | 说明              | 值  |
| -------- | ----------------- | --- |
| `corner` | 大圆角            | `8` |
| `icon`   | Icon 组件圆角大小 | `4` |
| `base`   | 基础圆角          | `4` |
| `tag`    | Tag 组件圆角大小  | `3` |

## 媒体查询断点

| 名称          | 说明   | 值     |
| ------------- | ------ | ------ |
| `phone`       | 手机   | `0`    |
| `tablet`      | 平板   | `768`  |
| `largeTablet` | 大平板 | `1024` |

## 亮色模式调色板

| 名称          | 说明     | 值            |
| ------------- | -------- | ------------- |
| `red`         | 红色     | `#F4443C`     |
| `lightRed`    | 淡红色   | `#FBF5F5`     |
| `orange`      | 橘色     | `#F86E21`     |
| `lightOrange` | 淡橘色   | `#FFF7E3`     |
| `green`       | 绿色     | `#52C41A`     |
| `black`       | 黑色     | `#000000`     |
| `white`       | 白色     | `#ffffff`     |
| `blue`        | 蓝色     | `#005DFF`     |
| `mediumBlue`  | 中度蓝   | `#1890FF`     |
| `lightBlue`   | 淡蓝色   | `#3AA3FF`     |
| `yellow`      | 黄色     | `#FFD21D`     |
| `pink`        | 粉色     | `#ff00a1`     |
| `transparent` | 透明色   | `transparent` |
| `cyan`        | 青色     | `#E5F1FF`     |
| `dark`        | 暗色     | `#333333`     |
| `mediumDark`  | 中度暗色 | `#666666`     |
| `lightDark`   | 轻度暗色 | `#999999`     |
| `mediumGray`  | 中度灰色 | `#CCCCCC`     |
| `lightGray`   | 轻度灰色 | `#E5E5E5`     |

## 亮色模式颜色

| 名称          | 说明     | 值                   |
| ------------- | -------- | -------------------- |
| `transparent` | 透明     | `transparent`        |
| `success`     | 成功     | `palette.green`      |
| `warn`        | 警告     | `palette.orange`     |
| `fail`        | 失败     | `palette.red`        |
| `link`        | 链接     | `palette.mediumBlue` |
| `white`       | 白色     | `palette.white`      |
| `black`       | 黑色     | `palette.black`      |
| `primary`     | 主色     | `palette.blue`       |
| `secondary`   | 副色     | `palette.lightBlue`  |
| `border`      | 边框颜色 | `palette.lightGray`  |

## 暗色模式调色板

| 名称          | 说明        | 值                                                  |
| ------------- | ----------- | --------------------------------------------------- |
| `red`         | 红色        | `#F4443C`                                           |
| `lightRed`    | 淡红色      | `#FBF5F5`                                           |
| `orange`      | 橘色        | `#F86E21`                                           |
| `lightOrange` | 淡橘色      | `#292929`                                           |
| `green`       | 绿色        | `#52C41A`                                           |
| `black`       | 黑色        | `#000000`                                           |
| `white`       | 白色        | `#ffffff`                                           |
| `blue`        | 蓝色        | `#005DFF`                                           |
| `mediumBlue`  | 中度蓝      | `#1890FF`                                           |
| `lightBlue`   | 淡蓝色      | `#3AA3FF`                                           |
| `yellow`      | 黄色        | `#FFD21D`                                           |
| `pink`        | 粉色        | `#ff00a1`                                           |
| `transparent` | 透明色      | `transparent`                                       |
| `dark`        | 暗色        | `#121212`                                           |
| `darkBlue`    | 中等暗色    | `#141D24`                                           |
| `grey`        | 灰白色      | `#dddddd`                                           |
| `alphaBlue`   | 30%透明度蓝 | `new Color(basePalette.blue).alpha(0.3).string()`   |
| `darkWhite`   | 80%透明度白 | `new Color(basePalette.white).alpha(0.8).string()`  |
| `mediumWhite` | 60%透明度白 | `new Color(basePalette.white).alpha(0.6).string()`  |
| `lightWhite`  | 40%透明度白 | `new Color(basePalette.white).alpha(0.4).string()`  |
| `gray`        | 25%透明度白 | `new Color(basePalette.white).alpha(0.25).string()` |
| `darkGray`    | 15%透明度白 | `new Color(basePalette.white).alpha(0.15).string()` |

## 暗色模式颜色

| 名称          | 说明     | 值                       |
| ------------- | -------- | ------------------------ |
| `transparent` | 透明     | `'transparent'`          |
| `success`     | 成功     | `darkPalette.green`      |
| `warn`        | 警告     | `darkPalette.orange`     |
| `fail`        | 失败     | `darkPalette.red`        |
| `link`        | 链接     | `darkPalette.mediumBlue` |
| `white`       | 白色     | `darkPalette.white`      |
| `black`       | 黑色     | `darkPalette.black`      |
| `primary`     | 主色     | `darkPalette.blue`       |
| `secondary`   | 副色     | `darkPalette.lightBlue`  |
| `border`      | 边框颜色 | `darkPalette.lightWhite` |

## 组件颜色

各个组件支持配置的颜色请参见各个组件文档里的 **主题相关属性** 章节。

## 如何复写应用主题

想要复写应用主题很简单，只需要如下操作就可以实现：

### 1. 在应用中定义你自己的主题颜色文件：

```ts | pure
import { theme as defaultTheme, darkTheme as defaultDarkTheme, Theme } from '@td-design/react-native';

export const customTheme: Theme = {
  ...defaultTheme,
  colors: {
    ...defaultTheme.colors,
    // 复写主色和副色
    primary: '',
    secondary: '',
    // 复写文字内置颜色
    primaryText_1: '',
    primaryText_2: '',
    // 复写card组件颜色
    card_background: '',
    card_border: '',
  },
};

export const darkTheme: Theme = {
  ...defaultDarkTheme,
  colors: {
    ...defaultDarkTheme.colors,
    // 复写主色和副色
    primary: '',
    secondary: '',
    // 复写文字内置颜色
    primaryText_1: '',
    primaryText_2: '',
    // 复写card组件颜色
    card_background: '',
    card_border: '',
  },
};
```

_强烈建议在自定义主题时，也定义一个自己的调色板_

### 2. 把自定义主题注入到`app.tsx`里的`ThemeProvider`里:

```jsx | pure
// 其他import
import { ThemeProvider } from '@td-design/react-native';
import { theme, darkTheme } from './theme';

export default () => {
  // 其他代码

  return <ThemeProvider theme={theme}>{/** 其他Provider */}</ThemeProvider>;
};
```

### 3. 实现亮色模式和暗色模式切换

```jsx | pure
// 其他import
import { ThemeProvider } from '@td-design/react-native';
import { theme, darkTheme } from './theme';

export default () => {
  const [dark, setDark] = useState(false);
  // 其他代码

  return (
    <ThemeProvider theme={dark ? darkTheme : theme}>
      {/** 把setDark方法通过context或者其他全局变量的方式传递到应用里在需要的地方调用即可。 */}
      {/** 其他Provider */}
    </ThemeProvider>
  );
};
```
