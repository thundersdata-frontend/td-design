import {
  KeyboardType,
  NativeSyntheticEvent,
  StyleProp,
  TextInputKeyPressEventData,
  TextInputProps,
  TextStyle,
  ViewStyle,
} from 'react-native';

export interface PasscodeProps extends Omit<TextInputProps, 'onChange'> {
  /** 自动从粘贴板填充验证码 */
  autofillFromClipboard?: boolean;
  /** 自动填充的时间间隔 */
  autofillListenerIntervalMS?: number;
  /** 键盘类型 */
  keyboardType?: KeyboardType;
  /** 容器样式 */
  style?: StyleProp<ViewStyle>;
  /** 聚焦的某个输入框的样式 */
  focusStyle?: StyleProp<ViewStyle>;
  /** 当前输入的验证码 */
  value?: string;
  /** 验证码输入回调 */
  onChange?: (code: string) => void;
  /** 输入框容器样式 */
  inputContainerStyle?: StyleProp<ViewStyle>;
  /** 输入框样式 */
  inputStyle?: StyleProp<TextStyle>;
  /** 验证码长度 */
  count?: number;
  /** 验证码输入完成后的回调 */
  onFinish?: () => void;
}

export interface PasscodeRef {
  /** 重置验证码 */
  reset: () => void;
  /** 聚焦验证码 */
  focus: () => void;
  /** 获取当前输入的验证码 */
  getValue: () => string;
}

export interface PasscodeItemProps extends TextInputProps {
  /** 输入框的样式 */
  inputContainerStyle?: StyleProp<ViewStyle>;
  /** 当前输入框的样式 */
  focusStyle?: StyleProp<ViewStyle>;
  /** TextInput的样式 */
  inputStyle?: StyleProp<TextStyle>;
  /** 文字改变时的回调事件 */
  handleTextChange: (text: string) => void;
  /** 输入的值 */
  inputValue: string;
  /** 按键按下的回调事件 */
  handleKeyPress: (keyPressEvent: NativeSyntheticEvent<TextInputKeyPressEventData>) => void;
}
