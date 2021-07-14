import { StyleProp, ViewStyle } from 'react-native';

export type NumberKeyBoardType = 'number' | 'IdCard' | 'integer';

export interface NumberKeyboardProps {
  /** 键盘类型 数字 身份证 整数 */
  type?: NumberKeyBoardType;
  /** 按键事件 */
  onPress?: (key: string) => void;
  /** 删除事件 */
  onDelete?: () => void;
  /** 提交事件 */
  onSubmit?: () => void;
}

export interface NumberKeyboardInputProps extends Pick<NumberKeyboardProps, 'type'> {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  style?: StyleProp<ViewStyle>;
  allowClear?: boolean;
}

export interface NumberKeyboardFilterProps extends NumberKeyboardInputProps {
  label: string;
}

export interface NumberKeyboardModalProps extends Omit<NumberKeyboardProps, 'onSubmit'> {
  value?: string;
  visible: boolean;
  onClose: () => void;
  onSubmit: (value: string) => void;
}
