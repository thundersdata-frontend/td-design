import React, { FC, memo, useContext, useMemo } from 'react';
import { StyleProp, ViewStyle } from 'react-native';

import Box from '../box';
import helpers from '../helpers';
import { Cell } from './Cell';
import { ColumnContext, computeWidth } from './utils';

const { ONE_PIXEL } = helpers;

interface RowsProps {
  data: { [key: string]: string };
  rowStyle?: StyleProp<ViewStyle>;
}

export const Rows: FC<RowsProps> = memo(({ data, rowStyle }) => {
  const { columns, cellWidth } = useContext(ColumnContext);

  const cellRender = useMemo(() => {
    if (!(columns instanceof Array)) {
      throw new Error('columns 需要是数组');
    }
    return columns.map((item, index) => {
      const styles = computeWidth(cellWidth, item.width);
      return <Cell style={styles} key={item.dataIndex || index} data={data} column={item} />;
    });
  }, [columns, data, cellWidth]);

  return (
    <Box
      flexDirection="row"
      flexGrow={1}
      borderBottomWidth={ONE_PIXEL}
      borderColor="border"
      paddingVertical="x4"
      alignItems="center"
      style={rowStyle}
    >
      {cellRender}
    </Box>
  );
});
