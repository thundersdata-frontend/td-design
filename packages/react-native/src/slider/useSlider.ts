import { useEffect } from 'react';
import {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';
import { clamp } from 'react-native-redash';

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
      // 判断当前停留的位置处于第几步
      const currentStep = translateX.value / oneStepValue;
      // 取余数进行判断，是否超过一半
      const remainder = currentStep % 1;
      if (remainder >= 0.5) {
        translateX.value = Math.ceil(currentStep) * oneStepValue;
      } else {
        translateX.value = Math.floor(currentStep) * oneStepValue;
      }

      if (onChange) {
        runOnJS(onChange)(translateX.value / oneStepValue);
      }
    },
  });

  return { progressStyle, knobStyle, onGestureEvent, label };
}
