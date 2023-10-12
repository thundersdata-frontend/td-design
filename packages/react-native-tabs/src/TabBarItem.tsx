import React, { memo } from 'react';
import { Animated, Pressable, StyleProp, TextStyle, ViewProps, ViewStyle } from 'react-native';

import { helpers, Theme, useTheme } from '@td-design/react-native';

interface TabBarItemProps {
  title: string;
  onPress?: () => void;
  onLayout: ViewProps['onLayout'];
  style?: StyleProp<ViewStyle>;
  labelStyle?: Animated.WithAnimatedObject<TextStyle> | Animated.WithAnimatedArray<StyleProp<TextStyle>>;
}

const TabBarItem = ({ style, labelStyle, title, onLayout, onPress }: TabBarItemProps) => {
  const theme = useTheme<Theme>();

  return (
    <Pressable
      onLayout={onLayout}
      onPress={onPress}
      style={[
        {
          paddingHorizontal: theme.spacing.x2,
          minWidth: 24,
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        },
        style,
      ]}
    >
      <Animated.Text style={[{ fontSize: helpers.px(16), color: theme.colors.black }, labelStyle]}>
        {title}
      </Animated.Text>
    </Pressable>
  );
};

export default memo(TabBarItem);
