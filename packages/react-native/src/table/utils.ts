import { createContext } from 'react';

import { ColumnProps } from './type';

export const ColumnContext = createContext<{ columns: ColumnProps[]; cellWidth: number }>({
  columns: [],
  cellWidth: 0,
});

export function computeWidth(cellWidth: number, width?: number, flex?: number) {
  const styles = {};
  if (width) {
    Object.assign(styles, {
      width: width,
    });
  } else {
    Object.assign(styles, {
      width: flex ?? 1 * cellWidth,
    });
  }
  return styles;
}
