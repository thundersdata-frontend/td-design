import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Text, helpers, Theme, useTheme } from '@td-design/react-native';
import { DayProps } from './type';
import { DAY_WIDTH } from './constant';

const { px } = helpers;

const Day: React.FC<DayProps> = ({ state, date, onPress, marking = {}, children }) => {
  const theme = useTheme<Theme>();
  const { fontSize } = theme.textVariants.primaryNumber;

  const { dotColor, selected, disabled, selectedColor, textColor } = marking;

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
      activeOpacity={0.8}
      style={[
        {
          width: DAY_WIDTH,
          height: DAY_WIDTH,
          alignItems: 'center',
          justifyContent: 'center',
          marginVertical: px(6),
        },
        selected && {
          backgroundColor: selectedColor || theme.colors.primaryColor,
          borderRadius: theme.borderRadii.base,
        },
      ]}
      onPress={handlePress}
    >
      <Text
        style={[
          { fontSize, color: textColor || theme.colors.black },
          selected && { color: theme.colors.white },
          !selected && isToday && { color: theme.colors.primaryColor },
          (isDisabled || isOtherMonth) && { color: theme.colors.closedTagColor },
        ]}
      >
        {String(children)}
      </Text>
      <View style={{ backgroundColor: dotColor, width: px(6), height: px(6), borderRadius: px(8) }} />
    </TouchableOpacity>
  );
};

export default React.memo(Day);
