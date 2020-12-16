import React, { ReactNode, useEffect, useState } from 'react';
import { View } from 'react-native';
import {
  FlingGestureHandler,
  Directions,
  FlingGestureHandlerStateChangeEvent,
  State,
} from 'react-native-gesture-handler';
import { useTheme } from '@shopify/restyle';
import dayjs, { Dayjs } from 'dayjs';
import { Theme } from '../config/theme';
import { px } from '../helper';
import Flex from '../flex';
import { CalendarProps, CurDateType, DateObject, StateType } from './type';
import Day from './Day';
import CalendarHeader from './Header';
import CalendarList from './CalendarList';
import { sameMonth, sameDate, page, isLTE, isGTE, dayjsToData } from './dateUtils';
import Period from './Period';

const Calendar: React.FC<CalendarProps> = ({
  current,
  minDate,
  maxDate,
  markedDates = {},
  markingType = 'dot',
  enableSwipeMonths = true,
  showSixWeeks = false,
  hideExtraDays = false,
  firstDay = 0,
  style,
  onDayPress,
  onMonthChange,
  ...restProps
}) => {
  const theme = useTheme<Theme>();

  const [currentMonth, setCurrentMonth] = useState<Dayjs>(current || dayjs());

  useEffect(() => {
    onMonthChange?.(currentMonth.format('YYYY-MM'));
  }, [currentMonth, onMonthChange]);

  const updateMonth = (day: Dayjs) => {
    if (day.format('YYYY-MM') === currentMonth.format('YYYY-MM')) {
      return;
    }
    setCurrentMonth(day);
  };

  const pressDay = (date: DateObject) => {
    const _date = dayjs(date.dateString);
    // 当前日期比最小日期大 && 当前日期比最大日期小
    if (!(minDate && !isGTE(_date, minDate)) && !(maxDate && !isLTE(_date, maxDate))) {
      updateMonth(_date);
      onDayPress?.(date);
    }
  };

  /** 判断日期是否在区间 */
  const isDateNotInTheRange = (date: Dayjs, minDate?: CurDateType, maxDate?: CurDateType) => {
    // 当前日期比最小日期小 || 当前日期比最大日期大
    return (minDate && !isGTE(date, minDate)) || (maxDate && !isLTE(date, maxDate));
  };

  const renderDayComponent = () => {
    switch (markingType) {
      case 'period':
        return Period;
      default:
        return Day;
    }
  };

  const renderDay = (day: Dayjs, id: number) => {
    let state = '';

    if (isDateNotInTheRange(day, minDate, maxDate)) {
      state = 'disabled';
    } else if (!sameMonth(day, currentMonth)) {
      state = 'otherMonth';
    } else if (sameDate(day, dayjs())) {
      state = 'today';
    }

    if (!sameMonth(day, currentMonth) && hideExtraDays) {
      return <View key={id} style={{ flex: 1 }} />;
    }

    const DayComp = renderDayComponent();
    const dateAsObject = dayjsToData(day);

    const dayProps = {
      state: state as StateType,
      onPress: pressDay,
      date: dateAsObject,
      marking: markedDates[day.format('YYYY-MM-DD')] ?? {},
    };

    return (
      <Flex justifyContent="center" style={{ flex: 1 }} key={id}>
        <DayComp {...dayProps}>{day.date()}</DayComp>
      </Flex>
    );
  };

  const renderWeek = (days: Dayjs[], id: number) => {
    const week: ReactNode[] = [];

    days.forEach((day, id2) => {
      week.push(renderDay(day, id2));
    });

    return <Flex key={id}>{week}</Flex>;
  };

  const renderMonth = () => {
    const shouldShowSixWeeks = showSixWeeks && !hideExtraDays;
    const days = page(currentMonth, firstDay, shouldShowSixWeeks);
    const weeks = [];

    while (days.length) {
      weeks.push(renderWeek(days.splice(0, 7), weeks.length));
    }

    return <View>{weeks}</View>;
  };

  const addMonth = (count: number) => {
    updateMonth(currentMonth.add(count, 'month'));
  };

  const handlerStateChange = ({ nativeEvent }: FlingGestureHandlerStateChangeEvent, direction: 'left' | 'right') => {
    if (nativeEvent.oldState === State.ACTIVE) {
      addMonth(direction === 'left' ? 1 : -1);
    }
  };

  const renderCalendar = () => (
    <View style={[{ paddingHorizontal: px(12), backgroundColor: theme.colors.white }, style]}>
      <CalendarHeader month={currentMonth} addMonth={addMonth} firstDay={firstDay} {...restProps} />
      {renderMonth()}
    </View>
  );

  if (!enableSwipeMonths) return <>{renderCalendar()}</>;

  return (
    <FlingGestureHandler direction={Directions.LEFT} onHandlerStateChange={event => handlerStateChange(event, 'left')}>
      <FlingGestureHandler
        direction={Directions.RIGHT}
        onHandlerStateChange={event => handlerStateChange(event, 'right')}
      >
        {renderCalendar()}
      </FlingGestureHandler>
    </FlingGestureHandler>
  );
};

export default Object.assign(
  React.memo(Calendar, (prevProps, nextProps) => {
    const r1 = prevProps.current;
    const r2 = nextProps.current;
    return r1?.format('YYYY-MM') !== r2?.format('YYYY-MM');
  }),
  { CalendarList }
);
