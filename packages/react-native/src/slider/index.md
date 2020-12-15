---
title: Slider - 滑块组件
nav:
  title: RN组件
  path: /react-native
group:
  title: Form
  path: /form
---

# Slider 滑块组件

## 效果演示

### 1. 默认效果

```tsx | pure
<Slider />
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
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1608032620330195137.gif"
      style={{ width: 375, marginRight: 10, border: "1px solid #ddd" }}
    />
    <img
      alt=""
      src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1607430991524&di=24c0bf75a6d0efeff1c48e13829eca72&imgtype=0&src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201308%2F23%2F220651x9b0h4kru904ozre.jpg"
      style={{ width: 375, border: "1px solid #ddd" }}
    />
  </figure>
</center>

### 2. 默认值 45

```tsx | pure
<Slider value={45} />
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
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1608032749566957647.gif"
      style={{ width: 375, marginRight: 10, border: "1px solid #ddd" }}
    />
    <img
      alt=""
      src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1607430991524&di=24c0bf75a6d0efeff1c48e13829eca72&imgtype=0&src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201308%2F23%2F220651x9b0h4kru904ozre.jpg"
      style={{ width: 375, border: "1px solid #ddd" }}
    />
  </figure>
</center>

### 3. 最大最小值

```tsx | pure
<Slider min={20} max={80} />
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
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1608032808179563288.gif"
      style={{ width: 375, marginRight: 10, border: "1px solid #ddd" }}
    />
    <img
      alt=""
      src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1607430991524&di=24c0bf75a6d0efeff1c48e13829eca72&imgtype=0&src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201308%2F23%2F220651x9b0h4kru904ozre.jpg"
      style={{ width: 375, border: "1px solid #ddd" }}
    />
  </figure>
</center>

### 4. 自定义颜色

```tsx | pure
<Slider value={45} foregroundColor="gold" backgroundColor="red" borderColor="blue" handleBackground="pink" />
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
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1608032929313069066.gif"
      style={{ width: 375, marginRight: 10, border: "1px solid #ddd" }}
    />
    <img
      alt=""
      src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1607430991524&di=24c0bf75a6d0efeff1c48e13829eca72&imgtype=0&src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201308%2F23%2F220651x9b0h4kru904ozre.jpg"
      style={{ width: 375, border: "1px solid #ddd" }}
    />
  </figure>
</center>

### 5. 不显示滑块数字

```tsx | pure
<Slider value={45} showLabel={false} />
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
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1608033028156894177.gif"
      style={{ width: 375, marginRight: 10, border: "1px solid #ddd" }}
    />
    <img
      alt=""
      src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1607430991524&di=24c0bf75a6d0efeff1c48e13829eca72&imgtype=0&src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201308%2F23%2F220651x9b0h4kru904ozre.jpg"
      style={{ width: 375, border: "1px solid #ddd" }}
    />
  </figure>
</center>

### 6. 数字在右边

```tsx | pure
<Slider value={45} foregroundColor="gold" backgroundColor="red" borderColor="blue" handleBackground="pink" />
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
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1608033111344004697.gif"
      style={{ width: 375, marginRight: 10, border: "1px solid #ddd" }}
    />
    <img
      alt=""
      src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1607430991524&di=24c0bf75a6d0efeff1c48e13829eca72&imgtype=0&src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201308%2F23%2F220651x9b0h4kru904ozre.jpg"
      style={{ width: 375, border: "1px solid #ddd" }}
    />
  </figure>
</center>

## API

| 属性             | 必填    | 说明               | 类型                                   | 默认值              |
| ---------------- | ------- | ------------------ | -------------------------------------- | ------------------- |
| min              | `false` | 最小值             | `number`                               | `0`                 |
| max              | `false` | 最大值             | `number`                               | `100`               |
| value            | `false` | 当前值             | `number`                               | `0`                 |
| width            | `false` | 宽度               | `number`                               | `deviceWidth - 100` |
| height           | `false` | 高度               | `number`                               | `20`                |
| onChange         | `false` | 滑块拖动后触发事件 | `(value: number) => void`              |                     |
| foregroundColor  | `false` | 滑块左侧颜色       | `string`                               | `主题色`            |
| backgroundColor  | `false` | 滑块右侧颜色       | `string`                               | `#fff`              |
| borderColor      | `false` | 滑块边框颜色       | `string`                               | `主题色`            |
| handleBackground | `false` | 滑块背景色         | `string`                               | `#fff`              |
| showLabel        | `false` | 是否显示滑块数字   | `boolean`                              | `true`              |
| labelPosition    | `false` | 滑块数字显示位置   | `top` \| `left` \| `right` \| `bottom` | `top`               |
| labelStyle       | `false` | 文本样式           | `TextStyle`                            |                     |
