import React from 'react';
import { Pressable } from 'react-native';
import Animated from 'react-native-reanimated';

import { helpers, Theme, useTheme } from '@td-design/react-native';

import { TabBarItemProps } from './type';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function TabBarItem({ title, style, labelStyle, onPress, onLayout }: TabBarItemProps) {
  const theme = useTheme<Theme>();

  const renderText = () => {
    if (typeof title === 'string')
      return (
        <Animated.Text style={[{ fontSize: helpers.px(16), color: theme.colors.black }, labelStyle]}>
          {title}
        </Animated.Text>
      );

    return title();
  };

  return (
    <AnimatedPressable
      style={[
        { paddingHorizontal: theme.spacing.x2, height: '100%', alignItems: 'center', justifyContent: 'center' },
        style,
      ]}
      onPress={onPress}
      onLayout={onLayout}
    >
      {renderText()}
    </AnimatedPressable>
  );
}
