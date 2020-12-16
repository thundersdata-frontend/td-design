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
  <div style={{ display: 'flex', width: 750 }}>
    <div style={{ width: 375 }}>IOS效果图</div>
    <div style={{ width: 375 }}>Android效果图</div>
  </div>
</center>
<center>
  <figure>
    <img
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1607947429591938736.png"
      style={{ width: 375, marginRight: 10, border: "1px solid #ddd" }}
    />
    <img
      alt=""
      src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1607430991524&di=24c0bf75a6d0efeff1c48e13829eca72&imgtype=0&src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201308%2F23%2F220651x9b0h4kru904ozre.jpg"
      style={{ width: 375, border: "1px solid #ddd" }}
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
  <div style={{ display: 'flex', width: 750 }}>
    <div style={{ width: 375 }}>IOS效果图</div>
    <div style={{ width: 375 }}>Android效果图</div>
  </div>
</center>
<center>
  <figure>
    <img
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1607947549012113947.png"
      style={{ width: 375, marginRight: 10, border: "1px solid #ddd" }}
    />
    <img
      alt=""
      src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1607430991524&di=24c0bf75a6d0efeff1c48e13829eca72&imgtype=0&src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201308%2F23%2F220651x9b0h4kru904ozre.jpg"
      style={{ width: 375, border: "1px solid #ddd" }}
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
  <div style={{ display: 'flex', width: 750 }}>
    <div style={{ width: 375 }}>IOS效果图</div>
    <div style={{ width: 375 }}>Android效果图</div>
  </div>
</center>
<center>
  <figure>
    <img
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1607947759285483619.gif"
      style={{ width: 375, marginRight: 10, border: "1px solid #ddd" }}
    />
    <img
      alt=""
      src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1607430991524&di=24c0bf75a6d0efeff1c48e13829eca72&imgtype=0&src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201308%2F23%2F220651x9b0h4kru904ozre.jpg"
      style={{ width: 375, border: "1px solid #ddd" }}
    />
  </figure>
</center>

### 4. 页面内展示

```tsx | pure
const pickerRef = useRef<{ getValue: () => { value: ItemValue[] } }>(null);
<Picker ref={pickerRef} title="请选择数字" displayType="view" cols={2} data={multipleData} />;
```

<center>
  <div style={{ display: 'flex', width: 750 }}>
    <div style={{ width: 375 }}>IOS效果图</div>
    <div style={{ width: 375 }}>Android效果图</div>
  </div>
</center>
<center>
  <figure>
    <img
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1607948474785655481.gif"
      style={{ width: 375, marginRight: 10, border: "1px solid #ddd" }}
    />
    <img
      alt=""
      src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1607430991524&di=24c0bf75a6d0efeff1c48e13829eca72&imgtype=0&src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201308%2F23%2F220651x9b0h4kru904ozre.jpg"
      style={{ width: 375, border: "1px solid #ddd" }}
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
