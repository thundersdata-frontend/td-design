import { useTheme } from '@shopify/restyle';
import React from 'react';
import Animated, { interpolate, Extrapolate } from 'react-native-reanimated';

import { Theme } from '../../config/theme';
import { Route, TabBarIndicatorProps } from '../type';

export type GetTabWidth = (index: number) => number;

export default function TabBarIndicator<T extends Route>({
  width,
  navigationState: { routes },
  indicatorStyle,
  indicatorContainerStyle,
  position,
  tabItemWidths,
}: TabBarIndicatorProps<T>) {
  const theme = useTheme<Theme>();

  const translateX =
    routes.length > 1
      ? interpolate(position, {
          inputRange: routes.map((_, i) => i),
          outputRange: routes.reduce<number[]>((acc, _, i) => {
            if (i === 0) return [0];
            return [...acc, acc[i - 1] + width];
          }, []),
          extrapolate: Extrapolate.CLAMP,
        })
      : 0;

  const tabItemLabelWidth = interpolate(position, {
    inputRange: routes.map((_, i) => i),
    outputRange: routes.reduce<number[]>((acc, curr) => {
      return [...acc, tabItemWidths[curr.key]];
    }, []),
    extrapolate: Extrapolate.CLAMP,
  });

  return (
    <Animated.View
      style={[
        {
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          left: 0,
          bottom: 0,
          right: 0,
          height: 2,
          width,
          transform: [{ translateX }],
        },
        indicatorContainerStyle,
      ]}
    >
      <Animated.View
        style={[{ width: tabItemLabelWidth, height: 2, backgroundColor: theme.colors.primaryColor }, indicatorStyle]}
      />
    </Animated.View>
  );
}
