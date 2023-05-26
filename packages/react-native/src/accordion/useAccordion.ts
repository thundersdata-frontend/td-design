import { useEffect } from 'react';
import { Easing, interpolate, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { mix } from 'react-native-redash';

import { useSafeState } from '@td-design/rn-hooks';

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
  const progress = useSharedValue(0);
  const [bodySectionHeight, setBodySectionHeight] = useSafeState(0);

  const bodyHeight = useAnimatedStyle(() => {
    return {
      height: interpolate(progress.value, [0, 1], [0, bodySectionHeight]),
    };
  });

  const iconStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotateZ: `${mix(progress.value, 0, Math.PI)}rad`,
        },
      ],
    };
  });

  useEffect(() => {
    if (currentIndex === undefined) return;

    if (!multiple) {
      if (currentIndex !== index) {
        progress.value = withTiming(0, {
          duration: 300,
          easing: Easing.bezier(0.4, 0.0, 0.2, 1),
        });
      } else {
        progress.value = withTiming(1, {
          duration: 300,
          easing: Easing.bezier(0.4, 0.0, 0.2, 1),
        });
      }
    }
  }, [multiple, currentIndex, index, onPress]);

  const toggleButton = () => {
    onPress(index);

    if (progress.value === 0) {
      progress.value = withTiming(1, {
        duration: 300,
        easing: Easing.bezier(0.4, 0.0, 0.2, 1),
      });
    } else {
      progress.value = withTiming(0, {
        duration: 300,
        easing: Easing.bezier(0.4, 0.0, 0.2, 1),
      });
    }
  };

  return {
    bodyHeight,
    iconStyle,
    progress,

    setBodySectionHeight,
    toggleButton,
  };
}
