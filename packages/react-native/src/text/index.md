---
title: Text - 文本组件
nav:
  title: RN组件
  path: /react-native
group:
  title: Basic
  path: /basic
---

# Text 文本组件

文本组件主要基于`restyle`封装，替换`react-native`默认的`Text`组件。

## 效果演示

### 1. 字体大小 32

```tsx | pure
<Text fontSize={32}>你好，我是文字</Text>
```

<center>
  <div style="display:flex; width: 750px">
    <div style="width: 375px;">IOS效果图</div>
    <div style="width: 375px;">Android效果图</div>
  </div>
</center>
<center>
  <figure>
    <img
      alt="text-ios1"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1607501774750024490.png"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt="text-android1"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609143322836430262.png"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 2. 颜色为蓝色，字体加粗

```tsx | pure
<Text fontSize={30} color="primaryColor" fontWeight="bold">
  你好，我是文字
</Text>
```

<center>
  <div style="display:flex; width: 750px">
    <div style="width: 375px;">IOS效果图</div>
    <div style="width: 375px;">Android效果图</div>
  </div>
</center>
<center>
  <figure>
    <img
      alt="text-ios2"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1607501844581287741.png"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt="text-android2"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609143322818380706.png"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 3. variant 使用示例

```tsx | pure
<Text variant="primaryBody">你好，我是文字</Text>
```

`primaryBody`在`Theme`里面的定义为：

```tsx | pure
primaryBody: {
  fontSize: 16,
  color: 'primaryTextColor',
},
```

<center>
  <div style="display:flex; width: 750px">
    <div style="width: 375px;">IOS效果图</div>
    <div style="width: 375px;">Android效果图</div>
  </div>
</center>
<center>
  <figure>
    <img
      alt="text-ios3"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1607502418897079606.png"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt="text-android3"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609143322818533900.png"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

## API

除样式属性外，其他属性和`TextProps`保持一致。样式属性基于`restyle`，把原来用`style`包裹的属性展平，同时采用`Theme`里面定义的约束。

### 特有属性

| 属性    | 必填    | 说明                                                 | 类型     | 默认值 |
| ------- | ------- | ---------------------------------------------------- | -------- | ------ |
| variant | `false` | 取值为定义在`Theme`里的`textVariants`对象里的 key 值 | `string` |        |

### 文本属性

