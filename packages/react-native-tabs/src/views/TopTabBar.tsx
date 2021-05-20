import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Route } from '@react-navigation/native';
import { useTheme } from '@shopify/restyle';
import { Theme, Badge } from '@td-design/react-native';

import type { TopTabBarProps } from '../types';
import TabBar from './TabBar';

export default function TabBarTop({ state, navigation, descriptors, ...rest }: TopTabBarProps) {
  const theme = useTheme<Theme>();

  const focusedOptions = descriptors[state.routes[state.index].key].options;
  const activeColor = focusedOptions.tabBarActiveTintColor ?? theme.colors.tabs_tint_active;
  const inactiveColor = focusedOptions.tabBarInactiveTintColor ?? theme.colors.tabs_tint_inactive;

  return (
    <TabBar
      {...rest}
      navigationState={state}
      scrollEnabled={focusedOptions.tabBarScrollEnabled}
      bounces={focusedOptions.tabBarBounces}
      activeColor={activeColor}
      inactiveColor={inactiveColor}
      pressOpacity={focusedOptions.tabBarPressOpacity}
      tabStyle={focusedOptions.tabBarItemStyle}
      indicatorStyle={[
        { backgroundColor: theme.colors.tabs_background_indicator },
        focusedOptions.tabBarIndicatorStyle,
      ]}
      indicatorContainerStyle={focusedOptions.tabBarIndicatorContainerStyle}
      contentContainerStyle={focusedOptions.tabBarContentContainerStyle}
      style={[{ backgroundColor: theme.colors.tabs_background }, focusedOptions.tabBarStyle]}
      getAccessibilityLabel={({ route }) => descriptors[route.key].options.tabBarAccessibilityLabel}
      getTestID={({ route }) => descriptors[route.key].options.tabBarTestID}
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
      onTabLongPress={({ route }) =>
        navigation.emit({
          type: 'tabLongPress',
          target: route.key,
        })
      }
      renderIcon={({ route, focused, color }) => {
        const { options } = descriptors[route.key];

        if (options.tabBarShowIcon === false) {
          return null;
        }

        if (options.tabBarIcon !== undefined) {
          const icon = options.tabBarIcon({ focused, color });

          return <View style={[styles.icon, options.tabBarIconStyle]}>{icon}</View>;
        }

        return null;
      }}
      renderLabel={({ route, focused, color }) => {
        const { options } = descriptors[route.key];

        if (options.tabBarShowLabel === false) {
          return null;
        }

        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : (route as Route<string>).name;

        if (typeof label === 'string') {
          return (
            <Text
              style={[styles.label, { color }, options.tabBarLabelStyle]}
              allowFontScaling={options.tabBarAllowFontScaling}
            >
              {label}
            </Text>
          );
        }

        return label({ focused, color });
      }}
      renderBadge={({ route }) => {
        const { options } = descriptors[route.key];
        if (options.badge) return <Badge text={`${options.badge}`} />;
        return null;
      }}
    />
  );
}

const styles = StyleSheet.create({
  icon: {
    height: 24,
    width: 24,
  },
  label: {
    textAlign: 'center',
    textTransform: 'uppercase',
    fontSize: 13,
    margin: 4,
    backgroundColor: 'transparent',
  },
});
