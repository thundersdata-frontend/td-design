import React from 'react';
import { FlatList, ListRenderItemInfo, StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';
import Svg, { Circle } from 'react-native-svg';

import { Box, Flex, helpers, Pressable, SvgIcon, Text, Theme, useTheme, WhiteSpace } from '@td-design/react-native';

import { AgendaProps, Item } from '../../type';
import Calendar from '../Calendar';
import useAgenda from './useAgenda';

const { px, ONE_PIXEL } = helpers;

function Agenda<ItemT extends Item>({
  data = [],
  renderItem,
  keyExtractor,
  firstDay,
  activeOpacity = 0.6,
  ...restProps
}: AgendaProps<ItemT>) {
  const theme = useTheme<Theme>();

  const { contentStyle, iconWrapStyle, expanded, handleMonthChange } = useAgenda({ firstDay });

  const styles = StyleSheet.create({
    iconBtn: {
      justifyContent: 'center',
      alignItems: 'center',
      height: px(30),
    },
    list: { backgroundColor: theme.colors.white, flex: 1 },
  });

  const handleRenderItem = (itemInfo: ListRenderItemInfo<ItemT>) => {
    if (renderItem) {
      return renderItem(itemInfo);
    } else {
      const { item } = itemInfo;
      return (
        <Pressable onPress={item.onPress} activeOpacity={activeOpacity}>
          <Flex borderStyle="solid" borderBottomColor="border" borderBottomWidth={ONE_PIXEL} paddingHorizontal="x2">
            <Svg height={theme.borderRadii.x2} width={theme.borderRadii.x2}>
              <Circle
                cx={theme.borderRadii.x1}
                cy={theme.borderRadii.x1}
                r={theme.borderRadii.x1}
                fill={theme.colors.func300}
              />
            </Svg>
            <Box paddingVertical={'x2'} marginLeft={'x2'}>
              <Text variant="p0" color="gray500" marginBottom={'x1'}>
                {item.title}
              </Text>
              <Text variant="p1" color="gray500">
                {item.time}
              </Text>
            </Box>
          </Flex>
        </Pressable>
      );
    }
  };

  return (
    <Box flex={1}>
      <Calendar
        onMonthChange={handleMonthChange}
        contentStyle={[{ overflow: 'hidden' }, contentStyle] as any}
        activeOpacity={activeOpacity}
        {...restProps}
      />
      <Pressable
        activeOpacity={1}
        onPress={() => {
          expanded.value = !expanded.value;
        }}
        style={styles.iconBtn}
      >
        <Animated.View style={iconWrapStyle}>
          <SvgIcon name="up" size={px(24)} color={theme.colors.gray500} />
        </Animated.View>
      </Pressable>
      <WhiteSpace backgroundColor={theme.colors.gray50} />
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
