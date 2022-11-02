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
<Box flex={1}>
  <Empty />
</Box>
```

<center>
  <figure>
    <img
      alt="empty-ios1.png"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1643164552166522287.png"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 2. 自定义图片

```tsx | pure
<Empty customImg={<Image source={require('../../assets/img/pic_empty.png')} />} />
```

<center>
  <figure>
    <img
      alt="empty-ios2.png"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1643164614557936927.png"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

## API

| 属性      | 必填    | 说明               | 类型        | 默认值   |
| --------- | ------- | ------------------ | ----------- | -------- |
| emptyText | `false` | 暂无数据的文字 dom | `ReactNode` | 暂无数据 |
| customImg | `false` | 自定义 img         | `ReactNode` |          |
