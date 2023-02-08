import { useTheme } from '@shopify/restyle';
import { useMemoizedFn } from '@td-design/rn-hooks';
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

import helpers from '../helpers';
import { Theme } from '../theme';
import { normalShadowOpt, NotifyType } from './constant';
import { NotifyProps } from './type';

const screenHeight = Dimensions.get('screen').height;
const windowHeight = Dimensions.get('window').height;
const bottomNavigatorBarHeight = screenHeight - windowHeight;

export default function useNotify() {
  const insets = useSafeAreaInsets();
  const theme = useTheme<Theme>();
  const timer = useRef<ReturnType<typeof setTimeout>>();

  const [visible, setVisible] = useState(false);
  const [options, setOptions] = useState<(NotifyProps & { type: NotifyType }) | undefined>(undefined);

  const show = (params: NotifyProps & { type: NotifyType }) => {
    if (visible) return;

    setOptions(params);
    setVisible(true);
  };

  const displayed = useSharedValue(visible ? 1 : 0);

  useEffect(() => {
    if (visible) {
      displayed.value = withSpring(1);
    }
  }, [visible]);

  useEffect(() => {
    if (!visible || !options?.duration) return;

    timer.current = setTimeout(() => {
      displayed.value = withTiming(0, { duration: 300, easing: Easing.inOut(Easing.ease) }, finished => {
        if (finished) {
          runOnJS(() => {
            setVisible(false);
            clearTimeout(timer.current);
          })();
        }
      });
    }, options.duration);

    return () => clearTimeout(timer.current);
  }, [visible, options?.duration]);

  const startY = options?.type
    ? [NotifyType.SUCCESS, NotifyType.FAIL].includes(options.type)
      ? normalShadowOpt.height + helpers.px(50)
      : normalShadowOpt.height + helpers.px(10)
    : normalShadowOpt.height;

  const endY = -insets.bottom - bottomNavigatorBarHeight - (helpers.isIOS ? insets.bottom : 0);

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
    switch (options?.type) {
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
  }, [options?.type, theme]);

  return {
    options,
    shadowColor,
    bgColor,
    style,
    visible,

    show: useMemoizedFn(show),
  };
}
