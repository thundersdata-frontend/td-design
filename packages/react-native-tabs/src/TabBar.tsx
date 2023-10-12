import React, { useEffect, useMemo, useRef } from 'react';
import {
  Animated,
  LayoutChangeEvent,
  LayoutRectangle,
  Platform,
  StyleProp,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from 'react-native';

import { Flex, helpers } from '@td-design/react-native';
import { useMemoizedFn, useSafeState } from '@td-design/rn-hooks';

import TabBarIndicator from './TabBarIndicator';
import TabBarItem from './TabBarItem';

const { ONE_PIXEL, deviceWidth } = helpers;

export interface TabBarProps {
  tabs: string[];
  height?: number;
  onTabPress: (index: number) => void;
  onTabsLayout?: (layouts: LayoutRectangle[]) => void;
  page: number;
  position: Animated.Value;
  offset: Animated.Value;
  isIdle: boolean;
  showIndicator?: boolean;
  scrollState: 'idle' | 'dragging' | 'settling';
  tabStyle?: StyleProp<ViewStyle>;
  tabItemStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  indicatorStyle?: StyleProp<ViewStyle>;
}

export default function TabBar({
  tabs,
  onTabPress,
  onTabsLayout,
  height,
  position,
  offset,
  page,
  isIdle,
  scrollState,
  showIndicator = true,
  tabStyle,
  tabItemStyle,
  labelStyle,
  indicatorStyle,
}: TabBarProps) {
  const layouts = useRef<LayoutRectangle[]>([]);
  const indicatorWidth = getIndicatorWidth(indicatorStyle);

  const inputRange = useMemo(() => tabs.map((_, i) => i), [tabs]);
  const [outputRange, setOutputRange] = useSafeState(inputRange.map(() => 0));

  const offsetPosition = Animated.add(position, offset);

  const scrollX = offsetPosition.interpolate({
    inputRange,
    outputRange,
    extrapolate: 'clamp',
  });

  const lastPage = useLastPage(page, isIdle);
  const interactive = useInteractive(scrollState);

  const handleTabPress = useMemoizedFn((index: number) => {
    if (isIdle) {
      onTabPress(index);
    }
  });

  const handleTabLayout = useMemoizedFn((e: LayoutChangeEvent, index: number) => {
    layouts.current[index] = e.nativeEvent.layout;

    const length = layouts.current.filter(layout => layout.width > 0).length;
    if (length !== tabs.length) return;

    const range: number[] = [];
    for (let index = 0; index < length; index++) {
      const layout = layouts.current[index];

      // 指示器要和当前Tab垂直居中对齐
      const tabCenterX = layout.x + layout.width / 2;
      const indicatorX = tabCenterX - indicatorWidth / 2;
      range.push(indicatorX);
    }

    setOutputRange(range);
    onTabsLayout?.(layouts.current);
  });

  return (
    <Flex
      minWidth={deviceWidth}
      height={height}
      justifyContent={'space-evenly'}
      alignItems={'center'}
      backgroundColor={'white'}
      borderBottomColor={'border'}
      borderBottomWidth={ONE_PIXEL}
      style={tabStyle}
    >
      {tabs.map((tab, index) => {
        const enhanced = interactive || index === page || index === lastPage;

        let scale = offsetPosition.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [1, enhanced ? 1.2 : 1, 1],
          extrapolate: 'clamp',
        });

        let opacity = offsetPosition.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [0.8, enhanced ? 1 : 0.8, 0.8],
          extrapolate: 'clamp',
        });

        if (Platform.OS === 'ios' && Math.abs(page - lastPage) > 1 && index === lastPage) {
          scale = offsetPosition.interpolate({
            inputRange: [page - 1, page, page + 1],
            outputRange: [1.2, 1, 1.2],
            extrapolate: 'clamp',
          });

          opacity = offsetPosition.interpolate({
            inputRange: [page - 1, page, page + 1],
            outputRange: [1, 0.8, 1],
            extrapolate: 'clamp',
          });
        }

        return (
          <TabBarItem
            key={tab}
            title={tab}
            onPress={() => handleTabPress(index)}
            onLayout={e => handleTabLayout(e, index)}
            style={tabItemStyle}
            labelStyle={[labelStyle, { opacity, transform: [{ scale }] }]}
          />
        );
      })}
      {showIndicator && <TabBarIndicator style={[{ width: indicatorWidth }, indicatorStyle]} scrollX={scrollX} />}
    </Flex>
  );
}

const useLastPage = (page: number, isIdle: boolean) => {
  const lastPage = useRef(0);

  useEffect(() => {
    if (isIdle) {
      lastPage.current = page;
    }
  }, [page, isIdle]);

  return lastPage.current;
};

const useInteractive = (scrollState: 'idle' | 'dragging' | 'settling') => {
  const interactive = useRef(false);
  const scrollStateRef = useRef(scrollState);

  useEffect(() => {
    scrollStateRef.current = scrollState;
  }, [scrollState]);

  if (scrollState === 'dragging') {
    interactive.current = true;
  } else if (scrollState === 'idle' && (Platform.OS === 'android' || scrollStateRef.current === 'settling')) {
    interactive.current = false;
  }

  return interactive.current;
};

function getIndicatorWidth(style?: StyleProp<ViewStyle>) {
  const flattenedStyle = StyleSheet.flatten([{ width: 24 }, style]);
  if (typeof flattenedStyle.width === 'number') {
    return flattenedStyle.width;
  }
  return 24;
}
