---
title: Card - 卡片组件
nav:
  title: RN组件
  path: /react-native
group:
  title: Global
  path: /global
---

# Card 卡片组件

## 效果演示

### 1. 标准的 Card

```tsx | pure
<Card
  icon={<Icon name="user" color="green" />}
  title="我是标题"
  extra="说明文字"
  footer={
    <Box>
      <Text variant="primaryTip">底部文字</Text>
    </Box>
  }
>
  <Text variant="secondaryBodyReverse">
    我是正文我是正文我是正文我是正文我是正文我是正文我是正文我是正文我是正文
    我是正文我是正文我是正文我是正文我是正文我是正文我是正文我是正文
  </Text>
</Card>
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
      alt="card-ios1"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1607514164797819749.png"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt="card-android1"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609141594072548088.png"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 2. 没有 footer 的 Card

```tsx | pure
<Card title="我是标题" extra="说明文字">
  <Text variant="secondaryBodyReverse">
    我是正文我是正文我是正文我是正文我是正文我是正文我是正文我是正文
    我是正文我是正文我是正文我是正文我是正文我是正文我是正文我是正文我是正文
  </Text>
</Card>
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
      alt="card-ios2"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1607514257388033912.png"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt="card-android2"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609141600210310261.png"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 3. 自定义 Header 的 Card

```tsx | pure
<Card
  renderHeader={() => (
    <Box>
      <Text variant="primaryBody">自定义标题</Text>
    </Box>
  )}
>
  <Text variant="secondaryBodyReverse">
    我是正文我是正文我是正文我是正文我是正文我是正文我是正文我是正文
    我是正文我是正文我是正文我是正文我是正文我是正文我是正文我是正文我是正文
  </Text>
</Card>
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
      alt="card-ios3"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1607514356040261698.png"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt="card-android3"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609141604643739678.png"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 4. 只有 body 的 Card

```tsx | pure
<Card renderHeader={() => <Text variant="primaryBody">自定义标题</Text>} hideHeader>
  <Text variant="secondaryBodyReverse">
    我是正文我是正文我是正文我是正文我是正文我是正文我是正文我是正文我是正文我是正文我是正文我是正文我是正文我是正文我是正文我是正文我是正文
  </Text>
</Card>
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
      alt="card-ios4"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1607514417328538607.png"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt="card-android4"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609141608328797291.png"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

## API

| 属性         | 必填    | 说明                   | 类型              | 默认值  |
| ------------ | ------- | ---------------------- | ----------------- | ------- |
| icon         | `false` | header 左侧的图标      | `ReactNode`       |         |
| title        | `false` | header 的文字          | `ReactNode`       |         |
| extra        | `false` | header 右侧的图标      | `ReactNode`       |         |
| renderHeader | `false` | 自定义渲染标题         | `() => ReactNode` |         |
| hideHeader   | `false` | 是否隐藏标题           | `boolean`         | `false` |
| footer       | `false` | 底部容器。不传时不渲染 | `ReactNode`       |         |
| bodyStyle    | `false` | body 容器的样式        | `ViewStyle`       |         |
