import { CascadePickerItemProps, WheelPickerPropsBase } from '../components/WheelPicker/type';

export interface PickerProps<T> extends WheelPickerPropsBase {
  /** 选择项列表 */
  data?: CascadePickerItemProps<T>[];
  /** 请求数据 */
  request?: () => Promise<CascadePickerItemProps<T>[]>;
  /** 是否级联 */
  cascade?: boolean;
  /** 展示几列 */
  cols?: number;
  value?: T[] | T;
  onChange?: (value?: T extends (infer U)[] ? U[] : T) => void;
  /** 字段名 */
  fieldNames?: {
    label?: string;
    value?: string;
    children?: string;
  };
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

export type CascaderProps<T> = Omit<PickerProps<T>, 'cascade' | 'value' | 'onChange'> & {
  /** 当前值 */
  value?: T[];
  /** 修改事件 */
  onChange?: (value?: T[]) => void;
} & ModalPickerProps;

export type NormalPickerProps<T> = Omit<PickerProps<T>, 'cascade' | 'value' | 'onChange'> & {
  /** 当前值 */
  value?: T;
  /** 修改事件 */
  onChange?: (value?: T) => void;
} & ModalPickerProps;
