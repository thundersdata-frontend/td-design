import { useRef } from 'react';
import { Platform } from 'react-native';
import PagerView, { PageScrollStateChangedNativeEvent } from 'react-native-pager-view';
import { useDerivedValue, useSharedValue } from 'react-native-reanimated';

import { useMemoizedFn, useSafeState } from '@td-design/rn-hooks';

export default function usePagerView() {
  const pagerRef = useRef<PagerView>(null);

  const [activePage, setActivePage] = useSafeState(0);
  const [isIdle, setIdle] = useSafeState(true);

  const setPage = (page: number, animated = true) => {
    if (animated) {
      pagerRef.current?.setPage(page);
    } else {
      pagerRef.current?.setPageWithoutAnimation(page);
    }
    setActivePage(page);
  };

  const offset = useSharedValue(0);
  const position = useSharedValue(0);

  const scrollX = useDerivedValue(() => offset.value + position.value, [offset, position]);

  const onPageScroll = (e: { offset: number; position: number }) => {
    offset.value = e.offset;
    position.value = e.position;
  };

  const onPageSelected = (page: number) => {
    setPage(page);
    if (Platform.OS === 'ios') {
      setIdle(true);
    }
  };

  const onPageScrollStateChanged = ({ nativeEvent: { pageScrollState } }: PageScrollStateChangedNativeEvent) => {
    setIdle(pageScrollState === 'idle');
  };

  return {
    pagerRef,
    page: activePage,
    isIdle,
    scrollX,
    onPageScroll: useMemoizedFn(onPageScroll),
    setPage: useMemoizedFn(setPage),
    onPageSelected: useMemoizedFn(onPageSelected),
    onPageScrollStateChanged: useMemoizedFn(onPageScrollStateChanged),
  };
}
