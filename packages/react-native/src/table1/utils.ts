import { createContext } from 'react';

import { ColumnProps } from './type';

export const ColumnContext = createContext<{ columns: ColumnProps[]; cellWidth: number }>({
  columns: [],
  cellWidth: 0,
});

export function computeWidth(cellWidth: number, width?: number) {
  const styles = {};
  if (width) {
    Object.assign(styles, {
      width: width,
    });
  } else {
    Object.assign(styles, {
      width: cellWidth,
    });
  }
  return styles;
}

export function computeCellWidth(wrapWidth: number, columns: ColumnProps[]): number {
  let needWidth = 0;
  let count = columns.length;

  for (let i = 0; i < columns.length; i++) {
    if (columns[i] && 'number' === typeof columns[i].width) {
      needWidth += columns[i].width!;
      count--;
    }
  }
  // 所有的列都给了width不需要去计算剩下的长度
  if (count <= 0) {
    return 0;
  }

  // 如果当前长度小于表格需要的宽度,未给长度列的默认给一个最小单位 50 表单需要滚动
  if (wrapWidth <= needWidth) {
    return 50;
  }

  // 如果剩下的太小给一个固定的
  const width = (wrapWidth - needWidth) / count;
  return width < 20 ? 20 : width;
}
