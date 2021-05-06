import React, { FC } from 'react';
import { TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { mix, mixColor } from 'react-native-redash';
import { useTheme } from '@shopify/restyle';

import { Theme } from '../config/theme';
import Icon from '../icon';
import { MainButtonProps } from './type';

const MainButton: FC<MainButtonProps> = ({
  size,
  progress,
  buttonColor,
  btnOutRange,
  zIndex,
  onPress,
  onLongPress,
  outRangeScale,
  renderIcon,
}) => {
  const theme = useTheme<Theme>();

  const wrapperStyle = useAnimatedStyle(() => ({
    zIndex,
    width: size,
    height: size,
    borderRadius: size / 2,
    backgroundColor: mixColor(progress.value, buttonColor, btnOutRange || buttonColor),
  }));

  const buttonStyle: StyleProp<ViewStyle> = {
    width: size,
    height: size,
    borderRadius: size / 2,
    alignItems: 'center',
    justifyContent: 'center',
  };

  const style = useAnimatedStyle(() => ({
    transform: [
      {
        scale: mix(progress.value, 1, outRangeScale),
      },
      {
        rotateZ: `${mix(progress.value, 0, 135)}deg`,
      },
    ],
  }));

  return (
    <Animated.View style={wrapperStyle}>
      <Animated.View style={[buttonStyle, style]}>
        <TouchableOpacity style={buttonStyle} activeOpacity={0.8} onPress={onPress} onLongPress={onLongPress}>
          {renderIcon ? renderIcon : <Icon name="plus" color={theme.colors.floatbutton_icon} size={size / 2} />}
        </TouchableOpacity>
      </Animated.View>
    </Animated.View>
  );
};

export default MainButton;
