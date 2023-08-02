import React, { FC } from 'react';
import { FlatList, ListRenderItemInfo } from 'react-native';

import { FlattenNode, TreeProps } from '../type';
import { getTreeNodeProps } from '../util';
import TreeNode from './TreeNode';
import { useTree } from './useTree';

const Tree: FC<TreeProps> = props => {
  const {
    flattenNodes,
    handleNodeExpand,
    handlerCheck,
    keyExtractor,
    containerStyle,
    expandedKeys,
    checkedKeys,
    keyEntities,
    icon,
    checkable,
    disabled,
    showIcon,
  } = useTree(props);

  const renderTreeNode = ({ item }: ListRenderItemInfo<FlattenNode>) => {
    const treeNodeProps = getTreeNodeProps(item.key, {
      expandedKeys,
      checkedKeys: checkedKeys,
    });
    const level = keyEntities?.[item.key].level;
    const itemIcon = keyEntities?.[item.key].data.icon || icon;
    return (
      <TreeNode
        icon={itemIcon}
        checkable={checkable}
        disabled={disabled}
        {...treeNodeProps}
        {...item}
        showIcon={showIcon}
        onClick={handleNodeExpand}
        onCheck={handlerCheck}
        level={!!level || level == 0 ? level : 1}
      />
    );
  };
  return (
    <FlatList
      contentContainerStyle={containerStyle}
      keyExtractor={keyExtractor}
      renderItem={renderTreeNode}
      data={flattenNodes}
    />
  );
};
Tree.displayName = 'Tree';

export default Tree;
