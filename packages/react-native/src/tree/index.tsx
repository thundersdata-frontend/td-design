import React, { FC, ReactNode, useEffect, useState } from 'react';
import { View, FlatList, VirtualizedList, SectionList } from 'react-native';
import Flex from '../flex';
import Text from '../text';
import Icon from '../icon';
import { isEmpty } from 'lodash-es';
import Animated from 'react-native-reanimated';
import { px, ONE_PIXEL } from '../helper';
import Box from '../box';
import TreeItem from './treeItem';
import { flattenTreeData, arrAdd, arrDel, getTreeNodeProps, getTreeNodeLevel } from './util';
import { EventDataNode, DataNode, FlattenNode, TreeItemProps } from './type';

interface TreeProps {
  /** 树的节点数据 */
  treeData?: TreeItemProps[];
  /** 禁用整棵树 */
  disabled?: boolean;
  /** 是否可以选择的 */
  checkable?: boolean;
  /** 选中的节点受控的  */
  checkedKeys?: string[];
  /**  */
  checkStrictly?: boolean;
  defaultCheckedKeys?: string[];
  defaultExpandAll?: boolean;
  /** 默认展开节点 */
  defaultExpandedKeys?: string[];
  defaultExpandParent?: boolean;
  /** 展开的节点 */
  expandedKeys?: string[];
  filterTreeNode?: boolean;
  height?: number;
  icon?: (props: TreeItemProps) => ReactNode | ReactNode;
  multiple?: boolean;
  selectable?: boolean;
  selectedKeys?: string[];
  showIcon?: boolean;
  switcherIcon?: boolean;
  titleRender?: (props: TreeItemProps) => ReactNode | ReactNode;
  virtual?: boolean;
  onCheck?: (keys: Array<string>) => void;
  onLoad?: () => void;
  onSelect?: () => void;
  onExpand?: () => void;
}

const Tree: FC<TreeProps> = props => {
  const {
    treeData = [],
    selectedKeys = [],
    checkedKeys: controlledCheckedKeys = [],
    disabled = false,
    expandedKeys: controlledExpandedKeys = [],
    onExpand,
    onCheck,
    checkable = true,
  } = props;

  const [flattenNodes, setFlattenNodes] = useState<any>([]);

  const [expandedKeys, setExpandedKeys] = useState<Array<string>>([]);
  const [checkedKeys, setCheckedKeys] = useState<Array<string>>([]);
  const [treeLeve, setTreeLeve] = useState<{ [key: string]: number }>();

  /**
   * 只更新props中没有的值
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
  }, [treeData, expandedKeys]);

  /**
   * 获取节点级别
   */

  useEffect(() => {
    const treeLeve = getTreeNodeLevel(treeData);
    setTreeLeve(treeLeve);
  }, [treeData]);

  /** 展开节点受控 */
  useEffect(() => {
    if (!isEmpty(controlledExpandedKeys)) {
      setExpandedKeys(controlledExpandedKeys);
    }
  }, [controlledExpandedKeys]);

  /** 节点选中受控 */
  useEffect(() => {
    if (!isEmpty(controlledCheckedKeys)) {
      setCheckedKeys(controlledCheckedKeys);
    }
  }, [controlledCheckedKeys]);

  const updataExpandedKeys = (keyArr: string[]) => {
    setExpandedKeys(keyArr);
  };
  const onNodeExpand = (treeNode: EventDataNode) => {
    const { key, expanded } = treeNode;

    let arrKeys = [];

    const targetExpanded = !expanded;

    if (targetExpanded) {
      arrKeys = arrAdd(expandedKeys, key);
    } else {
      arrKeys = arrDel(expandedKeys, key);
    }
    updataExpandedKeys(arrKeys);

    if (onExpand) {
    }
  };

  const handlerClick = (treeNode: EventDataNode) => {
    onNodeExpand(treeNode);
  };

  const handlerCheck = (treeNode: EventDataNode) => {
    const { key, checked } = treeNode;

    let arrKeys = [];
    const targetChecked = !checked;

    if (targetChecked) {
      arrKeys = arrAdd(checkedKeys, key);
    } else {
      arrKeys = arrDel(checkedKeys, key);
    }
    onCheck?.(arrKeys);
    setUncontrolledState('checkedKeys', arrKeys, setCheckedKeys);
  };

  const treeRender = ({ item }: { item: FlattenNode; index: number }) => {
    const treeNodeProps = getTreeNodeProps(item.key, {
      expandedKeys,
      selectedKeys: selectedKeys,
      checkedKeys: checkedKeys,
    });
    return (
      <>
        <TreeItem
          checkable={checkable}
          disabled={disabled}
          {...treeNodeProps}
          {...item}
          onClick={handlerClick}
          onCheck={handlerCheck}
          level={treeLeve?.[item.key] || 1}
        />
      </>
    );
  };

  return <FlatList data={flattenNodes} renderItem={treeRender}></FlatList>;
};

export default Tree;
