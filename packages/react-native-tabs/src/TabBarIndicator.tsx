import React, { memo } from 'react';
import { Animated, StyleProp, StyleSheet, ViewStyle } from 'react-native';

import { Theme, useTheme } from '@td-design/react-native';

function TabBarIndicator({
  style,
  scrollX,
}: {
  style: StyleProp<ViewStyle>;
  scrollX: Animated.AnimatedInterpolation<number>;
}) {
  const theme = useTheme<Theme>();

  return (
    <Animated.View
      key="indicator"
      style={[
        { backgroundColor: theme.colors.primary200 },
        styles.indicator,
        style,
        { transform: [{ translateX: scrollX }] },
      ]}
    />
  );
}

export default memo(TabBarIndicator);

const styles = StyleSheet.create({
  indicator: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    height: 4,
    borderRadius: 2,
  },
});
