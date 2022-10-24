import { DataNode, EntityNode, FlattenNode, TreeItemProps } from './type';

/**
 * 平铺树节点使节点可以进行遍历
 */
export function flattenTreeData(treeNodeList: TreeItemProps[] = [], expandedKeys: string[] | true = []): FlattenNode[] {
  const expandedKeySet = new Set(expandedKeys === true ? [] : expandedKeys);
  const flattenList: FlattenNode[] = [];

  //递归遍历每一个节点
  function dig(list: DataNode[], parent: FlattenNode | null = null, show?: boolean): FlattenNode[] {
    return list.map(treeNode => {
      const mergedKey = treeNode.key;

      const flattenNode: FlattenNode = {
        ...treeNode,
        show,
        parent,
        children: null,
        data: treeNode,
      };

      flattenList.push(flattenNode);

      // 遍历子节点
      if ((expandedKeys === true || expandedKeySet.has(mergedKey.toString())) && show === true) {
        flattenNode.children = dig(treeNode.children || [], flattenNode, true);
      } else {
        flattenNode.children = dig(treeNode.children || [], flattenNode, false);
      }

      return flattenNode;
    });
  }

  dig(treeNodeList as DataNode[], null, true);
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
 * 获取树组件的props
 */
export function getTreeNodeProps(
  key: string,
  { expandedKeys, checkedKeys }: { expandedKeys: string[]; checkedKeys: string[] }
) {
  const treeNodeProps = {
    eventKey: key,
    expanded: expandedKeys.indexOf(key) !== -1,
    checked: checkedKeys.indexOf(key) !== -1,
  };
  return treeNodeProps;
}

/**
 * 获取节点的数据
 * 用对象形式可以快速查找响应节点
 */
export function getTreeNodeLevel(treeData: TreeItemProps[] = []) {
  const nodeLevel = {};

  function processNode(node: TreeItemProps | null, parent?: EntityNode | null) {
    const children = node ? node.children : treeData;

    if (node) {
      nodeLevel[node.key] = {
        level: parent ? parent.level + 1 : 0,
        parent: parent,
        children: children,
        data: node,
        key: node.key,
      };
    }

    if (children) {
      children.forEach(subNode => {
        processNode(subNode as TreeItemProps, node ? nodeLevel[node?.key] : null);
      });
    }
  }
  processNode(null, null);
  return nodeLevel;
}

/**
 * 填充选中的节点
 */
function fillConductCheck(keys: Set<string>, levelEntities: Map<number, Set<EntityNode>>, maxLevel: number): string[] {
  const checkedKeys = new Set<string>(keys);

  // 从顶部到底部添加选中的键
  for (let level = 0; level <= maxLevel; level += 1) {
    const entities = levelEntities.get(level) || new Set();
    entities.forEach(entity => {
      const { key, children = [] } = entity;

      if (checkedKeys.has(key)) {
        children?.forEach(childEntity => {
          checkedKeys.add(childEntity.key);
        });
      }
    });
  }

  // 从下至上添加选中的键
  const visitedKeys = new Set<string>();
  for (let level = maxLevel; level > 0; level -= 1) {
    const entities = levelEntities.get(level) || new Set();
    entities.forEach(entity => {
      const { parent } = entity;

      let allChecked = true;

      (parent?.children || []).forEach(({ key }) => {
        const checked = checkedKeys.has(key);
        if (allChecked && !checked) {
          allChecked = false;
        }
      });

      if (allChecked) {
        checkedKeys.add(parent.key);
      }

      visitedKeys.add(parent.key);
    });
  }

  return Array.from(checkedKeys);
}

/**
 * 移除取消的节点
 */
function cleanConductCheck(keys: Set<string>, levelEntities: Map<number, Set<EntityNode>>, maxLevel: number): string[] {
  const checkedKeys = new Set<string>(keys);

  // 从上到下删除选中的键
  for (let level = 0; level <= maxLevel; level += 1) {
    const entities = levelEntities.get(level) || new Set();
    entities.forEach(entity => {
      const { key, children = [] } = entity;

      if (!checkedKeys.has(key)) {
        children?.forEach(childEntity => {
          checkedKeys.delete(childEntity.key);
        });
      }
    });
  }

  // 从下到上删除选中的键
  const visitedKeys = new Set<string>();
  for (let level = maxLevel; level > 0; level -= 1) {
    const entities = levelEntities.get(level) || new Set();

    entities.forEach(entity => {
      const { parent } = entity;

      let allChecked = true;

      (parent.children || []).forEach(({ key }) => {
        const checked = checkedKeys.has(key);
        if (allChecked && !checked) {
          allChecked = false;
        }
      });

      if (!allChecked) {
        checkedKeys.delete(parent.key);
      }

      visitedKeys.add(parent.key);
    });
  }

  return Array.from(checkedKeys);
}

/** check时父子组件的关联 */
export function conductCheck(
  keyList: Array<string>,
  keyEntities: Record<string, EntityNode>,
  checked: true | { checked: false }
) {
  // 没有树数据则放回空
  if (!keyList) {
    return [];
  }

  const keys = keyList.filter(key => {
    return !!keyEntities[key];
  });

  const levelEntities = new Map<number, Set<EntityNode>>();
  let maxLevel = 0;

  //将需要操作的节点根据级别分类
  Object.keys(keyEntities).forEach(key => {
    const entity = keyEntities[key];
    const { level } = entity;

    let levelSet = levelEntities.get(level);
    if (!levelSet) {
      levelSet = new Set();
      levelEntities.set(level, levelSet);
    }

    levelSet.add(entity);

    //获取最深的级别
    maxLevel = Math.max(maxLevel, level);
  });

  if (checked) {
    let result: string[];
    if (checked === true) {
      result = fillConductCheck(new Set(keys), levelEntities, maxLevel);
    } else {
      result = cleanConductCheck(new Set(keys), levelEntities, maxLevel);
    }

    return result;
  }
  return [];
}
