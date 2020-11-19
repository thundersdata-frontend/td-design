import React, { FC } from 'react';
import { TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import Animated, { interpolate } from 'react-native-reanimated';
import { interpolateColor } from 'react-native-redash/lib/module/v1';
import Icon from '../icon';
import { MainButtonProps } from './type';

const MainButton: FC<MainButtonProps> = ({
  size,
  animation,
  buttonColor,
  btnOutRange,
  zIndex,
  onPress,
  onLongPress,
  outRangeScale,
  renderIcon,
}) => {
  const wrapperStyle: StyleProp<Animated.AnimateStyle<ViewStyle>> = {
    zIndex,
    width: size,
    height: size,
    borderRadius: size / 2,
    backgroundColor: (interpolateColor(animation, {
      inputRange: [0, 1],
      outputRange: [buttonColor, btnOutRange || buttonColor],
    }) as any) as Animated.Node<string>,
  };

  const buttonStyle: StyleProp<ViewStyle> = {
    width: size,
    height: size,
    borderRadius: size / 2,
    alignItems: 'center',
    justifyContent: 'center',
  };

  return (
    <Animated.View style={wrapperStyle}>
      <Animated.View
        style={[
          buttonStyle,
          {
            transform: [
              {
                scale: interpolate(animation, {
                  inputRange: [0, 1],
                  outputRange: [1, outRangeScale],
                }),
              },
              {
                rotate: interpolate(animation, {
                  inputRange: [0, 1],
                  outputRange: ['0deg', '135deg'],
                }),
              },
            ],
          },
        ]}
      >
        <TouchableOpacity style={buttonStyle} activeOpacity={0.8} onPress={onPress} onLongPress={onLongPress}>
          {renderIcon ? renderIcon : <Icon name="plus" color="#fff" size={size / 2} />}
        </TouchableOpacity>
      </Animated.View>
    </Animated.View>
  );
};

export default MainButton;
