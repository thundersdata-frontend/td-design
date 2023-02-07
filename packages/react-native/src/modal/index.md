---
title: Modal - 弹窗组件
nav:
  title: RN组件
  path: /react-native
group:
  title: Feedback
  path: /feedback
---

# Modal 弹窗组件

## Modal

### Modal 效果演示

### 1. 内容在底部

```tsx | pure
<Modal visible={visible1} onClose={() => setVisible1(false)}>
  <Box height={120} backgroundColor="backgroundColor1">
    <Text variant="primaryBody">我是内容</Text>
  </Box>
</Modal>
```

<center>
  <figure>
    <img
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609061134516514673.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 2. 内容在中间

```tsx | pure
<Modal visible={visible2} onClose={() => setVisible2(false)} position="center">
  <Box height={120} backgroundColor="backgroundColor1">
    <Text variant="primaryBody">我是内容</Text>
  </Box>
</Modal>
```

<center>
  <figure>
    <img
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609061077323714839.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 3. 内容全屏

```tsx | pure
<Modal
  visible={visible3}
  onClose={() => setVisible3(false)}
  position="fullscreen"
  bodyContainerStyle={{ backgroundColor: 'gold' }}
>
  <Box height={300} backgroundColor="backgroundColor1">
    <Text variant="primaryBody">我是内容</Text>
  </Box>
  <Button title="关闭" onPress={() => setVisible3(false)} />
</Modal>
```

<center>
  <figure>
    <img
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609061034699958617.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 4. 点击蒙层不允许关闭

```tsx | pure
<Modal
  visible={visible3}
  onClose={() => setVisible3(false)}
  position="fullscreen"
  bodyContainerStyle={{ backgroundColor: 'gold' }}
>
  <Box height={300} backgroundColor="backgroundColor1">
    <Text variant="primaryBody">我是内容</Text>
  </Box>
  <Button title="关闭" onPress={() => setVisible3(false)} />
</Modal>
```

<center>
  <figure>
    <img
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609061587754205803.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### API

| 属性               | 必填    | 说明                     | 类型                                 | 默认值   |
| ------------------ | ------- | ------------------------ | ------------------------------------ | -------- |
| visible            | `true`  | 是否显示弹窗             | `boolean`                            |          |
| onClose            | `true`  | 关闭弹窗事件             | `() => void`                         |          |
| maskClosable       | `false` | 蒙层是否允许点击关闭弹窗 | `boolean`                            | `true`   |
| maskVisible        | `false` | 是否显示蒙层             | `boolean`                            | `true`   |
| position           | `false` | 内容显示位置             | `bottom` \| `center` \| `fullscreen` | `bottom` |
| bodyContainerStyle | `false` | 弹窗内容容器样式         | `ViewStyle`                          |          |
| duration           | `false` | 弹窗显示/关闭时长(ms)    | `number`                             | `100`    |

## Modal.alert

### 效果演示

```tsx | pure
const handlePress = () => {
  Modal.alert({
    title: '我是弹窗',
    content: '我是内容',
  });
};
return (
  <Container>
    <Button title="弹窗" onPress={handlePress} />
  </Container>
);
```

<center>
  <figure>
    <img
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609067662316850211.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### API

| 属性    | 必填    | 说明         | 类型         | 默认值 |
| ------- | ------- | ------------ | ------------ | ------ |
| icon    | `false` | 警示性图标   | `ReactNode`  |        |
| title   | `true`  | 标题         | `string`     |        |
| content | `false` | 内容         | `ReactNode`  |        |
| onPress | `false` | 点击回调事件 | `() => void` |        |

## Modal.confirm

### 效果演示

```tsx | pure
const handlePress = () => {
  Modal.confirm({
    title: '我是弹窗',
    content: '我是内容',
  });
};
return (
  <Container>
    <Button title="弹窗" onPress={handlePress} />
  </Container>
);
```

<center>
  <figure>
    <img
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609068219999821236.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### API

| 属性       | 必填    | 说明       | 类型                          | 默认值 |
| ---------- | ------- | ---------- | ----------------------------- | ------ |
| icon       | `false` | 警示性图标 | `ReactNode`                   |        |
| title      | `true`  | 标题       | `string`                      |        |
| content    | `false` | 内容       | `ReactNode`                   |        |
| onOk       | `false` | 确认事件   | `() => void \| Promise<void>` |        |
| onCancel   | `false` | 取消事件   | `() => void \| Promise<void>` |        |
| okText     | `false` | 确认文本   | `string`                      | `确定` |
| cancelText | `false` | 取消文本   | `string`                      | `取消` |

## Modal.prompt

### 效果演示

```tsx | pure
const [value, setValue] = useState<string>();
const handlePress = () => {
  Modal.prompt({
    title: '我是弹窗',
    content: '我是内容',
    input: <Input placeholder="请输入" />,
    onOk: setValue,
    onCancel: () => console.log(123),
  });
};
return (
  <Container>
    <Button title="弹窗" onPress={handlePress} />
    <WhiteSpace />
    <Text>您输入的是：{value}</Text>
  </Container>
);
```

<center>
  <figure>
    <img
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609068646112151949.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### API

| 属性       | 必填    | 说明     | 类型                                       | 默认值 |
| ---------- | ------- | -------- | ------------------------------------------ | ------ |
| title      | `true`  | 标题     | `string`                                   |        |
| content    | `false` | 内容     | `ReactNode`                                |        |
| onOk       | `false` | 确认事件 | `(value: string) => void \| Promise<void>` |        |
| onCancel   | `false` | 取消事件 | `() => void \| Promise<void>`              |        |
| okText     | `false` | 确认文本 | `string`                                   | `确定` |
| cancelText | `false` | 取消文本 | `string`                                   | `取消` |

## Modal.tip

### 效果演示

```tsx | pure
const handlePress = () => {
  Modal.tip({
    img: require('../../assets/images/island.jpg'),
    height: 400,
    title: '我是弹窗',
    content: '我是内容',
  });
};
return (
  <Container>
    <Button title="弹窗" onPress={handlePress} />
  </Container>
);
```

<center>
  <figure>
    <img
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609068774304649623.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### API

| 属性    | 必填    | 说明   | 类型                  | 默认值 |
| ------- | ------- | ------ | --------------------- | ------ |
| title   | `true`  | 标题   | `string`              |        |
| content | `false` | 内容   | `ReactNode`           |        |
| img     | `true`  | 背景图 | `ImageSourcePropType` |        |
| height  | `true`  | 高度   | `number`              |        |
