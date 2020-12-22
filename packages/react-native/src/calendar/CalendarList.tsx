import React, { useMemo, useRef } from 'react';
import { FlatList, ListRenderItemInfo } from 'react-native';
import dayjs, { Dayjs } from 'dayjs';
import { deviceWidth, px } from '../helper';
import { CalendarListProps } from './type';
import Calendar from './Calendar';
import { CALENDAR_HEIGHT } from './constant';

const CalendarList: React.FC<CalendarListProps> = ({
  pastScrollRange = 12,
  futureScrollRange = 12,
  horizontal = false,
  current,
  calendarWidth = deviceWidth,
  calendarHeight = px(CALENDAR_HEIGHT),
  ...restProps
}) => {
  const flatListRef = useRef<FlatList<Dayjs>>(null);

  const rows = useMemo(() => {
    const currentMonth = current || dayjs();
    return new Array(pastScrollRange + futureScrollRange)
      .fill('')
      .map((_, index) => currentMonth.add(index - pastScrollRange, 'month'));
  }, [current, futureScrollRange, pastScrollRange]);

  const getItemLayout = (_: Dayjs[] | null | undefined, index: number) => {
    return {
      length: horizontal ? calendarWidth : calendarHeight,
      offset: (horizontal ? calendarWidth : calendarHeight) * index,
      index,
    };
  };

  const renderItem = ({ item }: ListRenderItemInfo<Dayjs>) => {
    return (
      <Calendar
        current={item}
        style={{ height: calendarHeight, width: calendarWidth }}
        showArrowLeft={false}
        showArrowRight={false}
        hideExtraDays={true}
        {...restProps}
      />
    );
  };

  return (
    <FlatList
      ref={flatListRef}
      data={rows}
      keyExtractor={(_, index) => `${index}`}
      renderItem={renderItem}
      getItemLayout={getItemLayout}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 20,
      }}
      initialScrollIndex={pastScrollRange}
      scrollEnabled={true}
      horizontal={horizontal}
      pagingEnabled={horizontal}
    />
  );
};

export default CalendarList;
