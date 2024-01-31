import React, { memo, ReactNode } from 'react';

import Box from '../box';
import Text from '../text';

const Brief = memo(({ brief }: { brief?: ReactNode }) => {
  if (!brief) return null;
  return (
    <Box marginLeft="x1">
      {typeof brief === 'string' ? (
        <Text variant="p2" color="text">
          {brief}
        </Text>
      ) : (
        brief
      )}
    </Box>
  );
});

export default Brief;
