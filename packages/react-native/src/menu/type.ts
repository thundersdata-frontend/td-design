import { ReactElement } from 'react';
import { StyleProp, ViewStyle } from 'react-native';

interface StyleProps {
  /** 选中时背景色 */
  activeColor?: string;
  /** 选中时文字颜色 */
  activeTextColor?: string;
}

export type MenuProps = StyleProps & {
  /** 是否允许展开多个菜单组 */
  multiple?: boolean;
  /** 子菜单 */
  items: MenuItemProps[];
  /** 选中的子菜单的id */
  selectedKey?: string;
  /** 默认选中的子菜单的id */
  defaultSelectedKey?: string;
  /** 选择一个 MenuItem 的事件 */
  onSelect?: (selectedIndex: string) => void;
  /** 宽度 */
  width?: number;
  /** 自定义样式 */
  style?: StyleProp<ViewStyle>;
  /** 菜单项的样式 */
  itemStyle?: StyleProp<ViewStyle>;
  /** 按下时的不透明度 */
  activeOpacity?: number;
};

export type MenuItemProps = Pick<MenuProps, 'activeOpacity' | 'itemStyle'> &
  StyleProps & {
    /** 菜单的唯一标识 */
    id: string;
    /** 标题 */
    title: string;
    /** 左侧自定义内容，如图标 */
    left?: ReactElement;
    /** 右侧自定义内容，如图标 */
    customIcon?: ReactElement;
    /** 是否禁用 */
    disabled?: boolean;
    /** 子菜单 */
    items?: MenuItemProps[];
  };
