import { useTheme } from '@shopify/restyle';
import { useLatest, useMemoizedFn, usePrevious, useSafeState } from '@td-design/rn-hooks';
import { useEffect, useMemo, useRef } from 'react';
import { BackHandler, NativeEventSubscription } from 'react-native';
import { Easing, runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { Edge, useSafeAreaInsets } from 'react-native-safe-area-context';

import type { ModalProps } from '.';
import { Theme } from '../../theme';

export default function useModal({
  visible,
  onClose,
  position,
  maskVisible,
}: Pick<ModalProps, 'visible' | 'onClose' | 'position' | 'maskVisible'>) {
  const theme = useTheme<Theme>();
  const onCloseRef = useLatest(onClose);
  const insets = useSafeAreaInsets();
  const opacity = useSharedValue(0);

  const [rendered, setRendered] = useSafeState(visible);
  const latestVisible = useLatest(visible);
  const previousVisible = usePrevious(visible);

  useEffect(() => {
    if (visible && !rendered) {
      setRendered(true);
    }
  }, [visible, rendered]);

  useEffect(() => {
    if (previousVisible !== latestVisible.current) {
      if (visible) {
        showModal();
      } else {
        hideModal();
      }
    }
  }, [visible]);

  useEffect(() => {
    return removeListeners;
  }, []);

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
      duration: 400,
      easing: Easing.in(Easing.cubic),
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
        duration: 400,
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

    if (latestVisible.current) {
      showModal();
    } else {
      setRendered(false);
    }
  }

  useEffect(() => {
    if (visible && !rendered) {
      setRendered(true);
    }
    if (visible) {
      showModal();
    } else if (rendered) {
      hideModal();
    }
  }, [visible, rendered]);

  useEffect(() => {
    const handler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (visible) {
        hideModal();
        return true;
      }
      return false;
    });

    return () => handler.remove();
  }, [hideModal, visible]);

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
