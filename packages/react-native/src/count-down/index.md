---
title: CountDown - 倒计时组件
nav:
  title: RN组件
  path: /react-native
group:
  title: 表单组件
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

```ts
export interface SmsProps {
  /** 倒计时文字，默认为 获取验证码 */
  sendText?: string;
  /** 重新发送文字，默认为：重新发送 */
  resendText?: string;
  /** 倒计时时长，默认为 60秒 */
  count?: number;
  /** 发送验证码之前的回调，通常用于判断手机号是否有值 */
  onBefore?: () => Promise<boolean>;
  /** 发送验证码 */
  onSend: () => void;
  /** 倒计时结束后的回调 */
  onEnd?: () => void;
  /** 验证码样式是否有边框 */
  codeType?: 'normal' | 'border';
  /** 按下时的不透明度 */
  activeOpacity?: number;
}
export interface CountDownItemProps extends InputItemProps, SmsProps {}

export interface CountDownProps extends InputProps, SmsProps {}
```
