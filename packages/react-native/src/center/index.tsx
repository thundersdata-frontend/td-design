import React, { FC } from 'react';
import Box from '../box';

const Center: FC<{
  width?: string | number;
  height?: string | number;
  /** children 类型 */
  children?: ChildrenType;
}> = ({ children, width = '100%', height = '100%' }) => {
  return (
    <Box justifyContent={'center'} alignItems={'center'} height={height} width={width}>
      {children}
    </Box>
  );
};

export default Center;
