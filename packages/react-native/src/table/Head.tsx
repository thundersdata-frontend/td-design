import React, { FC, useContext, useMemo } from 'react';
import { StyleProp, ViewStyle } from 'react-native';

import Box from '../box';
import helpers from '../helpers';
import Text from '../text';
import { ColumnContext, computeWidth } from './utils';

const { ONE_PIXEL } = helpers;

interface HeadProps {
  headerStyle?: StyleProp<ViewStyle>;
}

export const Head: FC<HeadProps> = ({ headerStyle }) => {
  const { columns, cellWidth } = useContext(ColumnContext);

  const cellRender = useMemo(() => {
    if (!(columns instanceof Array)) {
      throw new Error('columns 需要是数组');
    }
    return columns.map((item, index) => {
      const styles = computeWidth(cellWidth, item.width);
      return (
        <Box key={item.dataIndex ?? index} justifyContent="center" style={styles}>
          <Text
            variant="p1"
            color="gray500"
            fontWeight="600"
            numberOfLines={item.numberOfLines}
            ellipsizeMode={item.ellipsisMode}
            textAlign={item.textAlign || 'center'}
          >
            {item.title}
          </Text>
        </Box>
      );
    });
  }, [columns, cellWidth]);

  return (
    <Box
      flexDirection="row"
      paddingVertical="x4"
      style={headerStyle}
      borderBottomWidth={ONE_PIXEL}
      borderColor="border"
      backgroundColor="background"
    >
      {cellRender}
    </Box>
  );
};
