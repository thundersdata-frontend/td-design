import React, { FC } from 'react';

import { getTreeNodeProps } from '../util';
import { FlattenNode, TreeProps } from '../type';
import { ScrollView } from 'react-native';
import TreeNode from './TreeNode';
import { useTree } from './useTree';

const Tree: FC<TreeProps> = props => {
  const {
    flattenNodes,
    handleNodeExpand,
    handlerCheck,
    containerStyle,
    expandedKeys,
    checkedKeys,
    keyEntities,
    icon,
    checkable,
    disabled,
    showIcon,
  } = useTree(props);

  const treeRender = (item: FlattenNode) => {
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
  return <ScrollView style={containerStyle}>{flattenNodes.map(item => treeRender(item))}</ScrollView>;
};

export default React.memo(Tree);
