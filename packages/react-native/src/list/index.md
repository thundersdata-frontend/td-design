---
title: List - 列表组件
nav:
  title: RN组件
  path: /react-native
group:
  title: Display
  path: /display
---

# List 列表组件

## 效果演示

### 1. 只有一个输入框

```tsx | pure
<List
  header="基础使用"
  items={[
    { title: '主标题主标', extra: <Input placeholder="请输入" style={{ height: px(32) }} /> },
    {
      title: '主标题主标题主标题主标题主标题主标题',
      brief: '主标题下面的副标题主标题下面的副标题',
      arrow: 'horizontal',
      onPress: () => console.log('onPress'),
    },
  ]}
/>
```

<center>
  <figure>
    <img
      alt="input-ios1.png"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1643178981833863125.png"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 2. 设置背景色

```tsx | pure
<List
  header="设置背景色"
  itemBackgroundColor="primary200"
  items={[
    { title: '主标题主标', extra: <Input placeholder="请输入" style={{ height: px(32) }} /> },
    {
      title: '主标题主标题主标题主标题主标题主标题',
      brief: '主标题下面的副标题主标题下面的副标题',
      arrow: 'horizontal',
      onPress: () => console.log('onPress'),
    },
  ]}
/>
```

<center>
  <figure>
    <img
      alt="input-ios1.png"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1643179034178291048.png"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 3. 覆盖背景色

```tsx | pure
<List
  header="覆盖背景色"
  itemBackgroundColor="primary200"
  items={[
    { title: '主标题主标', extra: <Input placeholder="请输入" style={{ height: px(32) }} /> },
    {
      title: '主标题主标题主标题主标题主标题主标题',
      brief: '主标题下面的副标题主标题下面的副标题',
      backgroundColor: 'func200',
      arrow: 'horizontal',
      onPress: () => console.log('onPress'),
    },
  ]}
/>
```

<center>
  <figure>
    <img
      alt="input-ios1.png"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1643179130096441849.png"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 4. 自定义 header

```tsx | pure
<List
  header={<CustomHeader />}
  items={[
    { title: '主标题主标', extra: <Input placeholder="请输入" style={{ height: px(32) }} /> },
    {
      title: '主标题主标题主标题主标题主标题主标题',
      brief: '主标题下面的副标题主标题下面的副标题',
      arrow: 'horizontal',
      onPress: () => console.log('onPress'),
    },
  ]}
/>
```

<center>
  <figure>
    <img
      alt="input-ios1.png"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1643179167773615848.png"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 5. 单独使用 ListHeader

```tsx | pure
<ListHeader text="只有标题" />
```

<center>
  <figure>
    <img
      alt="input-ios1.png"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1643179225562573991.png"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 6. 标题右侧自定义

```tsx | pure
<List
  header="只有标题"
  extra={<SvgIcon name="left" />}
  items={[{ title: '主标题主标', extra: <Input placeholder="请输入" style={{ height: px(32) }} /> }]}
/>
```

<center>
  <figure>
    <img
      alt="input-ios1.png"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1643179287406760859.png"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

## List API

| 属性                | 必填    | 说明                 | 类型              | 默认值 |
| ------------------- | ------- | -------------------- | ----------------- | ------ |
| header              | `false` | 标题                 | `ReactNode`       |        |
| extra               | `false` | 标题右侧内容         | `ReactNode`       |        |
| items               | `true`  | 列表项               | `ListItemProps[]` |        |
| itemHeight          | `false` | 列表项高度           | `number`          | `32Ï`  |
| itemBackgroundColor | `false` | 统一设置列表项背景色 | `主题颜色`        |        |

## ListHeader API

| 属性        | 必填    | 说明           | 类型                   | 默认值 |
| ----------- | ------- | -------------- | ---------------------- | ------ |
| text        | `true`  | 标题文本       | `string`               |        |
| extra       | `false` | 标题右侧内容   | `ReactNode`            |        |
| textStyle   | `false` | 标题文字的样式 | `StyleProp<TextStyle>` |        |
| headerStyle | `false` | 标题容器的样式 | `StyleProp<ViewStyle>` |        |
