---
sidemenu: false
nav:
  title: Restyle
  path: /restyle
---

# Restyle - 主题和样式

先看效果图：

<center>
  <figure>
    <img
      alt=""
      src="https://user-images.githubusercontent.com/688415/75268245-91084b80-57f7-11ea-905b-2a9046aa5ca3.gif"
    />
    <div>图片来自：<a href="https://github.com/Shopify/restyle">@shopify/restyle</a></div>
</figure>
</center>

## 介绍

`@shopify/restyle` 是由 shopify 公司开发的一个用于开发 react-native UI 组件库的工具。主要聚焦在组件库的样式上。它假设我们的组件库是基于一套设计体系，定义了一系列的颜色和间距常量。我们可以通过定义主题的方式来方便地实现对组件样式的定义和自由切换（如暗黑模式）。

## 使用

### 定义主题

任何使用此工具开发的组件库都要有一个全局的样式对象。它明确地定义了一系列的颜色(color)、间距(spacing)、断点(breakpoints)以及其他更多的定义。UI 组件可以直接使用这个样式对象中的 key 值。比如`backgroundColor="primaryColor"`。在`TypeScript`的加持下，我们可以非常放心，它会约束我们可以使用的值。示例如下：

```js
import { createTheme } from '@shopify/restyle';

const palette = {
  purpleLight: '#8C6FF7',
  purplePrimary: '#5A31F4',
  purpleDark: '#3F22AB',

  greenLight: '#56DCBA',
  greenPrimary: '#0ECD9D',
  greenDark: '#0A906E',

  black: '#0B0B0B',
  white: '#F0F2F3',
};

const theme = createTheme({
  colors: {
    mainBackground: palette.white,
    cardPrimaryBackground: palette.purplePrimary,
  },
  spacing: {
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
  },
  breakpoints: {
    phone: 0,
    tablet: 768,
  },
});

export type Theme = typeof theme;
export default theme;
```

有了这个主题样式对象之后，我们应该如何在项目中使用呢？

1. 在项目的`app.tsx`里面，用`ThemeProvider`包裹你的组件：

```tsx | pure
import { ThemeProvider } from '@shopify/restyle';
import theme from './theme';

const App = () => <ThemeProvider theme={theme}>{/* Rest of the app */}</ThemeProvider>;
```

### Colors 颜色

通常设计师会使用一个调色板（palette）来定义组件设计体系中涉及到的各种颜色。通常而言，我们不建议直接在主题里面使用颜色值，而是建议使用调色板中颜色对应的语义化的名字。

```js
// 定义一个调色板
const palette = {
  purpleLight: '#8C6FF7',
  purplePrimary: '#5A31F4',
  purpleDark: '#3F22AB',

  greenLight: '#56DCBA',
  greenPrimary: '#0ECD9D',
  greenDark: '#0A906E',

  black: '#0B0B0B',
  white: '#F0F2F3',
};

// 在主题中使用调色板里颜色对应的名字
const theme = createTheme({
  colors: {
    mainBackground: palette.white,
    mainForeground: palette.black,
    cardPrimaryBackground: palette.purplePrimary,
    buttonPrimaryBackground: palette.purplePrimary,
  },
});
```

_为什么选择使用调色板中颜色对应的名字更有好处呢？_

1. 很容易理解整个 APP 中在何处应用了颜色。
2. 如果调色板中颜色发生了改变，我们只需要把颜色名称对应的值改掉就可以了，不用去整个 APP 里找到颜色值并替换。比如把紫色换成了深黑色。

```js
const palette = {
  // ...
  // purpleDark: '#3F22AB', // 原值
  purpleDark: '#0B0B0B', // 改后的值
};
```

3. 如上面的主题中，`cardPrimaryBackground`和`buttonPrimaryBackground`虽然都指向的是同一个颜色，但是如果需要把`buttonPrimaryBackground`换成绿色，改动也是非常简单方便的。

