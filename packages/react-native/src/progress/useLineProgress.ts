import { useAnimatedProps, useSharedValue, withTiming } from 'react-native-reanimated';

import { ProgressProps } from './type';

export default function useLineProgress({
  width = 0,
  strokeWidth = 0,
  value = 0,
  showUnit,
}: Pick<ProgressProps, 'width' | 'strokeWidth' | 'value' | 'showUnit'>) {
  const progressWidth = useSharedValue(withTiming((value * width) / 100 - strokeWidth / 2, { duration: 600 }));
  const textLabel = useSharedValue(showUnit ? `${value}%` : `${value}`);

  const animatedProps = useAnimatedProps(() => ({
    x2: progressWidth.value,
  }));

  return { textLabel, animatedProps };
}
