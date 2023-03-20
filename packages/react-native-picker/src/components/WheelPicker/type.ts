import { Animated, StyleProp, TextStyle, ViewStyle } from 'react-native';

export type ItemValue = string | number;
export interface OptionItem {
  label: string;
  value: ItemValue;
}

export interface CascadePickerItemProps extends OptionItem {
  children?: CascadePickerItemProps[];
}

export interface WheelPickerPropsBase {
  /** 指示器背景色 */
  indicatorBackgroundColor?: string;
  /** 数据行文字样式 */
  itemTextStyle?: StyleProp<TextStyle>;
  /** 数据行高度 */
  itemHeight?: number;
  /** 数据行样式 */
  itemStyle?: StyleProp<ViewStyle>;
  /** 选择器容器样式 */
  containerStyle?: StyleProp<ViewStyle>;
}

/** 滚轮选择器的属性 */
export interface WheelPickerProps extends WheelPickerPropsBase {
  /** 数据行数组 */
  data: (CascadePickerItemProps | undefined)[];
  /** 当前选中的数据行下标 */
  value: ItemValue;
  /** 选择数据行的处理函数 */
  onChange: (value: ItemValue) => void;
}

/** 滚轮选择器子项的属性 */
export interface WhellPickerItemProps {
  textStyle: StyleProp<TextStyle>;
  style: StyleProp<ViewStyle>;
  option: OptionItem | null;
  height: number;
  index: number;
  currentIndex: Animated.AnimatedAddition<number>;
  visibleRest: number;
}
