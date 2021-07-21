import React, { useMemo, useState } from 'react';
import { FlatList, ListRenderItemInfo, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@shopify/restyle';
import { Theme, Flex, Box, Text, Iconfont, WhiteSpace, helpers } from '@td-design/react-native';
import Animated, { useAnimatedStyle, useDerivedValue, useSharedValue, withTiming } from 'react-native-reanimated';
import { mix } from 'react-native-redash';
import dayjs from 'dayjs';

import Calendar from './Calendar';
import { getRows } from './dateUtils';
import { DAY_WIDTH } from './constant';
import { AgendaProps, Item } from './type';

const { px, ONE_PIXEL } = helpers;
const dayItemHeight = DAY_WIDTH + px(16);

function Agenda<ItemT extends Item>({
  data = [],
  renderItem,
  keyExtractor,
  firstDay,
  ...restProps
}: AgendaProps<ItemT>) {
  const theme = useTheme<Theme>();
  const [currentMonth, setCurrentMonth] = useState(dayjs());

  const expanded = useSharedValue(false);
  const animation = useDerivedValue(() => (expanded.value ? withTiming(1) : withTiming(0)));

  const handleMonthChange = (month: string) => {
    console.log(month);
    setCurrentMonth(dayjs(month + '-01'));
  };

  const y = useMemo(() => {
    const rows = getRows(currentMonth, firstDay);
    return rows * dayItemHeight;
  }, [currentMonth, firstDay]);

  const contentStyle = useAnimatedStyle(() => ({
    height: mix(animation.value, y, 0),
  }));

  const iconWrapStyle = useAnimatedStyle(() => ({
    transform: [{ rotateZ: `${mix(animation.value, 0, Math.PI)}rad` }],
  }));

  const handleRenderItem = (itemInfo: ListRenderItemInfo<ItemT>) => {
    if (renderItem) {
      return renderItem(itemInfo);
    } else {
      const { item } = itemInfo;
      return (
        <TouchableOpacity onPress={item.onPress} activeOpacity={0.5}>
          <Flex borderStyle="solid" borderBottomColor="border" borderBottomWidth={ONE_PIXEL} paddingHorizontal="x6">
            <View style={{ width: px(8), height: px(8), borderRadius: px(8), backgroundColor: theme.colors.func300 }} />
            <View style={{ paddingVertical: px(10), marginLeft: px(8) }}>
              <Text variant="p0" color="gray500" style={{ marginBottom: px(2) }}>
                {item.title}
              </Text>
              <Text variant="p1" color="gray500">
                {item.time}
              </Text>
            </View>
          </Flex>
        </TouchableOpacity>
      );
    }
  };

  return (
    <Box flex={1}>
      <Calendar
        onMonthChange={handleMonthChange}
        contentStyle={
          [
            {
              overflow: 'hidden',
              backgroundColor: theme.colors.background,
            },
            contentStyle,
          ] as any
        }
        {...restProps}
      />
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => {
          expanded.value = !expanded.value;
        }}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          height: px(30),
          backgroundColor: theme.colors.background,
        }}
      >
        <Animated.View style={iconWrapStyle}>
          <Iconfont name="up" size={px(24)} color={theme.colors.icon} />
        </Animated.View>
      </TouchableOpacity>
      <WhiteSpace backgroundColor={theme.colors.gray100} />
      <FlatList
        data={data}
        renderItem={handleRenderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={{ backgroundColor: theme.colors.background, flex: 1 }}
      />
    </Box>
  );
}

export default Agenda;
