import React, { cloneElement } from 'react';
import { PagerViewOnPageSelectedEvent } from 'react-native-pager-view';

import { helpers } from '@td-design/react-native';
import { useMemoizedFn } from '@td-design/rn-hooks';

import AnimatedPagerView from './AnimatedPagerView';
import ScrollBar from './ScrollBar';
import TabBar from './TabBar';
import { TabsProps } from './type';
import usePagerView from './usePagerView';

const { px } = helpers;

export default function ({
  scenes,
  onChange,
  scrollEnabled = true,
  overdrag = true,
  keyboardDismissMode = 'on-drag',
  height = px(48),
  showIndicator = true,
  tabStyle,
  tabItemStyle,
  labelStyle,
  indicatorStyle,
}: TabsProps) {
  const { pagerRef, setPage, page, scrollX, isIdle, onPageScroll, onPageSelected, onPageScrollStateChanged } =
    usePagerView();

  const handlePageSelected = useMemoizedFn((e: PagerViewOnPageSelectedEvent) => {
    const page = e.nativeEvent.position;
    onChange?.(scenes[page].key);
    onPageSelected(page);
  });

  return (
    <>
      <ScrollBar page={page} height={height}>
        <TabBar
          tabs={scenes.map(item => item.title)}
          onTabPress={setPage}
          scrollX={scrollX}
          isIdle={isIdle}
          page={page}
          tabStyle={tabStyle}
          tabItemStyle={tabItemStyle}
          labelStyle={labelStyle}
          indicatorStyle={indicatorStyle}
          showIndicator={showIndicator}
        />
      </ScrollBar>
      <AnimatedPagerView
        ref={pagerRef}
        overdrag={overdrag}
        scrollEnabled={scrollEnabled}
        keyboardDismissMode={keyboardDismissMode}
        onPageScroll={onPageScroll}
        onPageSelected={handlePageSelected}
        onPageScrollStateChanged={onPageScrollStateChanged}
      >
        {scenes.map(item => cloneElement(item.component, { key: item.key }))}
      </AnimatedPagerView>
    </>
  );
}
