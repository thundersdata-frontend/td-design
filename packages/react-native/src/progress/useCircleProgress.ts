import { useEffect } from 'react';
import { useAnimatedProps, useSharedValue, withTiming } from 'react-native-reanimated';

import { ProgressProps } from './type';

export default function useCircleProgress({
  width = 0,
  strokeWidth = 0,
  value = 0,
  showUnit,
}: Pick<ProgressProps, 'width' | 'strokeWidth' | 'value' | 'showUnit'>) {
  const radius = (width - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const progress = useSharedValue(0);
  const label = useSharedValue('');

  useEffect(() => {
    progress.value = withTiming(value, { duration: 600 });
    label.value = showUnit ? `${value}%` : `${value}`;
  }, [circumference, label, progress, showUnit, value]);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: circumference - (progress.value * circumference) / 100,
  }));

  return { radius, label, circumference, animatedProps };
}
