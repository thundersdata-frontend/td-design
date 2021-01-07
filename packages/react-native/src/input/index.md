---
title: Input - 文本输入组件
nav:
  title: RN组件
  path: /react-native
group:
  title: Form
  path: /form
  order: 4
---

# Input 文本输入组件

## 效果演示

### 1. 只有一个输入框

```tsx | pure
<Input placeholder="请输入姓名" />
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
      alt="input-ios1.png"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1607934747327132447.png"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt="input-android1.png"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609228597227222274.png"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 2. 输入框带标签和左右图标

```tsx | pure
<Input
  value={value}
  onChange={setValue}
  label="姓名"
  placeholder="请输入姓名"
  leftIcon={<Icon name="user" color="green" />}
  rightIcon={<Icon name="customerservice" color="gold" />}
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
      alt="input-ios2.png"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1607934917611994869.png"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt="input-android2.png"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609228597185215576.png"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 3. 标签在输入框上方

```tsx | pure
<Input label="姓名" placeholder="请输入姓名" labelPosition="top" leftIcon={<Icon name="user" color="green" />} />
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
      alt="input-ios3.png"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1607934974049162262.png"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt="input-android3.png"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609228597183568969.png"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 4. 带冒号和必填标识

```tsx | pure
<Input
  colon
  required
  value={value}
  onChange={setValue}
  label="姓名"
  placeholder="请输入姓名"
  leftIcon={<Icon name="user" color="green" />}
  rightIcon={<Icon name="customerservice" color="gold" />}
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
      alt="input-ios4.png"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1607935036647969320.png"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt="input-android4.png"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609228597217322766.png"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 5. 文本域效果

```tsx | pure
<TextArea label="姓名" placeholder="请输入姓名" />
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
      alt="input-ios5.png"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1607935124946146557.png"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt="input-android5.png"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609228597195038265.png"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 6. 带字数限制的文本域

```tsx | pure
<TextArea label="详情" placeholder="请输入详情" limit={20} />
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
      alt="input-ios6.png"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1607935503663968541.png"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt="input-android6.png"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609228597223168816.png"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 7. InputItem 效果

```tsx | pure
<InputItem label="姓名" placeholder="请输入姓名" />
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
      alt="input-ios7.png"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1607945199283339224.png"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt="input-android7.png"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609228597936425802.png"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 8. InputItem 设置 extra 属性

```tsx | pure
<InputItem label="姓名" placeholder="请输入姓名" extra={<Text style={{ color: 'green' }}>test</Text>} />
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
      alt="input-ios8.png"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1607945333933480168.png"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt="input-android8.png"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609228597876994964.png"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 9. 密码输入框

```tsx | pure
<InputItem label="密码" placeholder="请输入密码" allowClear={false} inputType="password" required colon />
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
      alt="input-ios9.png"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1607945442040887604.png"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt="input-android9.png"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609228597880462736.png"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

## API

### Input 属性

继承`TextInput`组件的属性，但是移除了`placeholderTextColor`、`onChange`、`onChangeText`属性。

参见：[https://reactnative.dev/docs/textinput](https://reactnative.dev/docs/textinput)

| 属性          | 必填    | 说明                                 | 类型                      | 默认值  |
| ------------- | ------- | ------------------------------------ | ------------------------- | ------- |
| label         | `false` | 标签                                 | `ReactNode`               |         |
| labelPosition | `false` | 标签位置。输入框左侧或者顶部         | `left` \| `top`           | `left`  |
| inputType     | `false` | 输入框类型。文本输入框或者密码输入框 | `input` \| `password`     | `input` |
| leftIcon      | `false` | 左侧图标                             | `ReactNode`               |         |
| rightIcon     | `false` | 右侧图标                             | `ReactNode`               |         |
| allowClear    | `false` | 是否显示清除图标                     | `boolean`                 | `true`  |
| value         | `false` | 输入框的值                           | `string`                  |         |
| onChange      | `false` | 输入框值改变的回调                   | `(value: string) => void` |         |
| disabled      | `false` | 是否禁用输入框                       | `boolean`                 | `false` |
| colon         | `false` | 是否在标签后显示冒号                 | `boolean`                 | `false` |
| required      | `false` | 是否在标签前显示必填标识             | `boolean`                 | `false` |

### InputItem 属性

| 属性       | 必填    | 说明                                 | 类型                      | 默认值  |
| ---------- | ------- | ------------------------------------ | ------------------------- | ------- |
| label      | `false` | 标签                                 | `ReactNode`               |         |
| inputType  | `false` | 输入框类型。文本输入框或者密码输入框 | `input` \| `password`     | `input` |
| extra      | `false` |                                      | `ReactNode`               |         |
| allowClear | `false` | 是否显示清除图标                     | `boolean`                 | `true`  |
| value      | `false` | 输入框的值                           | `string`                  |         |
| onChange   | `false` | 输入框值改变的回调                   | `(value: string) => void` |         |
| colon      | `false` | 是否在标签后显示冒号                 | `boolean`                 | `false` |
| required   | `false` | 是否在标签前显示必填标识             | `boolean`                 | `false` |
| onClear    | `false` | 点击清除按钮时的回调                 | `() => void`              |         |

_当传递了`onClear`事件时，onChange 不会再自动触发，需要`onClear`事件处理清空`value`的操作。_

### TextArea 属性

| 属性     | 必填    | 说明                           | 类型                      | 默认值 |
| -------- | ------- | ------------------------------ | ------------------------- | ------ |
| label    | `false` | 标签                           | `ReactNode`               |        |
| value    | `false` | 输入框的值                     | `string`                  |        |
| onChange | `false` | 输入框值改变的回调             | `(value: string) => void` |        |
| height   | `false` | 文本域高度                     | `number`                  | `150`  |
| limit    | `false` | 输入文字长度限制。不传时不显示 | `number`                  |        |