定义参见：[https://reactnative.dev/docs/text-style-props](https://reactnative.dev/docs/text-style-props)

| 属性                | 必填    | 说明                                      | 类型      | 默认值 |
| ------------------- | ------- | ----------------------------------------- | --------- | ------ |
| color               | `false` | 文本颜色。取值为 Theme 里面的`colors`     | `string`  |        |
| opacity             | `false` | 透明度。取值 0 - 1                        | `number`  | `1`    |
| visible             | `false` | 是否可见                                  | `boolean` | `true` |
| fontFamily          | `false` |                                           |           |        |
| fontSize            | `false` |                                           |           |        |
| fontStyle           | `false` |                                           |           |        |
| fontWeight          | `false` |                                           |           |        |
| letterSpacing       | `false` |                                           |           |        |
| lineHeight          | `false` |                                           |           |        |
| textAlign           | `false` |                                           |           |        |
| textDecorationLine  | `false` |                                           |           |        |
| textDecorationStyle | `false` |                                           |           |        |
| textTransform       | `false` |                                           |           |        |
| textShadowOffset    | `false` |                                           |           |        |
| textShadowRadius    | `false` |                                           |           |        |
| textShadowColor     | `false` | 文本阴影颜色。取值为 Theme 里面的`colors` |           |        |

### 内边距、外边距相关属性

取值为 Theme 里面的`spacing`。

定义参见：[https://reactnative.dev/docs/layout-props](https://reactnative.dev/docs/layout-props)

| 属性              | 必填    | 说明 | 类型 | 默认值 |
| ----------------- | ------- | ---- | ---- | ------ |
| margin            | `false` |      |      |        |
| marginStart       | `false` |      |      |        |
| marginEnd         | `false` |      |      |        |
| marginHorizontal  | `false` |      |      |        |
| marginVertical    | `false` |      |      |        |
| marginLeft        | `false` |      |      |        |
| marginRight       | `false` |      |      |        |
| marginBottom      | `false` |      |      |        |
| marginTop         | `false` |      |      |        |
| padding           | `false` |      |      |        |
| paddingStart      | `false` |      |      |        |
| paddingEnd        | `false` |      |      |        |
| paddingHorizontal | `false` |      |      |        |
| paddingVertical   | `false` |      |      |        |
| paddingLeft       | `false` |      |      |        |
| paddingRight      | `false` |      |      |        |
| paddingBottom     | `false` |      |      |        |
| paddingTop        | `false` |      |      |        |

## 文字内置样式（variant）

| variant  | 说明         | 字体大小 | 字体颜色      |
| -------- | ------------ | -------- | ------------- |
| title1   | 主标题-1     | 18       | primaryText_1 |
| title2   | 主标题-2     | 18       | primaryText_2 |
| content1 | 内容性文字-1 | 16       | contentText_1 |
| content2 | 内容性文字-2 | 16       | contentText_2 |
| content3 | 内容性文字-3 | 14       | contentText_3 |
| content4 | 内容性文字-4 | 14       | contentText_4 |
| content5 | 内容性文字-5 | 12       | contentText_5 |
| hint1    | 提示性文字-1 | 16       | hintText_1    |
| hint2    | 提示性文字-2 | 16       | hintText_2    |
| hint3    | 提示性文字-3 | 14       | hintText_3    |
| hint4    | 提示性文字-4 | 14       | hintText_4    |
| hint5    | 提示性文字-5 | 14       | hintText_5    |
| warn     | 警示性文字   | 16       | warningText   |
| support1 | 辅助性文字-1 | 12       | supportText_1 |
| support2 | 辅助性文字-2 | 10       | supportText_2 |
| support3 | 辅助性文字-3 | 10       | supportText_3 |
| support4 | 辅助性文字-4 | 10       | supportText_4 |
| date1    | 日期-1       | 18       | dateText_1    |
| date2    | 日期-2       | 14       | dateText_2    |
| number1  | 数字-1       | 14       | numberText_1  |
| number2  | 数字-2       | 8        | numberText_2  |
| number3  | 数字-3       | 24       | numberText_3  |
| number4  | 数字-4       | 14       | numberText_4  |
| number5  | 数字-5       | 14       | numberText_5  |

## 文字内置颜色

| 颜色名        | 说明         | 亮色模式             | 暗色模式                  |
| ------------- | ------------ | -------------------- | ------------------------- |
| primaryText_1 | 主标题-1     | `palette.dark`       | `darkPalette.darkWhite`   |
| primaryText_2 | 主标题-2     | `palette.white`      | `darkPalette.white`       |
| contentText_1 | 内容性文字-1 | `palette.dark`       | `darkPalette.darkWhite`   |
| contentText_2 | 内容性文字-2 | `palette.white`      | `darkPalette.white`       |
| contentText_3 | 内容性文字-3 | `palette.dark`       | `darkPalette.darkWhite`   |
| contentText_4 | 内容性文字-4 | `palette.mediumDark` | `darkPalette.mediumWhite` |
| contentText_5 | 内容性文字-5 | `palette.mediumDark` | `darkPalette.mediumWhite` |
| hintText_1    | 提示性文字-1 | `palette.mediumDark` | `darkPalette.mediumWhite` |
| hintText_2    | 提示性文字-2 | `palette.blue`       | `darkPalette.blue`        |
| hintText_3    | 提示性文字-3 | `palette.blue`       | `darkPalette.blue`        |
| hintText_4    | 提示性文字-4 | `palette.pink`       | `darkPalette.pink`        |
| hintText_5    | 提示性文字-5 | `palette.orange`     | `darkPalette.orange`      |
| warningText   | 警示性文字   | `palette.red`        | `darkPalette.red`         |
| supportText_1 | 辅助性文字-1 | `palette.lightDark`  | `darkPalette.lightWhite`  |
| supportText_2 | 辅助性文字-2 | `palette.lightDark`  | `darkPalette.lightWhite`  |
| supportText_3 | 辅助性文字-3 | `palette.white`      | `darkPalette.white`       |
| supportText_4 | 辅助性文字-4 | `palette.blue`       | `darkPalette.blue`        |
| dateText_1    | 日期-1       | `palette.dark`       | `darkPalette.darkWhite`   |
| dateText_2    | 日期-2       | `palette.dark`       | `darkPalette.darkWhite`   |
| numberText_1  | 数字-1       | `palette.blue`       | `darkPalette.blue`        |
| numberText_2  | 数字-2       | `palette.white`      | `darkPalette.white`       |
| numberText_3  | 数字-3       | `palette.dark`       | `darkPalette.darkWhite`   |
| numberText_4  | 数字-4       | `palette.mediumGray` | `darkPalette.gray`        |
| numberText_5  | 数字-5       | `palette.dark`       | `darkPalette.darkWhite`   |

_palette 和 darkPalette 的定义详见[内置主题](/react-native/theme)_
