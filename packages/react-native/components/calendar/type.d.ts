import { ViewStyle } from 'react-native';

export type StateType = 'disabled' | 'today' | 'otherMonth';

export type CurDateType = string | Date | Dayjs;

export interface DateObject {
  day: number;
  dateString: string;
  month: number;
  timestamp: number;
  year: number;
}

export interface PeriodMarking {
  textColor?: string;
  disabled?: boolean;
  selected?: boolean;
  selectedColor?: string;
  startingDay?: boolean;
  endingDay?: boolean;
}

export interface DotMarking {
  textColor?: string;
  disabled?: boolean;
  selected?: boolean;
  selectedColor?: string;
  dotColor?: string;
}

interface DotProps {
  /** 某天的状态 */
  state?: StateType;
  /** 日期 */
  date: DateObject;
  /** 日期点击回调 */
  onPress: (date: DateObject) => void;
  /** 标记 */
  marking?: DotMarking;
}

interface CalendarHeaderProps {
  /** 一周以哪天开头，周一为1， 周二为2以此类推，默认周日开头，为0 */
  firstDay: number;
  /** 展示月份 */
  month: Dayjs;
  /** 操作月份的回调 */
  addMonth: (count: number) => void;
  /** 月份格式化，默认为 YYYY年MM月 */
  monthFormat?: string;
  /** header的样式 */
  style?: ViewStyle;
}

export interface CalendarProps {
  /** 需要展示的当前月份，默认为Date() */
  current?: Dayjs;
  /** 可选择的最小的日期 */
  minDate?: CurDateType;
  /** 可选择的最大的日期 */
  maxDate?: CurDateType;
  /** 被标记的日期 */
  markedDates?: { [date: string]: PeriodMarking | DotMarking };
  /** 标记类型，默认值为dot */
  markingType?: 'dot' | 'period';
  /** 是否可以滑动切换月份，默认值为false */
  enableSwipeMonths?: boolean;
  /** 是否展示当前月份之外的天数，默认值为false */
  hideExtraDays?: boolean;
  /** 是否每个月都展示6个星期（只有当hideExtraDays = false时生效），默认值为false */
  showSixWeeks?: boolean;
  /** 一周以哪天开头，周一为1， 周二为2以此类推，默认周日开头，为0 */
  firstDay?: number;
  /** 点击日期的回调 */
  onDayPress?: (date: DateObject) => void;
  /** 月份变化回调 */
  onMonthChange?: (month: string) => void;
}
