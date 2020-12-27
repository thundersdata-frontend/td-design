import React, { FC, ReactElement, useState } from 'react';
import { ScrollView, FlatList, ViewStyle, View, LayoutChangeEvent } from 'react-native';
import { useTheme } from '@shopify/restyle';
import { ONE_PIXEL, deviceHeight } from '../helper';
import { Theme } from '../config/theme';
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
  const theme = useTheme<Theme>();
  /**当前容器的宽度，用来计算表格的长度 */
  const [wrapWidth, setWrapWidth] = useState<number>(0);

  /** 计算单元格的长度 */
  const cellWidth =
    (wrapWidth - columns.reduce((prev, next) => prev + (next.width ?? 0), 0)) /
    (columns.length - columns.filter(item => item.width).length);

  const headRender = () => {
    return columns.map((column, i) => {
      const styles = {};
      if (column.width) {
        Object.assign(styles, {
          width: column.width,
        });
      } else {
        Object.assign(styles, {
          width: column.flex ?? 1 * cellWidth,
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
          width: column.flex ?? 1 * cellWidth,
        });
      }
      return (
        <Box key={column.dataIndex ?? i} style={styles}>
          {column.render ? (
            <Text
              numberOfLines={column.numberOfLines}
              ellipsizeMode={column.ellipsizeMode}
              textAlign={column.textAlign}
            >
              {column.render(data[column.dataIndex], column)}
            </Text>
          ) : (
            <Text
              numberOfLines={column.numberOfLines}
              ellipsizeMode={column.ellipsizeMode}
              textAlign={column.textAlign}
            >
              {column.renderText ? column.renderText(data[column.dataIndex], column) : data[column.dataIndex] ?? '-'}
            </Text>
          )}
        </Box>
      );
    });
  };

  /** 获取容器宽度 如果有tableWidth则用tableWidth */
  const handleLayout = (e: LayoutChangeEvent) => {
    setWrapWidth(tableWidth ?? e.nativeEvent.layout.width);
  };

  return (
    <View style={{ height: tableHeight, backgroundColor: theme.colors.white }} onLayout={handleLayout}>
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
    </View>
  );
};

export default Table;
