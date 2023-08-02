import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

import { Text, Theme, useTheme } from '@td-design/react-native';

import { DAY_WIDTH } from '../../constant';
import { DayProps } from '../../type';

const Day: React.FC<DayProps> = ({ state, date, onPress, marking = {}, activeOpacity, children }) => {
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
      marginVertical: theme.spacing.x2,
    },
    selected: {
      backgroundColor: selectedColor || theme.colors.primary200,
      borderRadius: theme.borderRadii.x1,
    },
    dot: {
      backgroundColor: dotColor,
      width: theme.borderRadii.x1,
      height: theme.borderRadii.x1,
      borderRadius: theme.borderRadii.x1,
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
      activeOpacity={activeOpacity}
      style={StyleSheet.flatten([styles.container, selected && styles.selected])}
      onPress={handlePress}
    >
      <Text variant="p1" color={color}>
        {String(children)}
      </Text>
      <Svg height={theme.borderRadii.x2} width={theme.borderRadii.x2}>
        <Circle
          cx={theme.borderRadii.x1}
          cy={theme.borderRadii.x1}
          r={theme.borderRadii.x1}
          fill={dotColor ?? 'transparent'}
        />
      </Svg>
    </TouchableOpacity>
  );
};

export default React.memo(Day);
