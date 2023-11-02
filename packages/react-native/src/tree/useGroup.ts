import { useEffect, useMemo } from 'react';
import { LayoutChangeEvent } from 'react-native';
import { interpolate, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { useMemoizedFn, useSafeState } from '@td-design/rn-hooks';

import { TreeItemProps } from './type';
import { useTree } from './useTree';
import { findAllChildrenIds } from './util';

export default function useGroup({
  id,
  openedKeys,
  currentKeys,
  flatData,
  handleExpand,
}: Omit<ReturnType<typeof useTree>, 'handleCheck'> & Pick<TreeItemProps, 'id'>) {
  const progress = useSharedValue(0);
  const [bodySectionHeight, setBodySectionHeight] = useSafeState(0);

  const handleLayout = (e: LayoutChangeEvent) => {
    setBodySectionHeight(Math.floor(e.nativeEvent.layout.height));
  };

  const bodyStyle = useAnimatedStyle(() => {
    return {
      height: interpolate(progress.value, [0, 1], [0, bodySectionHeight]),
    };
  });

  /** 默认展开菜单 */
  useEffect(() => {
    if (openedKeys.length === 0) return;

    progress.value = withTiming(!openedKeys.includes(id) ? 0 : 1);
  }, [openedKeys]);

  const handlePress = () => {
    handleExpand(id);
    progress.value = withTiming(progress.value === 0 ? 1 : 0);
  };

  /**
   * 根据id和currentKeys计算是否选中，有三种情况：
   * 1. 自己的所有下级节点都已经选中，这时候自己的选中状态是 `all`;
   * 2. 自己的所有下级节点有部分选中，这时候自己的选中状态是 `half`;
   * 3. 自己的所有下级节点都没有选中，这时候自己的选中状态是 `none`;
   */
  const checkStatus = useMemo(() => {
    console.log(currentKeys);
    const item = flatData.find(item => item.id === id);
    if (!item) return 'none';

    if (currentKeys.includes(id)) return 'all';

    if (item.disabled) return 'none';

    // 遍历找到这个id所有的下级节点
    const childrenIds = findAllChildrenIds(id, flatData);
    if (childrenIds.length === 0) return 'none';

    const isAllChecked = childrenIds.every(item => currentKeys.includes(item));
    const isHalfChecked = childrenIds.some(item => currentKeys.includes(item));

    if (isAllChecked) {
      return 'all';
    } else if (isHalfChecked) {
      return 'half';
    } else {
      return 'none';
    }
  }, [currentKeys]) as 'all' | 'half' | 'none';

  return {
    bodyStyle,
    progress,
    checkStatus,

    handleLayout,
    handlePress: useMemoizedFn(handlePress),
  };
}
