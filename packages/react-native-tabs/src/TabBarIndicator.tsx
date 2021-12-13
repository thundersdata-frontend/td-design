import React from 'react';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';

import { TabBarIndicatorProps } from './type';

export default function TabBarIndicator({ measures = [], currentIndex = 0, indicatorStyle }: TabBarIndicatorProps) {
  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: withTiming(measures[currentIndex].width),
      left: withTiming(measures[currentIndex].left),
    };
  });
  return (
    <Animated.View
      style={[
        { height: 4, backgroundColor: '#000', borderRadius: 2, position: 'absolute', bottom: 0 },
        indicatorStyle,
        animatedStyle,
      ]}
    />
  );
}
