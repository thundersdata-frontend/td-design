import { useContext, useEffect, useRef } from 'react';
import { LayoutChangeEvent } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { interpolate, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { useMemoizedFn, useSafeState } from '@td-design/rn-hooks';

import type { SwipeRowProps } from '.';
import { SwipeRowContext } from './context';

export default function useSwipeRow({ anchor, onRemove }: Pick<SwipeRowProps, 'onRemove' | 'anchor'>) {
  const swipeableRef = useRef<Swipeable>(null);
  const isRemoving = useSharedValue(0);
  const [height, setHeight] = useSafeState(0);
  const { changeState, id, multiple } = useContext(SwipeRowContext);

  useEffect(() => {
    if (anchor === id && !multiple) {
      swipeableRef.current?.close();
    }
  }, [anchor, id, multiple]);

  const handleRemove = async () => {
    await onRemove?.();
    isRemoving.value = withTiming(1, { duration: 200 });
    swipeableRef.current?.close();
  };

  const handleLayout = (e: LayoutChangeEvent) => {
    setHeight(e.nativeEvent.layout.height);
  };

  const animatedStyle = useAnimatedStyle(() => {
    if (isRemoving.value) {
      return {
        height: interpolate(isRemoving.value, [0, 1], [height, 0]),
      };
    }

    return {};
  });

  return {
    swipeableRef,
    animatedStyle,

    changeState,
    handleLayout: useMemoizedFn(handleLayout),
    handleRemove: useMemoizedFn(handleRemove),
  };
}
