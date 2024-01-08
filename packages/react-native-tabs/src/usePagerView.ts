import { useMemo, useRef } from 'react';
import { Animated, Platform } from 'react-native';
import PagerView, {
  PagerViewOnPageScrollEventData,
  PagerViewOnPageSelectedEvent,
  PageScrollStateChangedNativeEvent,
} from 'react-native-pager-view';

import { useMemoizedFn, useSafeState } from '@td-design/rn-hooks';

export default function usePagerView(initialPage: number, page?: number, onChange?: (page: number) => void) {
  const pagerViewRef = useRef<PagerView>(null);

  const [activePage, setActivePage] = useSafeState(page || initialPage);
  const [isIdle, setIdle] = useSafeState(true);

  const setPage = useMemoizedFn((page: number, animated = true) => {
    if (animated) {
      pagerViewRef.current?.setPage(page);
    } else {
      pagerViewRef.current?.setPageWithoutAnimation(page);
    }

    setActivePage(page);
    if (activePage !== page) {
      setIdle(false);
    }
    onChange?.(page);
  });

  const offset = useRef(new Animated.Value(initialPage)).current;
  const position = useRef(new Animated.Value(0)).current;

  const onPageScroll = useMemo(
    () =>
      Animated.event<PagerViewOnPageScrollEventData>(
        [
          {
            nativeEvent: {
              offset,
              position,
            },
          },
        ],
        {
          listener: ({ nativeEvent: { position, offset } }) => {
            if (__DEV__) {
              console.log('onPageScroll', 'position', position, 'offset', offset);
            }
          },
          useNativeDriver: true,
        }
      ),
    [offset, position]
  );

  const onPageSelected = useMemoizedFn((e: PagerViewOnPageSelectedEvent) => {
    setActivePage(e.nativeEvent.position);
    onChange?.(e.nativeEvent.position);
    if (Platform.OS === 'ios') {
      setIdle(true);
    }
  });

  const [scrollState, setScrollState] = useSafeState<'idle' | 'dragging' | 'settling'>('idle');

  const onPageScrollStateChanged = useMemoizedFn((e: PageScrollStateChangedNativeEvent) => {
    setScrollState(e.nativeEvent.pageScrollState);
    setIdle(e.nativeEvent.pageScrollState === 'idle');
  });

  return {
    pagerViewRef,
    currentPage: activePage,
    isIdle,
    scrollState,
    position,
    offset,
    setPage,
    onPageScroll,
    onPageSelected,
    onPageScrollStateChanged,
  };
}
