import { ReactElement } from 'react';
import { Animated, NativeScrollEvent, NativeSyntheticEvent, StyleProp, ViewStyle } from 'react-native';

export interface PullAnimationProps {
  style?: StyleProp<ViewStyle>;
  refreshing: boolean;
  minPullDistance: number;
  scrollY: Animated.Value;
  yValues: { from?: number; to?: number };
}

export interface PullToRefreshProps {
  refreshing: boolean;
  onRefresh: () => void;
  contentComponent: ReactElement;
  pullAnimateHeight: number;
  pullAnimateYValues: { from: number; to: number };
  minPullDistance?: number;
  backgroundColor?: string;
  onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  onTriggerToRefresh?: (refreshing: boolean) => void;
  isReachEnd?: boolean;
}
