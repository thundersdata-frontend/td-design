---
title: CountDown - 倒计时组件
nav:
  title: RN组件
  path: /react-native
group:
  title: Other
  path: /other
---

# CountDown 倒计时组件

## 效果演示

### 1. 默认配置

```tsx | pure
<WingBlank>
  <InputItem label="手机号" placeholder="请输入手机号" value={value} onChange={setValue} />
  <CountDown ref={countDownRef} handleClick={() => send(value)} onEnd={() => console.log('倒计时结束')} />
</WingBlank>
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
      src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1607430991524&di=24c0bf75a6d0efeff1c48e13829eca72&imgtype=0&src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201308%2F23%2F220651x9b0h4kru904ozre.jpg"
      style={{ width: 375, marginRight: 10, border: "1px solid #ddd" }}
    />
    <img
      alt=""
      src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1607430991524&di=24c0bf75a6d0efeff1c48e13829eca72&imgtype=0&src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201308%2F23%2F220651x9b0h4kru904ozre.jpg"
      style={{ width: 375, border: "1px solid #ddd" }}
    />
  </figure>
</center>

### 2. 配置 codeType

```tsx | pure
<WingBlank>
  <InputItem label="手机号" placeholder="请输入手机号" value={value} onChange={setValue} />
  <CountDown
    codeType="border"
    ref={countDownRef}
    handleClick={() => send(value)}
    onEnd={() => console.log('倒计时结束')}
  />
</WingBlank>
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
      src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1607430991524&di=24c0bf75a6d0efeff1c48e13829eca72&imgtype=0&src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201308%2F23%2F220651x9b0h4kru904ozre.jpg"
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

| 属性        | 必填    | 说明                 | 类型                      | 默认值       |
| ----------- | ------- | -------------------- | ------------------------- | ------------ |
| label       | `false` | 倒计时文字           | `string`                  | `获取验证码` |
| count       | `false` | 倒计时时长           | `number`                  | `60`         |
| codeType    | `false` | 验证码样式是否有边框 | `normal` \| `border`      | `normal`     |
| value       | `false` | 验证码值             | `string`                  |              |
| handleClick | `true`  | 发送验证码           | `() => void`              |              |
| onEnd       | `false` | 倒计时结束后的回调   | `() => void`              |              |
| onChange    | `false` | 输入改变事件         | `(value: string) => void` |              |
