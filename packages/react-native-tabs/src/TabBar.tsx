import React, { useMemo, useRef } from 'react';
import { LayoutRectangle } from 'react-native';
import { Extrapolate, interpolate, useAnimatedStyle } from 'react-native-reanimated';

import { Flex, helpers, Theme, useTheme } from '@td-design/react-native';
import { useMemoizedFn, useSafeState } from '@td-design/rn-hooks';

import TabBarIndicator from './TabBarIndicator';
import TabBarItem from './TabBarItem';
import { TabBarProps } from './type';

const { px, ONE_PIXEL } = helpers;

export default function TabBar({
  tabs,
  page,
  height,
  onTabPress,
  onTabsLayout,
  showIndicator,
  scrollX,
  isIdle,
  tabStyle,
  tabItemStyle,
  labelStyle,
  indicatorStyle,
}: TabBarProps) {
  const theme = useTheme<Theme>();

  // 给indicatorStyle赋初始值
  indicatorStyle = useMemo(
    () => ({
      height: px(4),
      borderRadius: px(2),
      color: theme.colors.primary200,
      ...indicatorStyle,
    }),
    [indicatorStyle, theme.colors.primary200]
  );

  const layouts = useRef<LayoutRectangle[]>([]).current;
  const inputRange = useMemo(() => tabs.map((_, index) => index), [tabs]);

  const [tabWidths, setTabWidths] = useSafeState(inputRange.map(() => 0));
  const [scrollRange, setScrollRange] = useSafeState(inputRange.map(() => 0));

  // 保存每个 Tab 的布局信息
  const handleTabLayout = useMemoizedFn((index: number, layout: LayoutRectangle) => {
    layouts[index] = layout;

    const length = layouts.filter(layout => layout.width > 0).length;
    if (length !== tabs.length) return;

    const widths: number[] = [];
    const range: number[] = [];
    for (let index = 0; index < length; index++) {
      const { x, width } = layouts[index];
      // 我们希望指示器和所选 Tab 垂直居中对齐
      // 那么指示器的 x 轴偏移量就是 Tab 的 center.x - 指示器的 center.x
      const tabCenterX = x + width / 2;
      const indicatorCenterX = width / 2;
      range.push(tabCenterX - indicatorCenterX);
      widths.push(width);
    }
    setTabWidths(widths);
    setScrollRange(range);
    onTabsLayout?.(layouts);
  });

  const handleTabPress = useMemoizedFn((index: number) => {
    if (isIdle) {
      onTabPress?.(index);
    }
  });

  return (
    <Flex
      width={tabWidths.reduce((a, b) => a + b, 0)}
      height={height}
      flex={1}
      justifyContent={'space-evenly'}
      alignItems="center"
      backgroundColor={'white'}
      borderBottomWidth={ONE_PIXEL}
      borderBottomColor={'border'}
      style={tabStyle}
    >
      {tabs.map((tab, index) => {
        const enhanced = index === page;
        const inputRange = [index - 1, index, index + 1];

        const animatedStyles = useAnimatedStyle(() => {
          const scale = interpolate(scrollX.value, inputRange, [1, enhanced ? 1.2 : 1, 1], Extrapolate.CLAMP);
          const opacity = interpolate(scrollX.value, inputRange, [0.8, enhanced ? 1 : 0.8, 0.8], Extrapolate.CLAMP);

          return {
            opacity,
            transform: [{ scale }],
          };
        });
        return (
          <TabBarItem
            key={index}
            title={tab}
            onPress={() => handleTabPress(index)}
            onLayout={event => handleTabLayout(index, event.nativeEvent.layout)}
            style={[tabItemStyle, animatedStyles]}
            labelStyle={[labelStyle]}
          />
        );
      })}
      {showIndicator && (
        <TabBarIndicator
          style={indicatorStyle}
          scrollX={scrollX}
          inputRange={inputRange}
          scrollRange={scrollRange}
          tabWidths={tabWidths}
        />
      )}
    </Flex>
  );
}
