---
title: Checkable - 单选/复选组件
nav:
  title: RN 组件
  path: /react-native
group:
  title: Interaction
  path: /interaction
---

# Checkable 单选/复选组件

## 效果演示

### 1. 默认效果

```tsx | pure
<Checkable
  type="checkbox"
  options={[
    { label: 'Apple', value: 1 },
    { label: 'Banana', value: 2 },
    { label: 'Peer', value: 3 },
  ]}
/>
<WhiteSpace />
<Checkable
  type="radio"
  options={[
    { label: 'Apple', value: 1 },
    { label: 'Banana', value: 2 },
    { label: 'Peer', value: 3 },
  ]}
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
      alt="checkable-ios1.png"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1607678501585424472.png"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt="checkable-android1.png"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609295536815342303.png"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 2. 给定字符串数组或者数字数组做选项

```tsx | pure
<Checkable
  type="checkbox"
  options={[1, 2, 3]}
  defaultValue={[1, 3]}
/>
<WhiteSpace />
<Checkable
  type="radio"
  options={['苹果', '香蕉', '梨']}
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
      alt="checkable-ios2.png"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1607678543257810566.png"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt="checkable-android2.png"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609295558637275377.png"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 3. defaultValue 和禁用效果

```tsx | pure
<Checkable
  type="checkbox"
  options={[
    { label: 'Apple', value: 1 },
    { label: 'Banana', value: 2 },
    { label: 'Peer', value: 3 },
  ]}
  disabledValue={[1, 2]}
  defaultValue={[1, 3]}
  onChange={value => {
    console.log(value);
  }}
/>
<WhiteSpace />
<Checkable
  type="radio"
  options={[
    { label: 'Apple', value: 1 },
    { label: 'Banana', value: 2 },
    { label: 'Peer', value: 3 },
  ]}
  disabledValue={[1, 2]}
  defaultValue={[1]}
  onChange={value => {
    console.log(value);
  }}
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
      alt="checkable-ios3.png"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1607678606917701812.png"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt="checkable-android3.png"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609295558590047292.png"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 4. 给定自定义样式效果

```tsx | pure
<Checkable
  type="checkbox"
  options={['apple', 'banana', 'peer', 'apple1', 'banana2', 'peer3']}
  containerStyle={{ borderWidth: px(1) }}
  itemStyle={{ width: '100%' }}
  labelStyle={{ color: 'red' }}
  value={value}
  onChange={value => {
    console.log(value);
    setValue(value);
  }}
/>
<WhiteSpace />
<Checkable
  type="radio"
  options={['apple', 'banana', 'peer', 'apple1', 'banana2', 'peer3']}
  containerStyle={{ borderWidth: px(1) }}
  itemStyle={{ width: '100%' }}
  labelStyle={{ color: 'red' }}
  value={value}
  onChange={value => {
    console.log(value);
    setValue(value);
  }}
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
      alt="checkable-ios4.png"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1607678653652270433.png"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt="checkable-android4.png"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609295558657440896.png"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

## API

| 属性           | 必填    | 说明             | 类型                           | 默认值  |
| -------------- | ------- | ---------------- | ------------------------------ | ------- |
| type           | `true`  | 组件类型         | `checkbox`\| `radio`           |         |
| options        | `true`  | 指定可选项       | `Option[]`                     |         |
| value          | `false` | 值               | `ReactText[]`                  |         |
| onChange       | `false` | 事件回调         | `(value: ReactText[]) => void` |         |
| disabledValue  | `false` | 设置禁用的项     | `ReactText[]`                  |         |
| defaultValue   | `false` | 默认选项         | `ReactText[]`                  |         |
| size           | `false` | 图标大小         | `number`                       | `20`    |
| disabled       | `false` | 设置禁用         | `boolean`                      | `false` |
| containerStyle | `false` | 自定义容器样式   | `ViewStyle`                    |         |
| labelStyle     | `false` | 自定义文本样式   | `TextStyle`                    |         |
| itemStyle      | `false` | 自定义 item 样式 | `ViewStyle`                    |         |

### Option 类型

```ts
interface Option {
  label: ReactNode;
  value: ReactText;
}
```
