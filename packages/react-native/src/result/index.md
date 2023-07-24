---
title: Result - 结果页组件
nav:
  title: RN组件
  path: /react-native
group:
  title: 展示组件
  path: /display
---

# Result 结果页组件

## 效果演示

### 1. 成功页

```tsx | pure
<Result type="success" title="成功" content="你可以点击按钮查看更多哦" />
```

<center>
  <figure>
    <img
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1643249037068921509.png"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 2. 失败页

```tsx | pure
<Result type="fail" title="失败" content="你可以点击按钮查看更多哦" />
```

<center>
  <figure>
    <img
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1643249107809767840.png"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 3. 进行中

```tsx | pure
<Result type="process" title="进行中" content="你可以点击按钮查看更多哦" />
```

<center>
  <figure>
    <img
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1643249187446619416.png"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 4. 显示操作项

```tsx | pure
<Result type="process" title="进行中" content="你可以点击按钮查看更多哦" />
```

<center>
  <figure>
    <img
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1643249229841624313.png"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

## API

| 属性           | 必填    | 说明                               | 类型                             | 默认值 |
| -------------- | ------- | ---------------------------------- | -------------------------------- | ------ |
| type           | `true`  | 结果页的类型（成功、失败、进行中） | `success` \| `fail` \| `process` |        |
| title          | `false` | 主文字                             | `ReactNode`                      |        |
| content        | `false` | 内容文字                           | `ReactNode`                      |        |
| imgSource      | `false` | 自定义图片                         | `Source`                         |        |
| actions        | `false` | 操作项按钮组                       | `ActionButtonProps`              |        |
| containerStyle | `false` | 容器样式                           | `ViewStyle`                      |        |

### ActionButtonProps

| 属性    | 必填   | 说明         | 类型                     | 默认值 |
| ------- | ------ | ------------ | ------------------------ | ------ |
| title   | `true` | 按钮文本     | `string`                 |        |
| type    | `true` | 按钮类型     | `primary` \| `secondary` |        |
| onPress | `true` | 按钮点击事件 | `() => void`             |        |
