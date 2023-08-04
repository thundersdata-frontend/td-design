import React from 'react';
import { View, ViewStyle } from 'react-native';

import { Flex, helpers, Pressable, SvgIcon, Text, Theme, useTheme } from '@td-design/react-native';
import dayjs from 'dayjs';

import { WEEK_DAY_NAMES } from '../../constant';
import { dateFormat } from '../../dateUtils';
import { ArrowDirection, CalendarHeaderControlProps, CalendarHeaderProps } from '../../type';

const { ONE_PIXEL } = helpers;

const CalendarHeader: React.FC<CalendarHeaderProps & CalendarHeaderControlProps> = ({
  month = dayjs(),
  monthFormat = 'YYYY年MM月',
  firstDay,
  showDown = true,
  headerStyle,
  dayNamesStyle,
  showArrowLeft = true,
  showArrowRight = true,
  activeOpacity,
  onPressArrowLeft,
  onPressArrowRight,
  onPressArrowDown,
  onPressArrowUp,
}) => {
  const theme = useTheme<Theme>();

  const handlePress = (direction: ArrowDirection) => {
    switch (direction) {
      case 'left':
        onPressArrowLeft?.(-1);
        break;
      case 'right':
        onPressArrowRight?.(1);
        break;
      case 'down':
        onPressArrowDown?.();
        break;
      case 'up':
        onPressArrowUp?.();
        break;
    }
  };

  const renderArrow = (direction: ArrowDirection, style?: ViewStyle) => {
    return (
      <Pressable
        activeOpacity={activeOpacity}
        onPress={() => handlePress(direction)}
        style={[{ padding: theme.spacing.x2 }, style]}
        hitOffset={10}
      >
        <SvgIcon name={direction} color={theme.colors.gray500} />
      </Pressable>
    );
  };

  const renderDayNames = () => {
    let _dayNames = WEEK_DAY_NAMES;
    if (firstDay) {
      _dayNames = WEEK_DAY_NAMES.slice(firstDay).concat(_dayNames.slice(0, firstDay));
    }

    return (
      <Flex style={dayNamesStyle} marginVertical="x2" justifyContent="space-around">
        {_dayNames.map((day, idx) => (
          <Text key={idx} variant="p1" color="text" numberOfLines={1}>
            {day}
          </Text>
        ))}
      </Flex>
    );
  };

  return (
    <View>
      <Flex
        justifyContent="space-between"
        paddingVertical="x2"
        borderBottomColor="border"
        borderBottomWidth={ONE_PIXEL}
        style={headerStyle}
      >
        <Pressable
          activeOpacity={activeOpacity}
          style={{ flexDirection: 'row', alignItems: 'center' }}
          onPress={() => handlePress(showDown ? 'down' : 'up')}
        >
          <Text variant="p1" color="text">
            {month.format(monthFormat)}
          </Text>
          <SvgIcon name={showDown ? 'down' : 'up'} color={theme.colors.gray500} />
        </Pressable>
        <Flex>
          {showArrowLeft && renderArrow('left')}
          {showArrowRight && renderArrow('right')}
        </Flex>
      </Flex>
      {showDown && renderDayNames()}
    </View>
  );
};

export default React.memo(CalendarHeader, (prevProps, nextProps) => {
  // 返回false才会触发渲染
  let shouldUpdate = true;

  if (dateFormat(prevProps.month) !== dateFormat(nextProps.month)) {
    shouldUpdate = false;
  }

  shouldUpdate = ['monthFormat', 'showArrowLeft', 'showArrowRight', 'showDown', 'firstDay', 'headerStyle'].reduce(
    (prev, next) => {
      if (!prev || nextProps[next as keyof CalendarHeaderProps] !== prevProps[next as keyof CalendarHeaderProps]) {
        return false;
      }
      return true;
    },
    shouldUpdate
  );

  return shouldUpdate;
});
