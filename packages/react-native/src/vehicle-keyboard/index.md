---
title: VehicleKeyboard - 车牌键盘组件
nav:
  title: RN组件
  path: /react-native
group:
  title: 反馈组件
  path: /feedback
---

# VehicleKeyboard 车牌键盘组件

## 效果演示

### 1. 默认的车牌键盘

```tsx | pure
<VehicleKeyboard
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

## API

### VehicleKeyboardView 组件

| 属性          | 必填    | 说明                            | 类型                              | 默认值   |
| ------------- | ------- | ------------------------------- | --------------------------------- | -------- |
| type          | `false` | 键盘类型 （数字、身份证、整数） | `number` \| `IdCard` \| `integer` | `number` |
| onPress       | `false` | 按键的回调事件                  | `(key: string) => void`           |          |
| onDelete      | `false` | 删除按键的回调事件              | `() => void`                      |          |
| onSubmit      | `false` | 提交按键的回调事件              | `() => void`                      |          |
| activeOpacity | `false` | 按下时的不透明度                | `number`                          | `0.5`    |

### VehicleKeyboardModal 组件

| 属性          | 必填    | 说明                            | 类型                              | 默认值   |
| ------------- | ------- | ------------------------------- | --------------------------------- | -------- |
| type          | `false` | 键盘类型 （数字、身份证、整数） | `number` \| `IdCard` \| `integer` | `number` |
| onPress       | `false` | 按键的回调事件                  | `(key: string) => void`           |          |
| onDelete      | `false` | 删除按键的回调事件              | `() => void`                      |          |
| onSubmit      | `false` | 提交按键的回调事件              | `(value: string) => void`         |          |
| activeOpacity | `false` | 按下时的不透明度                | `number`                          | `0.5`    |
| submitText    | `false` | 提交按键的文本                  | `string`                          | `确定`   |
| value         | `false` | 输入值                          | `string`                          |          |
| visible       | `true`  | 是否打开弹窗                    | `boolean`                         | `false`  |
| onClose       | `true`  | 关闭弹窗的回调事件              | `() => void`                      |          |

### VehicleKeyboardItem 组件

| 属性          | 必填    | 说明                            | 类型                              | 默认值   |
| ------------- | ------- | ------------------------------- | --------------------------------- | -------- |
| type          | `false` | 键盘类型 （数字、身份证、整数） | `number` \| `IdCard` \| `integer` | `number` |
| activeOpacity | `false` | 按下时的不透明度                | `number`                          | `0.5`    |
| value         | `false` | 输入值                          | `string`                          |          |
| onChange      | `false` | 值修改后的回调                  | `(value: string) => void`         |          |
| onCheck       | `false` | 对值进行校验的回调              | `(value: string) => Promise<any>` |          |
| placeholder   | `false` | 提示语                          | `string`                          | `请输入` |
| style         | `false` | 自定义样式                      | `ViewStyle`                       |          |
| inputStyle    | `false` | 输入框文字样式                  | `TextStyle`                       |          |
| extra         | `false` | 右侧内容                        | `ReactNode`                       |          |
| arrowClear    | `false` | 是否允许清空                    | `boolean`                         | `true`   |
| disabled      | `false` | 是否禁用                        | `boolean`                         | `false`  |
| minHeight     | `false` | 输入框最小高度                  | `number`                          | `32`     |

### VehicleKeyboardInput 组件

| 属性          | 必填    | 说明                            | 类型                              | 默认值   |
| ------------- | ------- | ------------------------------- | --------------------------------- | -------- |
| type          | `false` | 键盘类型 （数字、身份证、整数） | `number` \| `IdCard` \| `integer` | `number` |
| activeOpacity | `false` | 按下时的不透明度                | `number`                          | `0.5`    |
| value         | `false` | 输入值                          | `string`                          |          |
| onChange      | `false` | 值修改后的回调                  | `(value: string) => void`         |          |
| onCheck       | `false` | 对值进行校验的回调              | `(value: string) => Promise<any>` |          |
| placeholder   | `false` | 提示语                          | `string`                          | `请输入` |
| style         | `false` | 自定义样式                      | `ViewStyle`                       |          |
| inputStyle    | `false` | 输入框文字样式                  | `TextStyle`                       |          |
| extra         | `false` | 右侧内容                        | `ReactNode`                       |          |
| arrowClear    | `false` | 是否允许清空                    | `boolean`                         | `true`   |
| disabled      | `false` | 是否禁用                        | `boolean`                         | `false`  |
| minHeight     | `false` | 输入框最小高度                  | `number`                          | `32`     |
| label         | `true`  | 标签文本                        | `string`                          |          |
| brief         | `false` | 底部内容                        | `ReactNode`                       |          |
