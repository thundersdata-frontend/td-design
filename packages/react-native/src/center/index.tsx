import React, { FC } from 'react';
import Box from '../box';

const Center: FC = ({ children }) => {
  return (
    <Box justifyContent={'center'} alignItems={'center'} flex={1} width={'100%'}>
      {children}
    </Box>
  );
};

export default Center;
