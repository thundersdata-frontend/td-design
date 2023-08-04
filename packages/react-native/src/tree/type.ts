import { ReactElement } from 'react';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import Animated from 'react-native-reanimated';

export interface TreeItemProps {
  /** 节点唯一标识 */
  id: string;
  /** 节点文字 */
  text: string;
  /** 子节点 */
  items?: TreeItemProps[];
  /** 是否禁用树节点 */
  disabled?: boolean;
  /** 点击树节点的回调 */
  onPress?: (id: string) => void;
  /** 自定义选中图标 */
  customCheckIcon?: (checked: 'all' | 'half' | 'none') => ReactElement;
  /** 节点样式 */
  style?: StyleProp<ViewStyle>;
  /** 节点文字样式 */
  textStyle?: StyleProp<TextStyle>;
}

export type FlattenTreeItem = TreeItemProps & { parentId?: string };

export interface TreeProps {
  /** 树的节点数据 */
  data: TreeItemProps[];
  /** 自定义展开图标 */
  customExpandIcon?: (progress: Animated.SharedValue<number>) => ReactElement;
  /** 是否可以选择的 */
  checkable?: boolean;
  /** 默认选中的节点 */
  defaultCheckedKeys?: string[];
  /** 选中的节点 */
  checkedKeys?: string[];
  /** 选中节点变化时的回调 */
  onCheck?: (checkedKeys: string[]) => void;
  /** 默认全部展开 */
  expandAll?: boolean;
  /** 默认展开的节点 */
  defaultExpandedKeys?: string[];
  /** 展开的节点 */
  expandedKeys?: string[];
  /** 展开节点变化时的回调 */
  onExpand?: (expandedKeys: string[]) => void;
  /** 树节点点击时的不透明度 */
  activeOpacity?: number;
  /** 树样式 */
  style?: StyleProp<ViewStyle>;
  /** 树节点统一样式 */
  nodeStyle?: StyleProp<ViewStyle>;
}
