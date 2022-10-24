import { useLatest, useUpdateEffect } from '@td-design/rn-hooks';
import { Gesture } from 'react-native-gesture-handler';
import { runOnJS, useAnimatedStyle, useDerivedValue, useSharedValue } from 'react-native-reanimated';
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
  const onChangeRef = useLatest(onChange);
  const translateX = useSharedValue(value * oneStepValue);
  const startPosition = useSharedValue(0);

  useUpdateEffect(() => {
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

  const gesture = Gesture.Pan()
    .onStart(() => {
      startPosition.value = translateX.value;
    })
    .onUpdate(e => {
      translateX.value = clamp(e.translationX + startPosition.value, min * oneStepValue, max * oneStepValue);
    })
    .onEnd(() => {
      if (onChangeRef.current) {
        runOnJS(onChangeRef.current)(Number(label.value));
      }
    });

  return { progressStyle, knobStyle, label, gesture };
}
