import { RefObject, useRef, useEffect } from 'react';
import { NativeScrollEvent, NativeSyntheticEvent, ScrollView } from 'react-native';
import Animated from 'react-native-reanimated';
import { useSafeState } from '@td-design/rn-hooks';

import helpers from '../helpers';
import type { SwiperProps } from '.';

const { deviceWidth, px } = helpers;
export default function useSwiper({
  auto = true,
  loop = true,
  width = deviceWidth,
  height = px(320),
  duration = 3500,
  horizontal = true,
  scrollViewRef,
  count,
}: SwiperProps & { scrollViewRef: RefObject<Animated.ScrollView>; count: number }) {
  const [currentIndex, setCurrentIndex] = useSafeState(0);
  const timer = useRef<number>();

  useEffect(() => {
    if (auto) {
      if (timer.current) {
        clearTimeout(timer.current);
      }
      timer.current = setTimeout(() => {
        if (loop) {
          // 循环滚动，在滚动到最后一个之后，设置重新开始
          if (currentIndex === count - 1) {
            setCurrentIndex(0);
            (scrollViewRef.current as any as ScrollView)?.scrollTo(
              horizontal ? { x: 0, animated: true } : { y: 0, animated: true }
            );
          } else {
            setCurrentIndex(currentIndex + 1);
            (scrollViewRef.current as any as ScrollView)?.scrollTo(
              horizontal
                ? { x: (currentIndex + 1) * width, animated: true }
                : { y: (currentIndex + 1) * height, animated: true }
            );
          }
        } else if (currentIndex !== count - 1) {
          setCurrentIndex(currentIndex + 1);
          (scrollViewRef.current as any as ScrollView)?.scrollTo(
            horizontal
              ? { x: (currentIndex + 1) * width, animated: true }
              : { y: (currentIndex + 1) * height, animated: true }
          );
        }
      }, duration);
    }

    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auto, count, currentIndex, duration, height, horizontal, loop, width]);

  const handleScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { x, y } = e.nativeEvent.contentOffset;
    const index = horizontal ? x / width : y / height;
    setCurrentIndex(index);
  };

  return { scrollViewRef, count, currentIndex, handleScrollEnd };
}
