import { RefAttributes } from 'react';
import { NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import { WithSpringConfig } from 'react-native-reanimated';

export interface PullToRefreshHeaderRef {
  setProgress: (percent: number) => void;
}

export interface PullToRefreshProps {
  HeaderComponent?: React.ComponentType<PullToRefreshHeaderProps & RefAttributes<PullToRefreshHeaderRef>>;
  // 当前是否正在刷新中
  refreshing: boolean;
  // Header 组件的高度，也是触发刷新的下拉距离
  headerHeight?: number;
  /** 刷新方法 */
  onRefresh: () => void;
  /** 子组件 */
  children: React.ReactNode;
  /** 弹簧动画效果配置参数 */
  springConfig?: WithSpringConfig;
  /** 滚动时触发外部事件，收集滚动位置，可以和AnimateHeader配合实现滚动头部效果 */
  onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
}

export type PullToRefreshHeaderProps = Pick<PullToRefreshProps, 'refreshing' | 'headerHeight'>;
