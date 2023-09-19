import React, { FC, PropsWithChildren } from 'react';
import { DimensionValue } from 'react-native';

import Box from '../box';

const Center: FC<
  PropsWithChildren<{
    width?: DimensionValue;
    height?: DimensionValue;
  }>
> = ({ children, width = '100%', height = '100%' }) => {
  return (
    <Box justifyContent={'center'} alignItems={'center'} height={height} width={width}>
      {children}
    </Box>
  );
};
Center.displayName = 'Center';

export default Center;
