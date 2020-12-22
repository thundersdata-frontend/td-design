import { ReactNode } from 'react';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import type Animated from 'react-native-reanimated';

export interface ActionButtonProps {
  /** 主按钮的大小 */
  size?: number;
  /** 层级 */
  zIndex?: number;
  /** 展开方向。up向上展开；down向下展开 */
  verticalOrientation?: 'up' | 'down';
  /** 整个容器的样式 */
  style?: StyleProp<ViewStyle>;
  /** 动画时长。单位毫秒 */
  duration?: number;
  /** 点击事件 */
  onPress?: () => void;
  /** 长按事件 */
  onLongPress?: () => void;
  /** 按钮的颜色 */
  buttonColor?: string;
  /** 按钮点击之后的颜色 */
  btnOutRange?: string;
  /** 水平位移 */
  paddingHorizontal?: number;
  /** 垂直位移 */
  paddingVertical?: number;
  /** 动画过程中主按钮的缩放比例 */
  outRangeScale?: number;
  /** 自定义主按钮的图标 */
  renderIcon?: ReactNode;
  /** 主按钮的位置。left在屏幕水平方向左侧；center在屏幕水平方向中间；right在屏幕水平方向右侧 */
  position?: 'left' | 'center' | 'right';
  /** 展开按钮之间的间距 */
  spacing?: number;
}

export type MainButtonProps = Required<
  Pick<ActionButtonProps, 'size' | 'zIndex' | 'onPress' | 'buttonColor' | 'outRangeScale'>
> &
  Pick<ActionButtonProps, 'onLongPress' | 'btnOutRange' | 'renderIcon'> & {
    animation: Animated.Node<number>;
  };

export type ActionsProps = Required<
  Pick<ActionButtonProps, 'position' | 'size' | 'zIndex' | 'spacing' | 'verticalOrientation'>
> & {
  animation: Animated.Node<number>;
};

export type ActionButtonItemProps = Partial<ActionsProps & Pick<MainButtonProps, 'buttonColor'>> & {
  /** 主按钮的大小 */
  parentSize?: number;
  /** 按钮的文字标题 */
  title?: string;
  /** 按钮的点击事件 */
  onPress?: () => void;
  /** 按钮的文字样式 */
  textStyle?: StyleProp<TextStyle>;
  /** 按钮的文字容器样式 */
  textContainerStyle?: StyleProp<ViewStyle>;
  /** 按钮和图标的间距 */
  spaceBetween?: number;
};

export type TitleProps = Required<Pick<ActionButtonItemProps, 'position' | 'spaceBetween' | 'size' | 'parentSize'>> &
  Pick<ActionButtonItemProps, 'title' | 'textStyle' | 'textContainerStyle' | 'onPress'>;
