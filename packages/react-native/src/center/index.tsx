import React, { FC, PropsWithChildren } from 'react';
import Box from '../box';

const Center: FC<
  PropsWithChildren<{
    width?: string | number;
    height?: string | number;
  }>
> = ({ children, width = '100%', height = '100%' }) => {
  return (
    <Box justifyContent={'center'} alignItems={'center'} height={height} width={width}>
      {children}
    </Box>
  );
};

export default Center;
