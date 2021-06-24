import { SyntheticEvent } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { CascadePickerItemProps, ModalPickerProps } from '../picker/type';

export type Event = SyntheticEvent<
  Readonly<{
    timestamp: number;
  }>
>;

export interface DatePickerProps {
  /** 控制显示的先后顺序 */
  display?: string;
  /** 单位文字 */
  labelUnit?: { year: string; month: string; day: string; hour: string; minute: string };
  /** 日期格式化 */
  format?: string;
  /** 当前日期 */
  value?: Date;
  /** 日期修改事件 */
  onChange?: (date?: Date, formatDate?: string) => void;
  /** 最小年份 */
  minYear?: number | string;
  /** 最大年份 */
  maxYear?: number | string;
  /** 日期选项的间距 */
  itemSpace?: number;
  /** 日期选项的字体大小 */
  textSize?: number;
  /** 日期选项的字体颜色 */
  textColor?: string;
  /** 样式 */
  style?: StyleProp<ViewStyle>;
}

type DateUnit = 'year' | 'month' | 'date' | 'hour' | 'minute';
type DateRef = { [key in DateUnit]: string };

export { CascadePickerItemProps, ModalPickerProps, DateUnit, DateRef };
