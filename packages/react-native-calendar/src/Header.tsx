import React from 'react';
import { View, TouchableOpacity, ViewStyle } from 'react-native';
import { useTheme } from '@shopify/restyle';
import { Theme, Flex, Text, SvgIcon, helpers } from '@td-design/react-native';
import dayjs from 'dayjs';
import { WEEK_DAY_NAMES } from './constant';
import { dateFormat } from './dateUtils';
import { ArrowDirection, CalendarHeaderProps, CalendarHeaderControlProps } from './type';

const { px, ONE_PIXEL } = helpers;

const CalendarHeader: React.FC<CalendarHeaderProps & CalendarHeaderControlProps> = ({
  month = dayjs(),
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
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => handlePress(direction)}
        style={[{ padding: px(10) }, style]}
        hitSlop={{ left: 10, right: 10, top: 20, bottom: 20 }}
      >
        <SvgIcon name={direction} color={theme.colors.icon} />
      </TouchableOpacity>
    );
  };

  const renderDayNames = () => {
    let _dayNames = WEEK_DAY_NAMES;
    if (firstDay) {
      _dayNames = WEEK_DAY_NAMES.slice(firstDay).concat(_dayNames.slice(0, firstDay));
    }

    return (
      <Flex style={dayNamesStyle} marginVertical="x3" justifyContent="space-around">
        {_dayNames.map((day, idx) => (
          <Text key={idx} variant="p1" color="gray500" numberOfLines={1}>
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
        <TouchableOpacity
          activeOpacity={0.5}
          style={{ flexDirection: 'row', alignItems: 'center' }}
          onPress={() => handlePress(showDown ? 'down' : 'up')}
        >
          <Text variant="p1" color="gray500">
            {month.format(monthFormat)}
          </Text>
          <SvgIcon name={showDown ? 'down' : 'up'} color={theme.colors.icon} />
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
