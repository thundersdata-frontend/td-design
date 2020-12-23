import React, { FC, ReactElement } from 'react';
import { ScrollView, FlatList, ViewStyle } from 'react-native';
import { ONE_PIXEL, deviceHeight } from '../helper';
import Empty from '../empty';
import WhiteSpace from '../white-space';
import Text from '../text';
import Box from '../box';

interface ColumnProps {
  /** 表单标题 */
  title: string;
  /** 数组下标 */
  dataIndex: string;
  /** 文字行数  */
  numberOfLines?: number;
  /** 超出后的截取 */
  ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip';
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
interface TableProps {
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
  } = props;

  const headRender = () => {
    return columns.map((column, i) => {
      const styles = {};
      if (column.width) {
        Object.assign(styles, {
          width: column.width,
        });
      } else {
        Object.assign(styles, {
          flex: column.flex ?? 1,
        });
      }

      return (
        <Box key={column.dataIndex ?? i} justifyContent="center" style={styles}>
          <Text
            numberOfLines={column.numberOfLines}
            ellipsizeMode={column.ellipsizeMode}
            textAlign={column.textAlign}
            fontWeight="bold"
          >
            {column.title}
          </Text>
        </Box>
      );
    });
  };

  const rowRender = ({ item, index }: { item: { [key: string]: string }; index: number }) => {
    return (
      <Box
        key={index}
        flexDirection="row"
        flexGrow={1}
        borderBottomWidth={ONE_PIXEL}
        borderColor="borderColor"
        paddingVertical="xs"
        alignItems="center"
        style={rowStyle}
      >
        {cellRender(item)}
      </Box>
    );
  };

  const cellRender = (data: { [key: string]: string }) => {
    return columns.map((column, i) => {
      const styles = {};
      if (column.width) {
        Object.assign(styles, {
          width: column.width,
        });
      } else {
        Object.assign(styles, {
          flex: column.flex ?? 1,
        });
      }
      return (
        <Text key={column.dataIndex ?? i} style={[{ overflow: 'hidden' }, styles]}>
          {column.render ? (
            column.render(data[column.dataIndex], column)
          ) : (
            <Text numberOfLines={1} ellipsizeMode="tail" textAlign={column.textAlign}>
              {column.renderText ? column.renderText(data[column.dataIndex], column) : data[column.dataIndex] ?? '-'}
            </Text>
          )}
        </Text>
      );
    });
  };

  return (
    <Box height={tableHeight} backgroundColor="white">
      <ScrollView
        horizontal
        contentContainerStyle={[{ flexGrow: 1, width: tableWidth, flexDirection: 'column' }]}
        style={{ flex: 1 }}
        showsHorizontalScrollIndicator={false}
        scrollEnabled={horizontalScroll}
      >
        <Box
          flexDirection="row"
          backgroundColor="backgroundColor1"
          width={tableWidth}
          paddingVertical="xs"
          style={headerStyle}
        >
          {headRender()}
        </Box>
        <Box flex={1} width={tableWidth}>
          <FlatList
            data={dataSource}
            ListEmptyComponent={<Empty isEmpty />}
            renderItem={rowRender}
            onRefresh={onRefresh}
            onEndReached={onEndReached}
            refreshing={refreshing}
            keyExtractor={(_, i) => i + ''}
          />
        </Box>
      </ScrollView>
      <WhiteSpace />
    </Box>
  );
};

export default Table;
