---
title: CountDown - 倒计时组件
nav:
  title: RN组件
  path: /react-native
group:
  title: Form
  path: /form
---

# CountDown 倒计时组件

倒计时组件的调用后端接口发送请求部分，由开发人员自行实现（包括手机号校验等）。

## 效果演示

### 1. 默认配置

```tsx | pure
<InputItem label="手机号" placeholder="请输入手机号" value={value} onChange={setValue} />
<CountDown onClick={() => send(value)} onEnd={() => console.log('倒计时结束')} />
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
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1610003004361958630.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1610003253796422768.gif"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 2. 配置 codeType

```tsx | pure
<InputItem label="手机号" placeholder="请输入手机号" value={value} onChange={setValue} />
<CountDown codeType="border" onClick={() => send(value)} onEnd={() => console.log('倒计时结束')} />
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
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1610003912776960694.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1610003923481708632.gif"
      style="width: 375px; border: 1px solid #ddd;"
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
