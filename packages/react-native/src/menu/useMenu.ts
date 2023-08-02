import { useEffect, useMemo } from 'react';

import { useMemoizedFn, useSafeState } from '@td-design/rn-hooks';

import type { MenuItemProps, MenuProps } from './type';

type FlattenedMenuItem = MenuItemProps & { parentId?: string };

export default function useMenu({
  items,
  onSelect,
  selectedKey,
  defaultSelectedKey,
  multiple,
}: Pick<MenuProps, 'items' | 'onSelect' | 'defaultSelectedKey' | 'selectedKey' | 'multiple'>) {
  const [currentKey, setCurrentKey] = useSafeState<string>();
  const [openKeys, setOpenKeys] = useSafeState<string[]>([]);

  const flattenItems = useMemo(() => {
    const flattenItems: FlattenedMenuItem[] = [];

    const flatten = (items: MenuProps['items'], parentId?: string) => {
      items.forEach(item => {
        const flattenedItem: FlattenedMenuItem = { ...item, parentId };
        flattenItems.push(flattenedItem);
        if (item.items) {
          flatten(item.items, item.id);
        }
      });
    };

    flatten(items);

    return flattenItems;
  }, [items]);

  /** 设置当前选中的子菜单 */
  useEffect(() => {
    setCurrentKey(selectedKey || defaultSelectedKey);
  }, [selectedKey, defaultSelectedKey]);

  /** 设置当前展开的菜单组 */
  useEffect(() => {
    const openKeys = new Set<string>();

    const findOpenKeys = (key: string) => {
      const item = flattenItems.find(item => item.id === key);
      if (item?.parentId) {
        openKeys.add(item.parentId);
        findOpenKeys(item.parentId);
      }
    };

    if (currentKey) {
      findOpenKeys(currentKey);
    }

    if (multiple) {
      setOpenKeys(keys => [...openKeys, ...keys]);
    } else {
      setOpenKeys([...openKeys]);
    }
  }, [currentKey, flattenItems]);

  const handleSelect = (key: string) => {
    setCurrentKey(key);
    onSelect?.(key);
  };

  return {
    currentKey,
    openKeys,
    handleSelect: useMemoizedFn(handleSelect),
    setOpenKeys,
  };
}
