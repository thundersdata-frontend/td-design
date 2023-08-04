import { FlattenTreeItem, TreeItemProps } from './type';

/**
 * 遍历当前节点的所有下级节点
 * @param id 当前节点的id
 * @param data 打平后的数据
 * @returns 当前节点的所有下级节点的id数组
 */
export const findAllChildrenIds = (id: string, data: FlattenTreeItem[]) => {
  const childrenIds: string[] = [];
  const find = (id: string) => {
    const item = data.find(item => item.id === id);
    if (item) {
      childrenIds.push(item.id);
      if (item.items) {
        item.items.forEach(item => {
          find(item.id);
        });
      }
    }
  };
  find(id);

  // 从childrenIds删除被禁用的节点
  const disabledIds = data.filter(item => item.disabled).map(item => item.id);
  disabledIds.forEach(id => {
    const index = childrenIds.indexOf(id);
    if (index > -1) {
      childrenIds.splice(index, 1);
    }
  });

  return childrenIds;
};

/**
 * 遍历当前节点的所有上级节点
 * @param id 当前节点的id
 * @param data 打平后的数据
 * @returns 当前节点的所有上级节点的id数组
 */
export const findAllParentIds = (id: string, data: FlattenTreeItem[]) => {
  const parentIds: string[] = [];
  const find = (id: string) => {
    const item = data.find(item => item.id === id);
    if (item) {
      parentIds.push(item.id);
      if (item.parentId) {
        find(item.parentId);
      }
    }
  };
  find(id);
  return parentIds;
};

/**
 * 找到一个节点的所有兄弟节点(包含自己在内)
 * @param id 当前节点的id
 * @param data 打平后的数据
 * @returns 当前节点的所有兄弟节点的id数组
 */
export const findAllSiblingIds = (id: string, data: FlattenTreeItem[]) => {
  const ele = data.find(item => item.id === id);
  if (!ele) return [];

  return data.filter(item => item.parentId === ele.parentId).map(item => item.id);
};

// 根据传入的id，找到这个节点的所有兄弟节点，判断这个兄弟节点是否都已经选中，如果已经选中，则选中这个节点的父节点，同时以这个父节点为参数递归
// 如果这个节点的所有兄弟节点都没有选中，则取消选中这个节点的父节点，同时以这个父节点为参数，再次调用这个函数
// 直到找到根节点，停止递归
export const loopAllParents = (id: string, data: FlattenTreeItem[], checkedKeys: string[]) => {
  const ele = data.find(item => item.id === id);
  if (!ele) return;

  const siblingIds = findAllSiblingIds(id, data);
  const isAllSiblingChecked = siblingIds.every(item => checkedKeys.includes(item));
  if (isAllSiblingChecked) {
    if (ele.parentId) {
      const parent = data.find(item => item.id === ele.parentId);
      if (parent && !parent.disabled) {
        checkedKeys.push(ele.parentId);
        loopAllParents(ele.parentId, data, checkedKeys);
      }
    }
  } else {
    const index = checkedKeys.indexOf(ele.parentId!);
    if (index > -1) {
      checkedKeys.splice(index, 1);
    }
    loopAllParents(ele.parentId!, data, checkedKeys);
  }
};

/**
 * 将一个树形结构打平
 * @param data 树形结构数据
 * @returns 打平后的数组
 */
export const flattenData = (data: TreeItemProps[]) => {
  const flatten = (data: TreeItemProps[], parentId?: string) => {
    return data.reduce((arr, item) => {
      arr.push({ ...item, parentId });
      if (item.items) {
        arr = arr.concat(flatten(item.items, item.id));
      }
      return arr;
    }, [] as FlattenTreeItem[]);
  };
  return flatten(data);
};
