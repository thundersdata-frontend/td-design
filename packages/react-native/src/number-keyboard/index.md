---
title: NumberKeyboard - 数字键盘组件
nav:
  title: RN组件
  path: /react-native
group:
  title: 表单组件
  path: /form
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

### 5. NumberKeyboardItem

```tsx | pure
<NumberKeyboardItem type="number" digit={2} />
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

### 6. NumberKeyboardInput

```tsx | pure
<NumberKeyboardInput label="运单量" type="number" digit={2} />
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

### NumberKeyboardView 组件

| 属性          | 必填    | 说明                            | 类型                              | 默认值   |
| ------------- | ------- | ------------------------------- | --------------------------------- | -------- |
| type          | `false` | 键盘类型 （数字、身份证、整数） | `number` \| `IdCard` \| `integer` | `number` |
| onPress       | `false` | 按键的回调事件                  | `(key: string) => void`           |          |
| onDelete      | `false` | 删除按键的回调事件              | `() => void`                      |          |
| onSubmit      | `false` | 提交按键的回调事件              | `() => void`                      |          |
| submitText    | `false` | 提交按键的文本                  | `string`                          | `确定`   |
| activeOpacity | `false` | 按下时的不透明度                | `number`                          | `0.6`    |

### NumberKeyboardModal 组件

| 属性          | 必填    | 说明                            | 类型                              | 默认值   |
| ------------- | ------- | ------------------------------- | --------------------------------- | -------- |
| type          | `false` | 键盘类型 （数字、身份证、整数） | `number` \| `IdCard` \| `integer` | `number` |
| onPress       | `false` | 按键的回调事件                  | `(key: string) => void`           |          |
| onDelete      | `false` | 删除按键的回调事件              | `() => void`                      |          |
| onSubmit      | `false` | 提交按键的回调事件              | `(value: string) => void`         |          |
| submitText    | `false` | 提交按键的文本                  | `string`                          | `确定`   |
| activeOpacity | `false` | 按下时的不透明度                | `number`                          | `0.6`    |
| value         | `false` | 输入值                          | `string`                          |          |
| visible       | `true`  | 是否打开弹窗                    | `boolean`                         | `false`  |
| onClose       | `true`  | 关闭弹窗的回调事件              | `() => void`                      |          |
| prefixLabel   | `false` | 输入的值的前置文本              | `string`                          | `当前值` |

### NumberKeyboardItem 组件

| 属性          | 必填    | 说明                            | 类型                              | 默认值   |
| ------------- | ------- | ------------------------------- | --------------------------------- | -------- |
| type          | `false` | 键盘类型 （数字、身份证、整数） | `number` \| `IdCard` \| `integer` | `number` |
| value         | `false` | 输入值                          | `string`                          |          |
| onChange      | `false` | 值修改后的回调                  | `(value: string) => void`         |          |
| onCheck       | `false` | 对值进行校验的回调              | `(value: string) => Promise<any>` |          |
| placeholder   | `false` | 提示语                          | `string`                          | `请输入` |
| style         | `false` | 自定义样式                      | `ViewStyle`                       |          |
| inputStyle    | `false` | 输入框自定义样式                | `TextStyle`                       |          |
| extra         | `false` | 右侧内容                        | `ReactNode`                       |          |
| arrowClear    | `false` | 是否允许清空                    | `boolean`                         | `true`   |
| disabled      | `false` | 是否禁用                        | `boolean`                         | `false`  |
| digit         | `false` | 保留的小数位数                  | `number`                          | `0`      |
| activeOpacity | `false` | 按下时的不透明度                | `number`                          | `0.6`    |

### NumberKeyboardInput 组件

| 属性          | 必填    | 说明                            | 类型                              | 默认值   |
| ------------- | ------- | ------------------------------- | --------------------------------- | -------- |
| type          | `false` | 键盘类型 （数字、身份证、整数） | `number` \| `IdCard` \| `integer` | `number` |
| value         | `false` | 输入值                          | `string`                          |          |
| onChange      | `false` | 值修改后的回调                  | `(value: string) => void`         |          |
| onCheck       | `false` | 对值进行校验的回调              | `(value: string) => Promise<any>` |          |
| placeholder   | `false` | 提示语                          | `string`                          | `请输入` |
| style         | `false` | 自定义样式                      | `ViewStyle`                       |          |
| inputStyle    | `false` | 输入框自定义样式                | `TextStyle`                       |          |
| extra         | `false` | 右侧内容                        | `ReactNode`                       |          |
| arrowClear    | `false` | 是否允许清空                    | `boolean`                         | `true`   |
| disabled      | `false` | 是否禁用                        | `boolean`                         | `false`  |
| digit         | `false` | 保留的小数位数                  | `number`                          | `0`      |
| minHeight     | `false` | 最小高度                        | `number`                          | `32`     |
| activeOpacity | `false` | 按下时的不透明度                | `number`                          | `0.6`    |
| label         | `false` | 标签文本                        | `ReactNode`                       |          |
| labelPosition | `false` | 标签位置。输入框左侧或者顶部    | `left` \| `top`                   | `left`   |
| colon         | `false` | 是否在标签后显示冒号            | `boolean`                         | `false`  |
| required      | `false` | 是否在标签前显示必填标识        | `boolean`                         | `false`  |
| brief         | `false` | 其他内容                        | `ReactNode`                       |          |
