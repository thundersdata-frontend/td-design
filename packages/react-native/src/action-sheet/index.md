---
title: ActionSheet - 操作项组件
nav:
  title: RN组件
  path: /react-native
group:
  title: Feedback
  path: /feedback
---

# ActionSheet 操作项组件

## 效果演示

```tsx | pure
<ActionSheet
  data={[
    { text: '操作1', onPress: () => console.log(1) },
    { text: '操作2', onPress: () => console.log(2) },
    { text: '操作3', onPress: () => console.log(3), render: (text, type) => <Text>{text}</Text> },
    { text: '操作4', onPress: () => console.log(4), type: 'danger' },
  ]}
  onCancel={() => setVisible(false)}
  visible={visible}
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
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609071284389640582.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609071197998800062.gif"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

## API

### ActionSheet 属性

| 属性       | 必填    | 说明             | 类型                | 默认值 |
| ---------- | ------- | ---------------- | ------------------- | ------ |
| data       | `true`  | 操作项列表       | `ActionSheetItem[]` | `[]`   |
| visible    | `true`  | 是否显示操作面板 | `boolean`           |        |
| onCancel   | `true`  | 关闭操作面板     | `() => void`        |        |
| cancelText | `false` | 关闭按钮文字     | `string`            | `取消` |

### ActionSheetItem 属性

| 属性 | 必填 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- | --- |
| text | `true` | 操作项文字 | `string` |  |
| onPress | `true` | 操作项点击事件 | `() => void` |  |
| type | `false` | 操作项类型。danger 表示警示性操作 | `default` \| `danger` |  |
| render | `false` | 自定义渲染操作项 | `(text: string, type?: 'default' \| 'danger') => ReactNode` |  |

## 主题相关属性

| 属性 | 说明 | 普通模式 | 暗黑模式 |
| --- | --- | --- | --- |
| actionsheet_underlay | 弹窗蒙层颜色 | `Color(palette.dark).alpha(0.4).string()` | `Color(darkPalette.dark).alpha(0.4).string()` |
| actionsheet_itemBg | 单项背景色 | `palette.white` | `darkPalette.darkBlue` |
| actionsheet_border | 边框颜色 | `palette.lightGray` | `darkPalette.lightWhite` |

_palette 和 darkPalette 的定义详见[内置主题](/react-native/theme)_
