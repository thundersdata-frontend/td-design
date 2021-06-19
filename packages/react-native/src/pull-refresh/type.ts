import { RefAttributes } from 'react';
import { ViewStyle } from 'react-native';

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
  /** 子组件，必须是PullRefresh组件导出的ScrollView或者FlatList */
  children: React.ReactElement;
}

export type PullRefreshHeaderProps = Pick<PullRefreshProps, 'refreshing' | 'headerHeight' | 'headerStyle'>;
