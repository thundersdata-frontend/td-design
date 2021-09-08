import React, { FC, ReactElement } from 'react';
import { ScrollView, FlatList, ViewStyle, View } from 'react-native';
import { useTheme } from '@shopify/restyle';
import helpers from '../helpers';
import { Theme } from '../theme';
import Empty from '../empty';
import WhiteSpace from '../white-space';
import Box from '../box';
import useTable from './useTable';

const { ONE_PIXEL, deviceHeight } = helpers;
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
  /** 列的占比 */
  flex?: number;
  /** 自定义文本 */
  renderText?: (item: string, column: ColumnProps) => string;
  /** 自定义组件 */
  render?: (item: string, column: ColumnProps) => ReactElement;
}
export interface TableProps {
  /** 列定义 */
  columns: Array<ColumnProps>;
  /** 表格数据 */
  dataSource: [{ [key: string]: string }] | [];
  /** 是否可以横向滚动定义了tableWidth后才可以滚动 */
  horizontalScroll?: boolean;
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
  /** 表单的宽度 */
  tableWidth?: number;
  /** 表单的高度 */
  tableHeight?: number;
  /** 是否固定头部 */
  fixedHeader?: boolean;
  /** 是否显示表头 */
  showHeader?: boolean;
  /** 空状态的视图 */
  emptyComponent?: ReactElement;
}

const Table: FC<TableProps> = props => {
  const {
    columns = [],
    dataSource = [],
    horizontalScroll = false,
    headerStyle = {},
    rowStyle = {},
    onRefresh,
    onEndReached,
    refreshing = false,
    tableWidth,
    tableHeight = deviceHeight,
    fixedHeader = true,
    showHeader = true,
    emptyComponent,
  } = props;
  const theme = useTheme<Theme>();

  const { handleLayout, headRender, rowRender } = useTable({ columns, rowStyle, tableWidth });

  return (
    <View style={{ height: tableHeight }} onLayout={handleLayout}>
      <ScrollView
        horizontal
        contentContainerStyle={[
          { flexGrow: 1, width: tableWidth, flexDirection: 'column', backgroundColor: theme.colors.background },
        ]}
        style={{ flex: 1 }}
        showsHorizontalScrollIndicator={false}
        scrollEnabled={horizontalScroll}
      >
        <Box flex={1} width={tableWidth}>
          <FlatList
            stickyHeaderIndices={fixedHeader && showHeader ? [0] : []}
            ListHeaderComponent={
              showHeader ? (
                <Box
                  flexDirection="row"
                  width={tableWidth}
                  paddingVertical="x4"
                  style={headerStyle}
                  borderBottomWidth={ONE_PIXEL}
                  borderColor="border"
                  backgroundColor="background"
                >
                  {headRender()}
                </Box>
              ) : null
            }
            data={dataSource}
            ListEmptyComponent={emptyComponent ? emptyComponent : <Empty isEmpty />}
            renderItem={rowRender}
            onRefresh={onRefresh}
            onEndReached={onEndReached}
            refreshing={refreshing}
            keyExtractor={(_, i) => i + ''}
          />
        </Box>
      </ScrollView>
      <WhiteSpace />
    </View>
  );
};

export default Table;
