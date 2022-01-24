---
title: Accordion - 手风琴组件
nav:
  title: RN组件
  path: /react-native
group:
  title: Other
  path: /other
---

# Accordion 手风琴组件

## 效果演示

### 1. 默认效果

```tsx | pure
<Accordion
  sections={[
    { title: '我是标题', content: '11111111111111111' },
    {
      title: '我是标题',
      content: '222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222',
    },
    {
      title: '我是标题',
      content: `我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是`,
    },
  ]}
/>
```

<center>
  <img
    alt=""
    src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609049804206462674.gif"
    style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
  />
</center>

## API

### Accordion 属性

| 属性 | 必填 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- | --- |
| sections | `true` | 手风琴选项卡列表 | `Section[]` |  |
| multiple | `false` | 是否允许展开多个 | `boolean` | `true` |
| accordionStyle | `false` | 容器样式 | `ViewStyle` |  |
| contentStyle | `false` | 选项卡样式 | `ViewStyle` |  |
| customIcon | `false` | 自定义右侧图标 | `({ progress }: { progress: Animated.SharedValue<number> }) => ReactNode` |  |
