import { useEffect, useMemo } from 'react';

import { useMemoizedFn, useSafeState } from '@td-design/rn-hooks';

import { TreeProps } from './type';
import { findAllChildrenIds, findAllParentIds, flattenData, loopAllParents } from './util';

export function useTree({
  data,
  checkable,
  checkedKeys,
  defaultCheckedKeys,
  onCheck,
  defaultExpandedKeys,
  expandedKeys,
  expandAll,
  onExpand,
}: Omit<TreeProps, 'disabled' | 'showIcon' | 'style' | 'customExpandIcon'>) {
  // 当前选中的节点
  const [currentKeys, setCurrentKeys] = useSafeState<string[]>([]);
  // 当前展开的节点
  const [openedKeys, setOpenedKeys] = useSafeState<string[]>([]);

  /** 将data打平 */
  const flatData = useMemo(() => flattenData(data), [data]);

  /** 根据checkable、checkedKeys、defaultCheckedKeys， 设置当前选中的节点 */
  useEffect(() => {
    if (checkable) {
      if (checkedKeys && checkedKeys.length > 0) {
        setCurrentKeys(checkedKeys);
      } else if (defaultCheckedKeys && defaultCheckedKeys.length > 0) {
        setCurrentKeys(defaultCheckedKeys);
      }
    }
  }, [checkable, checkedKeys, defaultCheckedKeys]);

  /** 根据expandAll、expandedKeys、defaultExpandedKeys， 设置当前展开的节点 */
  useEffect(() => {
    if (expandAll) {
      setOpenedKeys(flatData.filter(item => Boolean(item.parentId)).map(item => item.parentId!));
    } else if (expandedKeys && expandedKeys.length > 0) {
      // 遍历expandedKeys，找到每个节点的所有上级节点
      const expandedKeysWithParents = expandedKeys.reduce((arr, item) => {
        arr = arr.concat(findAllParentIds(item, flatData));
        return arr;
      }, [] as string[]);

      setOpenedKeys(expandedKeysWithParents);
    } else if (defaultExpandedKeys && defaultExpandedKeys.length > 0) {
      // 遍历defaultExpandedKeys， 找到每个节点的所有上级节点
      const defaultExpandedKeysWithParents = defaultExpandedKeys.reduce((arr, item) => {
        arr = arr.concat(findAllParentIds(item, flatData));
        return arr;
      }, [] as string[]);

      setOpenedKeys(defaultExpandedKeysWithParents);
    }
  }, [flattenData, expandAll, expandedKeys, defaultExpandedKeys]);

  /** 选中一个节点时的回调事件 */
  const handleCheck = (key: string) => {
    if (!checkable) return;

    const index = currentKeys.indexOf(key); // 获取当前节点在已选中节点数组中的索引
    let newKeys: string[] = [];
    if (index > -1) {
      newKeys = currentKeys.filter(item => item !== key);
    } else {
      newKeys = [...currentKeys, key];
    }

    // 找到这个节点的所有下级节点
    const childrenIds = findAllChildrenIds(key, flatData);
    if (childrenIds.length > 0) {
      if (index > -1) {
        // 如果当前节点已经选中，那么这个节点的所有下级节点都应该取消选中
        newKeys = newKeys.filter(item => !childrenIds.includes(item));
      } else {
        // 如果当前节点没有选中，那么这个节点的所有下级节点都应该选中
        newKeys = Array.from(new Set([...newKeys, ...childrenIds]));
      }
    }

    // 遍历这个节点的所有上级节点，看是否要选中它们
    loopAllParents(key, flatData, newKeys);

    // 对newKeys去重
    newKeys = Array.from(new Set(newKeys));

    setCurrentKeys(newKeys);
    onCheck?.(newKeys);
  };

  /** 展开一个节点时的回调事件 */
  const handleExpand = (key: string) => {
    const index = openedKeys.indexOf(key);
    let newKeys: string[] = [];
    if (index > -1) {
      newKeys = openedKeys.filter(item => item !== key);
    } else {
      newKeys = [...openedKeys, key];
    }
    setOpenedKeys(newKeys);
    onExpand?.(newKeys);
  };

  return {
    currentKeys,
    openedKeys,
    flatData,

    handleCheck: useMemoizedFn(handleCheck),
    handleExpand: useMemoizedFn(handleExpand),
  };
}
