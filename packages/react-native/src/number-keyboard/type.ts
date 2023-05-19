import { ReactNode } from 'react';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';

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
  /** 确认按钮的文本 */
  submitText?: string;
}

export interface NumberKeyboardItemProps extends Pick<NumberKeyboardProps, 'type'> {
  value?: string;
  onChange?: (value: string) => void;
  onCheck?: (value: string) => Promise<any>;
  placeholder?: string;
  style?: StyleProp<ViewStyle>;
  /** 输入框自定义样式 */
  inputStyle?: StyleProp<TextStyle>;
  /** 右侧内容 */
  extra?: ReactNode;
  /** 是否显示清除图标 */
  allowClear?: boolean;
  /** 是否禁用 */
  disabled?: boolean;
  /** 保留小数位 */
  digit?: number;
  /** 最小高度 */
  minHeight?: number;
}

export interface NumberKeyboardInputProps extends NumberKeyboardItemProps {
  /** 标签文本 */
  label: ReactNode;
  /** 其他内容 */
  brief?: ReactNode;
}

export interface NumberKeyboardModalProps extends Omit<NumberKeyboardProps, 'onSubmit'> {
  value?: string;
  visible: boolean;
  onClose: () => void;
  onSubmit: (value: string) => void;
  prefixLabel?: string;
}

export interface NumberKeyboardRef {
  focus: () => void;
}
