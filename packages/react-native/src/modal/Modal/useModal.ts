import { useTheme } from '@shopify/restyle';
import { useLatest, useMemoizedFn } from '@td-design/rn-hooks';
import { useEffect, useRef, useState } from 'react';
import { BackHandler, NativeEventSubscription } from 'react-native';
import { Easing, runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { Edge, useSafeAreaInsets } from 'react-native-safe-area-context';

import { Theme } from '../../theme';
import type { ModalProps } from '../type';

export default function useModal({
  visible,
  onClose,
  duration,
  position,
  maskVisible,
}: Pick<ModalProps, 'visible' | 'onClose' | 'position' | 'maskVisible' | 'duration'>) {
  const theme = useTheme<Theme>();
  const onCloseRef = useLatest(onClose);
  const insets = useSafeAreaInsets();

  const visibleRef = useRef(visible);

  useEffect(() => {
    visibleRef.current = visible;
  });

  const opacity = useSharedValue(visible ? 1 : 0);

  const [rendered, setRendered] = useState(visible);

  if (visible && !rendered) {
    setRendered(true);
  }

  /**
   * 处理安卓返回事件
   */
  const handleBack = useMemoizedFn(() => {
    hideModal();
    return true;
  });

  const subscription = useRef<NativeEventSubscription | undefined>(undefined);

  const removeListeners = () => {
    if (subscription.current?.remove) {
      subscription.current?.remove();
    } else {
      BackHandler.removeEventListener('hardwareBackPress', handleBack);
    }
  };

  /**
   * 打开弹窗
   */
  const showModal = useMemoizedFn(() => {
    subscription.current?.remove();
    subscription.current = BackHandler.addEventListener('hardwareBackPress', handleBack);

    opacity.value = withTiming(1, {
      duration,
      easing: Easing.out(Easing.cubic),
    });
  });

  /**
   * 关闭弹窗
   */
  const hideModal = useMemoizedFn(() => {
    removeListeners();

    opacity.value = withTiming(
      0,
      {
        duration,
        easing: Easing.out(Easing.cubic),
      },
      finished => {
        runOnJS(finishCallback)(finished);
      }
    );
  });

  function finishCallback(finished?: boolean) {
    if (!finished) return;

    if (visible && onCloseRef) {
      onCloseRef.current?.();
    }

    if (visibleRef.current) {
      showModal();
    } else {
      setRendered(false);
    }
  }

  const prevVisible = useRef<boolean | null>(null);

  useEffect(() => {
    if (prevVisible.current !== visible) {
      if (visible) {
        showModal();
      } else {
        hideModal();
      }
    }
    prevVisible.current = visible;
  });

  useEffect(() => {
    return removeListeners;
  }, []);

  let wrapContainer: Record<string, number> = {};
  let edges: Edge[] | undefined = undefined;

  switch (position) {
    case 'bottom':
      wrapContainer = { paddingBottom: insets.bottom };
      edges = ['top'];
      break;

    case 'center':
      wrapContainer = {};
      edges = ['top', 'bottom'];
      break;

    case 'fullscreen':
      wrapContainer = { flex: 1 };
      break;
  }

  const animatedStyle = useAnimatedStyle(() => {
    const style: any = {
      zIndex: 99,
      flex: 1,
      backgroundColor: maskVisible ? theme.colors.mask : theme.colors.transparent,
      flexDirection: position === 'bottom' ? 'column-reverse' : 'column',
      opacity: opacity.value,
    };
    if (position === 'center') {
      style.justifyContent = 'center';
    }
    return style;
  });

  return {
    rendered,
    animatedStyle,
    wrapContainer,
    edges,
    hideModal,
  };
}
