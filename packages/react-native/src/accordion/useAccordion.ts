import { useEffect } from 'react';
import Animated, {
  measure,
  runOnUI,
  useAnimatedRef,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { useMemoizedFn } from '@td-design/rn-hooks';

export default function useAccordion({
  multiple,
  currentIndex,
  index,
  onPress,
}: {
  multiple: boolean;
  currentIndex?: number;
  index: number;
  onPress: (index: number) => void;
}) {
  const contentRef = useAnimatedRef<Animated.View>();
  const heightValue = useSharedValue(0);
  const open = useSharedValue(false);

  const progress = useDerivedValue(() => (open.value ? withTiming(1) : withTiming(0)));

  /** 如果 multiple=false，则非当前index的都要收起来 */
  useEffect(() => {
    if (!multiple && currentIndex !== index) {
      heightValue.value = withTiming(0);
      open.value = false;
    }
  }, [multiple, currentIndex, index]);

  const iconStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${progress.value * -180}deg` }],
  }));

  const heightStyle = useAnimatedStyle(() => ({
    height: heightValue.value,
  }));

  const handlePress = () => {
    if (heightValue.value === 0) {
      runOnUI(() => {
        'worklet';
        heightValue.value = withTiming(measure(contentRef)?.height ?? 0);
      })();
    } else {
      heightValue.value = withTiming(0);
    }
    open.value = !open.value;
    onPress(index);
  };

  return {
    contentRef,
    iconStyle,
    heightStyle,
    handlePress: useMemoizedFn(handlePress),
    progress,
  };
}
