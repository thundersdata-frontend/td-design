---
title: Skeleton - 骨架屏组件
nav:
  title: RN组件
  path: /react-native
group:
  title: Other
  path: /other
---

# Skeleton 骨架屏组件

## API

| 属性 | 必填 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- | --- |
| loading | `false` | 是否正在加载 | `boolean` | `true` |
| styles | `true` | 骨架屏的样式 | `ViewStyle[]` |  |
| duration | `false` | 动画的执行速度 | `number` | `1200` |
| easing | `false` | 动画的执行方式 | `Animated.EasingFunction` | `Easing.bezier(0.5, 0, 0.25, 1)` |
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
