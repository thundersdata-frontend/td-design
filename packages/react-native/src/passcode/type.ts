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
  autofillFromClipboard?: boolean;
  autofillListenerIntervalMS?: number;
  keyboardType?: KeyboardType;
  style?: StyleProp<ViewStyle>;
  focusStyle?: StyleProp<ViewStyle>;
  value?: string;
  onChange?: (code: string) => void;
  inputContainerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  count?: number;
}

export interface PasscodeRef {
  reset: () => void;
  focus: () => void;
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
