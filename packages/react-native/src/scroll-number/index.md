---
title: ScrollNumber - 滚动数字组件
nav:
  title: RN组件
  path: /react-native
group:
  title: Other
  path: /other
---

# ScrollNumber 滚动数字组件

## 效果演示

### 1. 默认效果

```tsx | pure
<ScrollNumber value={value} />
```

<center>
  <figure>
    <img
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1643249493948238930.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 2. 修改样式

```tsx | pure
<ScrollNumber
  value={value}
  height={100}
  containerStyle={{
    width: 100,
    marginRight: 10,
    borderWidth: 1,
    borderColor: 'red',
  }}
  textStyle={{ fontSize: 80, color: '#0000ff' }}
/>
```

<center>
  <figure>
    <img
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1643249734059808402.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 3. 修改动画类型

```tsx | pure
<ScrollNumber
  value={value}
  height={100}
  animationType="spring"
  containerStyle={{
    width: 100,
    marginRight: 10,
    borderWidth: 1,
    borderColor: 'red',
  }}
  textStyle={{ fontSize: 80, color: '#0000ff' }}
/>
```

<center>
  <figure>
    <img
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1643249831745364916.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 4. 自定义数字

```tsx | pure
<ScrollNumber
  numberRange={['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖']}
  value={value2}
  textStyle={{ fontSize: 80, color: '#ff0000' }}
/>
```

<center>
  <figure>
    <img
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1643249981055369644.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

## API

| 属性           | 必填    | 说明                                     | 类型               | 默认值   |
| -------------- | ------- | ---------------------------------------- | ------------------ | -------- |
| numberRange    | `false` | 滚动的文字区间。默认是 0-9 的数字        | `string[]`         | `[0-9]`  |
| value          | `true`  | 当前值                                   | `string`           |          |
| height         | `false` | 显示高度（不传的时候默认计算文字的高度） | `number`           | `0`      |
| containerStyle | `false` | 容器样式                                 | `ViewStyle`        |          |
| textStyle      | `false` | 文字样式                                 | `TextStyle`        |          |
| animationType  | `false` | 滚动动画类型                             | `timing \| spring` | `timing` |
