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

### 2. type 为 dot

```tsx | pure
<Badge text={4} type="dot">
  <Box width={50} height={52} backgroundColor="warningColor2" />
</Badge>
```

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

### 3. overflowCount

```tsx | pure
<WhiteSpace />
<Badge text={10900} overflowCount={14000} backgroundColor="func300">
  <Box backgroundColor="warningColor2" width={302} height={132} />
</Badge>
<WhiteSpace />
<Badge text={10900} backgroundColor="func300">
  <Box backgroundColor="warningColor2" width={302} height={132} />
</Badge>
```

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

| 属性            | 必填    | 说明             | 类型                 | 默认值           |
| --------------- | ------- | ---------------- | -------------------- | ---------------- |
| type            | `false` | badge 的形态     | `dot` \| `text`      | `text`           |
| text            | `false` | badge 的内容     | `string` \| `number` |                  |
| overflowCount   | `false` | 展示封顶的数值   | `number`             | `99`             |
| backgroundColor | `false` | badge 的背景颜色 | `string`             | `dangerousColor` |
