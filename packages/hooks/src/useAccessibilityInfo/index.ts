import { useEffect } from 'react';
import { AccessibilityChangeEventName, AccessibilityInfo } from 'react-native';

import useSafeState from '../useSafeState';

type AccessibilityInfoStaticInitializers =
  | 'isBoldTextEnabled'
  | 'isScreenReaderEnabled'
  | 'isGrayscaleEnabled'
  | 'isInvertColorsEnabled'
  | 'isReduceMotionEnabled'
  | 'isReduceTransparencyEnabled';

function useAccessibilityStateListener(
  eventName: AccessibilityChangeEventName,
  initializerName: AccessibilityInfoStaticInitializers
) {
  const [isEnabled, setIsEnabled] = useSafeState<boolean | undefined>(undefined);

  useEffect(() => {
    if (!AccessibilityInfo[initializerName]) return;

    AccessibilityInfo[initializerName]().then(setIsEnabled);

    const subscription = AccessibilityInfo.addEventListener(eventName, setIsEnabled);

    return () => {
      if (typeof subscription?.remove === 'function') {
        subscription.remove();
      } else {
        // @ts-ignore - need update @types/react-native@0.65.x
        AccessibilityInfo.removeEventListener(eventName, setIsEnabled);
      }
    };
  }, [eventName, initializerName, setIsEnabled]);

  return isEnabled;
}

export default function useAccessibilityInfo() {
  // 字体加粗（IOS）
  const boldTextEnabled = useAccessibilityStateListener('boldTextChanged', 'isBoldTextEnabled');
  // 灰色模式（IOS。色盲使用）
  const grayscaleEnabled = useAccessibilityStateListener('grayscaleChanged', 'isGrayscaleEnabled');
  // 反转显示屏的颜色（IOS）
  const invertColorsEnabled = useAccessibilityStateListener('invertColorsChanged', 'isInvertColorsEnabled');
  // 减弱动态效果
  const reduceMotionEnabled = useAccessibilityStateListener('reduceMotionChanged', 'isReduceMotionEnabled');
  // 降低透明度 (IOS)
  const reduceTransparencyEnabled = useAccessibilityStateListener(
    'reduceTransparencyChanged',
    'isReduceTransparencyEnabled'
  );
  // 是否启用读屏应用
  const screenReaderEnabled = useAccessibilityStateListener('screenReaderChanged', 'isScreenReaderEnabled');

  return {
    screenReaderEnabled,
    grayscaleEnabled,
    invertColorsEnabled,
    reduceMotionEnabled,
    reduceTransparencyEnabled,
    boldTextEnabled,
  };
}
