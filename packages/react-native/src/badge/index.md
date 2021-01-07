---
title: Badge - 徽标组件
nav:
  title: RN组件
  path: /react-native
group:
  title: Display
  path: /display
---

# Badge 徽标组件

## 效果演示

### 1. type 默认，展示为 text

```tsx | pure
<Badge text={4}>
  <Box width={50} height={52} backgroundColor="warningColor2" />
</Badge>
<WhiteSpace />
<Badge text="折" backgroundColor="primaryTextColor">
  <Box backgroundColor="warningColor2" width={52} height={52} />
</Badge>
<WhiteSpace />
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
      alt="badge-ios1.png"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1608797068494109760.png"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt="badge-android1.png"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609149317679318033.png"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 2. type 为 ribbon

```tsx | pure
<WhiteSpace />
<Badge text="折扣券" backgroundColor="primaryTextColor" type="ribbon">
  <Box backgroundColor="warningColor2" width={px(44)} height={px(44)} />
</Badge>
<WhiteSpace />
<Badge text={9} type="ribbon">
  <Box backgroundColor="warningColor2" width={202} height={240} />
</Badge>
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
      alt="badge-ios2.png"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1608797072401180568.png"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt="badge-android2.png"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609149317689777300.png"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 3. type 为 dot

```tsx | pure
<Badge text={4} type="dot">
  <Box width={50} height={52} backgroundColor="warningColor2" />
</Badge>
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
      alt="badge-ios3.png"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1608797081010456297.png"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt="badge-android3.png"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609149317708868534.png"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 4. overflowCount

```tsx | pure
<WhiteSpace />
<Badge text={10900} overflowCount={14000} backgroundColor="success">
  <Box backgroundColor="warningColor2" width={302} height={132} />
</Badge>
<WhiteSpace />
<Badge text={10900} backgroundColor="success">
  <Box backgroundColor="warningColor2" width={302} height={132} />
</Badge>
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
      alt="badge-ios4.png"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1608797087820228989.png"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt="badge-android4.png"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609149317674311485.png"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

## API

| 属性            | 必填    | 说明             | 类型                        | 默认值           |
| --------------- | ------- | ---------------- | --------------------------- | ---------------- |
| type            | `false` | badge 的形态     | `dot` \| `ribbon` \| `text` | `text`           |
| text            | `false` | badge 的内容     | `string` \| `number`        |                  |
| overflowCount   | `false` | 展示封顶的数值   | `number`                    | `99`             |
| backgroundColor | `false` | badge 的背景颜色 | `string`                    | `dangerousColor` |
