import React from 'react';
import { LayoutChangeEvent } from 'react-native';
import { PagerViewOnPageSelectedEvent } from 'react-native-pager-view';

import { Box, helpers } from '@td-design/react-native';
import { useMemoizedFn, useSafeState } from '@td-design/rn-hooks';

import AnimatedPagerView from './AnimatedPagerView';
import SceneView from './SceneView';
import ScrollBar from './ScrollBar';
import TabBar from './TabBar';
import { TabsProps } from './type';
import usePagerView from './usePagerView';

const { px } = helpers;

export default function ({ initialPage = 0, ...props }: TabsProps) {
  const [layout, setLayout] = useSafeState({ width: 0, height: 0 });

  const handleLayout = useMemoizedFn((e: LayoutChangeEvent) => {
    const { width, height } = e.nativeEvent.layout;
    if (layout.height !== height || layout.width !== width) {
      setLayout({ width, height });
    }
  });

  return (
    <Box flex={1} overflow={'hidden'} onLayout={handleLayout}>
      <usePagerView.Provider initialState={initialPage}>
        <TabView {...props} layout={layout} />
      </usePagerView.Provider>
    </Box>
  );
}

function TabView({
  scenes,
  onChange,
  scrollEnabled = true,
  overdrag = true,
  keyboardDismissMode = 'on-drag',
  height = px(48),
  showIndicator = true,
  lazy = false,
  layout,
  renderLazyPlaceholder = () => null,
  tabStyle,
  tabItemStyle,
  labelStyle,
  indicatorStyle,
}: TabsProps) {
  const { pagerRef, setPage, page, scrollX, isIdle, onPageSelected } = usePagerView.useModel();

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
        onPageSelected={handlePageSelected}
      >
        {scenes.map((item, i) => (
          <SceneView key={item.key} index={i} lazy={lazy} layout={layout!}>
            {({ loading }) => {
              if (loading) return renderLazyPlaceholder();
              return item.component;
            }}
          </SceneView>
        ))}
      </AnimatedPagerView>
    </>
  );
}
