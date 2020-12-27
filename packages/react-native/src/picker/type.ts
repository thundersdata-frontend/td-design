import { PickerItemProps, ItemValue } from '@react-native-picker/picker/typings/Picker';
import { StyleProp, ViewStyle } from 'react-native';

export interface CascadePickerItemProps extends PickerItemProps {
  children?: CascadePickerItemProps[];
}
export interface PickerProps {
  /** 选择项列表 */
  data: CascadePickerItemProps[] | Array<CascadePickerItemProps[]>;
  /** 是否级联 */
  cascade?: boolean;
  /** 展示几列 */
  cols?: number;
  /** 当前值 */
  value?: ItemValue[];
  /** 修改事件 */
  onChange?: (value?: ItemValue[]) => void;
  /** 样式 */
  style?: StyleProp<ViewStyle>;
}

export type RNWheelPickerProps = {
  /** 数据线数组 */
  data: CascadePickerItemProps[];
  /** 当前选中的数据线下标 */
  selectedIndex?: number;
  /** 滚轮选择器是否显示幕布 */
  curtain?: boolean;
  /** 滚轮选择器幕布颜色 */
  curtainColor?: string;
  /** 数据项文本颜色 */
  textColor?: string;
  /** 数据项文本尺寸大小 */
  textSize?: number;
  /** 滚轮选择器数据项之间间距 */
  itemSpace?: number;
  /** 滚轮选择器是否显示指示器 */
  indicator?: number;
  /** 滚轮选择器指示器颜色 */
  indicatorColor?: string;
  /** 滚轮选择器指示器尺寸 */
  indicatorSize?: number;
  /** 当前选中的数据项文本颜色 */
  selectTextColor?: string;
  /** 滚轮选择器是否有空气感 */
  atmospheric?: boolean;
  /** 滚轮选择器是否开启卷曲效果 */
  curved?: boolean;
  /** 滚轮选择器可见数据项数量 */
  visibleItemCount?: number;
};

export type WheelPickerProps = Omit<PickerProps, 'data' | 'onChange' | 'value'> &
  RNWheelPickerProps & {
    onChange: (value: ItemValue) => void;
    value: ItemValue;
  };
export interface ModalPickerProps {
  /** 选择器标题 */
  title?: string;
  /** 选择器显示类型。view表示在页面显示；modal表示在弹窗中显示；默认为modal */
  displayType?: 'view' | 'modal';
  /** 是否弹窗显示 */
  visible?: boolean;
  /** 弹窗关闭事件 */
  onClose?: () => void;
}

export { ItemValue, PickerItemProps };

export type PickerRefProps = {
  getValue: () => { value: ItemValue[] };
};
