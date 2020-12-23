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
  <div style={{ display: 'flex', width: 750 }}>
    <div style={{ width: 375 }}>IOS效果图</div>
    <div style={{ width: 375 }}>Android效果图</div>
  </div>
</center>
<center>
  <figure>
    <img
      alt=""
      src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1607430991524&di=24c0bf75a6d0efeff1c48e13829eca72&imgtype=0&src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201308%2F23%2F220651x9b0h4kru904ozre.jpg"
      style={{ width: 375, marginRight: 10, border: "1px solid #ddd" }}
    />
    <img
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1608708224518345670.jpg"
      style={{ width: 375, border: "1px solid #ddd" }}
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
  <div style={{ display: 'flex', width: 750 }}>
    <div style={{ width: 375 }}>IOS效果图</div>
    <div style={{ width: 375 }}>Android效果图</div>
  </div>
</center>
<center>
  <figure>
    <img
      alt=""
      src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1607430991524&di=24c0bf75a6d0efeff1c48e13829eca72&imgtype=0&src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201308%2F23%2F220651x9b0h4kru904ozre.jpg"
      style={{ width: 375, marginRight: 10, border: "1px solid #ddd" }}
    />
    <img
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1608708282271976340.jpg"
      style={{ width: 375, border: "1px solid #ddd" }}
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
  <div style={{ display: 'flex', width: 750 }}>
    <div style={{ width: 375 }}>IOS效果图</div>
    <div style={{ width: 375 }}>Android效果图</div>
  </div>
</center>
<center>
  <figure>
    <img
      alt=""
      src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1607430991524&di=24c0bf75a6d0efeff1c48e13829eca72&imgtype=0&src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201308%2F23%2F220651x9b0h4kru904ozre.jpg"
      style={{ width: 375, marginRight: 10, border: "1px solid #ddd" }}
    />
    <img
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1608708288885621202.jpg"
      style={{ width: 375, border: "1px solid #ddd" }}
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
  <div style={{ display: 'flex', width: 750 }}>
    <div style={{ width: 375 }}>IOS效果图</div>
    <div style={{ width: 375 }}>Android效果图</div>
  </div>
</center>
<center>
  <figure>
    <img
      alt=""
      src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1607430991524&di=24c0bf75a6d0efeff1c48e13829eca72&imgtype=0&src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201308%2F23%2F220651x9b0h4kru904ozre.jpg"
      style={{ width: 375, marginRight: 10, border: "1px solid #ddd" }}
    />
    <img
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1608708291795581317.jpg"
      style={{ width: 375, border: "1px solid #ddd" }}
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
