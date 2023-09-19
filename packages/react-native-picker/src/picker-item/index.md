---
title: PickerItem - 选择器列表表单输入
nav:
  title: RN组件
  path: /react-native
group:
  title: 选择组件
  path: /picker
---

# PickerItem 选择器列表表单输入

## 效果演示

### 1. 默认效果

```tsx | pure
<PickerItem data={carrierList} />
```

<center>
  <figure>
    <img
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1644826189985177460.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 2. 在表单中效果

```tsx | pure
<FormListItem
  title="驾驶车辆总重量"
  arrow="horizontal"
  name="loadType"
  required
  rules={[{ required: true, message: '请选择' }]}
>
  <PickerItem data={loadTypeData} />
</FormListItem>
```

<center>
  <figure>
    <img
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1644826202135539833.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

## API

| 属性 | 必填 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- | --- |
| data | `true` | 选择项数据 | `CascadePickerItemProps[]` \| `Array<CascadePickerItemProps[]>` | `[]` |
| cascade | `false` | 是否级联选择 | `boolean` | `false` |
| cols | `false` | 选择列数量 | `number` | `3` |
| value | `false` | 选中的值 | `ItemValue[]` |  |
| onChange | `false` | 选择回调 | `(value?: ItemValue[]) => void` |  |
| title | `false` | 选择器标题 | `string` |  |
| onClose | `false` | 弹窗关闭事件 | `() => void` |  |
| cancelText | `false` | 取消按钮文本 | `string` | `取消` |
| okText | `false` | 确认按钮文本 | `string` | `确定` |
| activeOpacity | `false` | 按下时的不透明度 | `number` | `0.6` |
| placeholder | `false` | 默认提示语 | `string` | `请选择` |
| allowClear | `false` | 是否允许清除 | `boolean` | `true` |
| disabled | `false` | 是否禁用 | `boolean` | `false` |
| style | `false` | 自定义样式 | `ViewStyle` |  |
