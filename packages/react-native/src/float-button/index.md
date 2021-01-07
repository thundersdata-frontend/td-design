---
title: FloatButton - 悬浮按钮组件
nav:
  title: RN组件
  path: /react-native
group:
  title: Interaction
  path: /interaction
---

# FloatButton 悬浮按钮组件

## 效果演示

### 1. 悬浮按钮在页面右上角

```tsx | pure
<FloatButton verticalOrientation="down">
  <FloatButton.Item buttonColor="#9b59b6" title="New Task">
    <Icon type="ionicon" name="md-create" size={30} color="#fff" />
  </FloatButton.Item>
  <FloatButton.Item buttonColor="#3498db" title="Notifications">
    <Icon type="ionicon" name="md-notifications-off" size={30} color="#fff" />
  </FloatButton.Item>
  <FloatButton.Item buttonColor="#1abc9c" title="All Tasks">
    <Icon type="ionicon" name="md-cube-sharp" size={30} color="#fff" />
  </FloatButton.Item>
</FloatButton>
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
      alt="floatButton-ios1.gif"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1608120362148553983.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt="floatButton-android1.gif"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609298068414458646.gif"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 2. 自定义样式

```tsx | pure
<FloatButton
  buttonColor="rgba(231,76,60,1)"
  btnOutRange="gold"
  onPress={() => console.log(789)}
  position="left"
  verticalOrientation="up"
  spacing={10}
>
  <FloatButton.Item
    buttonColor="#9b59b6"
    title="New Task"
    onPress={() => console.log('notes tapped!')}
    spaceBetween={8}
    textContainerStyle={{ backgroundColor: 'gold' }}
  >
    <Icon type="ionicon" name="md-create" size={30} color="#fff" />
  </FloatButton.Item>
  <FloatButton.Item
    buttonColor="#3498db"
    title="Notifications"
    onPress={() => {}}
    spaceBetween={8}
    textContainerStyle={{ backgroundColor: 'gold' }}
  >
    <Icon type="ionicon" name="md-notifications-off" size={30} color="#fff" />
  </FloatButton.Item>
  <FloatButton.Item
    buttonColor="#1abc9c"
    title="All Tasks"
    onPress={() => {}}
    spaceBetween={8}
    textContainerStyle={{ backgroundColor: 'gold' }}
  >
    <Icon type="ionicon" name="md-cube-sharp" size={30} color="#fff" />
  </FloatButton.Item>
</FloatButton>
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
      alt="floatButton-ios2.gif"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1608120451387252788.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt="floatButton-android2.gif"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609298068417059441.gif"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 3. 悬浮按钮无子组件

```tsx | pure
<FloatButton buttonColor="green" btnOutRange="red" onPress={() => console.log(123)} position="center" spacing={10} />
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
      alt="floatButton-ios3.gif"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1608120524331386476.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt="floatButton-android3.gif"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609298068437800013.gif"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 4. 自定义悬浮按钮

```tsx | pure
<FloatButton
  buttonColor="gold"
  btnOutRange="red"
  onPress={() => console.log(456)}
  position="right"
  renderIcon={<Icon name="user" color="red" size={25} />}
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
      alt="floatButton-ios4.gif"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1608120590706733843.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt="floatButton-android4.gif"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609298068412148019.gif"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

## API

### FloatButton

| 属性                | 必填    | 说明                       | 类型                          | 默认值  |
| ------------------- | ------- | -------------------------- | ----------------------------- | ------- |
| size                | `false` | 主按钮的大小               | `number`                      | `50`    |
| zIndex              | `false` | 层级                       | `number`                      | `99`    |
| verticalOrientation | `false` | 展开方向                   | `up` \| `down`                | `up`    |
| duration            | `false` | 动画时长                   | `number`                      | `600`   |
| onPress             | `false` | 点击事件                   | `() => void`                  |         |
| onLongPress         | `false` | 长按事件                   | `() => void`                  |         |
| buttonColor         | `false` | 按钮的颜色                 | `string`                      | `black` |
| btnOutRange         | `false` | 按钮点击之后的颜色         | `string`                      | `black` |
| paddingHorizontal   | `false` | 水平位移                   | `number`                      | `20`    |
| paddingVertical     | `false` | 垂直位移                   | `number`                      | `20`    |
| outRangeScale       | `false` | 动画过程中主按钮的缩放比例 | `number`                      | `1.2`   |
| renderIcon          | `false` | 自定义主按钮的图标         | `ReactNode`                   |         |
| position            | `false` | 主按钮的位置               | `left` \| `center` \| `right` | `right` |
| spacing             | `false` | 展开按钮之间的间距         | `number`                      | `20`    |
| style               | `false` | 整个容器的样式             | ``                            |         |

### FloatButton.Item

| 属性                | 必填    | 说明               | 类型                          | 默认值 |
| ------------------- | ------- | ------------------ | ----------------------------- | ------ |
| size                | `false` | 主按钮的大小       | `number`                      | `50`   |
| position            | `false` | 主按钮的位置       | `left` \| `center` \| `right` | `left` |
| spacing             | `false` | 展开按钮之间的间距 | `number`                      | `20`   |
| zIndex              | `false` | 层级               | `number`                      |        |
| verticalOrientation | `false` | 展开方向           | `up` \| `down`                |        |
| buttonColor         | `false` | 按钮的颜色         | `string`                      |        |
| parentSize          | `false` | 主按钮的大小       | `number`                      | `50`   |
| onPress             | `false` | 按钮的点击事件     | `() => void`                  |        |
| textStyle           | `false` | 按钮的文字样式     | `TextStyle`                   |        |
| textContainerStyle  | `false` | 按钮的文字容器样式 | `ViewStyle`                   |        |
| title               | `false` | 按钮的文字标题     | `string`                      |        |
| spaceBetween        | `false` | 按钮和图标的间距   | `number`                      | `15`   |
