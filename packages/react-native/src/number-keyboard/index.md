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
  <figure>
    <img
      alt="数字键盘 ios"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609320228495622158.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
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
  <figure>
    <img
      alt="身份证键盘 ios"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609320228906238884.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
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
  <figure>
    <img
      alt="整数键盘 ios"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609320228906451063.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
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
  <figure>
    <img
      alt="键盘弹窗 ios"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609320231762702497.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 5. NumberKeyboardInput

```tsx | pure
<NumberKeyboardInput type="number" digit={2} />
```

<center>
  <figure>
    <img
      alt="键盘弹窗 ios"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1643186997476238471.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 6. NumberKeyboardFilter

```tsx | pure
<NumberKeyboardFilter label="运单量" type="number" digit={2} />
```

<center>
  <figure>
    <img
      alt="键盘弹窗 ios"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1643187096525786335.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

## API

### NumberKeyboard 组件

| 属性     | 必填    | 说明                            | 类型                              | 默认值   |
| -------- | ------- | ------------------------------- | --------------------------------- | -------- |
| type     | `false` | 键盘类型 （数字、身份证、整数） | `number` \| `IdCard` \| `integer` | `number` |
| onPress  | `false` | 按键的回调事件                  | `(key: string) => void`           |          |
| onDelete | `false` | 删除按键的回调事件              | `() => void`                      |          |
| onSubmit | `false` | 提交按键的回调事件              | `() => void`                      |          |

### NumberKeyboardModal 组件

| 属性     | 必填    | 说明                            | 类型                              | 默认值   |
| -------- | ------- | ------------------------------- | --------------------------------- | -------- |
| type     | `false` | 键盘类型 （数字、身份证、整数） | `number` \| `IdCard` \| `integer` | `number` |
| onPress  | `false` | 按键的回调事件                  | `(key: string) => void`           |          |
| onDelete | `false` | 删除按键的回调事件              | `() => void`                      |          |
| onSubmit | `false` | 提交按键的回调事件              | `() => void`                      |          |
| value    | `false` | 输入值                          | `string`                          |          |
| visible  | `true`  | 是否打开弹窗                    | `boolean`                         | `false`  |
| onClose  | `true`  | 关闭弹窗的回调事件              | `() => void`                      |          |

### NumberKeyboardInput 组件

| 属性        | 必填    | 说明                            | 类型                              | 默认值   |
| ----------- | ------- | ------------------------------- | --------------------------------- | -------- |
| type        | `false` | 键盘类型 （数字、身份证、整数） | `number` \| `IdCard` \| `integer` | `number` |
| value       | `false` | 输入值                          | `string`                          |          |
| onChange    | `false` | 值修改后的回调事件              | `(value: string) => void`         |          |
| placeholder | `false` | 提示语                          | `string`                          | `请输入` |
| style       | `false` | 自定义样式                      | `ViewStyle`                       |          |
| arrowClear  | `false` | 是否允许清空                    | `boolean`                         | `true`   |
| disabled    | `false` | 是否禁用                        | `boolean`                         | `false`  |
| digit       | `false` | 保留的小数位数                  | `number`                          | `0`      |
| selectable  | `false` | 是否支持复制粘贴                | `boolean`                         | `false`  |

### NumberKeyboardFilter 组件

| 属性        | 必填    | 说明                            | 类型                              | 默认值   |
| ----------- | ------- | ------------------------------- | --------------------------------- | -------- |
| type        | `false` | 键盘类型 （数字、身份证、整数） | `number` \| `IdCard` \| `integer` | `number` |
| value       | `false` | 输入值                          | `string`                          |          |
| onChange    | `false` | 值修改后的回调                  | `(value: string) => void`         |          |
| placeholder | `false` | 提示语                          | `string`                          | `请输入` |
| style       | `false` | 自定义样式                      | `ViewStyle`                       |          |
| arrowClear  | `false` | 是否允许清空                    | `boolean`                         | `true`   |
| disabled    | `false` | 是否禁用                        | `boolean`                         | `false`  |
| digit       | `false` | 保留的小数位数                  | `number`                          | `0`      |
| label       | `true`  | 标签文本                        | `string`                          |          |
| selectable  | `false` | 是否支持复制粘贴                | `boolean`                         | `false`  |
