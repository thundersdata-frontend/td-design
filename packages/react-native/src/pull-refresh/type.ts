import { RefAttributes } from 'react';
import { ViewStyle } from 'react-native';
import Animated from 'react-native-reanimated';

export interface PullRefreshHeaderRef {
  setProgress: (values: { pullDistance: number; percent: number }) => void;
}

export interface PullRefreshProps {
  HeaderComponent?: React.ComponentType<PullRefreshHeaderProps & RefAttributes<PullRefreshHeaderRef>>;
  // 当前是否正在刷新中
  refreshing: boolean;
  // Header 组件的高度，也是触发刷新的下拉距离
  headerHeight?: number;
  // Header组件样式
  headerStyle?: ViewStyle;
  /** 刷新方法 */
  onRefresh: () => void;
  /** 子组件 */
  children: React.ReactElement;
  /** 弹簧动画效果配置参数 */
  springConfig?: Animated.WithSpringConfig;
  /** 滚动时触发外部事件，收集滚动位置，可以和AnimateHeader配合实现滚动头部效果 */
  onScrollY?: (scrollY: number) => void;
}

export type PullRefreshHeaderProps = Pick<PullRefreshProps, 'refreshing' | 'headerHeight' | 'headerStyle'>;
