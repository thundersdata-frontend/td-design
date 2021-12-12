import { RefObject } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { NavigationState, SceneRendererProps, TabViewProps } from 'react-native-tab-view';

export type CustomRoute = { ref: RefObject<View> } & Pick<TabsScene, 'key' | 'title'>;

export interface TabsScene {
  key: string;
  title: string;
  scene: () => JSX.Element;
}

export interface TabsProps extends Pick<TabViewProps<CustomRoute>, 'keyboardDismissMode' | 'swipeEnabled' | 'lazy'> {
  scenes: TabsScene[];
  activeTab?: string;
  scrollEnabled?: boolean;
  bounces?: boolean;
  tabBarStyle?: StyleProp<ViewStyle>;
  onTabPress?: (scene: Scene & Event) => void;
}

export type Event = {
  defaultPrevented: boolean;
  preventDefault(): void;
};

export type Scene = {
  route: CustomRoute;
};

export type TabBarProps = SceneRendererProps &
  Pick<TabsProps, 'scrollEnabled' | 'bounces' | 'tabBarStyle' | 'onTabPress'> & {
    navigationState: NavigationState<CustomRoute>;
  };

export interface TabItemProps extends Omit<CustomRoute, 'key'>, Pick<TabBarProps, 'navigationState' | 'scrollEnabled'> {
  navigationState: NavigationState<CustomRoute>;
  onPress: () => void;
}

export type Measure = { left: number; top: number; width: number; height: number };

export interface TabBarIndicatorProps {
  measures: Measure[];
  currentIndex: number;
}
