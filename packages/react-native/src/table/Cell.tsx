import React, { FC } from 'react';
import { StyleProp, ViewStyle } from 'react-native';

import Box from '../box';
import Text from '../text';
import { ColumnProps } from './type';

interface CellProps {
  data: { [key: string]: string };
  column: ColumnProps;
  style?: StyleProp<ViewStyle>;
}

export const Cell: FC<CellProps> = ({ data, column, style }) => {
  return (
    <Box style={style}>
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
};
