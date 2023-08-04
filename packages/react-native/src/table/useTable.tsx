import React, { useCallback } from 'react';
import { LayoutChangeEvent } from 'react-native';

import { useMemoizedFn, useSafeState } from '@td-design/rn-hooks';

import { TableProps } from '.';
import Box from '../box';
import helpers from '../helpers';
import Text from '../text';

const { ONE_PIXEL } = helpers;
export default function useTable<T extends Record<string, any>>({
  columns,
  rowStyle,
}: Pick<TableProps<T>, 'columns' | 'rowStyle'>) {
  const [containerHeight, setContainerHeight] = useSafeState(0);
  const [containerWidth, setContainerWidth] = useSafeState(0);
  const [headerHeight, setHeaderHeight] = useSafeState(0);

  const contentHeight = containerHeight - headerHeight;

  /** 计算单元格的长度 */
  const cellWidth =
    (containerWidth - columns.reduce((prev, next) => prev + (next.width ?? 0), 0)) /
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
            color="text"
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

  const rowRender = ({ item, index }: { item: T; index: number }) => {
    return (
      <Box
        key={index}
        flexDirection="row"
        flexGrow={1}
        borderBottomWidth={ONE_PIXEL}
        borderColor="border"
        paddingVertical="x2"
        alignItems="center"
        style={rowStyle}
      >
        {cellRender(item)}
      </Box>
    );
  };

  const cellRender = (data: T) => {
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
              color="text"
              selectable
            >
              {column.render(data[column.dataIndex], column)}
            </Text>
          ) : (
            <Text
              numberOfLines={column.numberOfLines}
              ellipsizeMode={column.ellipsisMode}
              textAlign={column.textAlign || 'center'}
              variant="p1"
              color="text"
              selectable
            >
              {column.renderText ? column.renderText(data[column.dataIndex], column) : data[column.dataIndex] ?? '-'}
            </Text>
          )}
        </Box>
      );
    });
  };

  return {
    contentHeight,
    handleLayout: useCallback((w: number, h: number) => {
      setContainerWidth(w);
      setContainerHeight(h);
    }, []),
    handleHeaderLayout: useCallback((e: LayoutChangeEvent) => setHeaderHeight(e.nativeEvent.layout.height), []),
    renderHeader: useMemoizedFn(headRender),
    renderItem: useMemoizedFn(rowRender),
  };
}
