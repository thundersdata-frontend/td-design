import React, { FC, ReactElement } from 'react';
import { View, Text, ScrollView, FlatList, ViewStyle } from 'react-native';
import { useTheme } from '@shopify/restyle';
import { Theme } from '../config/theme';
import { ONE_PIXEL, px, deviceHeight } from '../helper';
import Empty from '../empty';
import WhiteSpace from '../white-space';

interface ColumnProps {
  // 表单标题
  title: string;
  //数组下标
  dataIndex: string;
  // 文字行数
  numberOfLines?: number;
  // 超出后的截取
  ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip';
  //文字对其方式
  textAlign?: 'center' | 'left' | 'right';
  //列的宽度
  width?: number;
  // 列的占比
  flex?: number;
  //自定义文本
  renderText?: (item: string, column: ColumnProps) => string;
  //自定义组件
  render?: (item: string, column: ColumnProps) => ReactElement;
}
interface TableProps {
  //列定义
  columns: Array<ColumnProps>;
  //表格数据
  dataSource: Array<any>;
  // 是否可以横向滚动定义了tableWidth后才可以滚动
  horizontalScroll?: boolean;
  //表单头部样式
  headerStyle?: ViewStyle;
  //数据行样式
  rowStyle?: ViewStyle;
  // 下拉刷新
  onRefresh?: () => void;
  // 上拉加载
  onEndReached?: () => void;
  // 刷新状态
  refreshing?: boolean;
  // 表单的宽度
  tableWidth?: number;
  // 表单的高度
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
        <View key={column.dataIndex ?? i} style={[{ justifyContent: 'center' }, styles]}>
          <Text
            numberOfLines={column.numberOfLines}
            ellipsizeMode={column.ellipsizeMode}
            style={{ textAlign: column.textAlign, fontWeight: 'bold' }}
          >
            {column.title}
          </Text>
        </View>
      );
    });
  };

  const rowRender = ({ item, index }: { item: any; index: number }) => {
    return (
      <View
        key={index}
        style={[
          {
            flexDirection: 'row',
            flexGrow: 1,
            borderBottomWidth: ONE_PIXEL,
            borderColor: theme.colors.borderColor,
            paddingVertical: px(5),
            alignItems: 'center',
          },
          rowStyle,
        ]}
      >
        {cellRender(item)}
      </View>
    );
  };

  const cellRender = (data: { [x: string]: any }) => {
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
            <Text numberOfLines={1} ellipsizeMode="tail" style={{ textAlign: column.textAlign }}>
              {column.renderText ? column.renderText(data[column.dataIndex], column) : data[column.dataIndex] ?? '-'}
            </Text>
          )}
        </Text>
      );
    });
  };

  return (
    <View style={{ height: tableHeight }}>
      <ScrollView
        horizontal
        contentContainerStyle={[{ flexGrow: 1, width: tableWidth, flexDirection: 'column' }]}
        style={{ flex: 1 }}
        showsHorizontalScrollIndicator={false}
        scrollEnabled={horizontalScroll}
      >
        <View
          style={[
            {
              flexDirection: 'row',
              backgroundColor: theme.colors.backgroundColor1,
              width: tableWidth,
              paddingVertical: px(5),
            },
            headerStyle,
          ]}
        >
          {headRender()}
        </View>
        <View style={{ flex: 1, width: tableWidth }}>
          <FlatList
            data={dataSource}
            ListEmptyComponent={<Empty isEmpty />}
            renderItem={rowRender}
            onRefresh={onRefresh}
            onEndReached={onEndReached}
            refreshing={refreshing}
            keyExtractor={(_, i) => i + ''}
          />
        </View>
      </ScrollView>
      <WhiteSpace />
    </View>
  );
};

export default Table;
