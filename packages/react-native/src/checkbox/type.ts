import type { ReactNode, ReactText } from 'react';
import type { StyleProp, TextStyle, ViewStyle } from 'react-native';

export type CheckboxStatus = 'checked' | 'unchecked' | 'halfchecked';

export interface CheckboxOption {
  label: ReactNode;
  value: ReactText;
}
export interface TransformedOption extends CheckboxOption {
  /** 是否选中 */
  status: CheckboxStatus;
  /** 是否禁用 */
  disabled: boolean;
}

export interface CheckboxProps {
  /** 选中的项 */
  value?: ReactText[];
  /** 点击切换的回调函数  */
  onChange?: (value: ReactText[]) => void;
  /** 自定义item样式 */
  itemStyle?: StyleProp<ViewStyle>;
  /** 图标大小 */
  size?: number;
  /** 自定义文本样式 */
  labelStyle?: StyleProp<TextStyle>;
  /** 指定可选项 */
  options: CheckboxOption[];
  /** 默认选中的项 */
  defaultValue?: ReactText[];
  /** 设置禁用的项  */
  disabledValue?: ReactText[];
  /** 自定义容器样式 */
  containerStyle?: StyleProp<ViewStyle>;
  /** 是否显示全选 */
  showCheckAll?: boolean;
  /** 未禁用时的不透明度 */
  activeOpacity?: number;
}

export type CheckboxItemProps = Pick<CheckboxProps, 'itemStyle' | 'labelStyle' | 'size' | 'activeOpacity'> &
  TransformedOption & {
    mode?: 'list' | 'row';
    isLast?: boolean;
    onChange: (value: ReactText, status: CheckboxStatus) => void;
  };
