import { ReactNode } from 'react';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';

export type VehicleKeyboardType = 'provinces' | 'vehicleNum';

export type VehicleKeyboardViewProps = {
  /** 键盘类型 省份和数字字母 */
  type?: VehicleKeyboardType;
  /** 按键事件 */
  onPress?: (key: string) => void;
  /** 删除事件 */
  onDelete?: () => void;
  /** 提交事件 */
  onSubmit?: () => void;
  /** 按下时的不透明度 */
  activeOpacity?: number;
};

export interface VehicleKeyboardModalProps extends Omit<VehicleKeyboardViewProps, 'onSubmit'> {
  value?: string;
  onSubmit: (value: string) => void;
  submitText?: string;
}

export interface VehicleKeyboardRef {
  focus: () => void;
}

export interface VehicleKeyboardItemProps extends Pick<VehicleKeyboardViewProps, 'type' | 'activeOpacity'> {
  value?: string;
  onChange?: (value?: string) => void;
  onCheck?: (value: string) => Promise<any>;
  placeholder?: string;
  style?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  /** 右侧内容 */
  extra?: ReactNode;
  allowClear?: boolean;
  disabled?: boolean;
  inForm?: boolean;
}

export interface VehicleKeyboardInputProps extends VehicleKeyboardItemProps {
  label: string;
  /** 标签位置。可选值：左侧/上方 */
  labelPosition?: 'left' | 'top';
  /** 是否显示冒号 */
  colon?: boolean;
  /** 是否必填项 */
  required?: boolean;
  brief?: ReactNode;
  itemHeight?: number;
}
