---
title: BoxShadow - 阴影组件
nav:
  title: RN组件
  path: /react-native
group:
  title: Other
  path: /other
---

# BoxShadow 阴影组件

利用 `react-native-svg` 实现阴影效果。

代码来自：[https://github.com/879479119/react-native-shadow](https://github.com/879479119/react-native-shadow)

## 效果演示

```tsx | pure
const shadowOpt = {
  width: 300,
  height: 40,
  opacity: 0.16,
  border: 12,
  radius: 20,
  color: '#0189fb',
};

return (
  <Container>
    <WhiteSpace />
    <WhiteSpace />
    <WingBlank>
      <BoxShadow setting={shadowOpt}>
        <View style={{ width: 100, height: 100, borderRadius: 20 }} />
      </BoxShadow>
    </WingBlank>
  </Container>
);
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
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609052180295577757.png"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609052253356729879.png"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

## API

| 属性    | 必填   | 说明   | 类型      | 默认值 |
| ------- | ------ | ------ | --------- | ------ |
| setting | `true` | 配置项 | `Setting` |        |

### 配置项

| 属性    | 必填    | 说明                                       | 类型        | 默认值 |
| ------- | ------- | ------------------------------------------ | ----------- | ------ |
| width   | `true`  | 宽度                                       | `number`    | `0`    |
| height  | `true`  | 高度                                       | `number`    | `0`    |
| color   | `false` | 背景色                                     | `string`    | `#000` |
| border  | `false` | 阴影的宽度                                 | `number`    | `0`    |
| radius  | `false` | 圆角。必须和子组件的 borderRadius 的值一样 | `number`    | `0`    |
| opacity | `false` | 背景透明度                                 | `number`    | `1`    |
| x       | `false` | 阴影的横坐标方向偏移量                     | `number`    | `0`    |
| y       | `false` | 阴影的纵坐标方向偏移量                     | `number`    | `0`    |
| style   | `false` | 自定义样式                                 | `ViewStyle` |        |
