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

## Spacing 间距

| 名称  | 说明  | 值   |
| ----- | ----- | ---- |
| `x1`  | 1 倍  | `4`  |
| `x2`  | 2 倍  | `8`  |
| `x3`  | 3 倍  | `12` |
| `x4`  | 4 倍  | `16` |
| `x5`  | 5 倍  | `20` |
| `x6`  | 6 倍  | `24` |
| `x7`  | 7 倍  | `28` |
| `x8`  | 8 倍  | `32` |
| `x9`  | 9 倍  | `36` |
| `x10` | 10 倍 | `40` |

## 圆角

| 名称  | 说明  | 值   |
| ----- | ----- | ---- |
| `x1`  | 1 倍  | `4`  |
| `x2`  | 2 倍  | `8`  |
| `x3`  | 3 倍  | `12` |
| `x4`  | 4 倍  | `16` |
| `x5`  | 5 倍  | `20` |
| `x6`  | 6 倍  | `24` |
| `x7`  | 7 倍  | `28` |
| `x8`  | 8 倍  | `32` |
| `x9`  | 9 倍  | `36` |
| `x10` | 10 倍 | `40` |

## 媒体查询断点

| 名称          | 说明   | 值     |
| ------------- | ------ | ------ |
| `phone`       | 手机   | `0`    |
| `tablet`      | 平板   | `768`  |
| `largeTablet` | 大平板 | `1024` |

## 通用颜色

| 名称          | 说明     | 值            |
| ------------- | -------- | ------------- |
| `transparent` | 透明     | `transparent` |
| `white`       | 白色     | `#FFFFFF`     |
| `black`       | 黑色     | `#000000`     |
| `func50`      | 功能色 0 | `#FBF5F5`     |
| `func100`     | 功能色 1 | `#FFF7E3`     |
| `func200`     | 功能色 2 | `#FFD21D`     |
| `func300`     | 功能色 3 | `#52C41A`     |
| `func400`     | 功能色 4 | `#1890FF`     |
| `func500`     | 功能色 5 | `#F86E21`     |
| `func600`     | 功能色 6 | `#F4333C`     |

## 亮色模式颜色(继承通用颜色)

| 名称               | 说明     | 值                      |
| ------------------ | -------- | ----------------------- |
| `primary50`        | 主色     | `#E5F1FF`               |
| `primary100`       | 主色     | `#3AA3FF`               |
| `primary200`       | 主色     | `#005DFF`               |
| `primary300`       | 主色     | `rgba(0, 93, 255, 0.7)` |
| `primary400`       | 主色     | `rgba(0, 93, 255, 0.4)` |
| `gray50`           | 中性色   | `#F5F5F5`               |
| `gray100`          | 中性色   | `#E5E5E5`               |
| `gray200`          | 中性色   | `#CCCCCC`               |
| `gray300`          | 中性色   | `#999999`               |
| `gray400`          | 中性色   | `#666666`               |
| `gray500`          | 中性色   | `#333333`               |
| `gray600`          | 中性色   | `rgba(0, 0, 0, 0.4)`    |
| `gray700`          | 中性色   | `rgba(0, 0, 0, 0.04)`   |
| `background`       | 背景色   | 同`gray50`              |
| `mask`             | 遮罩     | 同`gray600`             |
| `border`           | 边框     | 同`gray200`             |
| `icon`             | 图标     | 同`gray300`             |
| `disabled`         | 禁用     | 同`gray200`             |
| `primary_disabled` | 主色禁用 | 同`primary300`          |
| `text`             | 文本     | 同`gray500`             |
| `text_active`      | 当前文本 | 同`white`               |

## 暗色模式颜色(继承通用颜色)

| 名称               | 说明     | 值                          |
| ------------------ | -------- | --------------------------- |
| `primary50`        | 主色     | `rgba(0, 93, 255, 0.3)`     |
| `primary100`       | 主色     | `#3AA3FF`                   |
| `primary200`       | 主色     | `#005DFF`                   |
| `primary300`       | 主色     | `rgba(0, 93, 255, 0.7)`     |
| `primary400`       | 主色     | `rgba(0, 93, 255, 0.4)`     |
| `gray50`           | 中性色   | `#131C22`                   |
| `gray100`          | 中性色   | `rgba(255, 255, 255, 0.15)` |
| `gray200`          | 中性色   | `rgba(255, 255, 255, 0.25)` |
| `gray300`          | 中性色   | `rgba(255, 255, 255, 0.4)`  |
| `gray400`          | 中性色   | `rgba(255, 255, 255, 0.6)`  |
| `gray500`          | 中性色   | `rgba(255, 255, 255, 0.8)`  |
| `gray600`          | 中性色   | `rgba(0, 0, 0, 0.4)`        |
| `gray700`          | 中性色   | `rgba(0, 0, 0, 0.04)`       |
| `background`       | 背景色   | 同`gray50`                  |
| `mask`             | 遮罩     | 同`gray600`                 |
| `border`           | 边框     | 同`gray400`                 |
| `icon`             | 图标     | 同`gray300`                 |
| `disabled`         | 禁用     | 同`gray300`                 |
| `primary_disabled` | 主色禁用 | 同`primary300`              |
| `text`             | 文本     | 同`gray500`                 |
| `text_active`      | 当前文本 | 同`white`                   |

## 如何复写应用主题

想要复写应用主题很简单，只需要如下操作就可以实现：

### 1. 在应用中定义你自己的主题颜色文件：

```ts | pure
import { theme, Theme } from '@td-design/react-native';

export const lightTheme: Theme = {
  ...theme.lightTheme,
  colors: {
    ...theme.lightTheme.colors,
    // 复写需要覆盖的颜色
  },
};

export const darkTheme: Theme = {
  ...theme.darkTheme,
  colors: {
    ...theme.darkTheme.colors,
    // 复写需要覆盖的颜色
  },
};
```

### 2. 把自定义主题注入到`app.tsx`里的`ThemeProvider`里:

```jsx | pure
// 其他import
import { ThemeProvider } from '@td-design/react-native';
import { lightTheme, darkTheme } from './theme';

export default () => {
  // 其他代码

  return <ThemeProvider theme={lightTheme}>{/** 其他Provider */}</ThemeProvider>;
};
```

### 3. 实现亮色模式和暗色模式切换

```jsx | pure
// 其他import
import { ThemeProvider } from '@td-design/react-native';
import { lightTheme, darkTheme } from './theme';

export default () => {
  const [dark, setDark] = useState(false);
  // 其他代码

  return (
    <ThemeProvider theme={dark ? darkTheme : lightTheme}>
      {/** 把setDark方法通过context或者其他全局变量的方式传递到应用里在需要的地方调用即可。 */}
      {/** 其他Provider */}
    </ThemeProvider>
  );
};
```
