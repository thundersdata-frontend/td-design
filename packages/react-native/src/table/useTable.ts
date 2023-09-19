import { useCallback } from 'react';
import { LayoutChangeEvent } from 'react-native';

import { useSafeState } from '@td-design/rn-hooks';

import { TableProps } from './type';
import { computeCellWidth } from './utils';

export default function useTable<T extends Record<string, any>>({ columns }: Pick<TableProps<T>, 'columns'>) {
  /**当前容器的宽度，用来计算表格的长度 */
  const [containerWidth, setContainerWidth] = useSafeState(0);
  const [headerHeight, setHeaderHeight] = useSafeState(0);
  const [containerHeight, setContainerHeight] = useSafeState(0);

  const contentHeight = containerHeight - headerHeight;
  /** 计算单元格的长度 */
  const cellWidth = computeCellWidth(containerWidth, columns);

  /** 获取容器宽度 如果有tableWidth则用tableWidth */
  const handleLayout = useCallback((w: number, h: number) => {
    setContainerWidth(w);
    setContainerHeight(h);
  }, []);

  return {
    contentHeight,
    handleLayout,
    cellWidth,
    handleHeaderLayout: useCallback((e: LayoutChangeEvent) => setHeaderHeight(e.nativeEvent.layout.height), []),
  };
}
