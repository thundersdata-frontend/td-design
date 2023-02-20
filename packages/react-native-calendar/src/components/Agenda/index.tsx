import React from 'react';
import { FlatList, ListRenderItemInfo, TouchableOpacity, View, ViewStyle } from 'react-native';
import Animated from 'react-native-reanimated';

import { useTheme } from '@shopify/restyle';
import { Box, Flex, helpers, SvgIcon, Text, Theme, WhiteSpace } from '@td-design/react-native';

import { AgendaProps, Item } from '../../type';
import Calendar from '../Calendar';
import useAgenda from './useAgenda';

const { px, ONE_PIXEL } = helpers;

function Agenda<ItemT extends Item>({
  data = [],
  renderItem,
  keyExtractor,
  firstDay,
  ...restProps
}: AgendaProps<ItemT>) {
  const theme = useTheme<Theme>();

  const { contentStyle, iconWrapStyle, expanded, handleMonthChange } = useAgenda({ firstDay });

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
          ] as ViewStyle
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
          <SvgIcon name="up" size={px(24)} color={theme.colors.icon} />
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
