import React, { useRef } from 'react';
import Animated, { useValue } from 'react-native-reanimated';
import { useTheme } from '@shopify/restyle';

import { deviceWidth, ONE_PIXEL } from '../../helper';
import { Theme } from '../../config/theme';
import TabBarItem from './TabBarItem';
import TabBarIndicator from './TabBarIndicator';
import { Route, Scene, Event, TopTabBarProps } from '../type';

export default function TopTabBar<T extends Route>(props: TopTabBarProps<T>) {
  const theme = useTheme<Theme>();
  const scrollAmount = useValue(0);
  const scrollViewRef = useRef<Animated.ScrollView>(null);
  // 每个tab项的显示文本（包括icon）的宽度，会传给Indicator组件
  const measuredTabWidths = useRef<{ [key: string]: number }>({});

  const {
    position,
    navigationState,
    jumpTo,
    renderBadge,
    renderIcon,
    renderLabel,
    activeColor,
    inactiveColor,
    pressOpacity,
    onTabPress,
    tabStyle,
    contentContainerStyle,
    style,
    indicatorStyle,
    indicatorContainerStyle,
  } = props;
  const { routes } = navigationState;

  return (
    <Animated.View style={[{ borderBottomWidth: ONE_PIXEL, borderColor: theme.colors.borderColor }, style]}>
      <Animated.ScrollView
        horizontal
        accessibilityRole="tablist"
        keyboardShouldPersistTaps="handled"
        scrollEnabled={false}
        bounces={false}
        alwaysBounceHorizontal={false}
        scrollsToTop={false}
        showsHorizontalScrollIndicator={false}
        automaticallyAdjustContentInsets={false}
        overScrollMode="never"
        contentContainerStyle={[
          {
            flex: 1,
            flexDirection: 'row',
            flexWrap: 'nowrap',
          },
          contentContainerStyle,
        ]}
        scrollEventThrottle={16}
        onScroll={Animated.event([
          {
            nativeEvent: {
              contentOffset: { x: scrollAmount },
            },
          },
        ])}
        ref={scrollViewRef}
      >
        {routes.map((route: T) => {
          return (
            <TabBarItem
              key={route.key}
              {...{
                position,
                route,
                navigationState,
                renderBadge,
                renderIcon,
                renderLabel,
                activeColor,
                inactiveColor,
                pressOpacity,
                onLayout: e => {
                  measuredTabWidths.current[route.key] = e.nativeEvent.layout.width;
                },
                onPress: () => {
                  const event: Scene<T> & Event = {
                    route,
                    defaultPrevented: false,
                    preventDefault: () => {
                      event.defaultPrevented = true;
                    },
                  };

                  onTabPress?.(event);

                  if (event.defaultPrevented) {
                    return;
                  }

                  props.jumpTo(route.key);
                },
                style: tabStyle,
              }}
            />
          );
        })}
      </Animated.ScrollView>
      <TabBarIndicator
        {...{
          position,
          navigationState,
          jumpTo,
          width: deviceWidth / routes.length,
          tabItemWidths: measuredTabWidths.current,
          indicatorStyle,
          indicatorContainerStyle,
        }}
      />
    </Animated.View>
  );
}
