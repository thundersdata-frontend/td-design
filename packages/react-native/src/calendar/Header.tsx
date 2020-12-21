import React from 'react';
import { View, TouchableOpacity, ViewStyle } from 'react-native';
import { useTheme } from '@shopify/restyle';
import dayjs from 'dayjs';
import { Theme } from '../config/theme';
import { px, ONE_PIXEL } from '../helper';
import Text from '../text';
import Flex from '../flex';
import Icon from '../icon';
import { ArrowDirection, CalendarHeaderProps, weekDaysNames } from './type';

const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  month = dayjs(),
  addMonth,
  monthFormat = 'YYYY年MM月',
  firstDay,
  showDown = true,
  headerStyle,
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
        hitSlop={{ left: 20, right: 20, top: 20, bottom: 20 }}
      >
        <Icon name={direction} color={theme.colors.secondaryTextColor} />
      </TouchableOpacity>
    );
  };

  const renderDayNames = () => {
    let _dayNames = weekDaysNames;
    if (firstDay) {
      _dayNames = weekDaysNames.slice(firstDay).concat(_dayNames.slice(0, firstDay));
    }

    return (
      <Flex style={{ marginTop: px(8) }} justifyContent="space-around">
        {_dayNames.map((day, idx) => (
          <Text key={idx} variant="secondaryBody" numberOfLines={1}>
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
        style={[
          {
            paddingVertical: px(6),
            borderBottomColor: theme.colors.borderColor,
            borderBottomWidth: ONE_PIXEL,
          },
          headerStyle,
        ]}
      >
        <TouchableOpacity activeOpacity={0.8} style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text variant="secondaryBody">{month.format(monthFormat)}</Text>
          {showArrowLeft && renderArrow(showDown ? 'down' : 'up', { paddingHorizontal: 0 })}
        </TouchableOpacity>
        <Flex>
          {showArrowLeft && renderArrow('left')}
          {showArrowRight && renderArrow('right')}
        </Flex>
      </Flex>
      {renderDayNames()}
    </View>
  );
};

export default CalendarHeader;
