import { useLatest, useMemoizedFn } from '@td-design/rn-hooks';
import {
  Easing,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { useTheme } from '@shopify/restyle';

import type { SwipeRowProps } from '.';
import { Theme } from '../theme';
import helpers from '../helpers';
import { useContext, useEffect } from 'react';
import { SwipeRowContext } from './context';

const { deviceWidth } = helpers;
export default function useSwipeRow({
  anchor,
  onRemove,
  height,
  maxTranslate,
}: Pick<SwipeRowProps, 'onRemove' | 'height' | 'anchor'> & { maxTranslate: number }) {
  const onRemoveRef = useLatest(onRemove);
  const theme = useTheme<Theme>();
  const { changeState, id } = useContext(SwipeRowContext);

  const springConfig = (velocity: number) => {
    'worklet';
    return {
      stiffness: 1000,
      damping: 500,
      mass: 3,
      overshootClamping: true,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 0.01,
      velocity,
    };
  };
  const timingConfig = {
    duration: 400,
    easing: Easing.bezierFn(0.25, 0.1, 0.25, 1),
  };

  const removing = useSharedValue(false);
  const translateX = useSharedValue(0);

  useEffect(() => {
    if (id === anchor) {
      translateX.value = withSpring(0, springConfig(10));
    }
  }, [anchor, id, translateX]);

  const handler = useAnimatedGestureHandler({
    onStart(_, ctx: Record<string, number>) {
      ctx.offsetX = translateX.value;
    },
    onActive(evt, ctx) {
      translateX.value = evt.translationX + ctx.offsetX;
    },
    onEnd(evt) {
      if (evt.velocityX < -20) {
        translateX.value = withSpring(maxTranslate, springConfig(evt.velocityX));
      } else {
        translateX.value = withSpring(0, springConfig(evt.velocityX));
      }
      runOnJS(changeState)(anchor);
    },
  });

  const wrapStyle = useAnimatedStyle(() => {
    if (removing.value) {
      return {
        height: withTiming(0, timingConfig),
        transform: [{ translateX: withTiming(-deviceWidth, timingConfig) }],
      };
    }
    return {
      height,
      width: deviceWidth,
      backgroundColor: theme.colors.white,
      transform: [{ translateX: translateX.value }],
    };
  });

  const buttonStyle = useAnimatedStyle(() => {
    if (removing.value) {
      return {
        height: withTiming(0, timingConfig),
      };
    }
    return {
      height,
    };
  });

  const handleRemove = async () => {
    if (!onRemoveRef.current) {
      removing.value = true;
      return;
    }
    const result = await onRemoveRef.current();
    removing.value = result;
  };

  return {
    theme,
    handler,
    wrapStyle,
    buttonStyle,
    handleRemove: useMemoizedFn(handleRemove),
  };
}
