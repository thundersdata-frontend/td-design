import React, { useMemo, useRef, useState } from 'react';
import { FlatList, ListRenderItemInfo } from 'react-native';
import dayjs, { Dayjs } from 'dayjs';
import { deviceWidth, px } from '../helper';
import { CalendarListProps } from './type';
import Calendar from './index';

const CalendarList: React.FC<CalendarListProps> = ({
  pastScrollRange = 12,
  futureScrollRange = 12,
  horizontal = false,
  current,
  calendarWidth = deviceWidth,
  calendarHeight = px(420),
  ...restProps
}) => {
  const flatListRef = useRef<FlatList<Dayjs>>(null);

  const [rows, setRows] = useState<Dayjs[]>([]);

  useMemo(() => {
    const _rows = [];
    const currentMonth = current || dayjs();
    for (let i = 0; i <= pastScrollRange + futureScrollRange; i++) {
      const rangeDate = currentMonth.add(i - pastScrollRange, 'month');
      _rows.push(rangeDate);
      setRows(_rows);
    }
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
    />
  );
};

export default CalendarList;
