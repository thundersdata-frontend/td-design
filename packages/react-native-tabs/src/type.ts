import { ReactNode } from 'react';
import { LayoutRectangle, StyleProp, TextStyle, ViewProps, ViewStyle } from 'react-native';
import { PagerViewOnPageSelectedEvent, PageScrollStateChangedNativeEvent } from 'react-native-pager-view';
import { SharedValue } from 'react-native-reanimated';

type TabLabel = string | ((isActive: boolean) => ReactNode);

export interface TabScene {
  key: string;
  title: TabLabel;
  component: JSX.Element;
}

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
}

export interface AnimatedPagerViewProps {
  /** 是否支持滚动翻页。 默认为 true */
  scrollEnabled?: boolean;
  /** 到第一页或者最后一页之后还是否允许继续拖动。 默认为true */
  overdrag?: boolean;
  /** 键盘关闭模式。 默认为滚动时关闭 */
  keyboardDismissMode?: 'none' | 'on-drag';
  onPageScroll: (e: { offset: number; position: number }) => void;
  onPageSelected: (e: PagerViewOnPageSelectedEvent) => void;
  onPageScrollStateChanged: ({ nativeEvent: { pageScrollState } }: PageScrollStateChangedNativeEvent) => void;
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
  isActive: boolean;
  showIndicator: boolean;
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
