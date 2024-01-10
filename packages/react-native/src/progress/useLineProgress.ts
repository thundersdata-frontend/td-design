import { useEffect } from 'react';
import { useAnimatedProps, useSharedValue, withTiming } from 'react-native-reanimated';

import { ProgressProps } from './type';

export default function useLineProgress({
  width = 0,
  strokeWidth = 0,
  value = 0,
  unit,
}: Pick<ProgressProps, 'width' | 'strokeWidth' | 'value' | 'unit'>) {
  const progress = useSharedValue(0);
  const textLabel = useSharedValue('');

  useEffect(() => {
    progress.value = withTiming((value * width) / 100 - strokeWidth / 2, { duration: 600 });
    textLabel.value = unit ? `${value}${unit}` : `${value}`;
  }, [value, width, strokeWidth, unit]);

  const animatedProps = useAnimatedProps(() => ({
    x2: progress.value,
  }));

  return { textLabel, animatedProps };
}
