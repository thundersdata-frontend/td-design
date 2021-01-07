---
title: CollapseText - 文本折叠组件
nav:
  title: RN组件
  path: /react-native
group:
  title: Interaction
  path: /interaction
---

# CollapseText 文本折叠组件

## 效果演示

### 1. 默认效果

```tsx | pure
const text = `我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内
  我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容
  我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容
  我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容
  我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容
  我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容
  我是内容我是内容我是内容我是内容我是内容我是内容我是内容`;

<CollapseText text={text} defaultNumberOfLines={3} lineHeight={px(20)} />;
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
      alt="collapseText-ios1.gif"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1608113460423595271.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt="collapseText-android.gif"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609296901535957817.gif"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 2. 自定义样式

```tsx | pure
const text = `我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内
  我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容
  我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容
  我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容
  我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容
  我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容
  我是内容我是内容我是内容我是内容我是内容我是内容我是内容`;

<CollapseText
  text={text}
  defaultNumberOfLines={3}
  lineHeight={px(20)}
  textStyle={{ color: 'red', fontSize: px(16) }}
  textContainerStyle={{ marginHorizontal: px(10) }}
  expandStyle={{ color: 'gold', fontSize: px(16) }}
/>;
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
      alt="collapseText-ios2.gif"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1608115028918829687.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt="collapseText-android2.gif"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609296901539280656.gif"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

## API

| 属性                 | 必填    | 说明                | 类型        | 默认值 |
| -------------------- | ------- | ------------------- | ----------- | ------ |
| text                 | `true`  | 文本                | `string`    |        |
| duration             | `false` | 展开/收起时长       | `number`    | `400`  |
| defaultNumberOfLines | `false` | 默认展示行数        | `number`    | `2`    |
| lineHeight           | `false` | 每行文本高度        | `number`    | `18`   |
| textStyle            | `false` | 文本样式            | `TextStyle` |        |
| textContainerStyle   | `false` | 文本容器样式        | `ViewStyle` |        |
| expandText           | `false` | 展开时候的文本      | `string`    | `展开` |
| unExpandText         | `false` | 收起时候的文本      | `string`    | `收起` |
| expandStyle          | `false` | 展开/收起文本的样式 | `TextStyle` |        |
