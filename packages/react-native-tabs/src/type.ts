import { ReactNode } from 'react';
import { StyleProp, TextStyle, ViewStyle, LayoutChangeEvent } from 'react-native';
import Animated from 'react-native-reanimated';
import {
  MaterialTopTabBarOptions,
  MaterialTopTabBarProps,
  MaterialTopTabNavigationConfig,
} from '@react-navigation/material-top-tabs/lib/typescript/src/types';

export type Route = {
  key: string;
  name?: string;
  params?: { [key: string]: any };
};

export type Event = {
  defaultPrevented: boolean;
  preventDefault(): void;
};

export type Scene<T extends Route> = {
  route: T;
};

export type NavigationState<T extends Route> = {
  index: number;
  routes: T[];
};

export type SceneRendererProps = {
  position: Animated.Node<number>;
  jumpTo: (key: string) => void;
};

/** Tabs组件可以接收的属性 */
export type TabsProps = Omit<MaterialTopTabNavigationConfig, 'tabBarOptions'> & {
  tabBarOptions?: MaterialTopTabBarOptions & { showBadge?: boolean; badgeStyle?: StyleProp<TextStyle> };
};

/** Tabs头可以接收的属性 */
export type TabBarProps = Omit<MaterialTopTabBarProps, 'activeTintColor' | 'inactiveTintColor'> &
  Required<Pick<MaterialTopTabBarProps, 'activeTintColor' | 'inactiveTintColor'>> & {
    /** 是否显示徽标 */
    showBadge?: boolean;
    /** 徽标自定义样式 */
    badgeStyle?: StyleProp<TextStyle>;
  };

/** Tabs头封装组件可以接收的属性 */
export type TopTabBarProps<T extends Route> = SceneRendererProps & {
  navigationState: NavigationState<T>;
  activeColor: string;
  inactiveColor: string;
  pressOpacity?: number;
  renderIcon?: (
    scene: Scene<T> & {
      focused: boolean;
      color: string;
    }
  ) => ReactNode;
  renderLabel?: (
    scene: Scene<T> & {
      focused: boolean;
      color: string;
    }
  ) => ReactNode;
  renderBadge?: (scene: Scene<T>) => ReactNode;
  onTabPress?: (scene: Scene<T> & Event) => void;
  tabStyle?: StyleProp<ViewStyle>;
  indicatorStyle?: StyleProp<ViewStyle>;
  indicatorContainerStyle?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
};

export type TabBarItemProps<T extends Route> = {
  position: Animated.Node<number>;
  route: T;
  navigationState: NavigationState<T>;
  activeColor: string;
  inactiveColor: string;
  pressOpacity?: number;
  renderLabel?: (scene: { route: T; focused: boolean; color: string }) => ReactNode;
  renderIcon?: (scene: { route: T; focused: boolean; color: string }) => ReactNode;
  renderBadge?: (scene: Scene<T>) => ReactNode;
  onLayout?: (event: LayoutChangeEvent) => void;
  onPress: () => void;
  style: StyleProp<ViewStyle>;
};

export type TabBarIndicatorProps<T extends Route> = SceneRendererProps & {
  navigationState: NavigationState<T>;
  width: number;
  indicatorStyle?: StyleProp<ViewStyle>;
  indicatorContainerStyle?: StyleProp<ViewStyle>;
  tabItemWidths: { [key: string]: number };
};
