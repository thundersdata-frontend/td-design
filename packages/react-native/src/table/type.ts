import { ReactElement } from 'react';
import { ViewStyle } from 'react-native';

export interface ColumnProps {
  /** 表单标题 */
  title: string;
  /** 数组下标 */
  dataIndex: string;
  /** 文字行数  */
  numberOfLines?: number;
  /** 超出后的截取 */
  ellipsisMode?: 'head' | 'middle' | 'tail' | 'clip';
  /** 文字对其方式 */
  textAlign?: 'center' | 'left' | 'right';
  /** 列的宽度 */
  width?: number;
  /** 自定义文本 */
  renderText?: (item: string, column: ColumnProps) => string;
  /** 自定义组件 */
  render?: (item: string, column: ColumnProps) => ReactElement;
}

export interface TableProps<T> {
  /** 列定义 */
  columns: Array<ColumnProps>;
  /** 表格数据 */
  dataSource: T[];

  /** 表单头部样式 */
  headerStyle?: ViewStyle;
  /** 数据行样式 */
  rowStyle?: ViewStyle;
  /** 下拉刷新 */
  onRefresh?: () => void;
  /** 上拉加载 */
  onEndReached?: () => void;
  /** 刷新状态 */
  refreshing?: boolean;
  /** 表单的高度 */
  height?: number;
  /** 是否固定头部 */
  fixedHeader?: boolean;
  /** 是否显示表头 */
  showHeader?: boolean;
  /** 空状态的视图 */
  emptyComponent?: ReactElement;
  /** 指定Table的唯一标识字段 */
  keyExtractor: (item: T, index: number) => string;
}
