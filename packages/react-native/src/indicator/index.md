---
title: Indicator - 指示器组件
nav:
  title: RN组件
  path: /react-native
group:
  title: Other
  path: /other
---

# Indicator 指示器组件

## 效果演示

### 1. BallIndicator

```tsx | pure
<SafeAreaView style={{ flex: 1 }}>
  <BallIndicator />
</SafeAreaView>
```

<center>
  <figure>
    <img
      alt="indicator-ios1.gif"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1624173464148013948.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 2. UIActivityIndicator

```tsx | pure
<SafeAreaView style={{ flex: 1 }}>
  <UIActivityIndicator />
</SafeAreaView>
```

<center>
  <figure>
    <img
      alt="indicator-ios1.gif"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1624173490303265458.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 3. MaterialIndicator

```tsx | pure
<SafeAreaView style={{ flex: 1 }}>
  <MaterialIndicator />
</SafeAreaView>
```

<center>
  <figure>
    <img
      alt="indicator-ios1.gif"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1643177632601010878.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 4. 修改大小和颜色

```tsx | pure
<SafeAreaView style={{ flex: 1 }}>
  <UIActivityIndicator color="#ff0000" size={50} />
</SafeAreaView>
```

<center>
  <figure>
    <img
      alt="indicator-ios1.gif"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1643177688024869837.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

## API

### 公共属性

| 属性              | 必填    | 说明             | 类型             | 默认值          |
| ----------------- | ------- | ---------------- | ---------------- | --------------- |
| animationEasing   | `false` | 动画 Easing 效果 | `EasingFunction` | `Easing.linear` |
| animationDuration | `false` | 动画执行时长     | `number`         | `1200`          |
| animating         | `false` | 动画是否正在执行 | `boolean`        | `true`          |
| interaction       | `false` | 是否可以交互     | `boolean`        | `true`          |
| style             | `false` | 自定义样式       | `ViewStyle`      |                 |
| hidesWhenStopped  | `false` | 动画停止时隐藏   | `boolean`        | `true`          |

### BallIndicator / UIActivityIndicator 属性

| 属性  | 必填    | 说明     | 类型     | 默认值       |
| ----- | ------- | -------- | -------- | ------------ |
| color | `false` | 颜色     | `string` | `rgb(0,0,0)` |
| count | `false` | 元素数量 | `number` | `12`         |
| size  | `false` | 大小     | `number` | `36`         |

### MaterialIndicator 属性

| 属性  | 必填    | 说明 | 类型     | 默认值       |
| ----- | ------- | ---- | -------- | ------------ |
| color | `false` | 颜色 | `string` | `rgb(0,0,0)` |
| size  | `false` | 大小 | `number` | `36`         |
