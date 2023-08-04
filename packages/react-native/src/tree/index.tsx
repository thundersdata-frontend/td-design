import React, { FC } from 'react';
import { ScrollView } from 'react-native';

import TreeGroup from './TreeGroup';
import TreeNode from './TreeNode';
import { TreeItemProps, TreeProps } from './type';
import { useTree } from './useTree';

const Tree: FC<TreeProps> = ({
  data,
  style,
  nodeStyle,
  checkable = true,
  activeOpacity = 0.6,
  checkedKeys,
  defaultCheckedKeys,
  onCheck,
  defaultExpandedKeys,
  expandedKeys,
  expandAll,
  onExpand,
  customExpandIcon,
}) => {
  const { currentKeys, openedKeys, flatData, handleCheck, handleExpand } = useTree({
    data,
    checkable,
    checkedKeys,
    defaultCheckedKeys,
    onCheck,
    defaultExpandedKeys,
    expandedKeys,
    expandAll,
    onExpand,
  });

  const renderItem = (item: TreeItemProps, level: number) => {
    if (item.items && Array.isArray(item.items) && item.items.length > 0) {
      return (
        <TreeGroup
          key={item.id}
          {...item}
          {...{
            level,
            checkable,
            currentKeys,
            openedKeys,
            handleCheck,
            handleExpand,
            customExpandIcon,
            flatData,
            activeOpacity,
            nodeStyle,
          }}
        >
          {item.items.map(item => renderItem(item, level + 1))}
        </TreeGroup>
      );
    }
    return (
      <TreeNode
        key={item.id}
        {...item}
        {...{
          level,
          checkable,
          currentKeys,
          handleCheck,
          activeOpacity,
          nodeStyle,
        }}
      />
    );
  };

  return (
    <ScrollView bounces={false} horizontal={false} showsVerticalScrollIndicator={false} style={style}>
      {data.map(item => renderItem(item, 1))}
    </ScrollView>
  );
};
Tree.displayName = 'Tree';

export default Tree;
