import { CascadePickerItemProps, WheelPickerPropsBase } from '../components/WheelPicker/type';

export interface PickerProps<T> extends WheelPickerPropsBase {
  /** 选择项列表 */
  data: CascadePickerItemProps<T>[];
  /** 是否级联 */
  cascade?: boolean;
  /** 展示几列 */
  cols?: number;
  value?: T[] | T;
  onChange?: (value?: T extends (infer U)[] ? U[] : T) => void;
}

/** 弹窗Picker的属性 */
export interface ModalPickerProps {
  /** 选择器标题 */
  title?: string;
  /** 选择器显示类型。view表示在页面显示；modal表示在弹窗中显示；默认为modal */
  displayType?: 'view' | 'modal';
  /** 是否弹窗显示 */
  visible?: boolean;
  /** 弹窗关闭事件 */
  onClose?: () => void;
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
