---
title: Radio - 单选框
nav:
  title: RN 组件
  path: /react-native
group:
  title: Form
  path: /form
---

# Radio 单选框

## 效果演示

### 1. 默认效果

```tsx | pure
<Radio
  options={[
    { label: 'Apple', value: 'Apple' },
    { label: 'Pear', value: 'Pear' },
    { label: 'Orange', value: 'Orange' },
  ]}
/>
```

<center>
  <figure>
    <img
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1643191517006751379.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 2. 默认选中

```tsx | pure
<Radio
  options={[
    { label: 'Apple', value: 'Apple' },
    { label: 'Pear', value: 'Pear' },
    { label: 'Orange', value: 'Orange' },
  ]}
  defaultValue={'Pear'}
/>
```

<center>
  <figure>
    <img
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1643248707596340144.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 3. 禁用某项

```tsx | pure
<Radio
  options={[
    { label: 'Apple', value: 'Apple' },
    { label: 'Pear', value: 'Pear' },
    { label: 'Orange', value: 'Orange' },
  ]}
  disabledValue={['Apple']}
/>
```

<center>
  <figure>
    <img
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1643248779441131355.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 4. RadioList

```tsx | pure
<RadioList
  options={[
    { label: 'Apple', value: 'Apple' },
    { label: 'Pear', value: 'Pear' },
    { label: 'Orange', value: 'Orange' },
  ]}
/>
```

<center>
  <figure>
    <img
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1643248840301238393.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

## API

### Radio / RadioList

| 属性           | 必填    | 说明                     | 类型                         | 默认值 |
| -------------- | ------- | ------------------------ | ---------------------------- | ------ |
| options        | `true`  | 指定可选项               | `RadioOption[]`              |        |
| value          | `false` | 选中的项                 | `ReactText`                  |        |
| onChange       | `false` | 选中单选框触发的回调函数 | `(value: ReactText) => void` |        |
| defaultValue   | `false` | 默认选中的项             | `ReactText`                  |        |
| size           | `false` | 图标大小                 | `number`                     |        |
| disabledValue  | `false` | 设置禁用的项             | `ReactText[]`                |        |
| containerStyle | `false` | 自定义容器样式           | `ViewStyle`                  |        |
| itemStyle      | `false` | 自定义单个单选框样式     | `ViewStyle`                  |        |
| labelStyle     | `false` | 自定义文本样式           | `TextStyle`                  |        |

### RadioItem

| 属性       | 必填    | 说明                            | 类型                                              | 默认值 |
| ---------- | ------- | ------------------------------- | ------------------------------------------------- | ------ |
| itemStyle  | `false` | 自定义单个单选框样式            | `ViewStyle`                                       |        |
| labelStyle | `false` | 自定义文本样式                  | `TextStyle`                                       |        |
| size       | `false` | 图标大小                        | `number`                                          |        |
| label      | `true`  | 单选框文本                      | `ReactNode`                                       |        |
| value      | `true`  | 单选框的值                      | `ReactText`                                       |        |
| status     | `true`  | 单选框选中状态                  | `'checked' \| 'unchecked'`                        |        |
| disabled   | `true`  | 单选框禁用状态                  | `boolean`                                         |        |
| mode       | `false` | 单选框模式，list 表示以列表展示 | `'list' \| 'row'`                                 |        |
| onChange   | `false` | 选中单选框触发的回调函数        | `(value: ReactText, status: RadioStatus) => void` |        |
