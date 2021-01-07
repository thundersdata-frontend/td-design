---
title: Box - 盒子组件
nav:
  title: RN组件
  path: /react-native
group:
  title: Global
  path: /global
  order: 1
---

# Box 盒子组件

基于`restyle`，除样式属性外继承`ViewProps`。

## 效果演示

### 1. 背景为蓝色的正方形

```tsx | pure
<Box width={200} height={200} backgroundColor="primaryColor" margin="m" />
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
      alt="box-ios1"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1607493786211498786.png"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt="box-android1"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609141288367486660.png"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 2. 居中显示文本

```tsx | pure
<Box width={200} height={200} borderWidth={1} borderColor="borderColor" justifyContent="center" alignItems="center">
  <Text>Hello, Box</Text>
</Box>
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
      alt="box-ios2"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1607493903256997162.png"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt="box-android2"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609141295118070763.png"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

## API

除样式属性外，其他属性和`ViewProps`保持一致。样式属性基于`restyle`，把原来用`style`包裹的属性展平，同时采用`Theme`里面定义的约束。具体如下：

### 一般属性

定义参见：[https://reactnative.dev/docs/layout-props](https://reactnative.dev/docs/layout-props)

| 属性            | 必填    | 说明                                | 类型      | 默认值 |
| --------------- | ------- | ----------------------------------- | --------- | ------ |
| backgroundColor | `false` | 背景色。取值为 Theme 里面的`colors` | `string`  |        |
| opacity         | `false` | 透明度。取值 0 - 1                  | `number`  | `1`    |
| visible         | `false` | 是否可见                            | `boolean` | `true` |

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

### 宽高布局相关属性

定义参见：[https://reactnative.dev/docs/layout-props](https://reactnative.dev/docs/layout-props)

| 属性           | 必填    | 说明 | 类型 | 默认值 |
| -------------- | ------- | ---- | ---- | ------ |
| width          | `false` |      |      |        |
| minWidth       | `false` |      |      |        |
| maxWidth       | `false` |      |      |        |
| height         | `false` |      |      |        |
| maxHeight      | `false` |      |      |        |
| minHeight      | `false` |      |      |        |
| flex           | `false` |      |      |        |
| flexDirection  | `false` |      |      |        |
| flexBasis      | `false` |      |      |        |
| flexGrow       | `false` |      |      |        |
| flexShrink     | `false` |      |      |        |
| flexWrap       | `false` |      |      |        |
| alignContent   | `false` |      |      |        |
| alignItems     | `false` |      |      |        |
| alignSelf      | `false` |      |      |        |
| justifyContent | `false` |      |      |        |
| aspectRatio    | `false` |      |      |        |
| overflow       | `false` |      |      |        |

### 定位相关属性

定义参见：[https://reactnative.dev/docs/layout-props](https://reactnative.dev/docs/layout-props)

| 属性     | 必填    | 说明 | 类型 | 默认值 |
| -------- | ------- | ---- | ---- | ------ |
| position | `false` |      |      |        |
| start    | `false` |      |      |        |
| end      | `false` |      |      |        |
| left     | `false` |      |      |        |
| right    | `false` |      |      |        |
| bottom   | `false` |      |      |        |
| top      | `false` |      |      |        |
| zIndex   | `false` |      |      |        |

### 边框相关属性

定义参见：[https://reactnative.dev/docs/view-style-props](https://reactnative.dev/docs/view-style-props)

| 属性                    | 必填    | 说明 | 类型 | 默认值 |
| ----------------------- | ------- | ---- | ---- | ------ |
| borderWidth             | `false` |      |      |        |
| borderLeftWidth         | `false` |      |      |        |
| borderRightWidth        | `false` |      |      |        |
| borderBottomWidth       | `false` |      |      |        |
| borderTopWidth          | `false` |      |      |        |
| borderStartWidth        | `false` |      |      |        |
| borderEndWidth          | `false` |      |      |        |
| borderStyle             | `false` |      |      |        |
| borderColor             | `false` |      |      |        |
| borderStartColor        | `false` |      |      |        |
| borderEndColor          | `false` |      |      |        |
| borderLeftColor         | `false` |      |      |        |
| borderRightColor        | `false` |      |      |        |
| borderBottomColor       | `false` |      |      |        |
| borderTopColor          | `false` |      |      |        |
| borderRadius            | `false` |      |      |        |
| borderBottomStartRadius | `false` |      |      |        |
| borderBottomEndRadius   | `false` |      |      |        |
| borderBottomLeftRadius  | `false` |      |      |        |
| borderBottomRightRadius | `false` |      |      |        |
| borderTopStartRadius    | `false` |      |      |        |
| borderTopEndRadius      | `false` |      |      |        |
| borderTopLeftRadius     | `false` |      |      |        |
| borderTopRightRadius    | `false` |      |      |        |

### 阴影相关属性

定义参见：[https://reactnative.dev/docs/shadow-props](https://reactnative.dev/docs/shadow-props)

| 属性          | 必填    | 说明 | 类型 | 默认值 |
| ------------- | ------- | ---- | ---- | ------ |
| elevation     | `false` |      |      |        |
| shadowOffset  | `false` |      |      |        |
| shadowOpacity | `false` |      |      |        |
| shadowRadius  | `false` |      |      |        |
| shadowColor   | `false` |      |      |        |
