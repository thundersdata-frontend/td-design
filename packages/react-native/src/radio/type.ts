import type { ReactNode, ReactText } from 'react';
import type { StyleProp, TextStyle, ViewStyle } from 'react-native';

export type RadioStatus = 'checked' | 'unchecked';

export interface RadioOption {
  label: ReactNode;
  value: ReactText;
}
export interface TransformedOption extends RadioOption {
  /** 是否选中 */
  status: RadioStatus;
  /** 是否禁用 */
  disabled: boolean;
}

export interface RadioProps {
  /** 选中的项 */
  value?: ReactText;
  /** 选中单选框时的回调函数  */
  onChange?: (value: ReactText) => void;
  /** 自定义单个单选框样式 */
  itemStyle?: StyleProp<ViewStyle>;
  /** 图标大小 */
  size?: number;
  /** 自定义文本样式 */
  labelStyle?: StyleProp<TextStyle>;
  /** 指定可选项 */
  options: RadioOption[];
  /** 默认选中的项 */
  defaultCheckedValue?: ReactText;
  /** 设置禁用的项  */
  disabledValue?: ReactText[];
  /** 自定义容器样式 */
  containerStyle?: StyleProp<ViewStyle>;
}

export type RadioItemProps = Pick<RadioProps, 'itemStyle' | 'labelStyle' | 'size'> &
  TransformedOption & {
    mode?: 'list' | 'row';
    onChange: (value: ReactText, status: RadioStatus) => void;
  };
