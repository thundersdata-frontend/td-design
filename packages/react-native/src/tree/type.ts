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
