import React, { memo } from 'react';
import { Animated, StyleSheet } from 'react-native';

import { WhellPickerItemProps } from './type';

const opacityFunction = (val: number) => 1 / (1 + Math.abs(val));
const scaleFunction = (val: number) => 1 - 0.1 * Math.abs(val);
const rotationFunction = (val: number) => 20 * val;

function WheelPickerItem({ textStyle, style, visibleRest, height, option, index, currentIndex }: WhellPickerItemProps) {
  const relativeScrollIndex = Animated.subtract(index, currentIndex);

  const inputRange = [0];
  for (let i = 1; i <= visibleRest + 1; i++) {
    inputRange.unshift(-i);
    inputRange.push(i);
  }

  const opacityOutputRange = [1];
  for (let x = 1; x <= visibleRest + 1; x++) {
    const y = opacityFunction(x);
    opacityOutputRange.unshift(y);
    opacityOutputRange.push(y);
  }

  const scaleOutputRange = [1.3];
  for (let x = 1; x <= visibleRest + 1; x++) {
    const y = scaleFunction(x);
    scaleOutputRange.unshift(y);
    scaleOutputRange.push(y);
  }

  const rotateXOutputRange = ['0deg'];
  for (let x = 1; x <= visibleRest + 1; x++) {
    const y = rotationFunction(x);
    rotateXOutputRange.unshift(`${y}deg`);
    rotateXOutputRange.push(`${y}deg`);
  }

  const opacity = relativeScrollIndex.interpolate({ inputRange, outputRange: opacityOutputRange });
  const scale = relativeScrollIndex.interpolate({ inputRange, outputRange: scaleOutputRange });
  const rotateX = relativeScrollIndex.interpolate({ inputRange, outputRange: rotateXOutputRange });

  const styles = StyleSheet.create({
    option: {
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 100,
      height,
    },
  });

  return (
    <Animated.View style={[styles.option, style, { opacity, transform: [{ rotateX }, { scale }] }]}>
      <Animated.Text style={[{ fontWeight: 'bold' }, textStyle]}>{option?.label}</Animated.Text>
    </Animated.View>
  );
}

export default memo(WheelPickerItem);
