---
title: Picker - 选择器组件
nav:
  title: RN组件
  path: /react-native
group:
  title: Form
  path: /form
---

# Picker 选择器组件

## 效果演示

### 1. 单列弹窗

```tsx | pure
<Picker
  title="请选择数字"
  visible={visible}
  cols={1}
  onClose={() => setVisible(false)}
  data={singleData}
  value={value}
  onChange={val => setValue(val)}
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
      alt="picker-ios1.png"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1607947429591938736.png"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt="picker-android1.png"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609234578612179900.png"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 2. 多列弹窗

```tsx | pure
<Picker
  title="请选择数字"
  visible={visible}
  cols={2}
  onClose={() => setVisible(false)}
  data={multipleData}
  value={value}
  onChange={val => setValue(val)}
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
      alt="picker-ios2.png"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1607947549012113947.png"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt="picker-android2.png"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609234578607248185.png"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 3. 级联弹窗

```tsx | pure
<Picker
  title="请选择数字"
  visible={visible}
  cols={3}
  cascade
  onClose={() => setVisible(false)}
  data={cascadeData}
  value={value}
  onChange={val => setValue(val)}
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
      alt="picker-ios3.gif"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1607947759285483619.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt="picker-android3.gif"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609234909085887229.gif"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 4. 页面内展示

```tsx | pure
const pickerRef = useRef<{ getValue: () => { value: ItemValue[] } }>(null);
<Button title="getValue" onPress={() => {
  const data = pickerRef.current?.getValue();
  setValue(data.value.join(''));
}} />
<Text>{value}</Text>
<Picker
  title="请选择数字"
  visible={visible}
  cols={2}
  ref={pickerRef}
  value={value}
  displayType="view"
  data={multipleData}
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
      alt="picker-ios4.gif"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1607948474785655481.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt="picker-android4.gif"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609234892931052876.gif"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

## API

### Picker 属性

| 属性     | 必填    | 说明 | 类型                                                            | 默认值  |
| -------- | ------- | ---- | --------------------------------------------------------------- | ------- |
| data     | `true`  |      | `CascadePickerItemProps[]` \| `Array<CascadePickerItemProps[]>` | `[]`    |
| cascade  | `false` |      | `boolean`                                                       | `false` |
| cols     | `false` |      | `number`                                                        | `3`     |
| value    | `false` |      | `ItemValue[]`                                                   |         |
| onChange | `false` |      | `(value?: ItemValue[]) => void`                                 |         |
| style    | `false` |      | `ViewStyle`                                                     |         |

### ModalPicker 属性

| 属性        | 必填    | 说明                                                        | 类型              | 默认值  |
| ----------- | ------- | ----------------------------------------------------------- | ----------------- | ------- |
| title       | `false` | 选择器标题                                                  | `string`          |         |
| displayType | `false` | 选择器显示类型。view 表示在页面显示；modal 表示在弹窗中显示 | `view` \| `modal` | `modal` |
| visible     | `false` | 控制弹窗显示                                                | `boolean`         |         |
| onClose     | `false` | 弹窗关闭事件                                                | `() => void`      |         |

_`CascadePickerItemProps`继承自`@react-native-community/picker`的`PickerItemProps`属性_

```ts
export interface CascadePickerItemProps extends PickerItemProps {
  children?: CascadePickerItemProps[];
}

export interface PickerItemProps {
  label?: string;
  value: ItemValue;
  color?: string;
  testID?: string;
}

export type ItemValue = number | string;
```
