import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import type Animated from 'react-native-reanimated';

export type ActionButtonProps = {
  items: ActionButtonItemProps[];
  /** 按钮大小 */
  size?: number;
  /** 展开方向。up向上展开；down向下展开 */
  verticalOrientation?: 'up' | 'down';
  /** 整个容器的样式 */
  style?: StyleProp<ViewStyle>;
  /** 主按钮的颜色 */
  buttonColor?: string;
  /** 主按钮点击之后的颜色 */
  btnOutRange?: string;
  /** 动画过程中主按钮的缩放比例 */
  outRangeScale?: number;
  /** 自定义主按钮的图标 */
  customIcon?: React.ReactElement;
  /** 主按钮的位置。left在屏幕水平方向左侧；center在屏幕水平方向中间；right在屏幕水平方向右侧 */
  position?: 'left' | 'center' | 'right';
  /** 展开按钮之间的间距 */
  spacing?: number;
  /** 主按钮按下时的透明度 */
  activeOpacity?: number;
};

export type MainButtonProps = Required<
  Pick<ActionButtonProps, 'size' | 'buttonColor' | 'outRangeScale' | 'activeOpacity' | 'verticalOrientation'>
> &
  Pick<ActionButtonProps, 'btnOutRange' | 'customIcon'> & {
    progress: Animated.SharedValue<number>;
    onPress: () => void;
  };

export type ActionsProps = Required<
  Pick<ActionButtonProps, 'items' | 'position' | 'size' | 'spacing' | 'verticalOrientation' | 'activeOpacity'>
> & {
  progress: Animated.SharedValue<number>;
};

export type ActionButtonItemProps = Partial<ActionsProps> & {
  /** 展开按钮的背景色 */
  backgroundColor: string;
  /** 展开按钮的图标 */
  icon: React.ReactElement;
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

export type TitleProps = Required<Pick<ActionButtonItemProps, 'position' | 'spaceBetween'>> &
  Pick<ActionButtonItemProps, 'title' | 'textStyle' | 'textContainerStyle' | 'size'>;
