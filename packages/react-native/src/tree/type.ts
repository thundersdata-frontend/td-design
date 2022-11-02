import { ReactNode } from 'react';

export interface TreeItemProps {
  key: string;
  title: string;
  children?: Array<TreeItemProps | ReactNode>;
  disabled?: boolean;
  icon?: (checked: boolean) => ReactNode;
}

/** 树节点的数据 */
export interface DataNode {
  checkable?: boolean;
  children?: DataNode[];
  disabled?: boolean;
  disableCheckbox?: boolean;
  icon?: (checked: boolean) => ReactNode;
  key: string;
  title?: React.ReactNode | string;
  switcherIcon?: ReactNode;
  show?: boolean;
}

/** 数据节点的事件 */
export interface EventDataNode extends DataNode {
  expanded: boolean;
  checked: boolean;
  eventKey?: string;
}
/** 树节点平铺后的数据 */
export interface FlattenNode extends Omit<DataNode, 'children'> {
  parent: FlattenNode | null;
  children: FlattenNode[] | null;
  data: DataNode;
}

/** 树节点平铺后的数据 */
export interface EntityNode {
  parent: DataNode;
  children: DataNode[] | null;
  data: DataNode;
  level: number;
  key: string;
}

export interface TreeProps {
  /** 组件的高度 */
  height?: number;
  /** 树的节点数据 */
  treeData?: TreeItemProps[];
  /** 禁用整棵树 */
  disabled?: boolean;
  /** 是否可以选择的 */
  checkable?: boolean;
  /** 选中的节点受控的  */
  checkedKeys?: string[];
  /** checkable 状态下节点选择完全受控（父子节点选中状态不再关联） */
  checkStrictly?: boolean;
  /** 默认选中的key第一次加载有效 */
  defaultCheckedKeys?: string[];
  /** 默认全部展开 */
  defaultExpandAll?: boolean;
  /** 默认展开节点 */
  defaultExpandedKeys?: string[];
  /** 展开的节点 */
  expandedKeys?: string[];
  /** 是否显示尾部的图标 */
  showIcon?: boolean;
  /** 选中事件回调 */
  onCheck?: (keys: string[]) => void;
  /** 展开事件回调 */
  onExpand?: (treeNode: EventDataNode) => void;
  /** 自定义icon */
  icon?: (checked: boolean) => ReactNode;
}

export interface TreeNodeProps {
  /** 父节点的key */
  eventKey?: string;
  /** 是否展开 */
  expanded?: boolean;
  /** 是否选中 */
  checked?: boolean;
  /** 标题 */
  title?: React.ReactNode;
  /** 节点的数据 */
  data: DataNode;
  /** 是否显示展开图标 */
  showIcon?: boolean;
  /** 所属级别 */
  level: number;
  /** 是否可选 */
  checkable?: boolean;
  /** 是否禁用 */
  disabled?: boolean;
  /** 点击事件回调 */
  onClick?: (data: EventDataNode) => void;
  /** 选中事件回调 */
  onCheck?: (data: EventDataNode) => void;
  /** 自定义icon */
  icon?: (checked: boolean) => ReactNode;
  show?: boolean;
}
