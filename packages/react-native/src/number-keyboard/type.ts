import { ReactNode } from 'react';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';

export type NumberKeyBoardType = 'number' | 'idcard' | 'integer';

export interface NumberKeyboardViewProps {
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
  /** 按下时的不透明度 */
  activeOpacity?: number;
}

export interface NumberKeyboardItemProps extends Pick<NumberKeyboardViewProps, 'type' | 'activeOpacity'> {
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
  inForm?: boolean;
}

export interface NumberKeyboardInputProps extends NumberKeyboardItemProps {
  /** 标签文本 */
  label?: ReactNode;
  /** 标签位置。可选值：左侧/上方 */
  labelPosition?: 'left' | 'top';
  /** 是否显示冒号 */
  colon?: boolean;
  /** 是否必填项 */
  required?: boolean;
  /** 其他内容 */
  brief?: ReactNode;
  itemHeight?: number;
}

export interface NumberKeyboardModalProps extends Omit<NumberKeyboardViewProps, 'onSubmit'> {
  value?: string;
  onSubmit: (value: string) => void;
  prefixLabel?: string;
}

export interface NumberKeyboardRef {
  focus: () => void;
}
