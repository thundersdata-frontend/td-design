import { DataNode, FlattenNode, TreeItemProps } from './type';

export function flattenTreeData(treeNodeList: TreeItemProps[] = [], expandedKeys: string[] | true = []): FlattenNode[] {
  const expandedKeySet = new Set(expandedKeys === true ? [] : expandedKeys);
  const flattenList: FlattenNode[] = [];

  function dig(list: DataNode[], parent: FlattenNode | null = null): FlattenNode[] {
    return list.map(treeNode => {
      const mergedKey = treeNode.key;

      const flattenNode: FlattenNode = {
        ...treeNode,
        parent,
        children: null,
        data: treeNode,
      };

      flattenList.push(flattenNode);

      // 遍历子节点
      if (expandedKeys === true || expandedKeySet.has(mergedKey.toString())) {
        flattenNode.children = dig(treeNode.children || [], flattenNode);
      } else {
        flattenNode.children = [];
      }

      return flattenNode;
    });
  }

  dig(treeNodeList);
  return flattenList;
}

export function arrDel(list: string[], value: string) {
  const clone = list.slice();
  const index = clone.indexOf(value);
  if (index >= 0) {
    clone.splice(index, 1);
  }
  return clone;
}

export function arrAdd(list: string[], value: string) {
  const clone = list.slice();
  if (clone.indexOf(value) === -1) {
    clone.push(value);
  }
  return clone;
}

/**
 * Get TreeNode props with Tree props.
 */
export function getTreeNodeProps(key: string, { expandedKeys, selectedKeys, checkedKeys }: any) {
  const treeNodeProps = {
    eventKey: key,
    expanded: expandedKeys.indexOf(key) !== -1,
    selected: selectedKeys.indexOf(key) !== -1,
    checked: checkedKeys.indexOf(key) !== -1,
  };

  return treeNodeProps;
}

/**
 * 获取节点的级别
 */
export function getTreeNodeLevel(treeData: TreeItemProps[] = []) {
  const nodeLevel = {};

  function processNode(node: TreeItemProps | null, level: number) {
    const children = node ? node.children : treeData;

    if (node) {
      nodeLevel[node.key] = level;
    }

    if (children) {
      children.forEach(subNode => {
        processNode(subNode as TreeItemProps, level + 1);
      });
    }
  }
  processNode(null, 0);
  return nodeLevel;
}
