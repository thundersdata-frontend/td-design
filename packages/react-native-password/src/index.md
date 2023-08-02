---
title: Password - 密码框组件
nav:
  title: RN组件
  path: /react-native
group:
  title: 其他组件
  path: /other
---

# Password 密码框组件

使用本组件需要单独安装：**yarn add @td-design/react-native-password**

推荐使用[Passcode](feedback/passcode)组件代替

## 效果演示

### 1. 基本

```tsx | pure
  <Text>基本:</Text>
  <WhiteSpace />
  <Password onDone={onDone} />
```

<center>
  <figure>
    <img
      alt="密码框组件 ios"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1608963546617636014.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 2. 显示光标

```tsx | pure
  <Text>显示光标:</Text>
  <WhiteSpace />
  <Password onDone={onDone} showCursor />
```

<center>
  <figure>
    <img
      alt="显示光标 ios"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1608963546603881375.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 3. 基本弹窗

```tsx | pure
  <Text>弹窗:</Text>
  <WhiteSpace />
  <Button
    title="modal"
    onPress={() => {
      Password.modal({ title: '仿支付宝支付', onDone: onDone });
    }}
  />
```

<center>
  <figure>
    <img
      alt="基本弹窗 ios"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1608963546615332497.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 4. 弹窗显示光标

```tsx | pure
  <Text>弹窗显示光标:</Text>
  <WhiteSpace />
  <Button
    title="modal"
    onPress={() => {
      Password.modal({ title: '仿支付宝支付', onDone: onDone, showCursor: true });
    }}
  />
```

<center>
  <figure>
    <img
      alt="弹窗显示光标 ios"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1608963548250977751.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

## API

### Password 组件

| 属性          | 必填    | 说明                 | 类型                         | 默认值  |
| ------------- | ------- | -------------------- | ---------------------------- | ------- |
| length        | `false` | 密码框长度           | `number`                     | `6`     |
| onDone        | `false` | 按键完成事件回调事件 | `(password: string) => void` |         |
| clean         | `false` | 是否清除             | `boolean`                    | `true`  |
| onChange      | `false` | 密码改变事件回调事件 | `(password: string) => void` |         |
| showCursor    | `false` | 是否显示光标         | `boolean`                    | `false` |
| activeOpacity | `false` | 按下时的不透明度     | `number`                     | `0.6`   |

### PasswordInputRef

| 属性  | 说明              | 类型         |
| ----- | ----------------- | ------------ |
| show  | 显示键盘          | `() => void` |
| hide  | 隐藏键盘          | `() => void` |
| clean | 清除 imput 的输入 | `() => void` |

### PasswordModal 组件

| 属性          | 必填    | 说明             | 类型                         | 默认值  |
| ------------- | ------- | ---------------- | ---------------------------- | ------- |
| title         | `false` | 密码框标题       | `string`                     |         |
| length        | `false` | 密码框长度       | `number`                     | `6`     |
| onDone        | `false` | 提交事件         | `(password: string) => void` |         |
| showCursor    | `false` | 是否显示光标     | `boolean`                    | `false` |
| activeOpacity | `false` | 按下时的不透明度 | `number`                     | `0.6`   |
