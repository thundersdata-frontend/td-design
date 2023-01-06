---
title: DatePeriodInput - 日期区间输入
nav:
  title: RN组件
  path: /react-native
group:
  title: Picker
  path: /picker
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

| 属性 | 必填 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- | --- |
| mode | `false` | 显示模式 | `datetime` \| `date` \| `time` \| `month` \| `year` | `date` |
| labelUnit | `false` | 年月日时分秒的单位文字 | `{ year: string; month: string; day: string; hour: string; minute: string }` | `{ year: '年', month: '月', day: '日', hour: '时', minute: '分' }` |
| format | `false` | 日期格式化 | `string` | `YYYY-MM-DD HH:mm` |
| value | `false` | 当前日期 | `[Date \| undefined, Date \| undefined]` |  |
| onChange | `false` | 日期修改事件 | `(value: [Date \| undefined, Date \| undefined]) => void` |  |
| itemSpace | `false` | 日期选项的间距 | `number` |  |
| textSize | `false` | 日期选项的字体大小 | `number` |  |
| textColor | `false` | 日期选项的字体颜色 | `string` |  |
| style | `false` | 容器样式 | `ViewStyle` |  |
| title | `false` | 选择器标题 | `string` |  |
| onClose | `false` | 弹窗关闭事件 | `() => void` |  |
| cancelText | `false` | 取消按钮文本 | `string` | `取消` |
| okText | `false` | 确认按钮文本 | `string` | `确定` |
| label | `false` | 标签文本 | `ReactNode` |  |
| placeholders | `false` | 默认提示语 | `[string, string]` | `['请选择', '请选择']` |
| allowClear | `false` | 是否允许清除 | `boolean` | `true` |
| disabled | `false` | 是否禁用 | `boolean` | `false` |
