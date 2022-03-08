---
title: Tooltip - 文字提示
nav:
  title: RN组件
  path: /react-native
group:
  title: Interaction
  path: /interaction
---

# Tooltip 文字提示

## 效果演示

### 1. 默认效果

```tsx | pure
<Tooltip title="InfoInfoInfo">
  <Text variant="p0" color="primary200">
    press me
  </Text>
</Tooltip>
```

<center>
  <figure>
    <img
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1643255311776720439.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 2. 显示遮罩

```tsx | pure
<Tooltip title="InfoInfoInfo">
  <Text variant="p0" color="primary200" withOverlay>
    press me
  </Text>
</Tooltip>
```

<center>
  <figure>
    <img
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1643255383825684985.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 3. 修改背景色

```tsx | pure
<Tooltip title="InfoInfoInfo">
  <Text variant="p0" color="primary200" backgroundColor="red">
    press me
  </Text>
</Tooltip>
```

<center>
  <figure>
    <img
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1643255473060587128.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

## API

| 属性                 | 必填    | 说明               | 类型                         | 默认值    |
| -------------------- | ------- | ------------------ | ---------------------------- | --------- |
| title                | `true`  | 提示文字           | `ReactNode`                  |           |
| width                | `false` | 宽度               | `number`                     | `px(150)` |
| height               | `false` | 高度               | `number`                     | `px(40)`  |
| onVisibleChange      | `false` | 显示隐藏的回调     | `(visible: boolean) => void` |           |
| withOverlay          | `false` | 是否有蒙层         | `boolean`                    | `false`   |
| backgroundColor      | `false` | 背景颜色           | `string`                     |           |
| style                | `false` | 自定义样式         | `ViewStyle`                  |           |
| skipAndroidStatusBar | `false` | 是否跳过安卓状态栏 | `boolean`                    | `false`   |
| ref                  | `false` | 获取内置方法       | `TooltipRef`                 | `false`   |

## ref

| 属性  | 必填 | 说明         | 类型               |
| ----- | ---- | ------------ | ------------------ |
| show  | -    | 显示 tooltip | show: () => void;  |
| close | -    | 关闭 tooltip | close: () => void; |
