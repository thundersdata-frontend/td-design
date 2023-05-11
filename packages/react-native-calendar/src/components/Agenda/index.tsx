import React from 'react';
import { FlatList, ListRenderItemInfo, StyleSheet, TouchableOpacity } from 'react-native';
import Animated from 'react-native-reanimated';
import Svg, { Circle } from 'react-native-svg';

import { Box, Flex, helpers, SvgIcon, Text, Theme, useTheme, WhiteSpace } from '@td-design/react-native';

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

  const styles = StyleSheet.create({
    content: {
      overflow: 'hidden',
      backgroundColor: theme.colors.background,
    },
    iconBtn: {
      justifyContent: 'center',
      alignItems: 'center',
      height: px(30),
      backgroundColor: theme.colors.background,
    },
    list: { backgroundColor: theme.colors.background, flex: 1 },
  });

  const handleRenderItem = (itemInfo: ListRenderItemInfo<ItemT>) => {
    if (renderItem) {
      return renderItem(itemInfo);
    } else {
      const { item } = itemInfo;
      return (
        <TouchableOpacity onPress={item.onPress} activeOpacity={0.5}>
          <Flex borderStyle="solid" borderBottomColor="border" borderBottomWidth={ONE_PIXEL} paddingHorizontal="x6">
            <Svg height={px(10)} width={px(10)}>
              <Circle cx={px(5)} cy={px(5)} r={px(4)} fill={theme.colors.func300} />
            </Svg>
            <Box paddingVertical={'x3'} marginLeft={'x2'}>
              <Text variant="p0" color="gray500" marginBottom={'x1'}>
                {item.title}
              </Text>
              <Text variant="p1" color="gray500">
                {item.time}
              </Text>
            </Box>
          </Flex>
        </TouchableOpacity>
      );
    }
  };

  return (
    <Box flex={1}>
      <Calendar onMonthChange={handleMonthChange} contentStyle={[styles.content, contentStyle] as any} {...restProps} />
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => {
          expanded.value = !expanded.value;
        }}
        style={styles.iconBtn}
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
        contentContainerStyle={styles.list}
      />
    </Box>
  );
}

export default Agenda;
