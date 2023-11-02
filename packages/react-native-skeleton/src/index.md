---
title: Skeleton - 骨架屏组件
nav:
  title: RN组件
  path: /react-native
group:
  title: 骨架屏组件
  path: /skeleton
---

# Skeleton 骨架屏组件

使用本组件前，请在您的项目里安装依赖：

```code
yarn add react-native-linear-gradient @td-design/react-native-skeleton
```

## 效果演示

### 1. 默认效果

```tsx | pure
<Skeleton
  containerStyle={styles.titleContainer}
  styles={secondLayout}
  loading={true}
  animationDirection="horizontalRight"
>
  <View>
    <Text style={styles.bigText}>Benjamin Franklin</Text>
  </View>
  <Text style={[styles.normalText, { marginTop: 20 }]}>An investment in knowledge pays the best interest.</Text>
</Skeleton>
```

<center>
  <figure>
    <img
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1643251256650405037.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 2. animationType="pulse"

```tsx | pure
<Skeleton animationType="pulse" styles={thirdLayout} containerStyle={styles.descContainer} loading={true}>
  <Text style={styles.normalText}>“It is easier to prevent bad habits than to break them.“</Text>
</Skeleton>
```

<center>
  <figure>
    <img
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1643251448641774906.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 3. 5s 后显示内容

```tsx | pure
useEffect(() => {
  setTimeout(() => {
    setLoading(false);
  }, 5000);
}, []);

<Skeleton
  containerStyle={styles.titleContainer}
  styles={secondLayout}
  loading={loading}
  animationDirection="horizontalRight"
>
  <View>
    <Text style={styles.bigText}>Benjamin Franklin</Text>
  </View>
  <Text style={[styles.normalText, { marginTop: 20 }]}>An investment in knowledge pays the best interest.</Text>
</Skeleton>;
```

<center>
  <figure>
    <img
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1643251723101514352.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

## API

| 属性 | 必填 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- | --- |
| loading | `false` | 是否正在加载 | `boolean` | `true` |
| styles | `true` | 骨架屏的样式 | `ViewStyle[]` |  |
| duration | `false` | 动画的执行速度 | `number` | `1200` |
| easing | `false` | 动画的执行方式 | `Animated.EasingFunction` | `Easing.bezierFn(0.5, 0, 0.25, 1)` |
| containerStyle | `false` | 容器样式 | `StyleProp<ViewStyle>` |  |
| animationType | `false` | 动画类型（条纹/脉搏/无） | `AnimationType` | `shiver` |
| animationDirection | `false` | 动画方向（条纹动画有效） | `AnimationDirection` | `horizontalRight` |
| boneColor | `false` | 基础颜色 | `string` | `#E1E9EE` |
| highlightColor | `false` | 高亮颜色 | `string` | `#F2F8FC` |

```code
export type AnimationType = 'none' | 'shiver' | 'pulse' | undefined;

export type AnimationDirection =
  |'horizontalLeft'
  | 'horizontalRight'
  | 'verticalUp'
  | 'verticalDown'
  | undefined;

```

_关于`styles`属性的说明：_

- `styles`属性是一个数组，数组的每一项是一个`ViewStyle`对象，用于描述骨架屏的样式，数组的每一项对应骨架屏的一行，数组的长度决定了骨架屏的行数。
- `styles`的样式最好跟里面元素的样式保持一致或者近似，否则会出现骨架效果跟实际效果不一致的情况。比如：

```tsx
<Skeleton styles={[styles.box1, styles.box2]}>
  <View style={styles.box1}>
    <Text>hello world</Text>
  </View>
  <View style={styles.box2}>
    <Text>hello world</Text>
  </View>
</Skeleton>;

const styles = StyleSheet.create({
  box1: {
    width: 200,
    height: 50,
  },
  box2: {
    width: 300,
    height: 120,
    marginTop: 20,
  },
});
```
