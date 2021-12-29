---
title: Result - 结果页组件
nav:
  title: RN组件
  path: /react-native
group:
  title: Other
  path: /other
---

# Result 结果页组件

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
