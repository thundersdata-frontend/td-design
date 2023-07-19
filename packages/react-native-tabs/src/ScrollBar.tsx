import React, { PropsWithChildren, ReactElement, useEffect, useRef } from 'react';
import { LayoutChangeEvent, LayoutRectangle, ScrollView } from 'react-native';

import { useMemoizedFn, useSafeState } from '@td-design/rn-hooks';

interface ScrollBarProps {
  height: number;
  page: number;
}

export default function ScrollBar({ height, page, children }: PropsWithChildren<ScrollBarProps>) {
  const scrollRef = useRef<ScrollView>(null);

  // 记录 Tab 布局数据
  const [tabLayouts, setTabLayouts] = useSafeState<LayoutRectangle[]>([]);
  const onTabsLayout = useMemoizedFn((layouts: LayoutRectangle[]) => {
    setTabLayouts(layouts);
  });

  // 记录 ScrollView 的内容宽度
  const [contentWidth, setContentWidth] = useSafeState(0);
  const onContentSizeChange = useMemoizedFn((w: number) => {
    setContentWidth(w);
  });

  // 记录 ScrollBar 的宽度
  const [scrollBarWidth, setScrollBarWidth] = useSafeState(0);
  const onLayout = useMemoizedFn((e: LayoutChangeEvent) => {
    setScrollBarWidth(e.nativeEvent.layout.width);
  });

  useEffect(() => {
    if (tabLayouts.length - 1 < page || contentWidth === 0 || scrollBarWidth === 0) return;

    // 获得选中的 Tab 布局数据
    const tabLayout = tabLayouts[page];
    // 计算 Tab 中心到 ScrollBar 中心的 x 轴距离
    const dx = tabLayout.x + tabLayout.width / 2 - scrollBarWidth / 2;
    // 计算出 ScrollView 的最大可滚动距离，ScrollView 的可滚动范围是 [0, maxScrollX]
    const maxScrollX = contentWidth - scrollBarWidth;
    // 计算出 ScrollView 应该滚动到的 x 坐标，它必须大于等于 0 并且小于等于 maxScrollX
    const x = Math.min(Math.max(0, dx), maxScrollX);
    scrollRef.current?.scrollTo({ x });
  }, [page, tabLayouts, contentWidth, scrollBarWidth]);

  return (
    <ScrollView
      ref={scrollRef}
      bounces={false}
      horizontal
      showsHorizontalScrollIndicator={false}
      onContentSizeChange={onContentSizeChange}
      onLayout={onLayout}
      style={{ flexGrow: 0, height }}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      {React.cloneElement(children as ReactElement, { onTabsLayout, height })}
    </ScrollView>
  );
}
