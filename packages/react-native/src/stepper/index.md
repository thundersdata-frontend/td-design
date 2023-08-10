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
  <figure>
    <img
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1643252047758854553.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 2. 不显示清除图标

```tsx | pure
<Stepper width={px(100)} allowClear={false} />
```

<center>
  <figure>
    <img
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1643252117315903116.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 3. 禁用

```tsx | pure
<Stepper disabled />
```

<center>
  <figure>
    <img
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1643252184309611034.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 4. 不允许用户输入

```tsx | pure
<Stepper width={px(100)} editable={false} />
```

<center>
  <figure>
    <img
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1643252252170355408.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

## API

| 属性          | 必填    | 说明                       | 类型                       | 默认值  |
| ------------- | ------- | -------------------------- | -------------------------- | ------- |
| min           | `false` | 最小值                     | `number`                   |         |
| max           | `false` | 最大值                     | `number`                   |         |
| defaultValue  | `false` | 默认值                     | `number` \| `string`       |         |
| value         | `false` | 当前值                     | `number` \| `string`       |         |
| onChange      | `false` | 修改后回调函数             | `(value?: number) => void` |         |
| step          | `false` | 每次改变步数，可以为小数   | `number`                   | `1`     |
| disabled      | `false` | 是否禁用                   | `boolean`                  | `false` |
| width         | `false` | 宽度                       | `number`                   | `200`   |
| allowClear    | `false` | 是否显示清除图标           | `boolean`                  | `true`  |
| editable      | `false` | 是否允许手动输入           | `boolean`                  | `true`  |
| activeOpacity | `false` | 加号、减号按下时的不透明度 | `number`                   | `0.5`   |
