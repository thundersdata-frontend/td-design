import React, { ReactNode, useEffect, useState } from 'react';
import { View } from 'react-native';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import { sameMonth, sameDate, page, isLTE, isGTE, dayjsToData } from './dateUtils';
import dayjs, { Dayjs } from 'dayjs';
import { CalendarProps, CurDateType, DateObject, StateType } from './type';
import Dot from './Dot';
import CalendarHeader from './Header';
import { useTheme } from '@shopify/restyle';
import { Theme } from '../config/theme';
import { px } from '../helper';
import { Flex } from '..';

const Calendar: React.FC<CalendarProps> = props => {
  const {
    current,
    minDate,
    maxDate,
    markedDates = {},
    markingType = 'dot',
    enableSwipeMonths = true,
    showSixWeeks = false,
    hideExtraDays = false,
    firstDay = 0,
    onDayPress,
    onMonthChange,
  } = props;

  const theme = useTheme<Theme>();

  const [currentMonth, setCurrentMonth] = useState<Dayjs>(current || dayjs());

  useEffect(() => {
    onMonthChange?.(currentMonth.format('YYYY-MM'));
  }, [currentMonth, onMonthChange]);

  const onSwipe = (gestureName: string) => {
    const { SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT } = swipeDirections;

    switch (gestureName) {
      case SWIPE_UP:
      case SWIPE_DOWN:
        break;
      case SWIPE_LEFT:
        addMonth(1);
        break;
      case SWIPE_RIGHT:
        addMonth(-1);
        break;
    }
  };

  const updateMonth = (day: Dayjs) => {
    if (day.format('YYYY-MM') === currentMonth.format('YYYY-MM')) {
      return;
    }
    setCurrentMonth(day);
  };

  // eslint-disable-next-line @typescript-eslint/ban-types
  const handleDayInteraction = (date: DateObject, interaction?: Function) => {
    const _date = dayjs(date.dateString);

    if (!(minDate && !isGTE(_date, minDate)) && !(maxDate && !isLTE(_date, maxDate))) {
      updateMonth(_date);
      if (interaction) {
        interaction(date);
      }
    }
  };

  const pressDay = (date: DateObject) => {
    handleDayInteraction(date, onDayPress);
  };

  const isDateNotInTheRange = (date: Dayjs, minDate?: CurDateType, maxDate?: CurDateType) => {
    return (minDate && !isGTE(date, minDate)) || (maxDate && !isLTE(date, maxDate));
  };

  const renderDayComponent = () => {
    switch (markingType) {
      // TODO peroid待补充
      case 'period':
      default:
        return Dot;
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

    return (
      <Flex style={{ marginVertical: px(6) }} key={id}>
        {week}
      </Flex>
    );
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

  const GestureComponent = enableSwipeMonths ? GestureRecognizer : View;
  const gestureProps = enableSwipeMonths ? { onSwipe: (direction: string) => onSwipe(direction) } : {};

  return (
    <GestureComponent {...gestureProps}>
      <View style={{ paddingHorizontal: px(12), backgroundColor: theme.colors.white }}>
        <CalendarHeader month={currentMonth} addMonth={addMonth} firstDay={firstDay} />
        {renderMonth()}
      </View>
    </GestureComponent>
  );
};

export default Calendar;
