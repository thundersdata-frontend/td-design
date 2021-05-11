import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import { useTheme } from '@shopify/restyle';
import { Theme, Flex, DatePicker, helpers } from '@td-design/react-native';
import {
  FlingGestureHandler,
  Directions,
  FlingGestureHandlerStateChangeEvent,
  State,
} from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import dayjs, { Dayjs } from 'dayjs';

import Day from './Day';
import CalendarHeader from './Header';
import Period from './Period';
import { sameMonth, sameDate, page, isLTE, isGTE, dayjsToData, dateFormat, fromTo } from './dateUtils';
import { CalendarProps, CurDateType, DateObject, MarkedDates, StateType, PeriodMarking } from './type';

const { px } = helpers;

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
  contentStyle,
  monthWrapperStyle,
  onDayPress,
  onMonthChange,
  ...restProps
}) => {
  const theme = useTheme<Theme>();

  const datePickerRef = useRef<{ getValue: () => { date: Date; formatDate: string } }>(null);
  const [currentMonth, setCurrentMonth] = useState<Dayjs>(current || dayjs());
  const [curMarkedDates, setCurMarkedDates] = useState<MarkedDates>({});
  const [isFold, setIsFold] = useState(true);

  useEffect(() => {
    if (markingType === 'dot') {
      // 设置current为默认选中
      setCurMarkedDates({ [dateFormat(currentMonth)]: { selected: true } });
    } else {
      setCurMarkedDates(markedDates);
    }
  }, [currentMonth, markingType, markedDates]);

  const updateMonth = (day: Dayjs) => {
    if (dateFormat(day, 'YYYY-MM') === dateFormat(currentMonth, 'YYYY-MM')) {
      return;
    }
    setCurrentMonth(day);
  };

  /** 判断日期是否在区间 */
  const isDateNotInTheRange = (date: Dayjs, minDate?: CurDateType, maxDate?: CurDateType) => {
    // 当前日期比最小日期小 || 当前日期比最大日期大
    return (minDate && !isGTE(date, minDate)) || (maxDate && !isLTE(date, maxDate));
  };

  const pressDay = (date: DateObject) => {
    const _date = dayjs(date.dateString);
    let state = {};
    // 当前日期比最小日期大 && 当前日期比最大日期小
    if (!(minDate && !isGTE(_date, minDate)) && !(maxDate && !isLTE(_date, maxDate))) {
      updateMonth(_date);
      if (markingType === 'dot') {
        state = {
          [dateFormat(_date)]: { selected: true },
        };
      } else {
        const markedDatesArr = Object.entries(curMarkedDates);
        // 此时curMarkedDates为{}
        if (markedDatesArr.length === 0) {
          state = { [dateFormat(_date)]: { selected: true, startingDay: true } };
        } else {
          // 计算中此时curMarkedDates中的开始日期和结束日期
          const startDate = markedDatesArr.find(item => (item[1] as PeriodMarking).startingDay)?.[0];
          const endDate = markedDatesArr.find(item => (item[1] as PeriodMarking).endingDay)?.[0];
          // 此时curMarkedDates中已经有选中的时间段，则进行清空并赋值开始日期
          if (startDate && endDate) {
            state = { [dateFormat(_date)]: { selected: true, startingDay: true } };
          } else {
            // 此时curMarkedDates中有开始时间或者是结束时间
            const _markedDates = {};
            // 计算出开始日期和当前选中日期之间的date
            let from = dayjs(startDate || endDate);
            let to = _date;
            if (isGTE(from, to)) {
              [to, from] = [from, to];
            }
            const dates = fromTo(from, to);
            dates.map(item => (_markedDates[dateFormat(item)] = { selected: true }));
            state = {
              ..._markedDates,
              [dateFormat(from)]: { selected: true, startingDay: true },
              [dateFormat(to)]: { selected: true, endingDay: true },
            };
          }
        }
      }
      setCurMarkedDates(state);
      onDayPress?.(date, state);
    }
  };

  const renderDayComponent = () => {
    switch (markingType) {
      case 'period':
        return Period;
      default:
        return Day;
    }
  };

  /** 天 */
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

    const propsMarking = markedDates[dateFormat(day)] ?? {};
    const stateMarking = curMarkedDates[dateFormat(day)] ?? {};

    const dayProps = {
      state: state as StateType,
      onPress: pressDay,
      date: dateAsObject,
      marking: { ...propsMarking, ...stateMarking },
    };

    return (
      <Flex justifyContent="center" style={{ flex: 1 }} key={id}>
        <DayComp {...dayProps}>{day.date()}</DayComp>
      </Flex>
    );
  };

  /** 周 */
  const renderWeek = (days: Dayjs[], id: number) => {
    const week: ReactNode[] = [];

    days.forEach((day, id2) => {
      week.push(renderDay(day, id2));
    });

    return <Flex key={id}>{week}</Flex>;
  };

  /** 月 */
  const renderMonth = () => {
    const shouldShowSixWeeks = showSixWeeks && !hideExtraDays;
    const days = page(currentMonth, firstDay, shouldShowSixWeeks);
    const weeks = [];

    while (days.length) {
      weeks.push(renderWeek(days.splice(0, 7), weeks.length));
    }

    return <Animated.View style={monthWrapperStyle}>{weeks}</Animated.View>;
  };

  const addMonth = (count: number) => {
    updateMonth(currentMonth.add(count, 'month'));
  };

  const handlerStateChange = ({ nativeEvent }: FlingGestureHandlerStateChangeEvent, direction: 'left' | 'right') => {
    if (nativeEvent.oldState === State.ACTIVE) {
      addMonth(direction === 'left' ? 1 : -1);
    }
  };

  const handleChange = (date?: Date) => {
    setCurrentMonth(dayjs(date));
    onMonthChange?.(dateFormat(dayjs(date), 'YYYY-MM'));
  };

  const renderDatePicker = () => {
    return (
      <DatePicker
        ref={datePickerRef}
        displayType="view"
        display="Y-M"
        value={currentMonth.toDate()}
        onChange={handleChange}
      />
    );
  };

  const renderCalendar = () => (
    <Animated.View
      style={[
        {
          paddingHorizontal: px(12),
          backgroundColor: theme.colors.calendar_background,
        },
        style,
      ]}
    >
      <CalendarHeader
        month={currentMonth}
        firstDay={firstDay}
        onPressArrowDown={() => setIsFold(false)}
        onPressArrowUp={() => setIsFold(true)}
        onPressArrowLeft={addMonth}
        onPressArrowRight={addMonth}
        showDown={isFold}
        dayNamesStyle={markingType === 'period' ? { marginBottom: px(6) } : {}}
        {...restProps}
      />
      <Animated.View style={[contentStyle]}>{isFold ? renderMonth() : renderDatePicker()}</Animated.View>
    </Animated.View>
  );

  if (!enableSwipeMonths || !isFold) return <>{renderCalendar()}</>;

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

export default React.memo(Calendar, (prevProps, nextProps) => {
  // 返回false才会触发渲染
  let shouldUpdate = true;

  if (prevProps.current?.format('YYYY-MM') !== nextProps.current?.format('YYYY-MM')) {
    shouldUpdate = false;
  }

  shouldUpdate = [
    'markedDates',
    'hideExtraDays',
    'showSixWeeks',
    'showArrowLeft',
    'showArrowRight',
    'firstDay',
    'enableSwipeMonths',
    'contentStyle',
    'monthWrapperStyle',
  ].reduce((prev, next) => {
    if (!prev || nextProps[next] !== prevProps[next]) {
      return false;
    }
    return true;
  }, shouldUpdate);

  shouldUpdate = ['minDate', 'maxDate'].reduce((prev, next) => {
    const prevDate = prevProps[next];
    const nextDate = nextProps[next];
    if (!prev) {
      return false;
    } else if (prevDate !== nextDate) {
      if (prevDate && nextDate && dayjs(prevDate).format('YYYY-MM') === dayjs(nextDate).format('YYYY-MM')) {
        return true;
      } else {
        return false;
      }
    }
    return prev;
  }, shouldUpdate);

  return shouldUpdate;
});
