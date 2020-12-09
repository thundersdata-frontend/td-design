---
title: WingBlank - 两翼留白组件
nav:
  title: RN组件
  path: /react-native
group:
  title: Layout
  path: /layout
---

# WingBlank 两翼留白组件

## 效果演示

### 1. 默认效果

```jsx | pure
<WingBlank>
  <View style={{ height: 150, backgroundColor: 'red' }} />
</WingBlank>
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
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1607485239616233263.png"
      style={{ width: 375, marginRight: 10, border: "1px solid #ddd" }}
    />
    <img
      alt=""
      src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1607430991524&di=24c0bf75a6d0efeff1c48e13829eca72&imgtype=0&src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201308%2F23%2F220651x9b0h4kru904ozre.jpg"
      style={{ width: 375, border: "1px solid #ddd" }}
    />
  </figure>
</center>

### 2. 修改 size

```jsx | pure
<WingBlank size="xxl">
  <View style={{ height: 150, backgroundColor: 'red' }} />
</WingBlank>
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
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1607485584301348092.png"
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

| 属性     | 必填    | 说明           | 类型                                                | 默认值 |
| -------- | ------- | -------------- | --------------------------------------------------- | ------ |
| size     | `false` | 两翼留白的大小 | `xxs` \| `xs` \| `s` \| `m` \| `l` \| `xl` \| `xxl` | `m`    |
| children | `true`  | 包裹的子组件   | `ReactNode`                                         |        |

_`size`的值对应的具体大小定义在`theme`文件的`spacing`。_
