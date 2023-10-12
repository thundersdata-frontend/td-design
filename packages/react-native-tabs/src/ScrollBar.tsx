import React, { PropsWithChildren, useEffect, useRef } from 'react';
import { LayoutChangeEvent, LayoutRectangle, ScrollView, StyleSheet } from 'react-native';

import { useSafeState } from '@td-design/rn-hooks';

interface ScrollBarProps {
  height: number;
  page: number;
}

export default function ScrollBar({ height, page, children }: PropsWithChildren<ScrollBarProps>) {
  const [tabLayouts, setTabLayouts] = useSafeState<LayoutRectangle[]>([]);

  // 保存每个Tab的布局
  const handleTabLayout = (layouts: LayoutRectangle[]) => {
    setTabLayouts(layouts);
  };

  // 保存ScrollView的宽度
  const [contentWidth, setContentWidth] = useSafeState(0);
  const handleContentChange = (width: number) => {
    setContentWidth(width);
  };

  // 保存滚动条的宽度
  const [scrollBarWidth, setScrollBarWidth] = useSafeState(0);
  const handleScrollBarLayout = (e: LayoutChangeEvent) => {
    setScrollBarWidth(e.nativeEvent.layout.width);
  };

  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    if (tabLayouts.length - 1 < page || contentWidth === 0 || scrollBarWidth === 0) return;

    // 当前选中的Tab的布局
    const tabLayout = tabLayouts[page];

    // 当前选中的Tab的中心点
    const tabCenter = tabLayout.x + tabLayout.width / 2 - scrollBarWidth / 2;

    // 计算ScrollView的最大可滚动距离[0, maxScrollX]
    const maxScrollX = contentWidth - scrollBarWidth;

    // 计算ScrollView应该滚动的x坐标位置，它必须在[0, maxScrollX]之间
    const scrollX = Math.min(Math.max(0, tabCenter), maxScrollX);

    // 滚动ScrollView
    scrollViewRef.current?.scrollTo({ x: scrollX, animated: true });
  }, [page, tabLayouts, contentWidth, scrollBarWidth]);

  return (
    <ScrollView
      ref={scrollViewRef}
      horizontal
      bounces={false}
      showsHorizontalScrollIndicator={false}
      style={[styles.scrollbar, { height }]}
      onContentSizeChange={handleContentChange}
      onLayout={handleScrollBarLayout}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      {React.cloneElement(children as React.ReactElement, { onTabsLayout: handleTabLayout })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollbar: {
    flexGrow: 0,
  },
});
