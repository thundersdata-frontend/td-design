import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import TopTabBar from './components/TopTabBar';
import { Route, TabBarProps } from './type';

import { useTheme, Theme, helpers } from '@td-design/react-native';
const { px } = helpers;

export default function TabBar({
  state,
  navigation,
  descriptors,
  activeTintColor,
  inactiveTintColor,
  showIcon,
  showLabel,
  showBadge,
  iconStyle,
  labelStyle,
  indicatorStyle,
  badgeStyle,
  style,
  ...rest
}: TabBarProps) {
  const theme = useTheme<Theme>();

  return (
    <TopTabBar
      {...rest}
      navigationState={state}
      activeColor={activeTintColor}
      inactiveColor={inactiveTintColor}
      indicatorStyle={indicatorStyle}
      style={[{ backgroundColor: theme.colors.tabs_background }, style]}
      onTabPress={({ route, preventDefault }) => {
        const event = navigation.emit({
          type: 'tabPress',
          target: route.key,
          canPreventDefault: true,
        });

        if (event.defaultPrevented) {
          preventDefault();
        }
      }}
      renderBadge={({ route }: { route: Route }) => {
        if (!showBadge) return null;

        const options = descriptors[route.key].options as any;

        if (options.badge) {
          return <Text style={[styles.badge, badgeStyle]}>{options.badge}</Text>;
        }
        return null;
      }}
      renderIcon={({ route, focused, color }: { route: Route; focused: boolean; color: string }) => {
        if (!showIcon) return null;

        const { options } = descriptors[route.key];
        if (options.tabBarIcon !== undefined) {
          const icon = options.tabBarIcon({ focused, color });
          return <View style={[styles.icon, iconStyle]}>{icon}</View>;
        }
        return null;
      }}
      renderLabel={({ route, focused, color }: { route: Route; focused: boolean; color: string }) => {
        if (!showLabel) return null;

        const { name } = route;
        const {
          options: { tabBarLabel, title },
        } = descriptors[route.key];
        if (tabBarLabel !== undefined) {
          const label = typeof tabBarLabel === 'string' ? tabBarLabel : tabBarLabel({ focused, color });
          return <Text style={[styles.label, { color }, labelStyle]}>{label}</Text>;
        }
        return <Text style={[styles.label, { color }, labelStyle]}>{title ?? name}</Text>;
      }}
    />
  );
}

const styles = StyleSheet.create({
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    textAlign: 'center',
    textTransform: 'uppercase',
    fontSize: px(12),
    marginHorizontal: px(4),
    backgroundColor: 'transparent',
  },
  badge: {
    color: '#fff',
    fontSize: px(12),
  },
});
