import React from 'react';
import { View, TouchableOpacity, ViewStyle } from 'react-native';
import dayjs from 'dayjs';
import { ArrowDirection, CalendarHeaderProps } from './type';
import { WEEK_DAY_NAMES } from './constant';
import { dateFormat } from './dateUtils';
import { useTheme, Theme, helpers, Flex, Text, Icon } from '@td-design/react-native';

const { px, ONE_PIXEL } = helpers;

const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  month = dayjs(),
  addMonth,
  monthFormat = 'YYYY年MM月',
  firstDay,
  showDown = true,
  headerStyle,
  dayNamesStyle,
  showArrowLeft = true,
  showArrowRight = true,
  onPressArrowLeft,
  onPressArrowRight,
  onPressArrowDown,
  onPressArrowUp,
}) => {
  const theme = useTheme<Theme>();

  const handlePress = (direction: ArrowDirection) => {
    switch (direction) {
      case 'left':
        onPressArrowLeft ? onPressArrowLeft(month) : addMonth?.(-1);
        break;
      case 'right':
        onPressArrowRight ? onPressArrowRight(month) : addMonth?.(1);
        break;
      case 'down':
        onPressArrowDown?.(month);
        break;
      case 'up':
        onPressArrowUp?.(month);
        break;
    }
  };

  const renderArrow = (direction: ArrowDirection, style?: ViewStyle) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => handlePress(direction)}
        style={[{ padding: px(10) }, style]}
        hitSlop={{ left: 10, right: 10, top: 20, bottom: 20 }}
      >
        <Icon name={direction} color={theme.colors.calendar_icon} />
      </TouchableOpacity>
    );
  };

  const renderDayNames = () => {
    let _dayNames = WEEK_DAY_NAMES;
    if (firstDay) {
      _dayNames = WEEK_DAY_NAMES.slice(firstDay).concat(_dayNames.slice(0, firstDay));
    }

    return (
      <Flex style={dayNamesStyle} marginVertical="m" justifyContent="space-around">
        {_dayNames.map((day, idx) => (
          <Text key={idx} variant="content3" numberOfLines={1}>
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
        paddingVertical="s"
        borderBottomColor="calendar_border"
        borderBottomWidth={ONE_PIXEL}
        style={headerStyle}
      >
        <TouchableOpacity
          activeOpacity={0.8}
          style={{ flexDirection: 'row', alignItems: 'center' }}
          onPress={() => handlePress(showDown ? 'down' : 'up')}
        >
          <Text variant="content3">{month.format(monthFormat)}</Text>
          <Icon name={showDown ? 'down' : 'up'} color={theme.colors.calendar_icon} />
        </TouchableOpacity>
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
      if (!prev || nextProps[next] !== prevProps[next]) {
        return false;
      }
      return true;
    },
    shouldUpdate
  );

  return shouldUpdate;
});
