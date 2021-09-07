import React from 'react';
import { LayoutChangeEvent } from 'react-native';
import { useMemoizedFn, useSafeState } from '@td-design/rn-hooks';

import { TableProps } from '.';
import Box from '../box';
import Text from '../text';
import helpers from '../helpers';

const { ONE_PIXEL } = helpers;
export default function useTable({
  columns,
  rowStyle,
  tableWidth,
}: Pick<TableProps, 'columns' | 'rowStyle' | 'tableWidth'>) {
  /**当前容器的宽度，用来计算表格的长度 */
  const [wrapWidth, setWrapWidth] = useSafeState<number>(0);

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
            variant="p1"
            color="gray500"
            numberOfLines={column.numberOfLines}
            ellipsizeMode={column.ellipsisMode}
            textAlign={column.textAlign || 'center'}
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
        borderColor="border"
        paddingVertical="x4"
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
              ellipsizeMode={column.ellipsisMode}
              textAlign={column.textAlign || 'center'}
              variant="p1"
              color="gray500"
            >
              {column.render(data[column.dataIndex], column)}
            </Text>
          ) : (
            <Text
              numberOfLines={column.numberOfLines}
              ellipsizeMode={column.ellipsisMode}
              textAlign={column.textAlign || 'center'}
              variant="p1"
              color="gray500"
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

  return {
    handleLayout: useMemoizedFn(handleLayout),
    headRender: useMemoizedFn(headRender),
    rowRender: useMemoizedFn(rowRender),
  };
}
