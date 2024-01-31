---
title: FloatButton - 悬浮按钮组件
nav:
  title: RN组件
  path: /react-native
group:
  title: 交互组件
  path: /interaction
---

# FloatButton 悬浮按钮组件

## 效果演示

### 1. 默认效果

```tsx | pure
<FloatButton
  items={[
    { icon: <IconHome />, label: 'New Task', onPress: handlePress1 },
    { icon: <IconNotification />, label: 'Notifications', onPress: handlePress2 },
    { icon: <IconCreate />, label: 'All Tasks', onPress: handlePress3 },
  ]}
/>
```

<center>
  <figure>
    <img
      alt="floatButton-ios1.gif"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1704857363855209553.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 2. 修改按钮位置

```tsx | pure
<FloatButton
  position="topLeft"
  items={[
    { icon: <IconHome />, label: 'New Task', onPress: handlePress1 },
    { icon: <IconNotification />, label: 'Notifications', onPress: handlePress2 },
    { icon: <IconCreate />, label: 'All Tasks', onPress: handlePress3 },
  ]}
/>
```

<center>
  <figure>
    <img
      alt="floatButton-ios2.gif"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1704857368486252185.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 3. 自定义主按钮

```tsx | pure
<FloatButton
  items={[
    { icon: <IconHome />, label: 'New Task', onPress: handlePress1 },
    { icon: <IconNotification />, label: 'Notifications', onPress: handlePress2 },
    { icon: <IconCreate />, label: 'All Tasks', onPress: handlePress3 },
  ]}
  customActionButton={(_, onPress) => <Button title="添加商品" onPress={onPress} />}
  actionButtonProps={{
    width: 80,
    height: 40,
    borderRadius: 10,
  }}
/>
```

<center>
  <figure>
    <img
      alt="floatButton-ios4.gif"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1704857373801391849.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 4. 按钮可拖拽

```tsx | pure
<FloatButton
  items={[
    { icon: <IconHome />, label: 'New Task', onPress: handlePress1 },
    { icon: <IconNotification />, label: 'Notifications', onPress: handlePress2 },
    { icon: <IconCreate />, label: 'All Tasks', onPress: handlePress3 },
  ]}
  draggable
/>
```

<center>
  <figure>
    <img
      alt="floatButton-ios4.gif"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1704857378202055121.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

## API

### FloatButton

| 属性 | 必填 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- | --- |
| items | `true` | 操作项 | `FloatButtonItemProps[]` |  |
| itemHeight | `false` | 操作项行高 | `number` |  |
| position | `false` | 按钮位置 | `'topLeft' \| 'topRight' \| 'bottomLeft' \| 'bottomRight'` |  |
| customActionButton | `false` | 自定义主按钮 | `(progress: SharedValue<number>, onPress: () => void) => ReactNode` |  |
| containerStyle | `false` | 容器样式 | `StyleProp<ViewStyle>` |  |
| draggable | `false` | 是否可以拖拽(实验属性，不建议是用) | `boolean` |  |
| actionButtonProps | `false` | 主按钮样式属性 | `ActionButtonProps` |  |

### FloatButtonItemProps

| 属性    | 必填    | 说明           | 类型                          | 默认值 |
| ------- | ------- | -------------- | ----------------------------- | ------ |
| icon    | `false` | 按钮图标       | `ReactNode`                   |        |
| label   | `true`  | 按钮的文字标题 | `ReactNode`                   |        |
| onPress | `true`  | 点击事件       | `() => void \| Promise<void>` |        |
| style   | `false` | 样式           | `StyleProp<ViewStyle>`        |        |

### ActionButtonProps

| 属性         | 必填    | 说明           | 类型     | 默认值 |
| ------------ | ------- | -------------- | -------- | ------ |
| width        | `false` | 主按钮宽度     | `number` |        |
| height       | `false` | 主按钮高度     | `number` |        |
| borderRadius | `false` | 主按钮圆角大小 | `number` |        |
