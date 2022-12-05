import { useMount, useUnmount } from '@td-design/rn-hooks';
import { useRef } from 'react';
import { Easing, runOnJS, useSharedValue, withTiming } from 'react-native-reanimated';

import { INFINITY } from './constant';

export function useToast({ duration, onClose }: { duration: number; onClose: () => void }) {
  const opacity = useSharedValue(1);
  const timer = useRef<NodeJS.Timeout>();

  useMount(() => {
    if (duration !== INFINITY) {
      timer.current = setTimeout(() => {
        opacity.value = withTiming(0, { duration: 300, easing: Easing.inOut(Easing.ease) }, () => {
          runOnJS(onClose)();
        });
      }, duration);
    }
  });

  useUnmount(() => {
    timer.current && clearTimeout(timer.current);
  });

  return opacity;
}
