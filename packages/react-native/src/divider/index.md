---
title: Divider - 分割线组件
nav:
  title: RN组件
  path: /react-native
group:
  title: Global
  path: /global
---

# Divider 分割线组件

## 效果演示

### 1. 垂直方向

```tsx | pure
<View style={{ height: 50, backgroundColor: 'red' }} />
<Divider />
<View style={{ height: 50, backgroundColor: 'gold' }} />
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
      alt="divider-ios1"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1607504615783880351.png"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt="divider-android1"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609142109636093905.png"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 2. 水平方向

```tsx | pure
<Flex>
  <View style={{ width: 150, height: 50, backgroundColor: 'red' }} />
  <Divider type="horizontal" />
  <View style={{ width: 150, height: 50, backgroundColor: 'gold' }} />
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
      alt="divider-ios2"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1607505755816802599.png"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt="divider-android2"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609142114900384432.png"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 3. 分隔线颜色和外边距

```tsx | pure
<Flex>
  <View style={{ width: 150, height: 50, backgroundColor: 'red' }} />
  <Divider type="horizontal" horizontalHeight={50} color="red" margin="xl" />
  <View style={{ width: 150, height: 50, backgroundColor: 'gold' }} />
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
      alt="divider-ios3"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1607505847133022201.png"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt="divider-android3"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609142119059018489.png"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

## API

| 属性 | 必填 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- | --- |
| type | `false` | 分隔线类型 | `horizontal` \| `vertical` | `vertical` |
| horizontalHeight | `false` | 水平时分隔线的高度 | `number` | `12` |
| color | `false` | 分隔线颜色 | `string` | `#bbbbbb` |
| margin | `false` | 水平时为上下外边距，垂直时为左右外边距 | `xxs` \| `xs` \| `s` \| `m` \| `l` \| `xl` \| `xxl` | `xs` |
