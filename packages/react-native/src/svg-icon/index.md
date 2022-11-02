---
title: SvgIcon - 内置图标
nav:
  title: RN组件
  path: /react-native
group:
  title: Display
  path: /display
---

# SvgIcon 内置图标

## 效果演示

### 1. 所有图标

```tsx | pure
<SvgIcon name="arrowdown" />
<SvgIcon name="bells" />
<SvgIcon name="clockcircleo" />
<SvgIcon name="close" />
<SvgIcon name="closecircleo" />
<SvgIcon name="date" />
<SvgIcon name="down" />
<SvgIcon name="ellipsis" />
<SvgIcon name="eyeclose" />
<SvgIcon name="eyeopen" />
<SvgIcon name="left" />
<SvgIcon name="minus" />
<SvgIcon name="plus" />
<SvgIcon name="radio-checked" />
<SvgIcon name="radio-unchecked" />
<SvgIcon name="reload" />
<SvgIcon name="right" />
<SvgIcon name="search" />
<SvgIcon name="up" />
<SvgIcon name="checkboxChecked" />
<SvgIcon name="checkboxHalfchecked" />
<SvgIcon name="checkboxUnchecked" />
```

<center>
  <figure>
    <img
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1644811316900828860.png"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 2. 修改大小

```tsx | pure
<SvgIcon name="arrowdown" size={50} />
<SvgIcon name="bells" size={50} />
<SvgIcon name="clockcircleo" size={50} />
<SvgIcon name="close" size={50} />
<SvgIcon name="closecircleo" size={50} />
<SvgIcon name="date" size={50} />
<SvgIcon name="down" size={50} />
<SvgIcon name="ellipsis" size={50} />
<SvgIcon name="eyeclose" size={50} />
<SvgIcon name="eyeopen" size={50} />
<SvgIcon name="left" size={50} />
<SvgIcon name="minus" size={50} />
<SvgIcon name="plus" size={50} />
<SvgIcon name="radio-checked" size={50} />
<SvgIcon name="radio-unchecked" size={50} />
<SvgIcon name="reload" size={50} />
<SvgIcon name="right" size={50} />
<SvgIcon name="search" size={50} />
<SvgIcon name="up" size={50} />
<SvgIcon name="checkboxChecked" size={50} />
<SvgIcon name="checkboxHalfchecked" size={50} />
<SvgIcon name="checkboxUnchecked" size={50} />
```

<center>
  <figure>
    <img
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1644811378389797518.png"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 3. 修改颜色

```tsx | pure
<SvgIcon name="arrowdown" color="#ff0000" />
<SvgIcon name="bells" color="#ff0000" />
<SvgIcon name="clockcircleo" color="#ff0000" />
<SvgIcon name="close" color="#ff0000" />
<SvgIcon name="closecircleo" color="#ff0000" />
<SvgIcon name="date" color="#ff0000" />
<SvgIcon name="down" color="#ff0000" />
<SvgIcon name="ellipsis" color="#ff0000" />
<SvgIcon name="eyeclose" color="#ff0000" />
<SvgIcon name="eyeopen" color="#ff0000" />
<SvgIcon name="left" color="#ff0000" />
<SvgIcon name="minus" color="#ff0000" />
<SvgIcon name="plus" color="#ff0000" />
<SvgIcon name="radio-checked" color="#ff0000" />
<SvgIcon name="radio-unchecked" color="#ff0000" />
<SvgIcon name="reload" color="#ff0000" />
<SvgIcon name="right" color="#ff0000" />
<SvgIcon name="search" color="#ff0000" />
<SvgIcon name="up" color="#ff0000" />
<SvgIcon name="checkboxChecked" color="#ff0000" />
<SvgIcon name="checkboxHalfchecked" color="#ff0000" />
<SvgIcon name="checkboxUnchecked" color="#ff0000" />
```

<center>
  <figure>
    <img
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1644811418530083524.png"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

## API

| 属性 | 必填 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- | --- |
| name | `true` | 图标名称 | `'arrowdown' \| 'bells' \| 'check' \| 'checkcircle' \| 'checkcircleo' \| 'checkboxChecked' \| 'checkboxHalfchecked' \| 'checkboxUnchecked' \| 'clockcircleo' \| 'close' \| 'closecircleo' \| 'date' \| 'down' \| 'ellipsis' \| 'eyeclose' \| 'eyeopen' \| 'left' \| 'minus' \| 'plus' \| 'radio-checked' \| 'radio-unchecked' \| 'reload' \| 'right' \| 'search' \| 'up'` |
| size | `false` | 图标大小 | `number` | `16` |
| color | `false` | 图标颜色 | `string` \| `string[]` |  |
