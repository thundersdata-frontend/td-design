---
title: Tooltip - 文字提示
nav:
  title: RN组件
  path: /react-native
group:
  title: 交互组件
  path: /interaction
---

# Tooltip 文字提示

## 效果演示

### 1. 默认效果

```tsx | pure
<Tooltip content="InfoInfoInfo">
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

### 2. 修改背景色

```tsx | pure
<Tooltip content="InfoInfoInfo" backgroundColor="red">
  <Text variant="p0" color="primary200">
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

| 属性            | 必填    | 说明                    | 类型                       | 默认值                      |
| --------------- | ------- | ----------------------- | -------------------------- | --------------------------- |
| content         | `true`  | 提示文字                | `ReactNode`                |                             |
| width           | `false` | tooltip 宽度            | `number`                   | `40`                        |
| height          | `false` | tooltip 高度            | `number`                   | `150`                       |
| backgroundColor | `false` | tooltip 背景色          | `string`                   | `#617080`                   |
| containerStyle  | `false` | tooltip 容器样式        | `StyleProp<ViewStyle>`     |                             |
| withOverlay     | `false` | 是否显示遮罩层          | `boolean`                  | `true`                      |
| withCaret       | `false` | 是否显示小三角          | `boolean`                  | `true`                      |
| overlayColor    | `false` | 遮罩层颜色              | `string`                   | `rgba(250, 250, 250, 0.70)` |
| actionType      | `false` | 触发 tooltip 的点击方式 | `onPress` \| `onLongPress` | `onPress`                   |
| onClose         | `false` | tooltip 关闭时触发事件  | `() => void`               |                             |
