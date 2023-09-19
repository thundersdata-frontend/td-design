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

### 1. 悬浮按钮在页面右上角

```tsx | pure
<FloatButton
  verticalOrientation="down"
  items={[
    { backgroundColor: '#9b59b6', title: 'New Task', icon: <IconHome /> },
    { backgroundColor: '#3498db', title: 'Notifications', icon: <IconNotification /> },
    { backgroundColor: '#1abc9c', title: 'All Tasks', icon: <IconCreate /> },
  ]}
/>
```

<center>
  <figure>
    <img
      alt="floatButton-ios1.gif"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1608120362148553983.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 2. 自定义样式

```tsx | pure
<FloatButton
  buttonColor="rgba(231,76,60,1)"
  btnOutRange="gold"
  position="left"
  verticalOrientation="up"
  spacing={10}
  items={[
    { backgroundColor: '#9b59b6', title: 'New Task', icon: <IconHome /> },
    { backgroundColor: '#3498db', title: 'Notifications', icon: <IconNotification /> },
    { backgroundColor: '#1abc9c', title: 'All Tasks', icon: <IconCreate /> },
  ]}
/>
```

<center>
  <figure>
    <img
      alt="floatButton-ios2.gif"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1608120451387252788.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 3. 自定义悬浮按钮

```tsx | pure
<FloatButton
  buttonColor="gold"
  btnOutRange="red"
  position="right"
  customIcon={<Icon name="user" color="red" size={25} />}
  items={[
    { backgroundColor: '#9b59b6', title: 'New Task', icon: <IconHome /> },
    { backgroundColor: '#3498db', title: 'Notifications', icon: <IconNotification /> },
    { backgroundColor: '#1abc9c', title: 'All Tasks', icon: <IconCreate /> },
  ]}
/>
```

<center>
  <figure>
    <img
      alt="floatButton-ios4.gif"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1608120590706733843.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

## API

### FloatButton

| 属性                | 必填    | 说明                       | 类型                          | 默认值  |
| ------------------- | ------- | -------------------------- | ----------------------------- | ------- |
| items               | `true`  | 展开按钮组                 | `ActionButtonItemProps[]`     |         |
| size                | `false` | 主按钮的大小               | `number`                      | `40`    |
| verticalOrientation | `false` | 展开方向                   | `up` \| `down`                | `up`    |
| buttonColor         | `false` | 按钮的颜色                 | `string`                      | `black` |
| btnOutRange         | `false` | 按钮点击之后的颜色         | `string`                      | `black` |
| outRangeScale       | `false` | 动画过程中主按钮的缩放比例 | `number`                      | `1`     |
| customIcon          | `false` | 自定义主按钮的图标         | `ReactNode`                   |         |
| position            | `false` | 主按钮的位置               | `left` \| `center` \| `right` | `right` |
| spacing             | `false` | 展开按钮之间的间距         | `number`                      | `8`     |
| style               | `false` | 整个容器的样式             | `ViewStyle`                   |         |
| activeOpacity       | `false` | 按下时的不透明度           | `number`                      | `0.6`   |

### ActionButtonItemProps

| 属性               | 必填    | 说明               | 类型           | 默认值 |
| ------------------ | ------- | ------------------ | -------------- | ------ |
| icon               | `true`  | 按钮图标           | `ReactElement` |        |
| backgroundColor    | `true`  | 按钮的颜色         | `string`       |        |
| onPress            | `false` | 按钮的点击事件     | `() => void`   |        |
| textStyle          | `false` | 按钮的文字样式     | `TextStyle`    |        |
| textContainerStyle | `false` | 按钮的文字容器样式 | `ViewStyle`    |        |
| title              | `false` | 按钮的文字标题     | `string`       |        |
| spaceBetween       | `false` | 按钮和图标的间距   | `number`       | `4`    |
