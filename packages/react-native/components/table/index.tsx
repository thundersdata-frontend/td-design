import React, { FC, ReactElement } from 'react';
import { View, Text, ScrollView, FlatList, ViewStyle, TouchableOpacity } from 'react-native';
import { useTheme } from '@shopify/restyle';
import { Theme } from '../config/theme';
import { ONE_PIXEL, px } from '../helper';
import { Empty, Icon, WhiteSpace } from '..';

interface columnProps {
  // 表单标题
  title: string;
  //数组下标
  dataIndex: string;
  // 文字行数
  numberOfLines?: number;
  // 超出后的截取
  ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip';
  //文字对其方式
  textAlign: 'center' | 'left' | 'right';
  //列的宽度
  width?: number;
  // 列的占比
  flex?: number;
  //自定义文本
  renderText?: (item: string, column: columnProps) => string;
  //自定义组件
  render?: (item: string, column: columnProps) => ReactElement;
}
interface TableProps {
  //列定义
  columns: Array<columnProps>;
  //表格数据
  dataSource: Array<any>;
  // 是否可以横向滚动定义了tableWidth后才可以滚动
  horizontalScroll?: boolean;
  //是否可以竖向滚动定义了外部高度才可以滚动
  verticalScroll?: boolean;
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
  //是否显示分页器
  pagination?: boolean;
  //自定义分页器
  paginationRender?: ReactElement;
  //分页器改变
  paginationChange?: (params: string) => void;
}

const Table: FC<TableProps> = props => {
  const {
    columns = [],
    dataSource = [],
    horizontalScroll = false,
    verticalScroll = false,
    headerStyle = {},
    rowStyle = {},
    onRefresh,
    onEndReached,
    refreshing = false,
    tableWidth,
    pagination = false,
    paginationRender,
    paginationChange,
  } = props;
  const theme = useTheme<Theme>();

  const headRender = () => {
    return columns.map((column, i) => {
      return (
        <View
          key={column.dataIndex || i}
          style={{ flex: column.flex || 1, justifyContent: 'center', width: column.width }}
        >
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
      return (
        <Text key={column.dataIndex || i} style={{ overflow: 'hidden', flex: column.flex || 1, width: column.width }}>
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
  const paginationDom = () => {
    if (!pagination) {
      return null;
    }
    if (paginationRender) {
      return paginationRender;
    }
    return (
      <View style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>
        <TouchableOpacity
          onPress={() => {
            console.log(11);
          }}
        >
          <Icon name="left" size={18} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => paginationChange?.('next')}>
          <Icon name="right" size={18} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        horizontal
        contentContainerStyle={[
          { flexGrow: 1, width: tableWidth, flexDirection: 'column' },
          { flex: !!tableWidth ? 0 : 1 },
        ]}
        showsHorizontalScrollIndicator={true}
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
          {verticalScroll ? (
            <FlatList
              data={dataSource}
              ListEmptyComponent={<Empty isEmpty />}
              renderItem={rowRender}
              onRefresh={onRefresh}
              onEndReached={onEndReached}
              refreshing={refreshing}
            />
          ) : (
            dataSource.map((item, index) => {
              return rowRender({ item, index });
            })
          )}
          {!verticalScroll && dataSource.length === 0 && <Empty isEmpty />}
        </View>
      </ScrollView>
      <WhiteSpace />
      {paginationDom()}
    </View>
  );
};

export default Table;
