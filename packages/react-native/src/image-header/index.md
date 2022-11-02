---
title: ImageHeader - 图片头部组件
nav:
  title: RN组件
  path: /react-native
group:
  title: Display
  path: /display
---

# ImageHeader 图片头部组件

## 效果演示

### 1. 普通 ImageHeader

```tsx | pure
<ImageHeader headerBackgroundImg={require('../../assets/images/bg_rank.png')} headerHeight={px(161)} {...props}>
  <Flex justifyContent="center" backgroundColor="white" height={100}>
    <Text>111</Text>
  </Flex>
</ImageHeader>
```

<center>
  <figure>
    <img
      alt="header-ios1.png"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609999430064140139.png"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 2. ImageHeader 配置 left、right 和 headerLeftColor

```tsx | pure
<ImageHeader
  headerBackgroundImg={require('../../assets/images/bg_rank.png')}
  headerHeight={px(161)}
  headerLeftColor={theme.colors.white}
  headerLeft="返回"
  headerRight={<Icon name="delete" size={px(20)} color={theme.colors.white} />}
  {...props}
>
  <Flex justifyContent="center" backgroundColor="white" height={100}>
    <Text>111</Text>
  </Flex>
</ImageHeader>
```

<center>
  <figure>
    <img
      alt="header-ios2.png"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609999550703021067.png"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 3. ImageHeader 配置 headerBackgroundColor

```tsx | pure
<ImageHeader
  headerBackgroundImg={require('../../assets/images/bg_rank.png')}
  headerHeight={px(161)}
  headerBackgroundColor={theme.colors.white}
  headerLeft="返回"
  headerRight={<Icon name="delete" size={px(20)} color={theme.colors.white} />}
  {...props}
>
  <Flex justifyContent="center" height={100}>
    <Text>111</Text>
  </Flex>
</ImageHeader>
```

<center>
  <figure>
    <img
      alt="header-ios3.png"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1610000705310241428.png"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 4. AnimatedHeader

```tsx | pure
import { useScrollHandler } from 'react-native-redash';
import Animated from 'react-native-reanimated';

export default () => {
  const { scrollHandler, y } = useScrollHandler();

  return (
    <AnimateHeader
        scrollY={y}
        scrollHeight={200}
        headerTitle="测试啊啊啊啊啊"
        headerLeft="返回"
        headerBackgroundColor={theme.colors.white}
        {...props}
        headerRight={
          <TouchableOpacity activeOpacity={0.5} onPress={() => props.navigation.goBack()}>
            <Icon name="delete" size={px(20)} color={theme.colors.primaryColor} />
          </TouchableOpacity>
        }
      />
      <Animated.ScrollView {...scrollHandler}>
        <ImageHeader
          headerBackgroundImg={require('../../assets/images/bg_rank.png')}
          headerHeight={px(161)}
          headerLeftColor={theme.colors.white}
          headerRight={
            <TouchableOpacity activeOpacity={0.5} onPress={() => props.navigation.goBack()}>
              <Icon name="delete" size={px(20)} color={theme.colors.primaryColor} />
            </TouchableOpacity>
          }
          {...props}
        >
          <Flex justifyContent="center" height={100}>
            <Text>111</Text>
          </Flex>
        </ImageHeader>
        <Box width={200} height={900} />
      </Animated.ScrollView>
  )
}
```

<center>
  <figure>
    <img
      alt="header-ios4.gif"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1608877076955547998.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

## ImageHeader 组件 API

| 属性                  | 必填    | 说明                 | 类型                  | 默认值                      |
| --------------------- | ------- | -------------------- | --------------------- | --------------------------- |
| headerTitle           | `false` | 头部文字             | `ReactNode`           |                             |
| headerRight           | `false` | 头部右侧内容         | `ReactNode`           |                             |
| headerLeft            | `false` | 头部左侧内容         | `ReactNode`           |                             |
| headerLeftColor       | `false` | 左侧返回键和字体颜色 | `string`              | `theme.colors.primaryColor` |
| headerBackgroundColor | `false` | 头部背景颜色         | `string`              | `transparent`               |
| headerBackgroundImg   | `true`  | 头部背景图片         | `ImageSourcePropType` |                             |
| headerHeight          | `false` | 头部高度             | `number`              |                             |
| onPress               | `false` | 左边图标点击事件     | `() => void`          |                             |
| showLeft              | `false` | 是否显示左边图标     | `boolean`             | `true`                      |

## AnimateHeader 组件 API

| 属性 | 必填 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- | --- |
| headerTitle | `true` | 头部文字 | `string` |  |
| headerTitleStyle | `false` | 头部文字样式 | `TextStyle` |  |
| scrollY | `false` | 滚动距离 | `Animated.SharedValue<number>` | `0` |
| scrollHeight | `false` | 纵向滚动到哪个值时显示 `ImageHeader` | `number` | `300` |
| headerHeight | `true` | 头部高度 | `number` |  |
| headerRight | `false` | 头部右侧内容 | `ReactNode` |  |
| headerLeft | `false` | 头部左侧内容 | `ReactNode` |  |
| headerLeftColor | `false` | 左侧返回键和字体颜色 | `string` | `theme.colors.primaryColor` |
| headerBackgroundColor | `false` | 头部背景颜色 | `string` | `transparent` |
| onPress | `false` | 左边按钮点击事件 | `() => void` |  |
| showLeft | `false` | 是否显示左边图标 | `boolean` | `true` |
