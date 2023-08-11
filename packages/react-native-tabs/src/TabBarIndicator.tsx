import React from 'react';
import { StyleSheet } from 'react-native';
import Animated, { interpolate, useAnimatedStyle } from 'react-native-reanimated';

import { TabBarIndicatorProps } from './type';

export default function TabBarIndicator({ style, scrollX, inputRange, scrollRange, tabWidths }: TabBarIndicatorProps) {
  const styles = StyleSheet.create({
    indicator: {
      position: 'absolute',
      left: 0,
      bottom: 0,
      width: 36,
      height: style.height,
      borderRadius: style.borderRadius,
      backgroundColor: style.color,
    },
  });

  const animatedStyles = useAnimatedStyle(() => {
    const translateX = interpolate(scrollX.value, inputRange, scrollRange);
    const width = interpolate(scrollX.value, inputRange, tabWidths);

    return {
      width,
      transform: [{ translateX }],
    };
  });

  return <Animated.View style={[styles.indicator, animatedStyles]} />;
}
