import { Component, ReactNode, RefObject } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import Animated from 'react-native-reanimated';

export interface Section {
  title: ReactNode;
  content: ReactNode;
}

export interface AccordionProps {
  /** 手风琴选项卡列表 */
  sections: Section[];
  /** 按下时的不透明度 */
  activeOpacity?: number;
  /** 是否允许展开多个 */
  multiple?: boolean;
  /** 容器样式 */
  accordionStyle?: StyleProp<ViewStyle>;
  /** 选项卡标题样式 */
  headerStyle?: StyleProp<ViewStyle>;
  /** 选项卡内容样式 */
  contentStyle?: StyleProp<ViewStyle>;
  /** 自定义右侧图标 */
  customIcon?: ({ progress }: { progress: Animated.SharedValue<number> }) => ReactNode;
}

export interface SectionProps extends Pick<AccordionProps, 'contentStyle' | 'customIcon' | 'multiple'> {
  index: number;
  /** 选项卡 */
  title: ReactNode;
  content: ReactNode;
  contentHeights: Animated.SharedValue<number>[];
}

export interface SectionHeaderProps
  extends Pick<SectionProps, 'title' | 'contentHeights' | 'customIcon' | 'index' | 'multiple'> {
  animatedRef: RefObject<Component>;
}
