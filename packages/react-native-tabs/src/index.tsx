import React, { cloneElement } from 'react';
import { Animated, StyleProp, TextStyle, ViewStyle } from 'react-native';
import PagerView from 'react-native-pager-view';

import { Box, helpers } from '@td-design/react-native';

import ScrollBar from './ScrollBar';
import TabBar from './TabBar';
import usePagerView from './usePagerView';

const { px } = helpers;
const AnimatedPagerView = Animated.createAnimatedComponent<typeof PagerView>(PagerView);

type Tab = {
  title: string;
  component: JSX.Element;
};

export interface TabsProps {
  scenes: Tab[];
  /** 默认当前是第几个tab */
  initialPage?: number;
  /** 当前是第几个tab */
  page?: number;
  /** 切换tab事件 */
  onChange?: (page: number) => void;
  /** 标签栏的高度。 默认为48 */
  height?: number;
  /** 是否支持手势滚动。 */
  scrollEnabled?: boolean;
  /** 是否显示指示器。 默认为true */
  showIndicator?: boolean;
  /** 到第一页或者最后一页之后还是否允许继续拖动。 默认为true */
  overdrag?: boolean;
  /** 键盘关闭模式。 默认为滚动时关闭 */
  keyboardDismissMode?: 'none' | 'on-drag';
  tabStyle?: StyleProp<ViewStyle>;
  tabItemStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  indicatorStyle?: StyleProp<ViewStyle>;
}

export default function Tabs({
  initialPage = 0,
  page,
  onChange,
  scenes = [],
  height = px(48),
  showIndicator = true,
  scrollEnabled = true,
  overdrag = true,
  keyboardDismissMode = 'on-drag',
  tabStyle,
  tabItemStyle,
  labelStyle,
  indicatorStyle,
}: TabsProps) {
  const {
    pagerViewRef,
    setPage,
    currentPage,
    position,
    offset,
    isIdle,
    scrollState,
    onPageScroll,
    onPageSelected,
    onPageScrollStateChanged,
  } = usePagerView(initialPage, page, onChange);

  const titles = scenes.map(tab => tab.title);

  return (
    <Box flex={1}>
      {/* 可以滚动的TabBar */}
      <ScrollBar page={currentPage} height={height}>
        <TabBar
          tabs={titles}
          onTabPress={setPage}
          page={currentPage}
          position={position}
          offset={offset}
          isIdle={isIdle}
          scrollState={scrollState}
          showIndicator={showIndicator}
          tabStyle={tabStyle}
          tabItemStyle={tabItemStyle}
          labelStyle={labelStyle}
          indicatorStyle={indicatorStyle}
        />
      </ScrollBar>

      {/* PagerView的内容 */}
      <AnimatedPagerView
        ref={pagerViewRef}
        style={{ flex: 1 }}
        overdrag={overdrag}
        initialPage={currentPage}
        keyboardDismissMode={keyboardDismissMode}
        scrollEnabled={scrollEnabled}
        overScrollMode="always"
        onPageScroll={onPageScroll}
        onPageSelected={onPageSelected}
        onPageScrollStateChanged={onPageScrollStateChanged}
      >
        {scenes.map(({ title, component }) => cloneElement(component, { key: title }))}
      </AnimatedPagerView>
    </Box>
  );
}
