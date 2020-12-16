import React, { useEffect, useRef, useState } from 'react';
import { FlatList, ListRenderItemInfo } from 'react-native';
import dayjs, { Dayjs } from 'dayjs';
import { deviceWidth, px } from '../helper';
import { CalendarListProps } from './type';
import { Calendar } from '..';

const CalendarList: React.FC<CalendarListProps> = ({
  pastScrollRange = 12,
  futureScrollRange = 12,
  horizontal = false,
  current,
  calendarWidth = deviceWidth,
  calendarHeight = px(420),
  ...resProps
}) => {
  const flatListRef = useRef<FlatList<Dayjs>>(null);

  const [currentMonth] = useState<Dayjs>(current || dayjs());
  const [rows, setRows] = useState<Dayjs[]>([]);

  useEffect(() => {
    const _rows = [];
    for (let i = 0; i <= pastScrollRange + futureScrollRange; i++) {
      const rangeDate = currentMonth.add(i - pastScrollRange, 'month');
      _rows.push(rangeDate);
      setRows(_rows);
    }
  }, [currentMonth, futureScrollRange, pastScrollRange]);

  const getItemLayout = (_: Dayjs[] | null | undefined, index: number) => {
    return {
      length: horizontal ? calendarWidth : calendarHeight,
      offset: (horizontal ? calendarWidth : calendarHeight) * index,
      index,
    };
  };

  const renderItem = ({ item, index }: ListRenderItemInfo<Dayjs>) => {
    return (
      <Calendar
        key={index + '-'}
        current={item}
        style={{ height: calendarHeight, width: calendarWidth }}
        showArrowLeft={false}
        showArrowRight={false}
        hideExtraDays={true}
        {...resProps}
      />
    );
  };

  return (
    <FlatList
      ref={flatListRef}
      data={rows}
      keyExtractor={(_, index) => index + '-'}
      renderItem={renderItem}
      getItemLayout={getItemLayout}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 20,
      }}
      initialScrollIndex={pastScrollRange}
      scrollEnabled={true}
      horizontal={horizontal}
    />
  );
};

export default CalendarList;
