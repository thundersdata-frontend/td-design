import { ReactNode } from 'react';
import { ListRenderItem, ViewStyle } from 'react-native';
import { Dayjs } from 'dayjs';
import Animated from 'react-native-reanimated';

export type StateType = 'disabled' | 'today' | 'otherMonth';

export type ArrowDirection = 'left' | 'right' | 'down' | 'up';

export type CurDateType = string | Date | Dayjs;

export type MarkedDates = { [date: string]: PeriodMarking | DotMarking };

export interface DateObject {
  day: number;
  dateString: string;
  month: number;
  timestamp: number;
  year: number;
}

export interface PeriodMarking {
  disabled?: boolean;
  selected?: boolean;
  startingDay?: boolean;
  endingDay?: boolean;
  extra?: ReactNode;
}

export interface DotMarking {
  textColor?: string;
  disabled?: boolean;
  selected?: boolean;
  selectedColor?: string;
  dotColor?: string;
}

export interface RowItem {
  date: Dayjs;
  isShowDate: boolean;
}

export interface DayProps {
  /** 某天的状态 */
  state?: StateType;
  /** 日期 */
  date: DateObject;
  /** 日期点击回调 */
  onPress: (date: DateObject) => void;
  /** 标记 */
  marking?: DotMarking;
}

export interface PeriodProps {
  /** 某天的状态 */
  state?: StateType;
  /** 标记 */
  marking: PeriodMarking;
  /** 日期点击回调 */
  onPress: (date: DateObject) => void;
  /** 日期 */
  date: DateObject;
}

export interface CalendarHeaderProps {
  /** 一周以哪天开头，周一为1， 周二为2以此类推，默认周日开头，为0 */
  firstDay?: number;
  /** 展示月份 */
  month?: Dayjs;
  /** 月份格式化，默认为 YYYY年MM月 */
  monthFormat?: string;
  /** 是否展示左边箭头 */
  showArrowLeft?: boolean;
  /** 是否展示右边箭头 */
  showArrowRight?: boolean;
  /** 展示向上还是向下按钮 */
  showDown?: boolean;
  /** header的样式 */
  headerStyle?: ViewStyle;
  /** 星期几的头部样式 */
  dayNamesStyle?: ViewStyle;
  /** 操作月份的回调 */
  addMonth?: (count: number) => void;
  /** 按下左边按钮回调 */
  onPressArrowLeft?: (month: Dayjs) => void;
  /** 按下右边按钮回调 */
  onPressArrowRight?: (month: Dayjs) => void;
  /** 按下向下按钮回调 */
  onPressArrowDown?: (month: Dayjs) => void;
  /** 按下向上按钮回调 */
  onPressArrowUp?: (month: Dayjs) => void;
}

export interface CalendarProps extends Omit<CalendarHeaderProps, 'showDown' | 'dayNamesStyle'> {
  /** 需要展示的当前月份，默认为Date() */
  current?: Dayjs;
  /** 可选择的最小的日期 */
  minDate?: CurDateType;
  /** 可选择的最大的日期 */
  maxDate?: CurDateType;
  /** 被标记的日期 */
  markedDates?: MarkedDates;
  /** 标记类型，默认值为dot */
  markingType?: 'dot' | 'period';
  /** 是否可以滑动切换月份，默认值为false */
  enableSwipeMonths?: boolean;
  /** 是否展示当前月份之外的天数，默认值为false */
  hideExtraDays?: boolean;
  /** 是否每个月都展示6个星期（只有当hideExtraDays = false时生效），默认值为false */
  showSixWeeks?: boolean;
  /** calendar整体的补充样式 */
  style?: Animated.AnimateStyle<ViewStyle>;
  /** month外层的补充样式 */
  monthWrapperStyle?: Animated.AnimateStyle<ViewStyle>;
  /** content的补充样式 */
  contentStyle?: Animated.AnimateStyle<ViewStyle>;
  /** 点击日期的回调 */
  onDayPress?: (date: DateObject) => void;
  /** 月份变化回调 */
  onMonthChange?: (month: string) => void;
}

export interface CalendarListProps extends CalendarProps {
  /** 最多往前推算几个月，默认为12个月 */
  pastScrollRange?: number;
  /** 最多往后推算几个月，默认为12个月 */
  futureScrollRange?: number;
  /** 是否水平 */
  horizontal?: boolean;
  /** 日历宽度 */
  calendarWidth?: number;
  /** 日历高度 */
  calendarHeight?: number;
}

export interface Item {
  time: string;
  title: string;
  onPress?: () => void;
}

export interface AgendaProps<ItemT> extends CalendarProps {
  data?: ItemT[];
  renderItem?: ListRenderItem<ItemT>;
  keyExtractor: (item: ItemT, index: number) => string;
}
