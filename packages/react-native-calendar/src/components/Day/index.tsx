import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

import { helpers, Text, Theme, useTheme } from '@td-design/react-native';

import { DAY_WIDTH } from '../../constant';
import { DayProps } from '../../type';

const { px } = helpers;

const Day: React.FC<DayProps> = ({ state, date, onPress, marking = {}, children }) => {
  const theme = useTheme<Theme>();

  const { dotColor, selected, disabled, selectedColor } = marking;

  const isDisabled = state === 'disabled' || disabled;
  const isToday = state === 'today';
  const isOtherMonth = state === 'otherMonth';

  const handlePress = () => {
    if (!isDisabled) {
      onPress(date);
    }
  };

  const styles = StyleSheet.create({
    container: {
      width: DAY_WIDTH,
      height: DAY_WIDTH,
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: px(8),
    },
    selected: {
      backgroundColor: selectedColor || theme.colors.primary200,
      borderRadius: theme.borderRadii.x1,
    },
    dot: {
      backgroundColor: dotColor,
      width: px(6),
      height: px(6),
      borderRadius: px(6),
    },
  });

  let color: any = 'gray500';
  if (selected) {
    color = 'white';
  } else if (!selected && isToday) {
    color = 'primary200';
  } else if (isDisabled || isOtherMonth) {
    color = 'gray200';
  }

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={StyleSheet.flatten([styles.container, selected && styles.selected])}
      onPress={handlePress}
    >
      <Text variant="p1" color={color}>
        {String(children)}
      </Text>
      <Svg height={px(10)} width={px(10)}>
        <Circle cx={px(5)} cy={px(5)} r={px(4)} fill={dotColor ?? 'transparent'} />
      </Svg>
    </TouchableOpacity>
  );
};

export default React.memo(Day);
