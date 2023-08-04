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
  visible: boolean;
  onClose: () => void;
  onSubmit: (value: string) => void;
  submitText?: string;
}

export interface VehicleKeyboardRef {
  focus: () => void;
}

export interface VehicleKeyboardItemProps extends Pick<VehicleKeyboardViewProps, 'type' | 'activeOpacity'> {
  value?: string;
  onChange?: (value: string) => void;
  onCheck?: (value: string) => Promise<any>;
  placeholder?: string;
  style?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  /** 右侧内容 */
  extra?: ReactNode;
  allowClear?: boolean;
  disabled?: boolean;
}

export interface VehicleKeyboardInputProps extends VehicleKeyboardItemProps {
  label: string;
  brief?: ReactNode;
}
