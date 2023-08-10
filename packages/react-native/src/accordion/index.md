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
    src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1643092835880873364.gif"
    style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
  />
</center>

### 2. 只允许展开一个

```tsx | pure
<Accordion
  multiple={false}
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
    src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1643092898980235941.gif"
    style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
  />
</center>

### 3. 自定义选项卡容器样式

```tsx | pure
<Accordion
  multiple={true}
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
  contentStyle={{ padding: 12 }}
/>
```

<center>
  <img
    alt=""
    src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1643093000896584086.gif"
    style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
  />
</center>

### 4. 自定义容器样式

```tsx | pure
<Accordion
  multiple={true}
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
  accordionStyle={{ borderWidth: 1, borderColor: 'red', marginHorizontal: 12 }}
/>
```

<center>
  <img
    alt=""
    src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1643093115012785632.gif"
    style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
  />
</center>

## API

### Accordion 属性

| 属性 | 必填 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- | --- |
| sections | `true` | 手风琴选项卡列表 | `Section[]` |  |
| multiple | `false` | 是否允许展开多个 | `boolean` | `true` |
| activeOpacity | `false` | 按下时的不透明度 | `number` | `0.5` |
| headerHeight | `false` | 选项卡标题高度 | `number` | `54` |
| accordionStyle | `false` | 容器样式 | `ViewStyle` |  |
| contentStyle | `false` | 选项卡样式 | `ViewStyle` |  |
| customIcon | `false` | 自定义右侧图标 | `({ progress }: { progress: Animated.SharedValue<number> }) => ReactNode` |  |
