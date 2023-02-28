import React, { memo } from 'react';
import { StyleSheet, Text } from 'react-native';
import Animated, { Extrapolate, interpolate, useAnimatedStyle } from 'react-native-reanimated';

import { WhellPickerItemProps } from './type';

const opacityFunction = (val: number) => 1 / (1 + Math.abs(val));
const scaleFunction = (val: number) => 1 - 0.1 * Math.abs(val);
const rotationFunction = (val: number) => 20 * val;

function WheelPickerItem({ textStyle, style, height, option, index, currentIndex }: WhellPickerItemProps) {
  const relativeScrollIndex = index - currentIndex - 2;
  const inputRange = [0];
  for (let i = 1; i <= 2; i++) {
    inputRange.unshift(-i);
    inputRange.push(i);
  }

  const opacityOutputRange = [1];
  for (let x = 1; x <= 2; x++) {
    const y = opacityFunction(x);
    opacityOutputRange.unshift(y);
    opacityOutputRange.push(y);
  }

  const scaleOutputRange = [1.0];
  for (let x = 1; x <= 2; x++) {
    const y = scaleFunction(x);
    scaleOutputRange.unshift(y);
    scaleOutputRange.push(y);
  }

  const rotateXOutputRange = [0];
  for (let x = 1; x <= 2; x++) {
    const y = rotationFunction(x);
    rotateXOutputRange.unshift(y);
    rotateXOutputRange.push(y);
  }

  const opacity = interpolate(relativeScrollIndex, inputRange, opacityOutputRange, Extrapolate.CLAMP);
  const scale = interpolate(relativeScrollIndex, inputRange, scaleOutputRange, Extrapolate.CLAMP);
  const rotateX = interpolate(relativeScrollIndex, inputRange, rotateXOutputRange, Extrapolate.CLAMP);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity,
      transform: [
        {
          scale,
        },
        {
          perspective: 500,
        },
        {
          rotateX: `${rotateX}deg`,
        },
      ],
    };
  });

  return (
    <Animated.View style={[styles.option, style, { height }, animatedStyle]}>
      {option && <Text style={textStyle}>{option.label}</Text>}
    </Animated.View>
  );
}

export default memo(WheelPickerItem);

const styles = StyleSheet.create({
  option: {
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
  },
});
