---
title: Switch - 滑动开关组件
nav:
  title: RN组件
  path: /react-native
group:
  title: Form
  path: /form
---

# Switch 滑动开关组件

## 效果演示

### 1. 组件的基本使用

```tsx | pure
<Switch
  checked={checked}
  onChange={checked => {
    setChecked(checked);
  }}
/>
```

<center>
  <figure>
    <img
      alt="组件的基本使用 ios"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609318446877640981.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 2. 组件禁用

```tsx | pure
<Switch
  checked={checked1}
  disabled
  onChange={checked => {
    setChecked1(checked);
  }}
/>
```

<center>
  <figure>
    <img
      alt="组件禁用 ios"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609318447298320601.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 3. 自定义背景

```tsx | pure
<Switch
  checked={checked2}
  color="#875467"
  onChange={checked => {
    setChecked2(checked);
  }}
/>
```

<center>
  <figure>
    <img
      alt="自定义背景 ios"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609318447852753425.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 4. 自定义 label

```tsx | pure
<Switch
  checked={checked3}
  showText
  onText="ON"
  offText="OFF"
  onChange={checked => {
    setChecked3(checked);
  }}
/>
```

<center>
  <figure>
    <img
      alt="自定义 label ios"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609318447361108824.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

## API

| 属性             | 必填    | 说明                     | 类型                         | 默认值  |
| ---------------- | ------- | ------------------------ | ---------------------------- | ------- |
| checked          | `false` | 当前是否选中             | `boolean`                    | `false` |
| disabled         | `false` | 当前是否禁用             | `boolean`                    | `false` |
| onChange         | `false` | 状态改变时的事件处理函数 | `(checked: boolean) => void` |         |
| activeBackground | `false` | 是否选时的背景颜色       | `string`                     |         |
| showText         | `false` | 是否显示文字             | `boolean`                    | `false` |
| onText           | `false` | 开关打开时文本           | `string`                     | `开`    |
| offText          | `false` | 开关关闭时文本           | `string`                     | `关`    |
| width            | `false` | 宽度                     | `number`                     | `50`    |
