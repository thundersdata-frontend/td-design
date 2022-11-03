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
<Form onFinish={handleFinish} form={form}>
  <FormListItem title="手机号" required name="useCharacter" rules={[{ required: true, message: '请输入手机号' }]}>
    <InputItem border={false} placeholder="请输入手机号" inputStyle={{ textAlign: 'right' }} />
  </FormListItem>
  <WhiteSpace size="x4" />
  <FormItem type={bordered ? 'all' : 'bottom'} name="sms" rules={[{ required: true, message: '请输入验证码' }]}>
    <CountDown
      bordered={bordered}
      onSend={() => {
        console.log('123');
      }}
    />
  </FormItem>
</Form>
```

<center>
  <figure>
    <img
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1643100543561048617.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 2. 配置 codeType

```tsx | pure
<Form onFinish={handleFinish} form={form}>
  <FormListItem title="手机号" required name="useCharacter" rules={[{ required: true, message: '请输入手机号' }]}>
    <InputItem border={false} placeholder="请输入手机号" inputStyle={{ textAlign: 'right' }} />
  </FormListItem>
  <WhiteSpace size="x4" />
  <FormItem type={bordered ? 'all' : 'bottom'} name="sms" rules={[{ required: true, message: '请输入验证码' }]}>
    <CountDown
      bordered={bordered}
      codeType="border"
      onSend={() => {
        console.log('123');
      }}
    />
  </FormItem>
</Form>
```

<center>
  <figure>
    <img
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1643100592792781362.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

## API

| 属性        | 必填    | 说明                 | 类型                      | 默认值       |
| ----------- | ------- | -------------------- | ------------------------- | ------------ |
| bordered    | `false` | 是否显示外边框       | `boolean`                 | `false`      |
| label       | `false` | 倒计时文字           | `string`                  | `获取验证码` |
| resendLabel | `false` | 重新发送文字         | `string`                  | `重新发送`   |
| count       | `false` | 倒计时时长           | `number`                  | `60`         |
| codeType    | `false` | 验证码样式是否有边框 | `normal` \| `border`      | `normal`     |
| value       | `false` | 验证码值             | `string`                  |              |
| onChange    | `false` | 输入改变事件         | `(value: string) => void` |              |
| onBefore    | `false` | 发验证码之前的回调   | `() => Promise<boolean>`  |              |
| onSend      | `true`  | 发送验证码           | `() => void`              |              |
| onEnd       | `false` | 倒计时结束后的回调   | `() => void`              |              |
