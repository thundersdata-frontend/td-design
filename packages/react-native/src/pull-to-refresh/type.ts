import { ReactElement, RefAttributes, PropsWithChildren } from 'react';
import { NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import { WithSpringConfig } from 'react-native-reanimated';

export interface PullToRefreshHeaderRef {
  setProgress: (percent: number) => void;
}

export type PullToRefreshProps = PropsWithChildren<{
  HeaderComponent?: React.ComponentType<PullToRefreshHeaderProps & RefAttributes<PullToRefreshHeaderRef>>;
  // 当前是否正在刷新中
  refreshing: boolean;
  // Header 组件的高度，也是触发刷新的下拉距离
  headerHeight?: number;
  /** 刷新方法 */
  onRefresh: () => void;
  /** 弹簧动画效果配置参数 */
  springConfig?: WithSpringConfig;
  /** 自定义渲染子组件 */
  renderChildren?: ({
    onScroll,
    onMomentumScrollEnd,
    scrollEnabled,
  }: {
    onScroll: () => void;
    onMomentumScrollEnd: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
    scrollEnabled: boolean;
  }) => ReactElement;
}>;

export type PullToRefreshHeaderProps = Pick<PullToRefreshProps, 'refreshing' | 'headerHeight'>;
