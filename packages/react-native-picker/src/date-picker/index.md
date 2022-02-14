---
title: DatePicker - 日期选择组件
nav:
  title: RN组件
  path: /react-native
group:
  title: Form
  path: /form
---

# DatePicker 日期选择组件

## 效果演示

### 1. 默认效果

```tsx | pure
<Button title="显示" onPress={() => setVisible(true)} />
<Text>{formattedValue}</Text>
<DatePicker
  title="请选择日期"
  visible={visible}
  onClose={() => setVisible(false)}
  value={value}
  onChange={(value, formattedValue) => {
    setValue(value);
    setFormattedValue(formattedValue)
  }}
/>
```

<center>
  <figure>
    <img
      alt="datePicker-ios1.gif"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1607926683318866421.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 2. 只显示年月日

```tsx | pure
<Button title="显示" onPress={() => setVisible(true)} />
<Text>{formattedValue}</Text>
<DatePicker
  title="请选择日期"
  display="Y-M-D"
  format="YYYY-MM-DD"
  visible={visible}
  onClose={() => setVisible(false)}
  value={value}
  onChange={(value, formattedValue) => {
    setValue(value);
    setFormattedValue(formattedValue)
  }}
/>
```

<center>
  <figure>
    <img
      alt="datePicker-ios2.gif"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1607927967538107659.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 3. 直接在页面内展示

```tsx | pure
const datePickerRef = useRef<{ getValue: () => { date: Date; formatDate: string } }>(null);

<Button
  title="getValue"
  onPress={() => {
    if (datePickerRef.current) {
      const { date, formatDate } = datePickerRef.current.getValue();
      setValue(date);
      setFormattedValue(formatDate);
    }
  }}
/>
<Text>{formattedValue}</Text>
<DatePicker
  ref={datePickerRef}
  title="请选择日期"
  displayType="view"
/>
```

<center>
  <figure>
    <img
      alt="datePicker-ios3.gif"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1607929116069430286.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 4. 展示顺序为分时日月年

```tsx | pure
<Button title="显示" onPress={() => setVisible(true)} />
<Text>{formattedValue}</Text>
<DatePicker
  title="请选择日期"
  display="T-H-D-M-Y"
  visible={visible}
  onClose={() => setVisible(false)}
  value={value}
  onChange={handleChange}
/>
```

<center>
  <figure>
    <img
      alt="datePicker-ios4.gif"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1607929412126551034.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

## API

### DatePicker 属性

| 属性 | 必填 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- | --- |
| mode | `false` | 显示模式 | 'datetime' \| 'date' \| 'time' \| 'month' \| 'year' | `date` |
| labelUnit | `false` | 年月日时分秒的单位文字 | `{ year: string; month: string; day: string; hour: string; minute: string }` | `{ year: '年', month: '月', day: '日', hour: '时', minute: '分' }` |
| format | `false` | 日期格式化 | `string` | `YYYY-MM-DD HH:mm` |
| value | `false` | 当前日期 | `Date` |  |
| onChange | `false` | 日期修改事件 | `(date?: Date, formatDate?: string) => void` |  |
| minDate | `false` | 最小日期 | `string` |  |
| maxDate | `false` | 最大日期 | `string` |  |
| itemSpace | `false` | 日期选项的间距 | `number` |  |
| textSize | `false` | 日期选项的字体大小 | `number` |  |
| textColor | `false` | 日期选项的字体颜色 | `string` |  |
| style | `false` | 容器样式 | `ViewStyle` |  |

### ModalPicker 属性

| 属性        | 必填    | 说明                                                        | 类型              | 默认值  |
| ----------- | ------- | ----------------------------------------------------------- | ----------------- | ------- |
| title       | `false` | 选择器标题                                                  | `string`          |         |
| displayType | `false` | 选择器显示类型。view 表示在页面显示；modal 表示在弹窗中显示 | `view` \| `modal` | `modal` |
| visible     | `false` | 控制弹窗显示                                                | `boolean`         |         |
| onClose     | `false` | 弹窗关闭事件                                                | `() => void`      |         |
