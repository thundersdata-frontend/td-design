import { useRef } from 'react';
import { Platform } from 'react-native';
import PagerView, { PageScrollStateChangedNativeEvent } from 'react-native-pager-view';
import { useDerivedValue, useSharedValue } from 'react-native-reanimated';

import { useMemoizedFn, useSafeState } from '@td-design/rn-hooks';

import { createShareModel } from './createShareModel';
import { Listener } from './type';

function usePagerView(initialPage: number) {
  const listenersRef = useRef<Listener[]>([]);
  const pagerRef = useRef<PagerView>(null);

  const [activePage, setActivePage] = useSafeState(initialPage);
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
  const position = useSharedValue(initialPage);

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
    switch (pageScrollState) {
      case 'idle':
        setIdle(pageScrollState === 'idle');
        break;

      case 'dragging':
        const next = activePage + (offset.value > 0 ? Math.ceil(offset.value) : Math.floor(offset.value));
        if (next !== activePage) {
          listenersRef.current.forEach(listener => listener(next));
        }
        break;

      default:
        break;
    }
  };

  const addEnterListener = (listener: Listener) => {
    listenersRef.current.push(listener);

    return () => {
      const index = listenersRef.current.indexOf(listener);
      if (index > -1) {
        listenersRef.current.splice(index, 1);
      }
    };
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
    addEnterListener: useMemoizedFn(addEnterListener),
  };
}

export default createShareModel(usePagerView);
