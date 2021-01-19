import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FlatList, ListRenderItemInfo, View, ViewToken } from 'react-native';
import dayjs, { Dayjs } from 'dayjs';
import { deviceWidth, px } from '../helper';
import { CalendarListProps, RowItem } from './type';
import Calendar from './Calendar';
import { CALENDAR_HEIGHT } from './constant';
import Text from '../text';

const CalendarList: React.FC<CalendarListProps> = ({
  pastScrollRange = 12,
  futureScrollRange = 12,
  horizontal = false,
  current = dayjs(),
  calendarWidth = deviceWidth,
  calendarHeight = CALENDAR_HEIGHT,
  ...restProps
}) => {
  const flatListRef = useRef<FlatList<RowItem>>(null);

  const [rows, setRows] = useState<RowItem[]>([]);
  const [currentDate] = useState<Dayjs>(current);

  useEffect(() => {
    const _rows: RowItem[] = [];

    new Array(pastScrollRange + futureScrollRange).fill('').map((_, i) => {
      const rangeDate = currentDate.add(i - pastScrollRange, 'month');

      if ((pastScrollRange - 1 <= i && i <= pastScrollRange + 1) || (!pastScrollRange && i <= pastScrollRange + 2)) {
        _rows.push({ date: rangeDate, isShowDate: true });
      } else {
        _rows.push({ date: rangeDate, isShowDate: false });
      }
    });

    setRows(_rows);
  }, [currentDate, pastScrollRange, futureScrollRange]);

  const getItemLayout = (_: RowItem[] | null | undefined, index: number) => {
    return {
      length: horizontal ? calendarWidth : calendarHeight,
      offset: (horizontal ? calendarWidth : calendarHeight) * index,
      index,
    };
  };

  const renderItem = ({ item }: ListRenderItemInfo<RowItem>) => {
    if (!item.isShowDate) {
      return (
        <View
          style={[{ height: calendarHeight, width: calendarWidth, justifyContent: 'center', alignItems: 'center' }]}
        >
          <Text style={{ fontSize: px(20) }}>{item.date.format('YYYY-MM-DD')}</Text>
        </View>
      );
    }
    return (
      <Calendar
        current={item.date}
        style={{ height: calendarHeight, width: calendarWidth }}
        showArrowLeft={false}
        showArrowRight={false}
        hideExtraDays={true}
        {...restProps}
      />
    );
  };

  const rowIsCloseToViewable = (index: number, distance: number, viewableItems: Array<ViewToken>) => {
    for (let i = 0; i < viewableItems.length; i++) {
      if (Math.abs(index - viewableItems[i].index!) <= distance) {
        return true;
      }
    }
    return false;
  };

  const handleViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: Array<ViewToken> }) => {
      setRows(rows => {
        const newRows: RowItem[] = [];

        rows.map((item, index) => {
          let val = item.date;
          const rowShouldBeRendered = rowIsCloseToViewable(index, 1, viewableItems);

          if (rowShouldBeRendered && !item.isShowDate) {
            val = current.add(index - pastScrollRange, 'month');
            newRows.push({ date: val, isShowDate: true });
          } else if (!rowShouldBeRendered) {
            newRows.push({ date: val, isShowDate: false });
          } else {
            newRows.push({ date: val, isShowDate: true });
          }
        });

        return newRows;
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

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
      onViewableItemsChanged={handleViewableItemsChanged}
      initialScrollIndex={pastScrollRange}
      scrollEnabled={true}
      horizontal={horizontal}
      pagingEnabled={horizontal}
    />
  );
};

export default CalendarList;
