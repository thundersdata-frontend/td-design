---
title: Checkbox - 复选框
nav:
  title: RN 组件
  path: /react-native
group:
  title: Form
  path: /form
---

# Checkbox 复选框

## 效果演示

## API

### Checkbox

| 属性                | 必填    | 说明                     | 类型                           | 默认值 |
| ------------------- | ------- | ------------------------ | ------------------------------ | ------ |
| options             | `true`  | 指定可选项               | `RadioOption[]`                |        |
| value               | `false` | 选中的项                 | `ReactText[]`                  |        |
| onChange            | `false` | 选中单选框触发的回调函数 | `(value: ReactText[]) => void` |        |
| defaultCheckedValue | `false` | 默认选中的项             | `ReactText[]`                  |        |
| size                | `false` | 图标大小                 | `number`                       |        |
| disabledValue       | `false` | 设置禁用的项             | `ReactText[]`                  |        |
| containerStyle      | `false` | 自定义容器样式           | `ViewStyle`                    |        |
| itemStyle           | `false` | 自定义单个单选框样式     | `ViewStyle`                    |        |
| labelStyle          | `false` | 自定义文本样式           | `TextStyle`                    |        |
| showCheckAll        | `false` | 是否显示全选框           | `boolean`                      | `true` |

### CheckboxItem

| 属性       | 必填    | 说明                            | 类型                                              | 默认值 |
| ---------- | ------- | ------------------------------- | ------------------------------------------------- | ------ |
| itemStyle  | `false` | 自定义单个单选框样式            | `ViewStyle`                                       |        |
| labelStyle | `false` | 自定义文本样式                  | `TextStyle`                                       |        |
| size       | `false` | 图标大小                        | `number`                                          |        |
| label      | `true`  | 单选框文本                      | `ReactNode`                                       |        |
| value      | `true`  | 单选框的值                      | `ReactText`                                       |        |
| status     | `true`  | 单选框选中状态                  | `'checked' \| 'unchecked' \| 'halfchecked'`       |        |
| disabled   | `true`  | 单选框禁用状态                  | `boolean`                                         |        |
| mode       | `false` | 单选框模式，list 表示以列表展示 | `'list' \| 'row'`                                 |        |
| onChange   | `false` | 选中单选框触发的回调函数        | `(value: ReactText, status: RadioStatus) => void` |        |

## 主题相关属性

| 属性 | 说明 | 普通模式 | 暗黑模式 |
| ---- | ---- | -------- | -------- |
|      |      |          |          |

_palette 和 darkPalette 的定义详见[内置主题](/react-native/theme)_
