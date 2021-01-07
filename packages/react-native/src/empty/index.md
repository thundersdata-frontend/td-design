---
title: Empty - 暂无数据组件
nav:
  title: RN 组件
  path: /react-native
group:
  title: Display
  path: /display
---

# Empty 暂无数据组件

## 效果演示

### 1. 默认效果

```tsx | pure
<Empty isEmpty />
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
      alt="empty-ios1.png"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1608965868945089384.png"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt="empty-android1.png"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609207889427734531.png"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 2. 自定义图片

```tsx | pure
<Empty isEmpty img={<Image source={require('../../assets/img/pic_empty.png')}></Image>} />
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
      alt="empty-ios2.png"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1608965871444745145.png"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt="empty-android2.png"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609207889434958690.png"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 3. 有数据时

```tsx | pure
<Empty backgroundColor="backgroundColor1" height={200}>
  <Text>11</Text>
</Empty>
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
      alt="empty-ios3.png"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1608965876474820801.png"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt="empty-android3.png"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609207889432111874.png"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 4. 是否填充对比

```tsx | pure
<View>
  <Box width={200} height={200}>
    <Empty isEmpty backgroundColor="backgroundColor1" imgStyle={{ width: 100, height: 100 }} />
  </Box>
  <WhiteSpace />
  <Box width={200} height={200}>
    <Empty flex={0} isEmpty={true} backgroundColor="backgroundColor1" imgStyle={{ width: 100, height: 100 }} />
  </Box>
</View>
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
      alt="empty-ios4.png"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1608965881168090770.png"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt="empty-android4.png"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609207889432132017.png"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

## API

| 属性      | 必填    | 说明                                 | 类型         | 默认值   |
| --------- | ------- | ------------------------------------ | ------------ | -------- |
| isEmpty   | `false` | 是否为空                             | boolean      | `false`  |
| emptyText | `false` | 暂无数据的文字 dom                   | `ReactNode`  | 暂无数据 |
| imgStyle  | `false` | 图片样式                             | `ImageStyle` |          |
| img       | `false` | 自定义 img,传一个 URL 或者 ReactNode | `ReactNode`  |          |
