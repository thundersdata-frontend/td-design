import * as React from 'react';
import { Animated, StyleSheet, View, StyleProp, LayoutChangeEvent, TextStyle, ViewStyle } from 'react-native';
import { Route, NavigationState } from 'react-native-tab-view';
import { useTheme } from '@shopify/restyle';
import { Theme, Flex } from '@td-design/react-native';

import PlatformPressable from './PlatformPressable';
import { Scene } from '../types';

export type Props<T extends Route> = {
  position: Animated.AnimatedInterpolation;
  route: T;
  navigationState: NavigationState<T>;
  activeColor?: string;
  inactiveColor?: string;
  pressColor?: string;
  pressOpacity?: number;
  getLabelText: (scene: Scene<T>) => string | undefined;
  getAccessible: (scene: Scene<T>) => boolean | undefined;
  getAccessibilityLabel: (scene: Scene<T>) => string | undefined;
  getTestID: (scene: Scene<T>) => string | undefined;
  renderLabel?: (scene: { route: T; focused: boolean; color: string }) => React.ReactNode;
  renderIcon?: (scene: { route: T; focused: boolean; color: string }) => React.ReactNode;
  renderBadge?: (scene: Scene<T>) => React.ReactNode;
  onLayout?: (event: LayoutChangeEvent) => void;
  onPress: () => void;
  onLongPress: () => void;
  labelStyle?: StyleProp<TextStyle>;
  style: StyleProp<ViewStyle>;
};

export default function TabBarItem<T extends Route>(props: Props<T>) {
  const getActiveOpacity = (position: Animated.AnimatedInterpolation, routes: Route[], tabIndex: number) => {
    if (routes.length > 1) {
      const inputRange = routes.map((_, i) => i);

      return position.interpolate({
        inputRange,
        outputRange: inputRange.map(i => (i === tabIndex ? 1 : 0)),
      });
    } else {
      return 1;
    }
  };

  const getInactiveOpacity = (position: Animated.AnimatedInterpolation, routes: Route[], tabIndex: number) => {
    if (routes.length > 1) {
      const inputRange = routes.map((_: Route, i: number) => i);

      return position.interpolate({
        inputRange,
        outputRange: inputRange.map((i: number) => (i === tabIndex ? 0 : 1)),
      });
    } else {
      return 0;
    }
  };

  const theme = useTheme<Theme>();

  const {
    route,
    position,
    navigationState,
    renderLabel: renderLabelPassed,
    renderIcon,
    renderBadge,
    getLabelText,
    getTestID,
    getAccessibilityLabel,
    getAccessible,
    activeColor = theme.colors.gray500,
    inactiveColor = theme.colors.gray400,
    pressColor,
    pressOpacity,
    labelStyle,
    style,
    onLayout,
    onPress,
    onLongPress,
  } = props;

  const tabIndex = navigationState.routes.indexOf(route);
  const isFocused = navigationState.index === tabIndex;

  const activeOpacity = getActiveOpacity(position, navigationState.routes, tabIndex);
  const inactiveOpacity = getInactiveOpacity(position, navigationState.routes, tabIndex);

  let icon: React.ReactNode | null = null;
  let label: React.ReactNode | null = null;

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

  const renderLabel =
    renderLabelPassed !== undefined
      ? renderLabelPassed
      : ({ route, color }: { route: T; color: string }) => {
          const labelText = getLabelText({ route });

          if (typeof labelText === 'string') {
            return (
              <Animated.Text style={[styles.label, icon ? { marginTop: 0 } : null, labelStyle, { color }]}>
                {labelText}
              </Animated.Text>
            );
          }

          return labelText;
        };

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

  const scene = { route };

  let accessibilityLabel = getAccessibilityLabel(scene);

  accessibilityLabel = typeof accessibilityLabel !== 'undefined' ? accessibilityLabel : getLabelText(scene);

  const badge = renderBadge ? renderBadge(scene) : null;

  return (
    <PlatformPressable
      android_ripple={{ borderless: true }}
      testID={getTestID(scene)}
      accessible={getAccessible(scene)}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="tab"
      accessibilityState={{ selected: isFocused }}
      // @ts-ignore: this is to support older React Native versions
      accessibilityStates={isFocused ? ['selected'] : []}
      pressColor={pressColor}
      pressOpacity={pressOpacity}
      delayPressIn={0}
      onLayout={onLayout}
      onPress={onPress}
      onLongPress={onLongPress}
      style={tabContainerStyle}
    >
      <Flex justifyContent="center" alignItems="center" minHeight={48} style={tabStyle}>
        {icon}
        {label}
        {badge != null ? <View style={styles.badge}>{badge}</View> : null}
      </Flex>
    </PlatformPressable>
  );
}

const styles = StyleSheet.create({
  label: {
    margin: 4,
    backgroundColor: 'transparent',
  },
  badge: {
    position: 'absolute',
    top: 12,
    right: 12,
  },
});
