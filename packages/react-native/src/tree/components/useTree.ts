import { useEffect, useState, useRef } from 'react';

import { flattenTreeData, arrAdd, arrDel, getTreeNodeLevel, conductCheck } from '../util';
import { EventDataNode, FlattenNode, EntityNode, TreeProps } from '../type';

import { useLatest, useMemoizedFn } from '@td-design/rn-hooks';
import { useImmer } from 'use-immer';

export function useTree(props: TreeProps) {
  const {
    height,
    treeData = [],
    disabled = false,
    onExpand,
    onCheck,
    checkable = true,
    checkStrictly = false,
    defaultCheckedKeys = [],
    defaultExpandAll = false,
    defaultExpandedKeys = [],
    showIcon = true,
    icon,
  } = props;

  const defaultExpandAllRef = useRef<boolean>();

  const onExpandRef = useLatest(onExpand);
  const onCheckRef = useLatest(onCheck);

  const [flattenNodes, setFlattenNodes] = useImmer<Array<FlattenNode>>([]);

  const [expandedKeys, setExpandedKeys] = useImmer<Array<string>>(defaultExpandedKeys);
  const [checkedKeys, setCheckedKeys] = useImmer<Array<string>>(defaultCheckedKeys);
  const [keyEntities, setKeyEntities] = useState<Record<string, EntityNode>>();

  /**
   * 只更新props中没有的值使,其可以受控也可以不受控
   */
  const setUncontrolledState = <T extends unknown>(name: keyof TreeProps, state: T, callback: (state: T) => void) => {
    if (!props[name]) {
      callback(state);
    }
  };

  /** 根据展开的数据渲染视图 */
  useEffect(() => {
    const data = flattenTreeData(treeData, expandedKeys);
    setFlattenNodes(data);
  }, [treeData, expandedKeys, setFlattenNodes]);

  /**
   * 获取节点实体类
   * 判断是否默认展开所有
   */
  useEffect(() => {
    const keyEntities = getTreeNodeLevel(treeData);
    if (defaultExpandAllRef?.current === undefined && defaultExpandAll) {
      const expandedKeys = Object.keys(keyEntities);
      setExpandedKeys(expandedKeys);
    }
    defaultExpandAllRef.current = defaultExpandAll;
    setKeyEntities(keyEntities);
  }, [defaultExpandAll, setExpandedKeys, treeData]);

  /**
   * 展开节点受控
   */
  useEffect(() => {
    if (props.expandedKeys) {
      setExpandedKeys(props.expandedKeys);
    }
  }, [props.expandedKeys, setExpandedKeys]);

  /**
   * 节点选中受控
   */
  useEffect(() => {
    if (props.checkedKeys) {
      setCheckedKeys(props.checkedKeys);
    }
  }, [props.checkedKeys, setCheckedKeys]);

  /**更新展开的值*/
  const updateExpandedKeys = (keyArr: string[]) => {
    setUncontrolledState('expandedKeys', keyArr, setExpandedKeys);
  };
  /**
   * 节点展开,回调上层的onExpand事件
   */
  const handleNodeExpand = (treeNode: EventDataNode) => {
    const { key, expanded } = treeNode;

    let arrKeys = [];

    const targetExpanded = !expanded;

    if (targetExpanded) {
      arrKeys = arrAdd(expandedKeys, key);
    } else {
      arrKeys = arrDel(expandedKeys, key);
    }
    updateExpandedKeys(arrKeys);
    onExpandRef.current?.(treeNode);
  };

  /**
   *
   * @param treeNode
   * 选中处理
   */
  const handlerCheck = (treeNode: EventDataNode) => {
    const { key, checked } = treeNode;

    let arrKeys: string[] = [];
    const targetChecked = !checked;

    //判断是否需要关联父子节点
    if (checkStrictly) {
      if (targetChecked) {
        arrKeys = arrAdd(checkedKeys, key);
      } else {
        arrKeys = arrDel(checkedKeys, key);
      }
    } else {
      arrKeys = conductCheck([...checkedKeys, key], keyEntities || {}, true);

      if (checked) {
        const keySet = new Set(checkedKeys);
        keySet.delete(key);
        arrKeys = conductCheck(Array.from(keySet), keyEntities || {}, { checked: false });
      }
    }

    onCheckRef.current?.(arrKeys);
    setUncontrolledState('checkedKeys', arrKeys, setCheckedKeys);
  };

  const containerStyle = height ? { height: height } : { flex: 1 };

  return {
    flattenNodes,
    handleNodeExpand: useMemoizedFn(handleNodeExpand),
    handlerCheck: useMemoizedFn(handlerCheck),
    containerStyle,
    expandedKeys,
    checkedKeys,
    keyEntities,
    icon,
    checkable,
    disabled,
    showIcon,
  };
}
