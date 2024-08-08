import { StyleProp, TextStyle, ViewProps, ViewStyle } from 'react-native';
import { SharedValue } from 'react-native-reanimated';

export type PickerData<T> = {
  label: string;
  value: T;
};

export interface CascadePickerItemProps<T> extends PickerData<T> {
  children?: CascadePickerItemProps<T>[];
}

export type WheelPickerPropsBase = {
  itemHeight?: number;
  visibleRest?: number;
  textStyle?: StyleProp<TextStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  indicatorBgColor?: string;
};

/** 滚轮选择器的属性 */
export type WheelPickerProps<T> = ViewProps &
  WheelPickerPropsBase & {
    /** 数据行数组 */
    data: CascadePickerItemProps<T>[];
    /** 当前选中的数据行下标 */
    value?: T;
    /** 选择数据行的处理函数 */
    onChange?: (value: PickerData<T>, index: number) => void;
  };

/** 滚轮选择器子项的属性 */
export type WheelPickerItemProps<T> = {
  translateY: SharedValue<number>;
  index: number;
  data: PickerData<T>;
} & Required<Pick<WheelPickerProps<T>, 'itemHeight' | 'visibleRest'>> &
  Pick<WheelPickerProps<T>, 'textStyle'>;
