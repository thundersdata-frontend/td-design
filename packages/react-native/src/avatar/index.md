---
title: Avatar - 头像组件
nav:
  title: RN组件
  path: /react-native
group:
  title: Display
  path: /display
  order: 3
---

# Avatar 头像组件

## 效果演示

### 1. 默认头像

```tsx | pure
<Avatar url="https://images.pexels.com/photos/1702238/pexels-photo-1702238.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=1000" />
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
      alt="默认头像 ios"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1608541697872721505.png"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt="默认头像 android"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1608541702605648127.png"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 2. 头像大小

```tsx | pure
 <Avatar
    size={20}
    url="https://images.pexels.com/photos/1702238/pexels-photo-1702238.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=1000"
  />
  <Avatar
    size={40}
    url="https://images.pexels.com/photos/1702238/pexels-photo-1702238.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=1000"
  />
  <Avatar
    size={60}
    url="https://images.pexels.com/photos/1702238/pexels-photo-1702238.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=1000"
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
      alt="头像大小 ios"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1608541697902152616.png"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt="头像大小 android"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1608541699891602172.png"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 3. 头像弧度

```tsx | pure
 <Avatar
    circular={false}
    url="https://images.pexels.com/photos/1702238/pexels-photo-1702238.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=1000"
  />
  <Avatar
    borderRadius={10}
    circular={false}
    url="https://images.pexels.com/photos/1702238/pexels-photo-1702238.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=1000"
  />
  <Avatar
    borderRadius={20}
    circular={false}
    url="https://images.pexels.com/photos/1702238/pexels-photo-1702238.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=1000"
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
      alt="头像弧度 ios"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1608541697200668208.png"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt="头像弧度 android"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1608541702621539963.png"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 4. 头像挂架

```tsx | pure
// 自定义挂件 位置在上边
 <Avatar url="https://images.pexels.com/photos/1702238/pexels-photo-1702238.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=1000">
  <Accessory component={<Icon name="user" color="green" rounded />} top={true} />
</Avatar>
// 自定义挂件 位置在左上边
<Avatar url="https://images.pexels.com/photos/1702238/pexels-photo-1702238.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=1000">
  <Accessory component={<Icon name="user" color="green" rounded />} top={true} left={true} />
</Avatar>
// 自定义图片
<Avatar url="https://images.pexels.com/photos/1702238/pexels-photo-1702238.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=1000">
  <Accessory url="https://images.pexels.com/photos/1702238/pexels-photo-1702238.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=1000" />
</Avatar>
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
      alt="头像挂架 ios"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1608541697202802021.png"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt="头像挂架 android"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1608541697194166652.png"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 5. 头像内容

```tsx | pure
// 自定义内容使用文字
 <Avatar title="123" />
 // 自定义内容使用图片
 <Avatar url={require('../../assets/images/island.jpg')} />
  // 自定义内容使用图片
 <Avatar url="https://images.pexels.com/photos/1702238/pexels-photo-1702238.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=1000" />
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
      alt="头像内容 ios"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1608541699890608695.png"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt="头像内容 android"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1608541702696654730.png"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 6. 头像组

```tsx | pure
<AvatarGroup max={4}>
  <Avatar
    url="https://images.pexels.com/photos/1702238/pexels-photo-1702238.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=1000"
    circular
  />
  <Avatar
    url="https://images.pexels.com/photos/1702238/pexels-photo-1702238.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=1000"
    circular
  />
  <Avatar
    url="https://i0.wp.com/fancycrave.com/wp-content/uploads/2020/03/group-of-diverse-friends-playing-game-on-mobile-P5BYNJM.jpg"
    circular
  />
  <Avatar
    url="https://images.pexels.com/photos/1702238/pexels-photo-1702238.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=1000"
    circular
  />
  <Avatar
    url="https://i0.wp.com/fancycrave.com/wp-content/uploads/2020/03/group-of-diverse-friends-playing-game-on-mobile-P5BYNJM.jpg"
    circular
  />
</AvatarGroup>
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
      alt="头像组 ios"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1608541697216544391.png"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt="头像组 android"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1608541697196303480.png"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 7. 头像组背景

```tsx | pure
<AvatarGroup max={4} backgroundColor="orange">
  <Avatar
    url="https://images.pexels.com/photos/1702238/pexels-photo-1702238.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=1000"
    circular
  />
  <Avatar
    url="https://images.pexels.com/photos/1702238/pexels-photo-1702238.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=1000"
    circular
  />
  <Avatar
    url="https://i0.wp.com/fancycrave.com/wp-content/uploads/2020/03/group-of-diverse-friends-playing-game-on-mobile-P5BYNJM.jpg"
    circular
  />
  <Avatar
    url="https://images.pexels.com/photos/1702238/pexels-photo-1702238.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=1000"
    circular
  />
  <Avatar
    url="https://i0.wp.com/fancycrave.com/wp-content/uploads/2020/03/group-of-diverse-friends-playing-game-on-mobile-P5BYNJM.jpg"
    circular
  />
</AvatarGroup>
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
      alt="头像组背景 ios"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1608541698067149032.png"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt="头像组背景 android"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609297848961579448.png"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

## Avatar 组件 API

| 属性            | 必填    | 说明                                    | 类型                 | 默认值    |
| --------------- | ------- | --------------------------------------- | -------------------- | --------- |
| url             | `false` | 图片的路径                              | `string` \| `number` |           |
| size            | `false` | 头像大小                                | `number`             | `px(46)`  |
| borderRadius    | `false` | 头像弧度                                | `number`             | `0`       |
| title           | `false` | 标题显示在头像中的文字不能与 url 一起用 | `string`             |           |
| circular        | `false` | 头像是否为圆形                          | `boolean`            | `true`    |
| backgroundColor | `false` | 使用 title 时的背景                     | `string`             | `#E5F1FF` |
| textStyle       | `false` | title 文字的样式                        | `TextStyle`          |           |
| containerStyle  | `false` | 容器的样式                              | `ViewStyle`          |           |
| activeOpacity   | `false` | 点击时的透明度                          | `number`             | `0.2`     |
| onPress         | `false` | 点击头像的回调事件                      | `() => void`         |           |

## Accessory 组件 API

| 属性      | 必填    | 说明                 | 类型                 | 默认值   |
| --------- | ------- | -------------------- | -------------------- | -------- |
| url       | `false` | 图片的路径           | `string` \| `number` |          |
| size      | `false` | 图标大小             | `number`             | `px(14)` |
| icon      | `false` | 使用 icon 是的 props | `IconProps`          |          |
| component | `false` | 使用自定义组件       | `ReactNode`          |          |
| top       | `false` | 挂件垂直方向位置     | `boolean`            | `false`  |
| left      | `false` | 挂件水平方向位置     | `boolean`            | `false`  |

## AvatarGroup 组件 API

| 属性            | 必填    | 说明                      | 类型        | 默认值    |
| --------------- | ------- | ------------------------- | ----------- | --------- |
| max             | `false` | 最大显示数量              | `number`    | `4`       |
| spacing         | `false` | 头像的间距                | `number`    | `px(23)`  |
| backgroundColor | `false` | 数量头像的背景            | `string`    | `#E5F1FF` |
| textStyle       | `false` | 数量头像 title 文字的样式 | `TextStyle` |           |
|                 |
