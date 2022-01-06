import { useEffect } from 'react';
import { useMount } from '@td-design/rn-hooks';
import { useTheme } from '@shopify/restyle';
import { Easing, runOnJS, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { mix } from 'react-native-redash';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import helpers from '../helpers';
import { Theme } from '../theme';
import { normalShadowOpt, ToastProps, ToastType } from './ToastContainer';

const { px } = helpers;
export default function useToast({
  position,
  duration,
  autoClose,
  type,
  onClose,
}: Pick<ToastProps, 'autoClose' | 'duration' | 'position' | 'onClose'> & { type: ToastType }) {
  const theme = useTheme<Theme>();
  const insets = useSafeAreaInsets();

  const startY = [ToastType.SUCCESS, ToastType.FAIL].includes(type)
    ? normalShadowOpt.height + 50
    : normalShadowOpt.height + 10;

  const endY = position === 'top' ? insets.top : -insets.bottom - px(20);

  const displayed = useSharedValue(0);
  useMount(() => {
    displayed.value = withSpring(1);
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      if (autoClose) {
        displayed.value = withTiming(0, { duration: 300, easing: Easing.inOut(Easing.ease) }, () => {
          if (onClose) {
            runOnJS(onClose)();
          }
        });
        clearTimeout(timer);
      }
    }, duration);

    return () => clearTimeout(timer);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoClose, displayed, duration]);

  const style = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: mix(displayed.value, startY, endY),
      },
    ],
  }));

  const getColorByType = (type: ToastType) => {
    switch (type) {
      case ToastType.FAIL:
        return {
          shadowColor: theme.colors.func600,
          bgColor: theme.colors.white,
        };
      case ToastType.INFO:
      case ToastType.SUCCESS:
      case ToastType.LOADING:
      default:
        return {
          shadowColor: theme.colors.primary200,
          bgColor: theme.colors.white,
        };
    }
  };

  const { shadowColor, bgColor } = getColorByType(type);

  return { shadowColor, bgColor, style };
}
