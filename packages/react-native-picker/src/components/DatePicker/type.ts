import { SyntheticEvent } from 'react';

import { ModalPickerProps } from '../../type';
import { CascadePickerItemProps, WheelPickerPropsBase } from '../WheelPicker/type';

export type Event = SyntheticEvent<
  Readonly<{
    timestamp: number;
  }>
>;

type DateMode = 'datetime' | 'date' | 'time' | 'month' | 'year';
type LabelUnit = { year: string; month: string; day: string; hour: string; minute: string };

type DateUnit = 'year' | 'month' | 'date' | 'hour' | 'minute';
type DateRef = { [key in DateUnit]: string };
export interface DatePickerPropsBase extends WheelPickerPropsBase {
  /** 显示模式 */
  mode?: DateMode;
  /** 单位文字 */
  labelUnit?: LabelUnit;
  /** 日期格式化 */
  format?: string;
  /** 当前日期 */
  value?: Date;
  /** 日期修改事件 */
  onChange?: (date?: Date, formatDate?: string) => void;
  /** 最小日期 */
  minDate?: Date | string;
  /** 最大日期 */
  maxDate?: Date | string;
}

export { CascadePickerItemProps, ModalPickerProps, DateUnit, DateRef };
