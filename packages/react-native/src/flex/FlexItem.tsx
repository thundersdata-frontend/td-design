import React, { FC, PropsWithChildren } from 'react';

import { BoxProps } from '@shopify/restyle';

import Box from '../box';
import { Theme } from '../theme';

type FlexItemProps = PropsWithChildren<Omit<BoxProps<Theme>, 'width'>>;

const FlexItem: FC<FlexItemProps> = ({ children, ...props }) => {
  return (
    <Box flex={1} justifyContent={'center'} {...props}>
      {children}
    </Box>
  );
};
FlexItem.displayName = 'FlexItem';

export default FlexItem;
