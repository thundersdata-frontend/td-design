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
  <div style="display:flex; width: 750px">
    <div style="width: 375px;">IOS效果图</div>
    <div style="width: 375px;">Android效果图</div>
  </div>
</center>
<center>
  <figure>
    <img
      alt="组件的基本使用 ios"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609318446877640981.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt="组件的基本使用 android"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609318446906891585.gif"
      style="width: 375px; border: 1px solid #ddd;"
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
  <div style="display:flex; width: 750px">
    <div style="width: 375px;">IOS效果图</div>
    <div style="width: 375px;">Android效果图</div>
  </div>
</center>
<center>
  <figure>
    <img
      alt="组件禁用 ios"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609318447298320601.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt="组件禁用 android"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609318447311776740.gif"
      style="width: 375px; border: 1px solid #ddd;"
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
  <div style="display:flex; width: 750px">
    <div style="width: 375px;">IOS效果图</div>
    <div style="width: 375px;">Android效果图</div>
  </div>
</center>
<center>
  <figure>
    <img
      alt="自定义背景 ios"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609318447852753425.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt="自定义背景 android"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609318446874599293.gif"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 4. 自定义 label

```tsx | pure
<Switch
  checked={checked3}
  checkLabel="开"
  uncheckLabel="关"
  onChange={checked => {
    setChecked3(checked);
  }}
/>
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
      alt="自定义 label ios"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609318447361108824.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt="自定义 label android"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609318447213932443.gif"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 5. 自定义 icon

```tsx | pure
<Switch
  checked={checked4}
  checkLabel={<Iconfont name="icon_selected" size={px(24)}></Iconfont>}
  uncheckLabel={<Iconfont name="icon_close" size={px(24)}></Iconfont>}
  onChange={checked => {
    setChecked4(checked);
  }}
/>
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
      alt="自定义 icon ios"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609318446871775836.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt="自定义 icon android"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609318446876005922.gif"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

## API

| 属性         | 必填    | 说明                     | 类型                         | 默认值  |
| ------------ | ------- | ------------------------ | ---------------------------- | ------- |
| checked      | `flase` | 当前是否选中             | `boolean`                    | `flase` |
| disabled     | `flase` | 当前是否禁用             | `boolean`                    | `flase` |
| color        | `flase` | 是否选时的背景颜色       | `string`                     |         |
| checkLabel   | `flase` | 自定义选中时文本         | `string` \| `ReactNode`      |         |
| uncheckLabel | `flase` | 自定义非选中时文本       | `string` \| `ReactNode`      |         |
| onChange     | `flase` | 状态改变时的事件处理函数 | `(checked: boolean) => void` |         |
