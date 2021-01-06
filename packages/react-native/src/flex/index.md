---
title: Flex - 布局组件
nav:
  title: RN组件
  path: /react-native
group:
  title: Layout
  path: /layout
  order: 2
---

# Flex 布局组件

Flex 是 CSS flex 布局的一个封装。

## 效果演示

### 1. 水平方向

```tsx | pure
<Flex>
  <View style={{ width: 100, height: 50, backgroundColor: 'red' }} />
  <View style={{ width: 100, height: 50, backgroundColor: 'green' }} />
  <View style={{ width: 100, height: 50, backgroundColor: 'gold' }} />
</Flex>
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
      alt="flex-ios1.png"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1607515191492106546.png"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt="flex-android1.png"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609145176538855969.png"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 2. 垂直方向

```tsx | pure
<Flex flexDirection="column">
  <View style={{ width: 100, height: 50, backgroundColor: 'red' }} />
  <View style={{ width: 100, height: 50, backgroundColor: 'green' }} />
  <View style={{ width: 100, height: 50, backgroundColor: 'gold' }} />
</Flex>
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
      alt="flex-ios2.png"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1607515262409907926.png"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt="flex-android2.png"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609145176543989451.png"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 3. 内容居中

```tsx | pure
<Flex flex={1} justifyContent="center" alignItems="center">
  <View style={{ width: 100, height: 50, backgroundColor: 'red' }} />
  <View style={{ width: 100, height: 50, backgroundColor: 'green' }} />
  <View style={{ width: 100, height: 50, backgroundColor: 'gold' }} />
</Flex>
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
      alt="flex-ios3.png"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1607515318334231753.png"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt="flex-android3.png"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609145176535385058.png"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 4. 自动换行

```tsx | pure
<Flex flexWrap="wrap">
  <View style={{ width: '30%', height: 50, backgroundColor: 'red' }} />
  <View style={{ width: '30%', height: 50, backgroundColor: 'green' }} />
  <View style={{ width: '30%', height: 50, backgroundColor: 'gold' }} />
  <View style={{ width: '30%', height: 50, backgroundColor: 'blue' }} />
</Flex>
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
      alt="flex-ios4.png"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609148595858116753.png"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt="flex-android4.png"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609148491287716377.png"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

## API

### 基本属性

| 属性            | 必填    | 说明                                | 类型        | 默认值 |
| --------------- | ------- | ----------------------------------- | ----------- | ------ |
| backgroundColor | `false` | 背景色。取值为 Theme 里面的`colors` | string      |        |
| style           | `false` | 样式                                | `ViewStyle` |        |

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

### Flex.Item

Flex.Item 组件默认加上了样式`flex:1`,保证所有 item 平均分宽度, Flex 容器的 children 不一定是 Flex.Item。
