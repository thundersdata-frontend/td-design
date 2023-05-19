import { ReactNode } from 'react';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';

export type VehicleKeyboardType = 'provinces' | 'vehicleNum';

export type VehicleKeyboardProps = {
  /** 键盘类型 省份和数字字母 */
  type?: VehicleKeyboardType;
  /** 按键事件 */
  onPress?: (key: string) => void;
  /** 删除事件 */
  onDelete?: () => void;
  /** 提交事件 */
  onSubmit?: () => void;
};

export interface VehicleKeyboardModalProps extends Omit<VehicleKeyboardProps, 'onSubmit'> {
  value?: string;
  visible: boolean;
  onClose: () => void;
  onSubmit: (value: string) => void;
}

export interface VehicleKeyboardRef {
  focus: () => void;
}

export interface VehicleKeyboardItemProps extends Pick<VehicleKeyboardProps, 'type'> {
  value?: string;
  onChange?: (value: string) => void;
  onCheck?: (value: string) => Promise<any>;
  placeholder?: string;
  style?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  allowClear?: boolean;
  disabled?: boolean;
  minHeight?: number;
}

export interface VehicleKeyboardInputProps extends VehicleKeyboardItemProps {
  label: string;
  brief?: ReactNode;
}
