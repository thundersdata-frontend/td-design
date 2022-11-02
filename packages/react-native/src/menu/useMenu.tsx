import { useLatest, useMemoizedFn, useSafeState } from '@td-design/rn-hooks';
import React, { PropsWithChildren, ReactElement, useEffect } from 'react';

import helpers from '../helpers';
import type { IndexPath, MenuProps } from './type';

const { px } = helpers;
const ITEM_HEIGHT = px(40);
export default function useMenu({
  children,
  width,
  selectedIndex = {},
  onSelect,
  itemHeight = ITEM_HEIGHT,
  activeBgColor,
  inactiveBgColor,
  activeTextColor,
  inactiveTextColor,
}: PropsWithChildren<MenuProps>) {
  const onSelectRef = useLatest(onSelect);
  const [index, setIndex] = useSafeState<IndexPath>();

  const selectedIndexJsonStr = JSON.stringify(selectedIndex);
  useEffect(() => {
    try {
      const selectedIndex = JSON.parse(selectedIndexJsonStr);
      setIndex(selectedIndex);
    } catch (error) {
      throw new Error('selectedIndex格式不正确');
    }
  }, [selectedIndexJsonStr, setIndex]);

  const handleSelect = useMemoizedFn((selectedIndex: IndexPath) => {
    const newIndex = { ...index, ...selectedIndex };
    setIndex(newIndex);
    onSelectRef.current?.(newIndex);
  });

  return React.Children.map(children, child => {
    const { displayName } = (child as any).type;
    if (displayName === 'MenuGroup') {
      return React.cloneElement(child as ReactElement, {
        width,
        height: itemHeight,
        selectedIndex: index?.row,
        section: index?.section,
        onSelect: handleSelect,
        activeBgColor,
        inactiveBgColor,
        activeTextColor,
        inactiveTextColor,
      });
    } else if (displayName === 'MenuItem') {
      return React.cloneElement(child as ReactElement, {
        width,
        height: itemHeight,
        onSelect: handleSelect,
        selectedIndex: index?.row,
        inGroup: false,
        activeBgColor,
        inactiveBgColor,
        activeTextColor,
        inactiveTextColor,
      });
    } else {
      throw new Error('Menu子项必须是MenuGroup或者MenuItem');
    }
  });
}
