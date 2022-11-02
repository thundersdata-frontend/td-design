---
title: ListItem - 列表展示项组件
nav:
  title: RN组件
  path: /react-native
group:
  title: Display
  path: /display
---

# ListItem 列表展示项组件

## 效果演示

### 1. 默认效果

```jsx | pure

<ListItem
  title="主标题主标题主标题主标题主标题主标题"
  onPress={() => { console.log(111);}}
/>
<ListItem title="主标题主标题主标题主标题主标题主标题" brief="主标题下面的副标题主标题下面的副标题" />

```

<center>
  <figure>
    <img
      alt="listItem-ios1.png"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1643179745264648352.png"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 2. 左侧添加缩略图、右侧添加图片效果

```jsx | pure
<ListItem title="主标题" brief="主标题下面的副标题" thumb={imgUrl} />
<ListItem
  title="extra为Image"
  thumb={imgUrl}
  extra={
    <Image
      source={{
        uri: imgUrl,
      }}
      style={{ width: 50, height: 50 }}
    />
  }
/>
```

<center>
  <figure>
    <img
      alt="listItem-ios2.png"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1643179903725799716.png"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 3. 右侧组件自定义和指定箭头方向效果

```jsx | pure
<ListItem title="主标题" extra={<Switch />} />
<ListItem title="主标题" brief="主标题下面的副标题" arrow="down" />
<ListItem title="主标题" brief="主标题下面的副标题" arrow="horizontal" />
<ListItem title="主标题" brief="主标题下面的副标题" arrow="up" />
```

<center>
  <figure>
    <img
      alt="listItem-ios3.png"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1643180063998650000.png"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 4. 右侧文字换行和过长省略效果、以及添加 required 效果

```jsx | pure
<ListItem title="长内容" wrap extra="httpsos.alipayobjects.com/rmsportal/mOoPurdIfmcuqtr.png" required />
<ListItem title="长内容" extra="httpsos.alipayobjects.com/rmsportal/mOoPurdIfmcuqtr.png" arrow="horizontal" />
```

<center>
  <figure>
    <img
      alt="listItem-ios5.png"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1643180141868574568.png"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

## API

| 属性      | 必填    | 说明                       | 类型                                          | 默认值  |
| --------- | ------- | -------------------------- | --------------------------------------------- | ------- |
| title     | `true`  | 主标题                     | `ReactNode`                                   |         |
| brief     | `false` | 主标题下面的副标题         | `ReactNode`                                   |         |
| extra     | `false` | 右面的文字或组件           | `ReactNode`                                   |         |
| thumb     | `false` | 缩略图                     | `ReactNode`                                   |         |
| onPress   | `false` | 按下的回调函数             | `() => void`                                  |         |
| minHeight | `false` | 最小高度                   | `number`                                      |         |
| style     | `false` | 自定义 style               | `ViewStyle`                                   |         |
| required  | `false` | 是否必填，必填显示红色\*号 | `boolean`                                     | `false` |
| wrap      | `false` | 是否折行                   | `boolean`                                     | `false` |
| arrow     | `false` | 右侧箭头指示方向           | `horizontal` \| `down` \| `up` \| `ReactNode` |         |
