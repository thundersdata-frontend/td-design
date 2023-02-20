import { useEffect, useRef } from 'react';
import { NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import Animated from 'react-native-reanimated';

import { useMemoizedFn, useSafeState } from '@td-design/rn-hooks';

import type { CarouselProps } from './type';

export default function useCarousel({
  auto,
  width,
  duration,
  count,
}: Required<Pick<CarouselProps, 'auto' | 'width' | 'duration'>> & { count: number }) {
  const scrollViewRef = useRef<Animated.ScrollView>(null);
  const timer = useRef<ReturnType<typeof setInterval>>();

  const [currentIndex, setCurrentIndex] = useSafeState(0);

  const loop = useMemoizedFn(() => {
    setCurrentIndex(index => (index === count - 1 ? 0 : index + 1));
  });

  useEffect(() => {
    if (!auto) return;

    timer.current = setInterval(loop, duration);

    return () => clearTimer();
  }, [loop, auto, duration]);

  useEffect(() => {
    scrollViewRef.current?.scrollTo({ animated: true, y: 0, x: width * currentIndex });
  }, [currentIndex]);

  const startTimer = () => {
    timer.current = setInterval(loop, duration);
  };

  // 用户手动滚动开始时，停止轮播
  const clearTimer = () => {
    clearInterval(timer.current);
    timer.current = undefined;
  };

  // 在ScrollView滚动结束后，修改当前index
  const onScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { x } = e.nativeEvent.contentOffset;
    const index = Math.ceil(x / width);
    setCurrentIndex(index);
    if (auto && !timer.current) {
      startTimer();
    }
  };

  return {
    scrollViewRef,
    currentIndex,

    onTouchStart: useMemoizedFn(clearTimer),
    onTouchEnd: useMemoizedFn(startTimer),
    onScrollEnd: useMemoizedFn(onScrollEnd),
  };
}
