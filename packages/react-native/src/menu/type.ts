import { StyleProp, ViewStyle } from 'react-native';
import { IconProps } from '../icon';

export interface IndexPath {
  /** MenuItem 的 id */
  row?: string;
  /** MenuGroup 的 id */
  section?: string;
}

interface StyleProps {
  /** 选中时背景色 */
  activeBgColor?: string;
  /** 选中时文字颜色 */
  activeTextColor?: string;
  /** 未选中时背景色 */
  inactiveBgColor?: string;
  /** 未选中时文字颜色 */
  inactiveTextColor?: string;
}

export interface MenuProps extends StyleProps {
  /** 当前选中的 MenuItem 的id和所在的MenuGroup的id */
  selectedIndex?: IndexPath;
  /** 选择一个 MenuItem 的事件 */
  onSelect?: (selectedIndex: IndexPath) => void;
  /** 宽度 */
  width?: number;
  /** MenuItem 的高度 */
  itemHeight?: number;
  /** 自定义样式 */
  style?: StyleProp<ViewStyle>;
}

export interface BaseProps extends StyleProps {
  /** 标题 */
  title: string;
  /** 左侧自定义内容，如图标 */
  left?: IconProps & { activeColor?: string };
  /** 是否禁用 MenuGroup */
  disabled?: boolean;
  /** 宽度 */
  width?: number;
  /** 高度 */
  height?: number;
  /** id */
  id: string;
  /** 透传点击时触发的事件到 MenuItem */
  onSelect?: (selectedIndex: IndexPath) => void;
  /** 当前展开的 MenuGroup 的id */
  section?: string;
  /** 当前选中的 MenuItem 的id */
  selectedIndex?: string;
  /** 自定义样式 */
  style?: StyleProp<ViewStyle>;
}

export type MenuGroupProps = BaseProps;

export interface MenuItemProps extends BaseProps {
  /** 右侧自定义内容，如图标 */
  right?: IconProps & { activeColor?: string };
  /** 是否是在 MenuGroup 下 */
  inGroup?: boolean;
  /** MenuItem 点击事件 */
  onPress?: () => void;
}
