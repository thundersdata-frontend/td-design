import React from 'react';
import { FlatList, ListRenderItemInfo } from 'react-native';

import { Box, helpers, Text } from '@td-design/react-native';

import { CALENDAR_HEIGHT } from '../../constant';
import { CalendarListProps, RowItem } from '../../type';
import Calendar from '../Calendar';
import useCalendarList from './useCalendarList';

const { deviceWidth } = helpers;

const CalendarList: React.FC<CalendarListProps> = props => {
  const { rows, getItemLayout, handleViewableItemsChanged } = useCalendarList(props);

  const {
    pastScrollRange = 12,
    horizontal = false,
    calendarWidth = deviceWidth,
    calendarHeight = CALENDAR_HEIGHT,
    activeOpacity = 0.6,
    ...restProps
  } = props;
  const renderItem = ({ item }: ListRenderItemInfo<RowItem>) => {
    if (!item.isShowDate) {
      return (
        <Box
          height={calendarHeight}
          width={calendarWidth}
          justifyContent="center"
          alignItems="center"
          backgroundColor="background"
        >
          <Text variant="h0" color="text">
            {item.date.format('YYYY-MM-DD')}
          </Text>
        </Box>
      );
    }
    return (
      <Calendar
        current={item.date}
        style={{ height: calendarHeight, width: calendarWidth }}
        showArrowLeft={false}
        showArrowRight={false}
        hideExtraDays={true}
        activeOpacity={activeOpacity}
        {...restProps}
      />
    );
  };

  return (
    <FlatList
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
