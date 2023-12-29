---
title: DatePeriodInput - 日期区间输入
nav:
  title: RN组件
  path: /react-native
group:
  title: 选择组件
  path: /picker
  order: 9
---

# DatePeriodInput 日期区间输入

## 效果演示

### 1. 默认效果

```tsx | pure
<DatePeriodInput label="订单时间" />
```

<center>
  <figure>
    <img
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1644824685474919859.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

## API

| 属性                     | 必填    | 说明                         | 类型            | 默认值                 |
| ------------------------ | ------- | ---------------------------- | --------------- | ---------------------- | -------------------- | --- |
| indicatorBackgroundColor | `false` | 指示器背景色                 | `string`        |                        |
| itemTextStyle            | `false` | 数据行文字样式               | `TextStyle`     |                        |
| itemHeight               | `false` | 数据行高度                   | `number`        |                        |
| itemStyle                | `false` | 数据行样式                   | `ViewStyle`     |                        |
| containerStyle           | `false` | 选择器容器样式               | `ViewStyle`     |                        |
| mode                     | `false` | 显示模式                     | `DateMode`      |                        |
| labelUnit                | `false` | 单位文字                     | `LabelUnit`     |                        |
| format                   | `false` | 日期格式化                   | `string`        | `YYYY-MM-DD`           |
| title                    | `false` | 选择器标题                   | `string`        |                        |
| onClose                  | `false` | 弹窗关闭事件                 | `() => void`    |                        |
| cancelText               | `false` | 取消按钮文本                 | `string`        | `取消`                 |
| okText                   | `false` | 确认按钮文本                 | `string`        | `确定`                 |
| activeOpacity            | `false` | 按下时的不透明度             | `number`        | `0.6`                  |
| label                    | `false` | 标签文本                     | `ReactNode`     |                        |
| labelPosition            | `false` | 标签位置。输入框左侧或者顶部 | `left` \| `top` | `left`                 |
| colon                    | `false` | 是否在标签后显示冒号         | `boolean`       | `false`                |
| required                 | `false` | 是否在标签前显示必填标识     | `boolean`       | `false`                |
| placeholders             | `false` | 默认提示语                   | `string[]`      | `['请选择', '请选择']` |
| value                    | `false` | 当前日期                     | `[Date          | undefined, Date        | undefined]`          |     |
| onChange                 | `false` | 修改日期事件                 | `(value: [Date  | undefined, Date        | undefined]) => void` |     |
| allowClear               | `false` | 是否允许清除                 | `boolean`       | `true`                 |
| disabled                 | `false` | 是否禁用                     | `boolean`       | `false`                |
