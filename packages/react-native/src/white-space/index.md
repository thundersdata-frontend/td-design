---
title: WhiteSpace - 水平留白组件
nav:
  title: RN 组件
  path: /react-native
group:
  title: Layout
  path: /layout
---

# WhiteSpace 水平留白组件

## 效果演示

### 1. 默认效果

```tsx | pure
<View style={{ height: 50, backgroundColor: 'red' }} />
<WhiteSpace />
<View style={{ height: 50, backgroundColor: 'gold' }} />
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
      alt="whiteSpace-ios1.png"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1607483947000193494.png"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt="whiteSpace-android1.png"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609146809584629615.png"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 2. 指定 backgroundColor 和 size

```tsx | pure
<View style={{ height: 50, backgroundColor: 'red' }} />
<WhiteSpace size="xxl" backgroundColor="green" />
<View style={{ height: 50, backgroundColor: 'gold' }} />
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
      alt="whiteSpace-ios2.png"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1607484882581015487.png"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt="whiteSpace-android2.png"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609146809595006281.png"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

## API

| 属性            | 必填    | 说明             | 类型                                                | 默认值        |
| --------------- | ------- | ---------------- | --------------------------------------------------- | ------------- |
| size            | `false` | 水平留白的大小   | `xxs` \| `xs` \| `s` \| `m` \| `l` \| `xl` \| `xxl` | `m`           |
| backgroundColor | `false` | 水平留白的背景色 | `string`                                            | `transparent` |

_`size`的值对应的具体大小定义在`theme`文件的`spacing`。_
