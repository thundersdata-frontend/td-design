import { useEffect } from 'react';
import {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';
import { clamp } from 'react-native-redash';

import { useLatest } from '@td-design/rn-hooks';

import type { SliderProps } from '.';

export default function useSlider({
  min = 0,
  max = 100,
  value = 0,
  onChange,
  oneStepValue,
  knobWidth,
}: Pick<SliderProps, 'min' | 'max' | 'value' | 'onChange'> & { oneStepValue: number; knobWidth: number }) {
  const translateX = useSharedValue(value * oneStepValue);
  const onChangeRef = useLatest(onChange);

  useEffect(() => {
    translateX.value = value * oneStepValue;
  }, [oneStepValue, translateX, value]);

  const progressStyle = useAnimatedStyle(() => ({
    width: translateX.value + knobWidth,
  }));
  const knobStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  const label = useDerivedValue(() => {
    const step = Math.ceil(translateX.value / oneStepValue);
    return String(step);
  });

  const onGestureEvent = useAnimatedGestureHandler({
    onStart(_, ctx: Record<string, number>) {
      ctx.offsetX = translateX.value;
    },
    onActive(event, ctx) {
      translateX.value = clamp(event.translationX + ctx.offsetX, min * oneStepValue, max * oneStepValue);
    },
    onEnd() {
      if (onChangeRef.current) {
        runOnJS(onChangeRef.current)(Number(label.value));
      }
    },
  });

  return { progressStyle, knobStyle, onGestureEvent, label };
}
