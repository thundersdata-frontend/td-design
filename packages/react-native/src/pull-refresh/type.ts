import { RefAttributes } from 'react';
import { ViewStyle } from 'react-native';

export interface PullRefreshHeaderProps {
  // 当前是否正在刷新中
  refreshing: boolean;
  // Header 组件的高度，也是触发刷新的下拉距离
  headerHeight: number;
  // Header组件样式
  headerStyle?: ViewStyle;
}

export interface PullRefreshHeaderRef {
  setProgress: (values: { percent: number }) => void;
}

export interface PullRefreshProps {
  HeaderComponent?: React.ComponentType<PullRefreshHeaderProps & RefAttributes<PullRefreshHeaderRef>>;
  headerHeight?: number;
  refreshing?: boolean;
  onRefresh: () => void;
  children: React.ReactElement;
  headerStyle?: ViewStyle;
}
