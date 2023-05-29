---
title: NoticeBar - 通告栏组件
nav:
  title: RN组件
  path: /react-native
group:
  title: Display
  path: /display
---

# NoticeBar 通告栏组件

在导航栏下方，一般用作系统提醒、活动提醒等通知。需要引起用户关注时使用，重要级别低于 `Modal` ，高于 `Toast`。

## 效果演示

### 1. 默认状态

```tsx | pure
<NoticeBar text="我是通知我是通知我是通知我是通知我是通知我是通知" />
```

<center>
  <figure>
    <img
      alt="noticeBar-ios1.png"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609761571776347042.png"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 2. 可关闭

```tsx | pure
<NoticeBar text="我是通知我是通知我是通知我是通知我是通知我是通知" mode="close" />
```

<center>
  <figure>
    <img
      alt="noticeBar-ios2"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609761722278116352.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 3. 可点击跳转

```tsx | pure
<NoticeBar
  text="我是通知我是通知我是通知我是通知我是通知我是通知"
  mode="link"
  onPress={() => navigation.navigate('BoxDemo')}
/>
```

<center>
  <figure>
    <img
      alt="noticeBar-ios3"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609761868420805782.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 4. 水平滚动 + 可跳转

```tsx | pure
<NoticeBar
  text="我是通知我是通知我是通知我是通知我是通知我是通知"
  mode="link"
  onPress={() => navigation.navigate('BoxDemo')}
  animation
/>
```

<center>
  <figure>
    <img
      alt="noticeBar-ios4"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609762001335578050.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 5. 水平滚动 + 可关闭

```tsx | pure
<NoticeBar
  text="我是通知我是通知我是通知我是通知我是通知我是通知"
  mode="close"
  animation
  onClose={() => alert('hello')}
/>
```

<center>
  <figure>
    <img
      alt="noticeBar-ios5"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609762208777128043.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 6. 自定义图标

```tsx | pure
<NoticeBar icon={<Icon name="user" />} text="我是通知我是通知我是通知我是通知我是通知我是通知22222" />
```

<center>
  <figure>
    <img
      alt="noticeBar-ios6"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609762306730480022.png"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 7. 自定义高度

```tsx | pure
<NoticeBar height={60} text="我是通知我是通知我是通知我是通知我是通知我是通知22222" />
```

<center>
  <figure>
    <img
      alt="noticeBar-ios7"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609762508471573273.png"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

## API

| 属性          | 必填    | 说明             | 类型                          | 默认值  |
| ------------- | ------- | ---------------- | ----------------------------- | ------- |
| text          | `true`  | 通告栏文本       | `string`                      |         |
| icon          | `false` | 左侧图标         | `ReactNode`                   |         |
| mode          | `false` | 通告栏类型       | `close` \| `link` \| `''`     | `''`    |
| onPress       | `false` | 通告栏点击事件   | `() => void`                  |         |
| onClose       | `false` | 通告栏关闭事件   | `() => void \| Promise<void>` |         |
| animated      | `false` | 是否启用动画     | `boolean`                     | `false` |
| duration      | `false` | 动画播放时长     | `number`                      | `5000`  |
| height        | `false` | 通告栏高度       | `number`                      | `36`    |
| activeOpacity | `false` | 按下时的不透明度 | `number`                      | `0.5`   |
| style         | `false` | 自定义样式       | `StyleProp<ViewStyle>`        |         |
