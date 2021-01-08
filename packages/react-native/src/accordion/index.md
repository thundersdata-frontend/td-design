---
title: Accordion - 手风琴组件
nav:
  title: RN组件
  path: /react-native
group:
  title: Other
  path: /other
  order: 8
---

# Accordion 手风琴组件

## 效果演示

### 1. 默认效果

```tsx | pure
<Accordion
  sections={[
    { title: 'title1', content: '我是内容我是内容我是内容我是内容我是内容我是内容我是内容' },
    {
      title: 'title2',
      content: '222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222',
    },
    {
      title: 'title3',
      content: `我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内`,
    },
  ]}
/>
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
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609049804206462674.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609048401830668039.gif"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 2. 默认展开第一个选项卡

```tsx | pure
<Accordion
  activeSections={[0]}
  sections={[
    { title: 'title1', content: '我是内容我是内容我是内容我是内容我是内容我是内容我是内容' },
    {
      title: 'title2',
      content: '222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222',
    },
    {
      title: 'title3',
      content: `我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内`,
    },
  ]}
/>
```

<center>
  <div style="display:flex; width: 750px;">
    <div style="width: 375px;">IOS效果图</div>
    <div style="width: 375px;">Android效果图</div>
  </div>
</center>
<center>
  <figure>
    <img
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609049574936108566.png"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609048514630524222.png"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 3. 允许展开多个

```tsx | pure
<Accordion
  multiple
  sections={[
    { title: 'title1', content: '我是内容我是内容我是内容我是内容我是内容我是内容我是内容' },
    {
      title: 'title2',
      content: '222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222',
    },
    {
      title: 'title3',
      content: `我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内`,
    },
  ]}
/>
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
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609049905105629113.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609048738652017750.gif"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 4. 自定义渲染标题

```tsx | pure
<Accordion
  sections={[
    { title: 'title1', content: '我是内容我是内容我是内容我是内容我是内容我是内容我是内容' },
    {
      title: 'title2',
      content: '222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222',
    },
    {
      title: 'title3',
      content: `我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内`,
    },
  ]}
  renderTitle={item => <Text style={{ color: 'gold' }}>{item.title}</Text>}
/>
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
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609049984758050319.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609048825537879646.gif"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 5. 自定义渲染内容

```tsx | pure
<Accordion
  sections={[
    { title: 'title1', content: '我是内容我是内容我是内容我是内容我是内容我是内容我是内容' },
    {
      title: 'title2',
      content: '222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222',
    },
    {
      title: 'title3',
      content: `我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内`,
    },
  ]}
  expandedHeight={180}
  renderContent={item => (
    <View style={{ padding: 10 }}>
      <Text style={{ color: 'red', fontSize: 16 }}>{item.content}</Text>
    </View>
  )}
/>
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
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609050097321059175.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609048949208094709.gif"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 6. 自定义样式

```tsx | pure
<Accordion
  sections={[
    { title: 'title1', content: '我是内容我是内容我是内容我是内容我是内容我是内容我是内容' },
    {
      title: 'title2',
      content: '222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222',
    },
    {
      title: 'title3',
      content: `我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内`,
    },
  ]}
  containerStyle={{ padding: 10, borderWidth: 1, borderBottomWidth: 1, borderColor: 'red' }}
  sectionContainerStyle={{ backgroundColor: 'green' }}
/>
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
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609050143856278411.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609049022751199626.gif"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

## API

### Accordion 属性

| 属性                  | 必填    | 说明                   | 类型                                 | 默认值  |
| --------------------- | ------- | ---------------------- | ------------------------------------ | ------- |
| activeSections        | `false` | 当前展开的选项卡       | `number[]`                           |         |
| onChange              | `false` | 选项卡改变后的回调事件 | `(activeSections: number[]) => void` |         |
| sections              | `true`  | 手风琴选项卡列表       | `Section[]`                          | `[]`    |
| multiple              | `false` | 是否允许展开多个       | `boolean`                            | `false` |
| expandedHeight        | `false` | 展开选项卡高度         | `number`                             | `120`   |
| duration              | `false` | 动画时长               | `number`                             | `300`   |
| easing                | `false` | 动画效果               | `string`                             | `inOut` |
| activeOpacity         | `false` | 点击透明度             | `number`                             | `0.8`   |
| renderTitle           | `false` | 自定义渲染标题         | `(item: Section) => ReactNode`       |         |
| renderContent         | `false` | 自定义渲染内容         | `(item: Section) => ReactNode`       |         |
| containerStyle        | `false` | 容器样式               | `ViewStyle`                          |         |
| sectionContainerStyle | `false` | 选项卡样式             | `ViewStyle`                          |         |

### Section 属性

| 属性    | 必填   | 说明       | 类型        | 默认值 |
| ------- | ------ | ---------- | ----------- | ------ |
| title   | `true` | 选项卡标题 | `ReactNode` |        |
| content | `true` | 选项卡内容 | `ReactNode` |        |
