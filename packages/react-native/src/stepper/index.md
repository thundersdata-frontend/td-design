---
title: Stepper - 步进器组件
nav:
  title: RN组件
  path: /react-native
group:
  title: Form
  path: /form
---

# Stepper 步进器组件

## 效果演示

### 1. 最大值 20，最小值 0，步进 3

```tsx | pure
<Stepper step={3} max={20} min={0} value={value} onChange={setValue} />
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
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609152993271722479.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609151892678461319.gif"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 2. 不显示清除图标

```tsx | pure
<Stepper width={px(100)} allowClear={false} />
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
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609152944586173144.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609151973057346189.gif"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 3. 禁用

```tsx | pure
<Stepper disabled />
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
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609152894748764116.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609152083058908979.gif"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 4. 不允许用户输入

```tsx | pure
<Stepper width={px(100)} editable={false} />
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
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609152849387131274.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609152270317288466.gif"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

## API

| 属性         | 必填    | 说明                     | 类型                       | 默认值  |
| ------------ | ------- | ------------------------ | -------------------------- | ------- |
| min          | `false` | 最小值                   | `number`                   |         |
| max          | `false` | 最大值                   | `number`                   |         |
| defaultValue | `false` | 默认值                   | `number` \| `string`       |         |
| value        | `false` | 当前值                   | `number` \| `string`       |         |
| onChange     | `false` | 修改后回调函数           | `(value?: number) => void` |         |
| step         | `false` | 每次改变步数，可以为小数 | `number`                   | `1`     |
| disabled     | `false` | 是否禁用                 | `boolean`                  | `false` |
| width        | `false` | 宽度                     | `number`                   | `200`   |
| allowClear   | `false` | 是否显示清除图标         | `boolean`                  | `true`  |
| editable     | `false` | 是否允许手动输入         | `boolean`                  | `true`  |
