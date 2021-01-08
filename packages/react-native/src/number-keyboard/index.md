---
title: NumberKeyboard - 弹窗组件
nav:
  title: RN组件
  path: /react-native
group:
  title: Feedback
  path: /feedback
---

# NumberKeyboard 数字键盘组件

## 效果演示

### 1. 默认的数字键盘

```tsx | pure
<NumberKeyboard
  onPress={e => {
    Alert.alert(e);
  }}
  onDelete={() => {
    Alert.alert('delete');
  }}
  onSubmit={() => {
    Alert.alert('submit');
  }}
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
      alt="数字键盘 ios"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609320228495622158.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt="数字键盘android"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609320230627520509.gif"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 2. 身份证键盘

```tsx | pure
<NumberKeyboard
  type="IdCard"
  onPress={e => {
    Alert.alert(e);
  }}
  onDelete={() => {
    Alert.alert('delete');
  }}
  onSubmit={() => {
    Alert.alert('submit');
  }}
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
      alt="身份证键盘 ios"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609320228906238884.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt="身份证键盘 android"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609320229657561452.gif"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 3. 整数键盘

```tsx | pure
<NumberKeyboard
  type="integer"
  onPress={e => {
    Alert.alert(e);
  }}
  onDelete={() => {
    Alert.alert('delete');
  }}
  onSubmit={() => {
    Alert.alert('submit');
  }}
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
      alt="整数键盘 ios"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609320228906451063.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt="整数键盘 android"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609320228502122419.gif"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 4. 键盘弹窗

```tsx | pure
<Button
  title="keyboard"
  onPress={() =>
    modal({
      type: 'IdCard',
      onPress: e => {
        Alert.alert(e);
      },
      onDelete: () => {
        Alert.alert('delete');
      },
      onSubmit: () => {
        Alert.alert('submit');
      },
    })
  }
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
      alt="键盘弹窗 ios"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609320231762702497.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt="键盘弹窗 android"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609320231089210243.gif"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

## API

### NumberKeyboard 组件

| 属性     | 必填    | 说明                      | 类型                              | 默认值   |
| -------- | ------- | ------------------------- | --------------------------------- | -------- |
| type     | `false` | 键盘类型 数字 身份证 整数 | `number` \| `IdCard` \| `integer` | `number` |
| onPress  | `false` | 按键事件回调事件          | `(key: string) => void`           |          |
| onDelete | `false` | 删除按键事件回调事件      | `() => void`                      |          |
| onSubmit | `false` | 提交按键事件回调事件      | `() => void`                      |          |

### NumberKeyboardModal 组件

| 属性     | 必填    | 说明                      | 类型                              | 默认值   |
| -------- | ------- | ------------------------- | --------------------------------- | -------- |
| type     | `false` | 键盘类型 数字 身份证 整数 | `number` \| `IdCard` \| `integer` | `number` |
| onPress  | `false` | 按键事件回调事件          | `(key: string) => void`           |          |
| onDelete | `false` | 删除按键事件回调事件      | `() => void`                      |          |
| onSubmit | `false` | 提交按键事件回调事件      | `() => void`                      |          |
