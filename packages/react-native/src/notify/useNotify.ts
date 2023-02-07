import { useModal } from '@ebay/nice-modal-react';
import { useTheme } from '@shopify/restyle';
import { useLatest, useMemoizedFn } from '@td-design/rn-hooks';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Dimensions } from 'react-native';
import {
  Easing,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Theme } from '../theme';
import { normalShadowOpt, NotifyProps, NotifyType } from './NotifyContainer';

const screenHeight = Dimensions.get('screen').height;
const windowHeight = Dimensions.get('window').height;
const bottomNavigatorBarHeight = screenHeight - windowHeight;

export default function useNotify({
  duration,
  autoClose,
  type,
  onClose,
  onPress,
}: Pick<NotifyProps, 'autoClose' | 'duration' | 'onClose' | 'onPress'> & { type: NotifyType }) {
  const onCloseRef = useLatest(onClose);
  const onPressRef = useLatest(onPress);

  const theme = useTheme<Theme>();
  const { visible, hide } = useModal();
  const insets = useSafeAreaInsets();
  const timer = useRef<ReturnType<typeof setTimeout>>();

  const startY = [NotifyType.SUCCESS, NotifyType.FAIL].includes(type)
    ? normalShadowOpt.height + 50
    : normalShadowOpt.height + 10;

  const endY = -insets.bottom - bottomNavigatorBarHeight;

  const [rendered, setRendered] = useState(visible);
  if (visible && !rendered) {
    setRendered(true);
  }

  useEffect(() => {
    if (visible) {
      showNotifier();
    } else {
      setRendered(false);
    }
  }, [visible]);

  const displayed = useSharedValue(visible ? 1 : 0);

  const showNotifier = () => {
    displayed.value = withSpring(1);
  };

  const hideNotifier = () => {
    displayed.value = withTiming(0, { duration: 300, easing: Easing.inOut(Easing.ease) }, finished => {
      if (!finished) return;

      runOnJS(hide)();
    });
  };

  useEffect(() => {
    if (!autoClose || !visible) return;

    timer.current = setTimeout(() => {
      hideNotifier();
    }, duration);

    return () => clearTimeout(timer.current);
  }, [autoClose, duration, visible]);

  /** 关闭提示窗口 */
  const handleClose = () => {
    hideNotifier();

    // 执行传入的方法
    onCloseRef.current?.();
  };

  /** 点击提示窗口 */
  const handlePress = () => {
    hideNotifier();

    // 执行传入的方法
    onPressRef.current?.();
  };

  // 提示窗口的位置
  const style = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(displayed.value, [0, 1], [startY, endY]),
      },
    ],
  }));

  // 提示窗口的阴影颜色和背景色
  const { shadowColor, bgColor } = useMemo(() => {
    switch (type) {
      case NotifyType.FAIL:
        return {
          shadowColor: theme.colors.func600,
          bgColor: theme.colors.white,
        };
      case NotifyType.INFO:
      case NotifyType.SUCCESS:
      default:
        return {
          shadowColor: theme.colors.primary200,
          bgColor: theme.colors.white,
        };
    }
  }, [type, theme]);

  return {
    rendered,
    shadowColor,
    bgColor,
    style,

    handleClose: useMemoizedFn(handleClose),
    handlePress: useMemoizedFn(handlePress),
  };
}
