---
title: DatePickerItem - 日期列表表单输入
nav:
  title: RN组件
  path: /react-native
group:
  title: 选择组件
  path: /picker
---

# DatePickerItem 日期列表表单输入

## 效果演示

### 1. 默认效果

```tsx | pure
<DatePickerItem />
```

<center>
  <figure>
    <img
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1644825310419977747.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 2. 在表单中效果

```tsx | pure
<FormListItem title="选择日期" arrow="horizontal" name="date1" required rules={[{ required: true, message: '请选择' }]}>
  <DatePickerItem />
</FormListItem>
```

<center>
  <figure>
    <img
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1644825399805402640.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

## API

| 属性                     | 必填    | 说明             | 类型                                         | 默认值       |
| ------------------------ | ------- | ---------------- | -------------------------------------------- | ------------ |
| indicatorBackgroundColor | `false` | 指示器背景色     | `string`                                     |              |
| itemTextStyle            | `false` | 数据行文字样式   | `TextStyle`                                  |              |
| itemHeight               | `false` | 数据行高度       | `number`                                     |              |
| itemStyle                | `false` | 数据行样式       | `ViewStyle`                                  |              |
| containerStyle           | `false` | 选择器容器样式   | `ViewStyle`                                  |              |
| mode                     | `false` | 显示模式         | `DateMode`                                   |              |
| labelUnit                | `false` | 单位文字         | `LabelUnit`                                  |              |
| format                   | `false` | 日期格式化       | `string`                                     | `YYYY-MM-DD` |
| value                    | `false` | 当前日期         | `Date`                                       |              |
| onChange                 | `false` | 日期修改事件     | `(date?: Date, formatDate?: string) => void` |              |
| minDate                  | `false` | 最小日期         | `string`                                     |              |
| maxDate                  | `false` | 最大日期         | `string`                                     |              |
| title                    | `false` | 选择器标题       | `string`                                     |              |
| onClose                  | `false` | 弹窗关闭事件     | `() => void`                                 |              |
| cancelText               | `false` | 取消按钮文本     | `string`                                     | `取消`       |
| okText                   | `false` | 确认按钮文本     | `string`                                     | `确定`       |
| placeholder              | `false` | 默认提示语       | `string`                                     | `请选择`     |
| allowClear               | `false` | 是否允许清除     | `boolean`                                    | `true`       |
| disabled                 | `false` | 是否禁用         | `boolean`                                    | `false`      |
| style                    | `false` | 自定义样式       | `ViewStyle`                                  |              |
| activeOpacity            | `false` | 按下时的不透明度 | `number`                                     | `0.6`        |
