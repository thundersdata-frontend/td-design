---
title: Passcode - 密码/验证码组件
nav:
  title: RN组件
  path: /react-native
group:
  title: Feedback
  path: /feedback
---

# Passcode 密码/验证码组件

## 效果演示

### 1. 默认效果

```tsx | pure
<Passcode clearTextOnFocus onChange={handleChange} keyboardType="phone-pad" ref={otpRef} selectTextOnFocus={false} />
```

<center>
  <figure>
    <img
      alt="默认效果 ios"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1643188571380928998.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 2. 修改验证码位数

```tsx | pure
<Passcode
  clearTextOnFocus
  onChange={handleChange}
  keyboardType="phone-pad"
  count={4}
  ref={otpRef}
  selectTextOnFocus={false}
/>
```

<center>
  <figure>
    <img
      alt="修改验证码位数 ios"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1643188376632283785.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 3. 自定义样式

```tsx | pure
<Passcode
  secureTextEntry={false}
  ref={otpRef}
  style={{ margin: 20 }}
  inputContainerStyle={{ borderWidth: 1, borderColor: 'green' }}
  focusStyle={{ borderWidth: 1, borderColor: 'red' }}
  onFinish={() => console.log('222')}
/>
```

<center>
  <figure>
    <img
      alt="自定义样式 ios"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1643188967829347930.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 4. 密码输入样式

```tsx | pure
<Passcode
  secureTextEntry={true}
  ref={otpRef}
  style={{ margin: 20 }}
  inputContainerStyle={{ borderWidth: 1, borderColor: 'green' }}
  focusStyle={{ borderWidth: 1, borderColor: 'red' }}
  onFinish={() => console.log('222')}
/>
```

<center>
  <figure>
    <img
      alt="手动设置 page ios"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1643189073013519274.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

## API

### Passcode (继承自 `TextInputProps`)

| 属性                | 必填    | 说明                   | 类型                     | 默认值      |
| ------------------- | ------- | ---------------------- | ------------------------ | ----------- |
| keyboardType        | `false` | 键盘类型               | `KeyboardType`           | `phone-pad` |
| style               | `false` | 容器样式               | `ViewStyle`              |             |
| focusStyle          | `false` | 聚焦的某个输入框的样式 | `ViewStyle`              |             |
| value               | `false` | 当前输入的验证码       | `string`                 |             |
| onChange            | `false` | 验证码输入回调         | `(code: string) => void` |             |
| inputContainerStyle | `false` | 输入框容器样式         | `ViewStyle`              |             |
| inputStyle          | `false` | 输入框样式             | `TextStyle`              |             |
| count               | `false` | 验证码长度             | `number`                 | `6`         |
| onFinish            | `false` | 验证码输入完成后的回调 | `() => void`             |             |

### PasswordInputRef

| 属性     | 说明                 | 类型            |
| -------- | -------------------- | --------------- |
| reset    | 重置验证码           | `() => void;`   |
| focus    | 聚焦验证码           | `() => void;`   |
| getValue | 获取当前输入的验证码 | `() => string;` |
