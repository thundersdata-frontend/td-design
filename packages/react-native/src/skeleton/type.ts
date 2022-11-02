import { PropsWithChildren } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import Animated from 'react-native-reanimated';

export type AnimationType = 'none' | 'shiver' | 'pulse' | undefined;
export type AnimationDirection = 'horizontalLeft' | 'horizontalRight' | 'verticalUp' | 'verticalDown' | undefined;

export interface Direction {
  x: number;
  y: number;
}

export type SkeletonProps = PropsWithChildren<{
  /** 是否正在加载 */
  loading: boolean;
  /** 骨架屏的样式 */
  styles: ViewStyle[];
  /** 动画的执行速度 */
  duration?: number;
  /** 动画的执行方式 */
  easing?: Animated.EasingFunction;
  /** 容器样式 */
  containerStyle?: StyleProp<ViewStyle>;
  /** 动画类型。条纹/脉搏/无 */
  animationType?: AnimationType;
  /** 动画方向（条纹动画有效）。水平向左/水平向右/垂直向上/垂直向下 */
  animationDirection?: AnimationDirection;
  /** 基础颜色 */
  boneColor?: string;
  /** 高亮颜色 */
  highlightColor?: string;
}>;

export interface ShiverBoneProps extends Pick<SkeletonProps, 'animationDirection' | 'boneColor' | 'highlightColor'> {
  style: ViewStyle;
  boneStyle: StyleProp<ViewStyle>;
  animation: Animated.SharedValue<number>;
  size: { width: number; height: number };
}

export interface StaticBoneProps extends Pick<SkeletonProps, 'animationType' | 'boneColor' | 'highlightColor'> {
  boneStyle: StyleProp<ViewStyle>;
  animation: Animated.SharedValue<number>;
}
