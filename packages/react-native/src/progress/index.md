---
title: Progress - 进度条组件
nav:
  title: RN组件
  path: /react-native
group:
  title: Feedback
  path: /feedback
---

# Progress 进度条

## 效果演示

### 1. LineProgress 默认效果

```tsx | pure
<LineProgress value={70} />
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
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609055940832313088.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609055037824880241.gif"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 2. LineProgress 值文本在顶部效果

```tsx | pure
<LineProgress value={100} labelPosition="top" />
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
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609055836045311052.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609055128789355310.gif"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 3. LineProgress 渐变色效果

```tsx | pure
<LineProgress value={87} color={['#FFD080', 'red']} showLabel labelPosition="top" />
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
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609055728101996419.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609055183400905243.gif"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 4. LineProgress 修改宽度效果

```tsx | pure
<LineProgress value={87} strokeWidth={16} />
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
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609055614844577639.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609055380241007355.gif"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 5. CircleProgress 默认效果

```tsx | pure
<CircleProgress value={80} />
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
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609056150372671370.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609057223350888695.gif"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 6. CircleProgress 不显示值文本效果

```tsx | pure
<CircleProgress value={40} showLabel={false} />
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
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609056236868086678.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609057168978511060.gif"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 7. CircleProgress 自定义颜色效果

```tsx | pure
<CircleProgress value={50} color="red" bgColor="green" />
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
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609056494084934403.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609056936266355463.gif"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 8. CircleProgress 渐变色效果

```tsx | pure
<CircleProgress value={70} strokeWidth={16} />
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
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609056864300543651.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609056788669562180.gif"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 9. CircleProgress 修改宽度效果

```tsx | pure
<CircleProgress value={70} strokeWidth={16} />
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
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609056613317325817.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609056677473482149.gif"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

## API

### LineProgress 属性

| 属性          | 必填    | 说明           | 类型                           | 默认值                      |
| ------------- | ------- | -------------- | ------------------------------ | --------------------------- |
| width         | `false` | 长度           | `number`                       | `250`                       |
| color         | `false` | 颜色           | `string` \| `[string, string]` | `theme.colors.primaryColor` |
| bgColor       | `false` | 背景色         | `string`                       | `theme.colors.overlayColor` |
| strokeWidth   | `false` | 宽度           | `number`                       | `8`                         |
| value         | `false` | 值             | `number`                       | `100`                       |
| showLabel     | `false` | 是否显示值文本 | `boolean`                      | `true`                      |
| labelPosition | `false` | 值文本位置     | `right` \| `top`               | `right`                     |
| showUnit      | `false` | 是否显示单位   | `boolean`                      | `true`                      |

### CircleProgress 属性

| 属性        | 必填    | 说明           | 类型                           | 默认值                      |
| ----------- | ------- | -------------- | ------------------------------ | --------------------------- |
| width       | `false` | 长度           | `number`                       | `100`                       |
| color       | `false` | 颜色           | `string` \| `[string, string]` | `theme.colors.primaryColor` |
| bgColor     | `false` | 背景色         | `string`                       | `theme.colors.overlayColor` |
| strokeWidth | `false` | 宽度           | `number`                       | `10`                        |
| value       | `false` | 值             | `number`                       | `1`                         |
| showLabel   | `false` | 是否显示值文本 | `boolean`                      | `true`                      |
| showUnit    | `false` | 是否显示单位   | `boolean`                      | `true`                      |
