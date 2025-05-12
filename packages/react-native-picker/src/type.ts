import { StyleProp, ViewStyle } from 'react-native';

import { CascadePickerItemProps, WheelPickerPropsBase } from './components/WheelPicker/type';

export interface PickerRef {
  hide: () => void;
  show: () => void;
}

export interface DatePickerRef {
  hide: () => void;
  show: () => void;
  getValue: () => { date?: Date; formatDate: string };
}

/** 弹窗Picker的属性 */
export interface ModalPickerProps {
  /** 选择器标题 */
  title?: string;
  /** 取消按钮文本 */
  cancelText?: string;
  /** 确认按钮文本 */
  okText?: string;
  /** 按下时的不透明度 */
  activeOpacity?: number;
}

export type CascaderProps = WheelPickerPropsBase & {
  data: CascadePickerItemProps<string | number>[];
  /** 展示几列 */
  cols?: number;
  /** 当前值 */
  value?: (string | number)[];
  /** 修改事件 */
  onChange?: (value?: (string | number)[]) => void;
} & ModalPickerProps;

export type NormalPickerProps = WheelPickerPropsBase & {
  data: CascadePickerItemProps<string | number>[];
  /** 当前值 */
  value?: string | number;
  /** 修改事件 */
  onChange?: (value?: string | number) => void;
} & ModalPickerProps;

export type PickerProps = CascaderProps | NormalPickerProps;

export type PickerInputProps = PickerProps & {
  cascade?: boolean;
  /** 标签文本 */
  label?: React.ReactNode;
  /** 标签文本位置 */
  labelPosition?: 'top' | 'left';
  /** 是否显示冒号 */
  colon?: boolean;
  /** 是否必填 */
  required?: boolean;
  /** 默认提示语 */
  placeholder?: string;
  /** 是否允许清除 */
  allowClear?: boolean;
  /** 是否禁用 */
  disabled?: boolean;
  /** 额外内容 */
  brief?: React.ReactNode;
  /** 自定义样式 */
  style?: StyleProp<ViewStyle>;
  /** 自定义高度 */
  itemHeight?: number;
  /** 连接符 */
  hyphen?: string;
};

export type PickerItemProps = PickerProps & {
  cascade?: boolean;
  placeholder?: string;
  /** 是否允许清除 */
  allowClear?: boolean;
  /** 是否禁用 */
  disabled?: boolean;
  /** 自定义样式 */
  style?: StyleProp<ViewStyle>;
  /** 是否在表单里 */
  inForm?: boolean;
  /** 连接符 */
  hyphen?: string;
};
