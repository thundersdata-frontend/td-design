import { useMemo, useRef, useEffect } from 'react';
import { Animated, Easing, BackHandler } from 'react-native';
import { Edge, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useMemoizedFn, useSafeState, useLatest, useMount } from '@td-design/rn-hooks';

import type { ModalProps } from '.';

export default function useModal({ visible, onClose, position }: Pick<ModalProps, 'visible' | 'onClose' | 'position'>) {
  const insets = useSafeAreaInsets();
  const opacity = useRef(new Animated.Value(0));
  const [rendered, setRendered] = useSafeState(false);
  const onCloseRef = useLatest(onClose);

  /**
   * 打开弹窗
   */
  const showModal = useMemoizedFn(() => {
    Animated.timing(opacity.current, {
      toValue: 1,
      duration: 400,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  });

  /**
   * 关闭弹窗
   */
  const hideModal = useMemoizedFn(() => {
    Animated.timing(opacity.current, {
      toValue: 0,
      duration: 400,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start(finished => {
      if (!finished) return;

      if (visible) {
        onCloseRef.current?.();
        showModal();
      } else {
        setRendered(false);
      }
    });
  });

  useEffect(() => {
    if (visible && !rendered) {
      setRendered(true);
    }
    if (visible) {
      showModal();
    } else if (rendered) {
      hideModal();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, rendered]);

  useMount(() => {
    const handler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (visible) {
        hideModal();
        return true;
      }
      return false;
    });

    return () => handler.remove();
  });

  const { wrapContainer, edges } = useMemo(() => {
    switch (position) {
      case 'bottom':
        return {
          wrapContainer: { paddingBottom: insets.bottom },
          edges: ['top'] as Edge[],
        };
      case 'center':
        return {
          wrapContainer: {},
          edges: ['top', 'bottom'] as Edge[],
        };
      case 'fullscreen':
        return {
          wrapContainer: { flex: 1, paddingTop: insets.top, paddingBottom: insets.bottom },
          edges: ['left', 'right'] as Edge[],
        };
      default:
        return {
          wrapContainer: {},
          edges: undefined,
        };
    }
  }, [insets.bottom, insets.top, position]);

  return {
    rendered,
    opacity,
    wrapContainer,
    edges,
    hideModal,
  };
}
