---
title: Divider - 分割线组件
nav:
  title: RN组件
  path: /react-native
group:
  title: Basic
  path: /basic
---

# Divider 分割线组件

## 效果演示

### 1. 默认效果

```tsx | pure
<Text>我是一段文本我是一段文本我是一段文本我是一段文本我是一段文本我是一段文本我是一段文本我是一段文本</Text>
<Divider />
<Text>我是一段文本我是一段文本我是一段文本我是一段文本我是一段文本我是一段文本我是一段文本我是一段文本</Text>
```

<center>
  <figure>
    <img
      alt="divider-ios1"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1643102035172039045.png"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 2. 分隔线为虚线

```tsx | pure
<Text>我是一段文本我是一段文本我是一段文本我是一段文本我是一段文本我是一段文本我是一段文本我是一段文本</Text>
<Divider type="dashed" />
<Text>我是一段文本我是一段文本我是一段文本我是一段文本我是一段文本我是一段文本我是一段文本我是一段文本</Text>
```

<center>
  <figure>
    <img
      alt="divider-ios1"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1643102120875587191.png"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 3. 垂直分隔线

```tsx | pure
<Flex>
  <Text variant="p0" color="primary200">
    酒店
  </Text>
  <Divider axis="vertical" height={px(20)} />
  <Text variant="p0" color="primary200">
    商圈
  </Text>
</Flex>
```

<center>
  <figure>
    <img
      alt="divider-ios1"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1643102245405233201.png"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 4. 带文字的分隔线

```tsx | pure
<Divider text="我是分割线" />
```

<center>
  <figure>
    <img
      alt="divider-ios1"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1643102322187525239.png"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 5. 自定义虚线分隔线

```tsx | pure
<Divider type="dashed" dashGap={px(30)} dashLength={px(20)} dashThickness={px(2)} />
```

<center>
  <figure>
    <img
      alt="divider-ios1"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1643102435846380112.png"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

## API

| 属性 | 必填 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- | --- |
| type | `false` | 分割线类型 | `solid` \| `dashed` | `solid` |
| axis | `false` | 分割线方向 | `horizontal` \| `vertical` | `horizontal` |
| height | `false` | 垂直时分割线的高度 | `number` | `12` |
| color | `false` | 分割线颜色 | `string` | `#bbbbbb` |
| margin | `false` | 水平时为上下外边距，垂直时为左右外边距 | `xxs` \| `xs` \| `s` \| `m` \| `l` \| `xl` \| `xxl` | `xs` |
| text | `false` | 分割线文字（仅支持水平分割线） | `string` |  |
| textAlign | `false` | 分割线文字位置 | `left` \| `center` \| `right` | `center` |
| dashGap | `false` | 虚线间隔宽度 | `number` |  |
| dashLength | `false` | 单格虚线宽度 | `number` |  |
| dashThickness | `false` | 虚线厚度 | `number` |  |
