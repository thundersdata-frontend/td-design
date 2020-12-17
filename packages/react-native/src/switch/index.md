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
  <div style={{ display: 'flex', width: 750 }}>
    <div style={{ width: 375 }}>IOS效果图</div>
  </div>
</center>
<center>
  <figure>
    <img
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1608190109643062768.gif"
      style={{ width: 375, marginRight: 10, border: "1px solid #ddd" }}
    />
  </figure>
</center>

### 2. disabled

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
  <div style={{ display: 'flex', width: 750 }}>
    <div style={{ width: 375 }}>IOS效果图</div>
  </div>
</center>
<center>
  <figure>
    <img
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1608191401103083357.gif"
      style={{ width: 375, marginRight: 10, border: "1px solid #ddd" }}
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
  <div style={{ display: 'flex', width: 750 }}>
    <div style={{ width: 375 }}>IOS效果图</div>
  </div>
</center>
<center>
  <figure>
    <img
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1608191401104315779.gif"
      style={{ width: 375, marginRight: 10, border: "1px solid #ddd" }}
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
  <div style={{ display: 'flex', width: 750 }}>
    <div style={{ width: 375 }}>IOS效果图</div>
  </div>
</center>
<center>
  <figure>
    <img
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1608191401107159916.gif"
      style={{ width: 375, marginRight: 10, border: "1px solid #ddd" }}
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
  <div style={{ display: 'flex', width: 750 }}>
    <div style={{ width: 375 }}>IOS效果图</div>
  </div>
</center>
<center>
  <figure>
    <img
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1608191401095485776.gif"
      style={{ width: 375, marginRight: 10, border: "1px solid #ddd" }}
    />
  </figure>
</center>

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
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1608191570332865050.png"
      style={{ width: 375, marginRight: 10, border: "1px solid #ddd" }}
    />
    <img
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1608100761824157682.jpg"
      style={{ width: 375, border: "1px solid #ddd" }}
    />
  </figure>
</center>

## API

| 属性         | 必填  | 说明                     | 类型                        | 默认值 |
| ------------ | ----- | ------------------------ | --------------------------- | ------ |
| checked      | flase | 当前是否选中             | boolean                     | flase  |
| disabled     | flase | 当前是否禁用             | boolean                     | flase  |
| color        | flase | 是否选时的背景颜色       | string                      | 无     |
| checkLabel   | flase | 自定义选中时文本         | string,ReactNode            | 无     |
| uncheckLabel | flase | 自定义非选中时文本       | string,ReactNode            | 无     |
| onChange     | flase | 状态改变时的事件处理函数 | (checked: boolean) => void; | 无     |
