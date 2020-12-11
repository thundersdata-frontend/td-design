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
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1607590503170736339.png"
      style={{ width: 375, marginRight: 10, border: "1px solid #ddd" }}
    />
    <img
      alt=""
      src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1607430991524&di=24c0bf75a6d0efeff1c48e13829eca72&imgtype=0&src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201308%2F23%2F220651x9b0h4kru904ozre.jpg"
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
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1607590691904731707.gif"
      style={{ width: 375, marginRight: 10, border: "1px solid #ddd" }}
    />
    <img
      alt=""
      src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1607430991524&di=24c0bf75a6d0efeff1c48e13829eca72&imgtype=0&src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201308%2F23%2F220651x9b0h4kru904ozre.jpg"
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
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1607590833751471161.gif"
      style={{ width: 375, marginRight: 10, border: "1px solid #ddd" }}
    />
    <img
      alt=""
      src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1607430991524&di=24c0bf75a6d0efeff1c48e13829eca72&imgtype=0&src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201308%2F23%2F220651x9b0h4kru904ozre.jpg"
      style={{ width: 375, border: "1px solid #ddd" }}
    />
  </figure>
</center>

### 4. 水平滚动 + 可跳转

```tsx | pure
// 这里粘贴代码
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
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1607591139376924562.gif"
      style={{ width: 375, marginRight: 10, border: "1px solid #ddd" }}
    />
    <img
      alt=""
      src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1607430991524&di=24c0bf75a6d0efeff1c48e13829eca72&imgtype=0&src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201308%2F23%2F220651x9b0h4kru904ozre.jpg"
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
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1607591428972724765.gif"
      style={{ width: 375, marginRight: 10, border: "1px solid #ddd" }}
    />
    <img
      alt=""
      src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1607430991524&di=24c0bf75a6d0efeff1c48e13829eca72&imgtype=0&src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201308%2F23%2F220651x9b0h4kru904ozre.jpg"
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
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1607591587750977107.gif"
      style={{ width: 375, marginRight: 10, border: "1px solid #ddd" }}
    />
    <img
      alt=""
      src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1607430991524&di=24c0bf75a6d0efeff1c48e13829eca72&imgtype=0&src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201308%2F23%2F220651x9b0h4kru904ozre.jpg"
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
