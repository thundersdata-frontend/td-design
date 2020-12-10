import { useTheme } from '@shopify/restyle';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Theme } from '../config/theme';
import { DotProps } from './type';
import Text from '../text';
import { px } from '../helper';

const Dot: React.FC<DotProps> = props => {
  const { state, date, onPress, marking = {}, children } = props;

  const theme = useTheme<Theme>();
  const { fontFamily, fontSize } = theme.textVariants.primaryNumber;

  const handlePress = () => {
    if (!isDisabled) {
      onPress(date);
    }
  };

  const { dotColor, selected, disabled, selectedColor, textColor } = marking;

  const isDisabled = state === 'disabled' || disabled;
  const isToday = state === 'today';
  const isOtherMonth = state === 'otherMonth';

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[
        { width: px(40), height: px(40), alignItems: 'center', justifyContent: 'center' },
        selected && { backgroundColor: selectedColor || theme.colors.primaryColor, borderRadius: px(4) },
      ]}
      onPress={handlePress}
    >
      <Text
        style={[
          { fontFamily, fontSize, color: textColor || theme.colors.black },
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

export default React.memo(Dot);
