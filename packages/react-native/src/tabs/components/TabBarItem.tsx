import React, { ReactNode, useCallback } from 'react';
import { StyleSheet, View, ViewStyle, TouchableOpacity } from 'react-native';
import Animated, { interpolate } from 'react-native-reanimated';

import { px } from '../../helper';
import { TabBarItemProps, Route } from '../type';

export default function TabBarItem<T extends Route>(props: TabBarItemProps<T>) {
  const {
    route,
    position,
    navigationState: { routes, index },
    renderIcon,
    renderBadge,
    renderLabel,
    activeColor,
    inactiveColor,
    pressOpacity = 0.8,
    style,
    onLayout,
    onPress,
  } = props;

  const tabIndex = routes.indexOf(route);
  const isFocused = index === tabIndex;

  const getActiveOpacity = useCallback(() => {
    if (routes.length > 1) {
      const inputRange = routes.map((_, i) => i);

      return interpolate(position, {
        inputRange,
        outputRange: inputRange.map(i => (i === tabIndex ? 1 : 0)),
      });
    } else {
      return 1;
    }
  }, [position, routes, tabIndex]);

  const getInactiveOpacity = useCallback(() => {
    if (routes.length > 1) {
      const inputRange = routes.map((_: Route, i: number) => i);

      return interpolate(position, {
        inputRange,
        outputRange: inputRange.map((i: number) => (i === tabIndex ? 0 : 1)),
      });
    } else {
      return 0;
    }
  }, [position, routes, tabIndex]);

  const activeOpacity = getActiveOpacity();
  const inactiveOpacity = getInactiveOpacity();

  let icon: ReactNode | null = null;
  let label: ReactNode | null = null;

  if (renderIcon) {
    const activeIcon = renderIcon({
      route,
      focused: true,
      color: activeColor,
    });
    const inactiveIcon = renderIcon({
      route,
      focused: false,
      color: inactiveColor,
    });

    if (inactiveIcon != null && activeIcon != null) {
      icon = (
        <View>
          <Animated.View style={{ opacity: inactiveOpacity }}>{inactiveIcon}</Animated.View>
          <Animated.View style={[StyleSheet.absoluteFill, { opacity: activeOpacity }]}>{activeIcon}</Animated.View>
        </View>
      );
    }
  }

  if (renderLabel) {
    const activeLabel = renderLabel({
      route,
      focused: true,
      color: activeColor,
    });
    const inactiveLabel = renderLabel({
      route,
      focused: false,
      color: inactiveColor,
    });

    label = (
      <View>
        <Animated.View style={{ opacity: inactiveOpacity }}>{inactiveLabel}</Animated.View>
        <Animated.View style={[StyleSheet.absoluteFill, { opacity: activeOpacity }]}>{activeLabel}</Animated.View>
      </View>
    );
  }

  const tabStyle = StyleSheet.flatten(style);
  const isWidthSet = tabStyle?.width !== undefined;
  const tabContainerStyle: ViewStyle | null = isWidthSet ? null : { flex: 1 };

  const badge = renderBadge ? renderBadge({ route }) : null;

  return (
    <TouchableOpacity
      accessibilityRole="tab"
      accessibilityState={{ selected: isFocused }}
      activeOpacity={pressOpacity}
      delayPressIn={0}
      onPress={onPress}
      style={tabContainerStyle}
    >
      <View pointerEvents="none" style={[styles.item, tabStyle]}>
        <View onLayout={onLayout} style={{ flexDirection: 'row', alignItems: 'center' }}>
          {icon}
          {label}
        </View>
        {badge && <View style={styles.badge}>{badge}</View>}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: px(40),
  },
  badge: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: px(20),
    height: px(20),
    borderRadius: px(10),
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
