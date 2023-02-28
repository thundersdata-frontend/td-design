import { SyntheticEvent } from 'react';

import { ModalPickerProps } from '../../picker/type';
import { CascadePickerItemProps, WheelPickerPropsBase } from '../WheelPicker/type';

export type Event = SyntheticEvent<
  Readonly<{
    timestamp: number;
  }>
>;

type DateMode = 'datetime' | 'date' | 'time' | 'month' | 'year';

export interface DatePickerPropsBase extends WheelPickerPropsBase {
  /** 显示模式 */
  mode?: DateMode;
  /** 单位文字 */
  labelUnit?: { year: string; month: string; day: string; hour: string; minute: string };
  /** 日期格式化 */
  format?: string;
  /** 当前日期 */
  value?: Date;
  /** 日期修改事件 */
  onChange?: (date?: Date, formatDate?: string) => void;
  /** 最小日期 */
  minDate?: string;
  /** 最大日期 */
  maxDate?: string;
}

type DateUnit = 'year' | 'month' | 'date' | 'hour' | 'minute';
type DateRef = { [key in DateUnit]: string };

export { CascadePickerItemProps, ModalPickerProps, DateUnit, DateRef };
