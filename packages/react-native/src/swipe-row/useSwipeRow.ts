import { useContext, useEffect, useRef } from 'react';
import { Swipeable } from 'react-native-gesture-handler';

import { useMemoizedFn, useSafeState } from '@td-design/rn-hooks';

import type { SwipeRowProps } from '.';
import { SwipeRowContext } from './context';

export default function useSwipeRow({ anchor, onRemove }: Pick<SwipeRowProps, 'onRemove' | 'anchor'>) {
  const swipeableRef = useRef<Swipeable>(null);
  const { changeState, id, multiple } = useContext(SwipeRowContext);

  const [visible, setVisible] = useSafeState(true);

  useEffect(() => {
    if (anchor === id && !multiple) {
      swipeableRef.current?.close();
    }
  }, [anchor, id, multiple]);

  const handleRemove = async () => {
    await onRemove?.();
    swipeableRef.current?.close();
    setVisible(false);
  };

  return {
    swipeableRef,
    visible,

    changeState,
    handleRemove: useMemoizedFn(handleRemove),
  };
}
