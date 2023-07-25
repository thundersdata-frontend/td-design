import React, { ReactElement } from 'react';
import { FlatList, ScrollView, StyleSheet, ViewStyle } from 'react-native';

import { useTheme } from '@shopify/restyle';

import Box from '../box';
import Center from '../center';
import Empty from '../empty';
import helpers from '../helpers';
import { Theme } from '../theme';
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
  renderText?: (item: any, column: ColumnProps) => string;
  /** 自定义组件 */
  render?: (item: any, column: ColumnProps) => ReactElement;
}
export interface TableProps<T> {
  /** 列定义 */
  columns: Array<ColumnProps>;
  /** 表格数据 */
  dataSource: T[];
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
  /** 指定Table的唯一标识字段 */
  keyExtractor: (item: T, index: number) => string;
}

function Table<T extends Record<string, any>>(props: TableProps<T>) {
  const {
    columns = [],
    dataSource = [],
    horizontalScroll = false,
    headerStyle = {},
    rowStyle = {},
    onRefresh,
    onEndReached,
    refreshing = false,
    tableWidth = '100%',
    tableHeight = deviceHeight,
    fixedHeader = true,
    showHeader = true,
    emptyComponent,
    keyExtractor,
  } = props;
  const theme = useTheme<Theme>();

  const { contentHeight, handleLayout, handleHeaderLayout, renderHeader, renderItem } = useTable<T>({
    columns,
    rowStyle,
  });

  const styles = StyleSheet.create({
    contentContainer: {
      width: tableWidth,
      height: tableHeight,
    },
  });

  return (
    <ScrollView
      horizontal
      onContentSizeChange={handleLayout}
      contentContainerStyle={styles.contentContainer}
      showsHorizontalScrollIndicator={false}
      scrollEnabled={horizontalScroll && dataSource.length > 0}
    >
      <FlatList<T>
        scrollEnabled={dataSource.length > 0}
        stickyHeaderIndices={fixedHeader && showHeader ? [0] : []}
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: theme.colors.background,
        }}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          showHeader ? (
            <Box
              flexDirection={'row'}
              width={tableWidth}
              paddingVertical="x3"
              style={headerStyle}
              borderBottomWidth={ONE_PIXEL}
              borderColor="border"
              backgroundColor="background"
              onLayout={handleHeaderLayout}
            >
              {renderHeader()}
            </Box>
          ) : null
        }
        data={dataSource}
        ListEmptyComponent={
          emptyComponent ? (
            emptyComponent
          ) : (
            <Center height={contentHeight}>
              <Empty />
            </Center>
          )
        }
        renderItem={renderItem}
        onRefresh={onRefresh}
        onEndReached={onEndReached}
        refreshing={refreshing}
        keyExtractor={keyExtractor}
      />
    </ScrollView>
  );
}
Table.displayName = 'Table';

export default Table;
