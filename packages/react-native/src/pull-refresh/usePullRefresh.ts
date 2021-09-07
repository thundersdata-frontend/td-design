import React, { PropsWithChildren, useRef } from 'react';
import { FlatList, NativeScrollEvent, NativeSyntheticEvent, ScrollView } from 'react-native';
import { NativeViewGestureHandler } from 'react-native-gesture-handler';
import {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { useSafeState, useUpdateEffect } from '@td-design/rn-hooks';
import helpers from '../helpers';
import { PullRefreshHeaderRef, PullRefreshProps } from './type';

const { px } = helpers;
export default function usePullRefresh({
  refreshing = false,
  onRefresh,
  springConfig,
  onScrollY,
  headerHeight = px(60),
  children,
}: Pick<
  PropsWithChildren<PullRefreshProps>,
  'onRefresh' | 'springConfig' | 'onScrollY' | 'children' | 'refreshing' | 'headerHeight'
>) {
  const [gestureEnabled, setGestureEnabled] = useSafeState(!refreshing);

  const header = useRef<PullRefreshHeaderRef>(null);
  const scroll = useRef<NativeViewGestureHandler>();
  const scrollRef = useRef<ScrollView | FlatList>(null);

  const translateY = useSharedValue(0);

  /** 滚动过程中禁用PanGestureHandler */
  const handleScrolling = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    onScrollY?.(event.nativeEvent.contentOffset.y);
    setGestureEnabled(false);
  };

  /** 滚动结束之后根据位置判断是否禁用PanGestureHandler */
  const handleScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { y } = event.nativeEvent.contentOffset;

    if (y > 0) {
      // 表示内容没有滚动到顶部
      setGestureEnabled(false);
    } else {
      setGestureEnabled(true);
    }
  };

  const child = React.cloneElement(children, {
    ref: scrollRef,
    bounces: false,
    onScroll: handleScrolling,
    onMomentumScrollEnd: handleScrollEnd,
    scrollEventThrottle: 1,
  });

  const setProgress = (value: number) => {
    header.current?.setProgress({
      pullDistance: value,
      percent: value / headerHeight > 1 ? 1 : value / headerHeight,
    });
  };

  useUpdateEffect(() => {
    setGestureEnabled(!refreshing);
    if (!refreshing) {
      translateY.value = withTiming(0);
      runOnJS(setProgress)(0);
    } else {
      translateY.value = withSpring(headerHeight, springConfig);
      if (scrollRef.current) {
        if ('scrollTo' in scrollRef.current) {
          scrollRef.current?.scrollTo({ x: 0, y: 0, animated: true });
        } else if ('scrollToOffset' in scrollRef.current) {
          scrollRef.current?.scrollToOffset({ offset: 0, animated: true });
        }
      }
    }
  }, [headerHeight, refreshing, setProgress, springConfig, translateY]);

  const panHandler = useAnimatedGestureHandler({
    onActive(event) {
      if (!gestureEnabled) return;

      if (event.translationY > 0) {
        translateY.value = event.translationY;
        runOnJS(setProgress)(event.translationY);
      } else {
        translateY.value = withTiming(0);
      }
    },
    onEnd() {
      if (translateY.value > headerHeight) {
        translateY.value = withSpring(headerHeight, springConfig);
        runOnJS(onRefresh)();
      } else {
        translateY.value = withSpring(0);
        runOnJS(setProgress)(0);
      }
    },
  });

  const wrapperStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: translateY.value,
      },
    ],
  }));

  return {
    scroll,
    header,
    panHandler,
    wrapperStyle,
    gestureEnabled,
    child,
  };
}
