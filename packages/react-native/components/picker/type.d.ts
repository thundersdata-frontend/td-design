import {
  PickerItemProps,
  PickerProps,
  ItemValue,
} from '@react-native-community/picker/typings/Picker';
import { StyleProp, ViewStyle } from 'react-native';

export interface PickerProps {
  /** 选择项列表 */
  data: PickerItemProps[];
  /** 日期选项的间距 */
  itemSpace?: number;
  /** 日期选项的字体大小 */
  textSize?: number;
  /** 日期选项的字体颜色 */
  textColor?: string;
  /** 当前值 */
  value?: ItemValue;
  /** 修改事件 */
  onChange?: (selectedValue?: ItemValue) => void;
  /** 样式 */
  style?: StyleProp<ViewStyle>;
}
export interface WheelCurvedPickerProps extends Omit<PickerProps, 'onValueChange'> {
  /** 选择项列表 */
  data: PickerItemProps[];
  /** 日期选项的间距 */
  itemSpace?: number;
  /** 日期选项的字体大小 */
  textSize?: number;
  /** 日期选项的字体颜色 */
  textColor?: string;
  /** 修改事件 */
  onValueChange?: (selectedValue?: ItemValue) => void;
}

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
