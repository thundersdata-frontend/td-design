import { useEffect } from 'react';
import { useAnimatedProps, useSharedValue, withTiming } from 'react-native-reanimated';

import { ProgressProps } from './type';

export default function useLineProgress({
  width = 0,
  strokeWidth = 0,
  value = 0,
  showUnit,
}: Pick<ProgressProps, 'width' | 'strokeWidth' | 'value' | 'showUnit'>) {
  const progress = useSharedValue((value * width) / 100 - strokeWidth / 2);
  const textLabel = useSharedValue(showUnit ? `${value}%` : `${value}`);

  useEffect(() => {
    progress.value = withTiming((value * width) / 100 - strokeWidth / 2, { duration: 600 });
    textLabel.value = showUnit ? `${value}%` : `${value}`;
  }, [value, width, strokeWidth, showUnit]);

  const animatedProps = useAnimatedProps(() => ({
    x2: progress.value,
  }));

  return { textLabel, animatedProps };
}
