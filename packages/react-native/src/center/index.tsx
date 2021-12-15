import React, { FC } from 'react';
import Flex from '../flex';

const Center: FC = ({ children }) => {
  return (
    <Flex justifyContent={'center'} alignItems={'center'} flex={1} width={'100%'}>
      {children}
    </Flex>
  );
};

export default Center;
