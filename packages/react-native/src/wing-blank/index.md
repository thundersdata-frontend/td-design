---
title: WingBlank - 两翼留白组件
nav:
  title: RN 组件
  path: /react-native
group:
  title: Layout
  path: /layout
---

# WingBlank 两翼留白组件

## 效果演示

### 1. 默认效果

```tsx | pure
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
      alt="wingBlank-ios1.png"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1607485239616233263.png"
      style={{ width: 375, marginRight: 10, border: "1px solid #ddd" }}
    />
    <img
      alt="wingBlank-android1.png"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1608185728093229578.png"
      style={{ width: 375, border: "1px solid #ddd" }}
    />
  </figure>
</center>

### 2. 修改 size

```tsx | pure
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
      alt="wingBlank-ios2.png"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1607485584301348092.png"
      style={{ width: 375, marginRight: 10, border: "1px solid #ddd" }}
    />
    <img
      alt="wingBlank-android2.png"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1608185731893677380.png"
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