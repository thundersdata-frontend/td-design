import React, { FC, ReactNode } from 'react';

import { Box, Text } from '@td-design/react-native';

export const Brief: FC<{ brief?: ReactNode }> = ({ brief }) => {
  if (!brief) return null;

  return (
    <Box marginTop="x1">
      {typeof brief === 'string' ? (
        <Text variant="p2" color="text">
          {brief}
        </Text>
      ) : (
        brief
      )}
    </Box>
  );
};
