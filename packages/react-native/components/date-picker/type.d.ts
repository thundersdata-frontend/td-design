import { SyntheticEvent } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { PickerItemProps, ModalPickerProps } from '../picker/type';

export type DatePickerMode = 'date' | 'time' | 'datetime';
export type Event = SyntheticEvent<
  Readonly<{
    timestamp: number;
  }>
>;

export interface DatePickerProps {
  /** 控制显示的年月日先后顺序（安卓有效） */
  display?: string;
  /** 年月日的单位文字 */
  labelUnit?: { year: string; month: string; day: string };
  /** 显示类型。date表示显示年月日；time表示显示时分 */
  mode?: DatePickerMode;
  /** 日期格式化 */
  format?: string;
  /** 当前日期 */
  value?: Date;
  /** 日期修改事件 */
  onChange?: (date?: Date, formattedDate?: string) => void;
  /** 最小日期 */
  maximumDate?: Date;
  /** 最大日期 */
  minimumDate?: Date;
  /** 日期选项的间距 */
  itemSpace?: number;
  /** 日期选项的字体大小 */
  textSize?: number;
  /** 日期选项的字体颜色 */
  textColor?: string;
  /** 样式 */
  style?: StyleProp<ViewStyle>;
}

export { PickerItemProps, ModalPickerProps };
