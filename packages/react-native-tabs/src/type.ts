import { ReactNode, RefObject } from 'react';
import { StyleProp, TextStyle, View, ViewStyle } from 'react-native';
import { NavigationState, SceneRendererProps, TabViewProps } from 'react-native-tab-view';

export type CustomRoute = {
  ref: RefObject<View>;
  renderIcon?: (active: boolean) => ReactNode;
} & Pick<TabsScene, 'key' | 'title'>;

export interface TabsScene {
  key: string;
  title: string;
  scene: () => JSX.Element;
}

export interface TabsProps extends Pick<TabViewProps<CustomRoute>, 'keyboardDismissMode' | 'swipeEnabled' | 'lazy'> {
  scenes: TabsScene[];
  activeTab?: string;
  bounces?: boolean;
  tabBarStyle?: StyleProp<ViewStyle>;
  onTabPress?: (scene: Scene & Event) => void;
  showIcon?: boolean;
  showIndicator?: boolean;
  textStyle?: StyleProp<TextStyle>;
  indicatorStyle?: StyleProp<ViewStyle>;
}

export type Event = {
  defaultPrevented: boolean;
  preventDefault(): void;
};

export type Scene = {
  route: CustomRoute;
};

export type TabBarProps = SceneRendererProps &
  Pick<
    TabsProps,
    'bounces' | 'tabBarStyle' | 'onTabPress' | 'showIcon' | 'showIndicator' | 'textStyle' | 'indicatorStyle'
  > & {
    navigationState: NavigationState<CustomRoute>;
  };

export interface TabBarItemProps
  extends Omit<CustomRoute, 'key'>,
    Pick<TabBarProps, 'navigationState' | 'showIcon' | 'textStyle'> {
  onPress: () => void;
  active: boolean;
}

export type Measure = { left: number; top: number; width: number; height: number };

export interface TabBarIndicatorProps {
  measures: Measure[];
  currentIndex: number;
  indicatorStyle?: StyleProp<ViewStyle>;
}
