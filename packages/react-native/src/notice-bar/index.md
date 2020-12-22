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

## 效果演示

### 1. 默认状态

```tsx | pure
<NoticeBar data={['我是通知我是通知我是通知我是通知我是通知我是通知']} />
```

<center>
  <div style={{ display: 'flex', width: 750 }}>
    <div style={{ width: 375 }}>IOS效果图</div>
    <div style={{ width: 375 }}>Android效果图</div>
  </div>
</center>
<center>
  <figure>
    <img
      alt="noticeBar-ios1"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1607590503170736339.png"
      style={{ width: 375, marginRight: 10, border: "1px solid #ddd" }}
    />
    <img
      alt="noticeBar-android1"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1608204534969970783.png"
      style={{ width: 375, border: "1px solid #ddd" }}
    />
  </figure>
</center>

### 2. 可关闭

```tsx | pure
<NoticeBar data={['我是通知我是通知我是通知我是通知我是通知我是通知']} mode="close" />
```

<center>
  <div style={{ display: 'flex', width: 750 }}>
    <div style={{ width: 375 }}>IOS效果图</div>
    <div style={{ width: 375 }}>Android效果图</div>
  </div>
</center>
<center>
  <figure>
    <img
      alt="noticeBar-ios2"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1607590691904731707.gif"
      style={{ width: 375, marginRight: 10, border: "1px solid #ddd" }}
    />
    <img
      alt="noticeBar-android2"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1608204117571638383.gif"
      style={{ width: 375, border: "1px solid #ddd" }}
    />
  </figure>
</center>

### 3. 可点击跳转

```tsx | pure
<NoticeBar
  data={['我是通知我是通知我是通知我是通知我是通知我是通知']}
  mode="link"
  onPress={() => navigation.navigate('BoxDemo')}
/>
```

<center>
  <div style={{ display: 'flex', width: 750 }}>
    <div style={{ width: 375 }}>IOS效果图</div>
    <div style={{ width: 375 }}>Android效果图</div>
  </div>
</center>
<center>
  <figure>
    <img
      alt="noticeBar-ios3"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1607590833751471161.gif"
      style={{ width: 375, marginRight: 10, border: "1px solid #ddd" }}
    />
    <img
      alt="noticeBar-android3"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1608204120739933999.gif"
      style={{ width: 375, border: "1px solid #ddd" }}
    />
  </figure>
</center>

### 4. 水平滚动 + 可跳转

```tsx | pure
<NoticeBar
  data={['我是通知我是通知我是通知我是通知我是通知我是通知']}
  mode="link"
  onPress={() => navigation.navigate('BoxDemo')}
  animation
  duration={5000}
/>
```

<center>
  <div style={{ display: 'flex', width: 750 }}>
    <div style={{ width: 375 }}>IOS效果图</div>
    <div style={{ width: 375 }}>Android效果图</div>
  </div>
</center>
<center>
  <figure>
    <img
      alt="noticeBar-ios4"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1607591139376924562.gif"
      style={{ width: 375, marginRight: 10, border: "1px solid #ddd" }}
    />
    <img
      alt="noticeBar-android4"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1608204135222268970.gif"
      style={{ width: 375, border: "1px solid #ddd" }}
    />
  </figure>
</center>

### 5. 水平滚动 + 可关闭

```tsx | pure
<NoticeBar
  data={['我是通知我是通知我是通知我是通知我是通知我是通知']}
  mode="close"
  animation
  duration={5000}
  onClose={() => console.log('hello')}
/>
```

<center>
  <div style={{ display: 'flex', width: 750 }}>
    <div style={{ width: 375 }}>IOS效果图</div>
    <div style={{ width: 375 }}>Android效果图</div>
  </div>
</center>
<center>
  <figure>
    <img
      alt="noticeBar-ios5"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1607591428972724765.gif"
      style={{ width: 375, marginRight: 10, border: "1px solid #ddd" }}
    />
    <img
      alt="noticeBar-android5"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1608204143683850321.gif"
      style={{ width: 375, border: "1px solid #ddd" }}
    />
  </figure>
</center>

### 6. 上下滚动

```tsx | pure
<NoticeBar
  data={['1111', '2222', '3333', '4444']}
  mode="close"
  onPress={() => console.log('hello')}
  delay={3000}
  duration={200}
/>
```

<center>
  <div style={{ display: 'flex', width: 750 }}>
    <div style={{ width: 375 }}>IOS效果图</div>
    <div style={{ width: 375 }}>Android效果图</div>
  </div>
</center>
<center>
  <figure>
    <img
      alt="noticeBar-ios6"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1607591587750977107.gif"
      style={{ width: 375, marginRight: 10, border: "1px solid #ddd" }}
    />
    <img
      alt="noticeBar-android6"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1608204155739759993.gif"
      style={{ width: 375, border: "1px solid #ddd" }}
    />
  </figure>
</center>

## API

| 属性      | 必填    | 说明 | 类型                          | 默认值  |
| --------- | ------- | ---- | ----------------------------- | ------- |
| data      | `true`  |      | `string[]`                    | `[]`    |
| icon      | `false` |      | `ReactNode`                   |         |
| mode      | `false` |      | `close` \| `link` \| `''`     | `''`    |
| onPress   | `false` |      | `() => void`                  |         |
| onClose   | `false` |      | `() => void \| Promise<void>` |         |
| animation | `false` |      | `boolean`                     | `false` |
| duration  | `false` |      | `number`                      | `300`   |
| delay     | `false` |      | `number`                      | `1500`  |
