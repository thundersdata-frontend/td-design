---
title: Text - 文本组件
nav:
  title: RN组件
  path: /react-native
group:
  title: Global
  path: /global
---

# Text 文本组件

文本组件主要基于`restyle`封装，替换`react-native`默认的`Text`组件。

## 效果演示

### 1. 字体大小 32

```tsx | pure
<Text fontSize={32} />
```

<center>
  <div style={{ display: 'flex', width: 750 }}>
    <div style={{ width: 375 }}>IOS效果图</div>
    <div style={{ width: 375 }}>Android效果图</div>
  </div>
</center>
<center>
  <figure>
    <img
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1607501774750024490.png"
      style={{ width: 375, marginRight: 10, border: "1px solid #ddd" }}
    />
    <img
      alt=""
      src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1607430991524&di=24c0bf75a6d0efeff1c48e13829eca72&imgtype=0&src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201308%2F23%2F220651x9b0h4kru904ozre.jpg"
      style={{ width: 375, border: "1px solid #ddd" }}
    />
  </figure>
</center>

### 2. 颜色为蓝色，字体加粗

```tsx | pure
<Text fontSize={30} color="primaryColor" fontWeight="800">
  你好，我是文字
</Text>
```

<center>
  <div style={{ display: 'flex', width: 750 }}>
    <div style={{ width: 375 }}>IOS效果图</div>
    <div style={{ width: 375 }}>Android效果图</div>
  </div>
</center>
<center>
  <figure>
    <img
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1607501844581287741.png"
      style={{ width: 375, marginRight: 10, border: "1px solid #ddd" }}
    />
    <img
      alt=""
      src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1607430991524&di=24c0bf75a6d0efeff1c48e13829eca72&imgtype=0&src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201308%2F23%2F220651x9b0h4kru904ozre.jpg"
      style={{ width: 375, border: "1px solid #ddd" }}
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
  fontFamily: 'SourceHanSansCN-Regular',
  fontSize: 16,
  color: 'primaryTextColor',
},
```

<center>
  <div style={{ display: 'flex', width: 750 }}>
    <div style={{ width: 375 }}>IOS效果图</div>
    <div style={{ width: 375 }}>Android效果图</div>
  </div>
</center>
<center>
  <figure>
    <img
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1607502418897079606.png"
      style={{ width: 375, marginRight: 10, border: "1px solid #ddd" }}
    />
    <img
      alt=""
      src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1607430991524&di=24c0bf75a6d0efeff1c48e13829eca72&imgtype=0&src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201308%2F23%2F220651x9b0h4kru904ozre.jpg"
      style={{ width: 375, border: "1px solid #ddd" }}
    />
  </figure>
</center>

## API

除样式属性外，其他属性和`TextProps`保持一致。样式属性基于`restyle`，把原来用`style`包裹的属性展平，同时采用`Theme`里面定义的约束。

### 特有属性

| 属性    | 必填    | 说明                                                 | 类型   | 默认值 |
| ------- | ------- | ---------------------------------------------------- | ------ | ------ |
| variant | `false` | 取值为定义在`Theme`里的`textVariants`对象里的 key 值 | string |        |

### 文本属性

定义参见：[https://reactnative.dev/docs/text-style-props](https://reactnative.dev/docs/text-style-props)

| 属性                | 必填    | 说明                                      | 类型    | 默认值 |
| ------------------- | ------- | ----------------------------------------- | ------- | ------ |
| color               | `false` | 文本颜色。取值为 Theme 里面的`colors`     | string  |        |
| opacity             | `false` | 透明度。取值 0 - 1                        | number  | `1`    |
| visible             | `false` | 是否可见                                  | boolean | `true` |
| fontFamily          | `false` |                                           |         |        |
| fontSize            | `false` |                                           |         |        |
| fontStyle           | `false` |                                           |         |        |
| fontWeight          | `false` |                                           |         |        |
| letterSpacing       | `false` |                                           |         |        |
| lineHeight          | `false` |                                           |         |        |
| textAlign           | `false` |                                           |         |        |
| textDecorationLine  | `false` |                                           |         |        |
| textDecorationStyle | `false` |                                           |         |        |
| textTransform       | `false` |                                           |         |        |
| textShadowOffset    | `false` |                                           |         |        |
| textShadowRadius    | `false` |                                           |         |        |
| textShadowColor     | `false` | 文本阴影颜色。取值为 Theme 里面的`colors` |         |        |

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
