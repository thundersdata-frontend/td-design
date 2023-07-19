import React from 'react';
import { Animated, Pressable } from 'react-native';

import { helpers, Theme, useTheme } from '@td-design/react-native';

import { TabBarItemProps } from './type';

export default function TabBarItem({
  title,
  isActive,
  showIndicator,
  style,
  labelStyle,
  onPress,
  onLayout,
}: TabBarItemProps) {
  const theme = useTheme<Theme>();

  const renderText = () => {
    if (typeof title === 'string')
      return (
        <Animated.Text
          style={[
            { fontSize: helpers.px(16), color: isActive || showIndicator ? theme.colors.black : theme.colors.gray400 },
            labelStyle,
          ]}
        >
          {title}
        </Animated.Text>
      );

    return title(isActive || showIndicator);
  };

  return (
    <Pressable style={[{ paddingHorizontal: theme.spacing.x2 }, style]} onPress={onPress} onLayout={onLayout}>
      {renderText()}
    </Pressable>
  );
}
