---
title: WhiteSpace - 水平留白组件
nav:
  title: RN组件
  path: /react-native
group:
  title: Layout
  path: /layout
---

# WhiteSpace 水平留白组件

## 效果演示

### 1. 默认效果

```jsx | pure
<View style={{ height: 50, backgroundColor: 'red' }} />
<WhiteSpace />
<View style={{ height: 50, backgroundColor: 'gold' }} />
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
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1607483947000193494.png"
      style={{ width: 375, marginRight: 10, border: "1px solid #ddd" }}
    />
    <img
      alt=""
      src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1607430991524&di=24c0bf75a6d0efeff1c48e13829eca72&imgtype=0&src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201308%2F23%2F220651x9b0h4kru904ozre.jpg"
      style={{ width: 375, border: "1px solid #ddd" }}
    />
  </figure>
</center>

### 2. 指定 backgroundColor 和 size

```jsx | pure
<View style={{ height: 50, backgroundColor: 'red' }} />
<WhiteSpace size="xxl" backgroundColor="green" />
<View style={{ height: 50, backgroundColor: 'gold' }} />
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
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1607484882581015487.png"
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

| 属性            | 必填    | 说明             | 类型                                                | 默认值        |
| --------------- | ------- | ---------------- | --------------------------------------------------- | ------------- |
| size            | `false` | 水平留白的大小   | `xxs` \| `xs` \| `s` \| `m` \| `l` \| `xl` \| `xxl` | `m`           |
| backgroundColor | `false` | 水平留白的背景色 | string                                              | `transparent` |

_`size`的值对应的具体大小定义在`theme`文件的`spacing`。_
