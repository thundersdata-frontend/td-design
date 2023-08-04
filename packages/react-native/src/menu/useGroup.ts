import { useEffect } from 'react';
import { LayoutChangeEvent } from 'react-native';
import { interpolate, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { useMemoizedFn, useSafeState } from '@td-design/rn-hooks';

export default function useGroup({
  openKeys,
  setOpenKeys,
  id,
}: {
  id: string;
  openKeys: string[];
  setOpenKeys: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  const progress = useSharedValue(0);
  const [bodySectionHeight, setBodySectionHeight] = useSafeState(0);

  const handleLayout = (e: LayoutChangeEvent) => {
    setBodySectionHeight(Math.ceil(e.nativeEvent.layout.height));
  };

  const bodyStyle = useAnimatedStyle(() => {
    return {
      height: interpolate(progress.value, [0, 1], [0, bodySectionHeight]),
    };
  });

  /** 默认展开菜单 */
  useEffect(() => {
    if (openKeys.length === 0) return;

    progress.value = withTiming(!openKeys.includes(id) ? 0 : 1);
  }, [openKeys]);

  const handlePress = () => {
    if (progress.value === 0) {
      // 打开菜单
      setOpenKeys(keys => [...keys, id]);
      progress.value = withTiming(1);
    } else {
      // 关闭菜单
      setOpenKeys(keys => keys.filter(key => key !== id));
      progress.value = withTiming(0);
    }
  };

  return {
    bodyStyle,
    progress,

    handleLayout: useMemoizedFn(handleLayout),
    handlePress: useMemoizedFn(handlePress),
  };
}