```js
const theme = createTheme({
  colors: {
    // ...
    // buttonPrimaryBackground: palette.purplePrimary, // 原先值
    buttonPrimaryBackground: palette.greenPrimary, // 改后的值
  },
});
```

4. 可以在 APP 使用过程中自由地切换主题样式。

### Spacing 间距

间距是按照衣服尺寸定义的一些常量数值。示例如下：

```js
const theme = createTheme({
  spacing: {
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
  },
});
```

### Breakpoints 断点

断点是我们设置的为应用不同样式的不同目标屏幕尺寸的最小宽度。断点可以定义为单个值(width)，或者一个宽高值对象。示例如下：

```js
const theme = createTheme({
  breakpoints: {
    phone: 0,
    longPhone: {
      width: 0,
      height: 812,
    },
    tablet: 768,
    largeTablet: 1024,
  },
});
```

具体可以参见下面的[Responsive 响应式](#responsive-响应式)章节。

### 使用主题样式对象

借助`useTheme`，我们可以非常方便地在一个组件内使用主题内定义的内容。示例如下：

```tsx | pure
const Component = () => {
  const theme = useTheme<Theme>();
  const { cardPrimaryBackground } = theme.colors;
  // ...
};
```

_之所以不直接引入 theme 文件，是为了方便我们实现主题切换效果。_

### 内置的 Box/Text 组件

1. Box 组件：

Box 组件可以定义的属性由这几个大类组成：`backgroundColor`, `opacity`, `visible`, `layout`, `spacing`, `border`, `shadow`, `position`。具体大类里有哪些属性，可以参见下方的[Restyle Function](#restyle-functions)章节。

```tsx | pure
import { createBox } from '@shopify/restyle';
import { Theme } from './theme';

const Box = createBox<Theme>();

export default Box;
```

2. Text 组件：

Text 组件可以定义的属性由这几个大类组成：`color`, `opacity`, `visible`, `typography`, `textShadow`, `spacing`。具体大类里有哪些属性，可以参见下方的[Restyle Function](#restyle-functions)章节。

```tsx | pure
import { createText } from '@shopify/restyle';
import { Theme } from './theme';

const Text = createText<Theme>();

export default Text;
```

值得注意的是，Text 组件还可以接受一个`variant`属性，它对应的是 theme 对象里`textVariants`下的 key 值。

```tsx | pure
const theme = createTheme({
  ...,
  textVariants: {
    header: {
      fontWeight: 'bold',
      fontSize: 34,
      lineHeight: 42.5,
      color: 'black',
    },
    subheader: {
      fontWeight: '600',
      fontSize: 28,
      lineHeight: 36,
      color: 'black',
    },
    body: {
      fontSize: 16,
      lineHeight: 24,
      color: 'black',
    },
  },
});

// In a component
<Text variant="header">Header</Text>
```

### 自定义组件

如果我们想要自己创建一个类似`Box`和`Text`这样的组件，但是我们自己决定组件可以接受那些类别的属性，我们可以使用`createRestyleComponent`。示例如下：

```tsx | pure
import { createRestyleComponent, createVariant, spacing, SpacingProps, VariantProps } from '@shopify/restyle';
import { Theme } from './theme';

type Props = SpacingProps<Theme> & VariantProps<Theme, 'cardVariants'>;
const Card = createRestyleComponent<Props>([spacing, createVariant({ themeKey: 'cardVariants' })]);

export default Card;
```

如果觉得这还不够，也可以使用`useRestyle`这个 hooks 来实现更强大的定制功能。示例如下：

```tsx | pure
import { TouchableOpacity, View } from 'react-native';
import {
  useRestyle,
  spacing,
  border,
  backgroundColor,
  SpacingProps,
  BorderProps,
  BackgroundColorProps,
} from '@shopify/restyle';

import Text from './Text';
import { Theme } from './theme';

const restyleFunctions = [spacing, border, backgroundColor];
type Props = SpacingProps<Theme> &
  BorderProps<Theme> &
  BackgroundColorProps<Theme> & {
    onPress: () => void;
  };

const Button = ({ onPress, label, ...rest }: Props) => {
  const props = useRestyle(restyleFunctions, rest);

  return (
    <TouchableOpacity onPress={onPress}>
      <View {...props}>
        <Text variant="buttonLabel">{label}</Text>
      </View>
    </TouchableOpacity>
  );
};
```

### Restyle Functions

**Restyle Functions**把组件允许接受的属性做了一下分类，同时映射到主题对象，我们可以非常方便地使用他们来约束组件的属性以及快速开发基于主题对象的组件。

| 类别 | 属性 | 对应的主体对象 Key 值 |
| --- | --- | --- |
| backgroundColor | `backgroundColor` | `colors` |
| color | `color` | `colors` |
| opacity | `opacity` |  |
| visible | `display` |  |
| spacing | `margin`, `marginTop`, `marginRight`, `marginBottom`, `marginLeft`, `marginStart`, `marginEnd`, `marginHorizontal`, `marginVertical`, `padding`, `paddingTop`, `paddingRight`, `paddingBottom`, `paddingLeft`, `paddingStart`, `paddingEnd`, `paddingHorizontal`, `paddingVertical` | `spacing` |
| layout | `width`, `height`, `minWidth`, `maxWidth`, `minHeight`, `maxHeight`, `overflow`, `aspectRatio`, `alignContent`, `alignItems`, `alignSelf`, `justifyContent`, `flex`, `flexBasis`, `flexDirection`, `flexGrow`, `flexShrink`, `flexWrap` |  |
| position | `position`, `top`, `right`, `bottom`, `left`, `start`, `end` |  |
| position | `zIndex` | `zIndices` |
| border | `borderBottomWidth`, `borderLeftWidth`, `borderRightWidth`, `borderStartWidth`, `borderEndWidth`, `borderStyle`, `borderTopWidth`, `borderWidth` |  |
| border | `borderColor`, `borderTopColor`, `borderRightColor`, `borderLeftColor`, `borderStartColor`, `borderEndColor`, `borderBottomColor` | `colors` |
| border | `borderRadius`, `borderBottomLeftRadius`, `borderBottomRightRadius`, `borderBottomStartRadius`, `borderBottomEndRadius`, `borderTopLeftRadius`, `borderTopRightRadius`, `borderTopStartRadius`, `borderTopEndRadius` | `borderRadii` |
| shadow | `shadowOpacity`, `shadowOffset`, `shadowRadius`, `elevation` |  |
| shadow | `shadowColor` | `colors` |
| textShadow | `textShadowOffset`, `textShadowRadius` |  |
| textShadow | `textShadowColor` | `colors` |
| typography | `fontFamily`, `fontSize`, `fontStyle`, `fontWeight`, `letterSpacing`, `lineHeight`, `textAlign`, `textDecorationLine`, `textDecorationStyle`, `textTransform` |  |

### Variants

`variant` 是 `Restyle Function`的一种形式。它可以将一个属性映射到多个其他属性。`variant`需要对应到主题对象中的 key 值。示例如下：

```tsx | pure
// In theme
const theme = createTheme({
  // ...
  spacing: {
    s: 8,
    m: 16,
    l: 24,
  },
  colors: {
    cardRegularBackground: '#EEEEEE',
  },
  breakpoints: {
    phone: 0,
    tablet: 768,
  },
  cardVariants: {
    defaults: {
      // We can define defaults for the variant here.
      // This will be applied after the defaults passed to createVariant and before the variant defined below.
    },
    regular: {
      // We can refer to other values in the theme here, and use responsive props
      padding: {
        phone: 's',
        tablet: 'm',
      },
    }
    elevated: {
      padding: {
        phone: 's',
        tablet: 'm',
      },
      shadowColor: '#000',
      shadowOpacity: 0.2,
      shadowOffset: {width: 0, height: 5},
      shadowRadius: 15,
      elevation: 5,
    }
  }
})

import {createVariant, createRestyleComponent, VariantProps} from '@shopify/restyle'
const variant = createVariant<Theme>({themeKey: 'cardVariants', defaults: {
  margin: {
    phone: 's',
    tablet: 'm',
  },
  backgroundColor: 'cardRegularBackground',
}})

const Card = createRestyleComponent<VariantProps<Theme, 'cardVariants'>>([variant])

// variant的值必须是`cardVariants`对象下的key值。TypeScript会自动给我们提示。
<Card variant="elevated" />
```

### Responsive 响应式

我们通过在主题对象中定义 breakpoints（断点），来实现响应式效果。每个 Restyle 支持的属性都可以使用响应式写法来支持不同屏幕尺寸下的不同效果。示例如下：

```tsx | pure
const theme = createTheme({
  // ...
  breakpoints: {
    phone: 0,
    tablet: 768,
  }
})

// 用法1：不关心断点
<Box flexDirection="row" />

// 用法2：不同尺寸不同效果
<Box flexDirection={{ phone: 'column', tablet: 'row' }} />
```

另外，如果我们想要把一些属性跟响应式关联，我们可以借助`useResponsiveProp`这个 hooks。示例如下：

```tsx | pure
const Button = ({ color = { phone: 'purple', tablet: 'blue' }, ...restProps }) => {
  // 设备是phone的时候，值为purple；设备是tablet的时候，值为blue
  const textColorProp = useResponsiveProp(color);

  const bgColor = textColorProp === 'purple' ? 'lightPurple' : 'lightBlue';

  return (
    <Button backgroundColor={bgColor} {...restProps}>
      {/* 这里不需要转，因为Text会自动转 */}
      <Text color={color}>click me</Text>
      <ActivityIndicator color={theme.colors[textColorProp]} />
    </Button>
  );
};
```

### 主题切换

基于`Restyle`实现主题切换效果很简单，我们只需要提供两套或者多套不同的主题即可。因为主题中并没有直接使用颜色，而是使用的调色板中的颜色，所以我们可以自由地切换主题。比如我们想要实现暗黑模式，示例如下：

```tsx | pure
// 定义主题对象
export const palette = {
  purple: '#5A31F4',
  white: '#FFF',
  black: '#111',
  darkGray: '#333',
  lightGray: '#EEE',
};

const theme = createTheme({
  spacing: {
    s: 8,
    m: 16,
  },
  colors: {
    mainBackground: palette.lightGray,
    mainForeground: palette.black,

    primaryCardBackground: palette.purple,
    secondaryCardBackground: palette.white,
    primaryCardText: palette.white,
    secondaryCardText: palette.black,
  },
  breakpoints: {},
  textVariants: {
    body: {
      fontSize: 16,
      lineHeight: 24,
      color: 'mainForeground',
    },
  },
  cardVariants: {
    primary: {
      backgroundColor: 'primaryCardBackground',
      shadowOpacity: 0.3,
    },
    secondary: {
      backgroundColor: 'secondaryCardBackground',
      shadowOpacity: 0.1,
    },
  },
});

type Theme = typeof theme;

// 定义暗黑主题。区别只是颜色不一样。
const darkTheme: Theme = {
  ...theme,
  colors: {
    ...theme.colors,
    mainBackground: palette.black,
    mainForeground: palette.white,

    secondaryCardBackground: palette.darkGray,
    secondaryCardText: palette.white,
  },
};

// 组件中使用
const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  return (
    <ThemeProvider theme={darkMode ? darkTheme : theme}>
      <Box padding="m" backgroundColor="mainBackground" flex={1}>
        <Box backgroundColor="primaryCardBackground" margin="s" padding="m" flexGrow={1}>
          <Text variant="body" color="primaryCardText">
            Primary Card
          </Text>
        </Box>
        <Box backgroundColor="secondaryCardBackground" margin="s" padding="m" flexGrow={1}>
          <Text variant="body" color="secondaryCardText">
            Secondary Card
          </Text>
        </Box>
        <Box marginTop="m">
          <Switch value={darkMode} onValueChange={(value: boolean) => setDarkMode(value)} />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default App;
```
