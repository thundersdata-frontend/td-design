import { PickerItemProps, ItemValue } from '@react-native-community/picker/typings/Picker';
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

export type WheelCurvedPickerProps = Omit<PickerProps, 'data' | 'onChange' | 'value'> & {
  data: CascadePickerItemProps[];
  onChange: (value: ItemValue) => void;
  value: ItemValue;
  /** 日期选项的间距 */
  itemSpace?: number;
  /** 日期选项的字体大小 */
  textSize?: number;
  /** 日期选项的字体颜色 */
  textColor?: string;
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
