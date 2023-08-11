import { LayoutRectangle, StyleProp, TextStyle, ViewProps, ViewStyle } from 'react-native';
import { PagerViewOnPageSelectedEvent } from 'react-native-pager-view';
import { SharedValue } from 'react-native-reanimated';

type TabLabel = string | (() => React.ReactNode);

export interface TabScene {
  key: string;
  title: TabLabel;
  component: JSX.Element;
}

type Layout = { width: number; height: number };
export type Listener = (value: number) => void;

export interface TabsProps
  extends Omit<AnimatedPagerViewProps, 'onPageScroll' | 'onPageSelected' | 'onPageScrollStateChanged'>,
    Pick<TabBarProps, 'tabStyle' | 'tabItemStyle' | 'labelStyle' | 'indicatorStyle'> {
  /** 所有的页面 */
  scenes: TabScene[];
  /** 翻页之后的回调 */
  onChange?: (key: string) => void;
  /** 标签栏的高度。 默认为48 */
  height?: number;
  /** 是否显示指示器。 默认为true */
  showIndicator?: boolean;
  /** 是否懒加载其他页面。 默认为false */
  lazy?: boolean;
  /** 懒加载时的占位提示组件 */
  renderLazyPlaceholder?: () => React.ReactNode;
  /** 默认切换到第几个选项卡 */
  initialPage?: number;
  layout?: Layout;
}

export interface AnimatedPagerViewProps {
  /** 是否支持滚动翻页。 默认为 true */
  scrollEnabled?: boolean;
  /** 到第一页或者最后一页之后还是否允许继续拖动。 默认为true */
  overdrag?: boolean;
  /** 键盘关闭模式。 默认为滚动时关闭 */
  keyboardDismissMode?: 'none' | 'on-drag';
  onPageSelected: (e: PagerViewOnPageSelectedEvent) => void;
}

export interface TabBarProps {
  tabs: TabLabel[];
  onTabPress: (index: number) => void;
  onTabsLayout?: (layouts: LayoutRectangle[]) => void;
  height?: number;
  page: number;
  scrollX: SharedValue<number>;
  isIdle: boolean;
  spacing?: number;
  showIndicator: boolean;
  tabStyle?: StyleProp<ViewStyle>;
  tabItemStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  indicatorStyle?: IndicatorStyle;
}

export interface TabBarItemProps {
  title: TabLabel;
  onPress?: () => void;
  onLayout: ViewProps['onLayout'];
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
}

export interface IndicatorStyle {
  height?: number;
  borderRadius?: number;
  color?: string;
}

export interface TabBarIndicatorProps {
  style: IndicatorStyle;
  scrollX: SharedValue<number>;
  inputRange: number[];
  scrollRange: number[];
  tabWidths: number[];
}

export interface SceneViewProps {
  index: number;
  lazy: boolean;
  layout: Layout;
  children: (props: { loading: boolean }) => React.ReactNode;
}
