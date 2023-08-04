---
toc: menu
order: 3
---

# Theme 主题

`@shopify/restyle`库给我们提供了完备的主题定制功能。

## Spacing 间距

| 名称  | 说明  | 值   |
| ----- | ----- | ---- |
| `x0`  | 1 倍  | `0`  |
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
| `x0`  | 1 倍  | `0`  |
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

| 名称          | 说明       | 值            |
| ------------- | ---------- | ------------- |
| `transparent` | 透明       | `transparent` |
| `white`       | 白色       | `#FFFFFF`     |
| `black`       | 黑色       | `#000000`     |
| `func50`      | 功能色 0   | `#FBF5F5`     |
| `func100`     | 功能色 1   | `#FFF7E3`     |
| `func200`     | 功能色 2   | `#FFD21D`     |
| `func300`     | 功能色 3   | `#52C41A`     |
| `func400`     | 功能色 4   | `#1890FF`     |
| `func500`     | 功能色 5   | `#F86E21`     |
| `func600`     | 功能色 6   | `#F4333C`     |
| `func700`     | 保留功能色 | `transparent` |
| `func800`     | 保留功能色 | `transparent` |
| `func900`     | 保留功能色 | `transparent` |

**我们设置了`func700`/ `func800`/ `func900`作为保留功能色，方便开发者进行扩展**

## 亮色模式颜色(继承通用颜色)

| 名称          | 说明       | 值                      |
| ------------- | ---------- | ----------------------- |
| `primary50`   | 主色       | `#E5F1FF`               |
| `primary100`  | 主色       | `#3AA3FF`               |
| `primary200`  | 主色       | `#005DFF`               |
| `primary300`  | 主色       | `rgba(0, 93, 255, 0.7)` |
| `primary400`  | 主色       | `rgba(0, 93, 255, 0.4)` |
| `primary500`  | 保留主色   | `transparent`           |
| `primary600`  | 保留主色   | `transparent`           |
| `primary700`  | 保留主色   | `transparent`           |
| `primary800`  | 保留主色   | `transparent`           |
| `primary900`  | 保留主色   | `transparent`           |
| `gray50`      | 中性色     | `#F5F5F5`               |
| `gray100`     | 中性色     | `#E5E5E5`               |
| `gray200`     | 中性色     | `#CCCCCC`               |
| `gray300`     | 中性色     | `#999999`               |
| `gray400`     | 中性色     | `#666666`               |
| `gray500`     | 中性色     | `#333333`               |
| `gray600`     | 中性色     | `rgba(0, 0, 0, 0.4)`    |
| `gray700`     | 中性色     | `rgba(0, 0, 0, 0.04)`   |
| `gray800`     | 保留中性色 | `transparent`           |
| `gray900`     | 保留中性色 | `transparent`           |
| `background`  | 背景色     | 同`gray50`              |
| `mask`        | 遮罩       | 同`gray600`             |
| `border`      | 边框       | 同`gray200`             |
| `icon`        | 图标       | 同`gray300`             |
| `disabled`    | 禁用       | 同`gray200`             |
| `text`        | 文本       | 同`gray500`             |
| `text_active` | 当前文本   | 同`white`               |

**我们设置了`primary600`/ `primary700`/ `primary800`/ `primary900`作为保留主色， `gray800` / `gray900`作为保留中性色，方便开发者进行扩展**

## 暗色模式颜色(继承通用颜色)

| 名称          | 说明       | 值                          |
| ------------- | ---------- | --------------------------- |
| `primary50`   | 主色       | `rgba(0, 93, 255, 0.3)`     |
| `primary100`  | 主色       | `#3AA3FF`                   |
| `primary200`  | 主色       | `#005DFF`                   |
| `primary300`  | 主色       | `rgba(0, 93, 255, 0.7)`     |
| `primary400`  | 主色       | `rgba(0, 93, 255, 0.4)`     |
| `primary500`  | 保留主色   | `transparent`               |
| `primary600`  | 保留主色   | `transparent`               |
| `primary700`  | 保留主色   | `transparent`               |
| `primary800`  | 保留主色   | `transparent`               |
| `primary900`  | 保留主色   | `transparent`               |
| `gray50`      | 中性色     | `#131C22`                   |
| `gray100`     | 中性色     | `rgba(255, 255, 255, 0.15)` |
| `gray200`     | 中性色     | `rgba(255, 255, 255, 0.25)` |
| `gray300`     | 中性色     | `rgba(255, 255, 255, 0.4)`  |
| `gray400`     | 中性色     | `rgba(255, 255, 255, 0.6)`  |
| `gray500`     | 中性色     | `rgba(255, 255, 255, 0.8)`  |
| `gray600`     | 中性色     | `rgba(0, 0, 0, 0.4)`        |
| `gray700`     | 中性色     | `rgba(0, 0, 0, 0.04)`       |
| `gray800`     | 保留中性色 | `transparent`               |
| `gray900`     | 保留中性色 | `transparent`               |
| `background`  | 背景色     | 同`gray50`                  |
| `mask`        | 遮罩       | 同`gray600`                 |
| `border`      | 边框       | 同`gray400`                 |
| `icon`        | 图标       | 同`gray300`                 |
| `disabled`    | 禁用       | 同`gray300`                 |
| `text`        | 文本       | 同`gray500`                 |
| `text_active` | 当前文本   | 同`white`                   |

## TextVariant

| 名称 | 字体大小(fontSize) | 字重(fontWeight) | 行高(lineHeight) |
| ---- | ------------------ | ---------------- | ---------------- |
| `h0` | 24                 | `bold`           | 39               |
| `h1` | 18                 | `500`            | 25               |
| `h2` | 16                 | `500`            | 22               |
| `h3` | 14                 | `500`            | 19               |
| `h4` |                    |                  |                  |
| `h5` |                    |                  |                  |
| `h6` |                    |                  |                  |
| `h7` |                    |                  |                  |
| `h8` |                    |                  |                  |
| `h9` |                    |                  |                  |
| `p0` | 16                 |                  | 22               |
| `p1` | 14                 |                  | 19               |
| `p2` | 12                 |                  | 16               |
| `p3` | 10                 |                  | 14               |
| `p4` |                    |                  |                  |
| `p5` |                    |                  |                  |
| `p6` |                    |                  |                  |
| `p7` |                    |                  |                  |
| `p8` |                    |                  |                  |
| `p9` |                    |                  |                  |
| `d0` | 24                 |                  | 28               |
| `d1` | 18                 |                  | 21               |
| `d2` | 12                 |                  | 14               |
| `d3` |                    |                  |                  |
| `d4` |                    |                  |                  |
| `d5` |                    |                  |                  |
| `d6` |                    |                  |                  |
| `d7` |                    |                  |                  |
| `d8` |                    |                  |                  |
| `d9` |                    |                  |                  |

**我们设置了`h4`/`h5`/`h6`/`h7`/`h8`/`h9`/`p4`/`p5`/`p6`/`p7`/`p8`/`p9`/`d3`/`d4`/`d5`/`d6`/`d7`/`d8`/`d9`作为保留的字体样式，方便开发者进行扩展**

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
