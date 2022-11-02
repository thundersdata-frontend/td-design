import { useTheme } from '@shopify/restyle';
import { helpers, Text, Theme } from '@td-design/react-native';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';

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

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={[
        {
          width: DAY_WIDTH,
          height: DAY_WIDTH,
          alignItems: 'center',
          justifyContent: 'center',
          marginVertical: px(8),
        },
        selected && {
          backgroundColor: selectedColor || theme.colors.primary200,
          borderRadius: theme.borderRadii.x1,
        },
      ]}
      onPress={handlePress}
    >
      <Text
        variant="p1"
        color="gray500"
        style={[
          selected && { color: theme.colors.white },
          !selected && isToday && { color: theme.colors.primary200 },
          (isDisabled || isOtherMonth) && { color: theme.colors.gray200 },
        ]}
      >
        {String(children)}
      </Text>
      <View style={{ backgroundColor: dotColor, width: px(6), height: px(6), borderRadius: px(8) }} />
    </TouchableOpacity>
  );
};

export default React.memo(Day);
