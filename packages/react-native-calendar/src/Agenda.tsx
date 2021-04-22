import React from 'react';
import { FlatList, ListRenderItemInfo, TouchableOpacity, View } from 'react-native';
import { useTheme, Theme, helpers, Flex, Text, Icon, WhiteSpace } from '@td-design/react-native';
import { useAnimatedStyle, useDerivedValue, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { mix } from 'react-native-redash';
import dayjs from 'dayjs';

import Calendar from './Calendar';
import { page, sameDate } from './dateUtils';
import { CALENDAR_HEIGHT, DAY_WIDTH, WEEK_DAY_NAMES } from './constant';
import { AgendaProps, DateObject, Item } from './type';

const { px, ONE_PIXEL } = helpers;

const dayItemHeight = DAY_WIDTH + px(6 * 2);

function Agenda<ItemT extends Item>({
  data = [],
  renderItem,
  keyExtractor,
  firstDay,
  showSixWeeks,
  ...restProps
}: AgendaProps<ItemT>) {
  const theme = useTheme<Theme>();

  const selectedDay = useSharedValue('');

  const handleDayPress = (date: DateObject) => {
    selectedDay.value = date.dateString;
  };

  const getAnimationY = () => {
    let week = 0;
    if (selectedDay.value) {
      const date = dayjs(selectedDay.value);
      const days = page(date, firstDay, showSixWeeks);
      for (let i = 0; i < days.length; i++) {
        week = Math.floor(i / 7);
        if (sameDate(days[i], date)) {
          break;
        }
      }
    }
    return week * dayItemHeight;
  };

  const animation = useDerivedValue(() => (!!selectedDay.value ? withSpring(1) : withTiming(0)));

  const contentStyle = useAnimatedStyle(() => ({
    overflow: 'hidden',
    backgroundColor: theme.colors.calendar_background,
    height: mix(animation.value, CALENDAR_HEIGHT, dayItemHeight),
  }));

  const monthStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: mix(animation.value, 0, -getAnimationY()),
      },
    ],
  }));

  const handleRenderItem = (itemInfo: ListRenderItemInfo<ItemT>) => {
    if (renderItem) {
      return renderItem(itemInfo);
    } else {
      const { item } = itemInfo;
      return (
        <TouchableOpacity onPress={item.onPress} activeOpacity={0.8}>
          <Flex
            borderStyle="solid"
            borderBottomColor="calendar_border"
            borderBottomWidth={ONE_PIXEL}
            paddingHorizontal="xxl"
          >
            <View style={{ width: px(8), height: px(8), borderRadius: px(8), backgroundColor: theme.colors.success }} />
            <View style={{ paddingVertical: px(10), marginLeft: px(8) }}>
              <Text variant="content1" style={{ marginBottom: px(2) }}>
                {item.title}
              </Text>
              <Text variant="date2">{item.time}</Text>
            </View>
          </Flex>
        </TouchableOpacity>
      );
    }
  };

  return (
    <View>
      <Calendar onDayPress={handleDayPress} monthWrapperStyle={monthStyle} contentStyle={contentStyle} {...restProps} />
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          selectedDay.value = '';
        }}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          height: px(30),
          backgroundColor: theme.colors.calendar_background,
        }}
      >
        <Icon name="chevron-thin-down" type="entypo" size={px(24)} color={theme.colors.agenda_icon} />
      </TouchableOpacity>
      <WhiteSpace backgroundColor={theme.colors.agenda_whitespace} />
      <Flex
        height={px(36)}
        justifyContent="center"
        borderStyle="solid"
        borderBottomColor="calendar_border"
        borderBottomWidth={ONE_PIXEL}
        backgroundColor="calendar_background"
      >
        <Text variant="content1">
          {selectedDay.value
            ? dayjs(selectedDay.value).format('MM月DD日') + ' 周' + WEEK_DAY_NAMES[dayjs(selectedDay.value).day()]
            : ''}
        </Text>
      </Flex>
      <FlatList
        data={data}
        renderItem={handleRenderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={{ backgroundColor: theme.colors.calendar_background }}
      />
    </View>
  );
}

export default Agenda;
