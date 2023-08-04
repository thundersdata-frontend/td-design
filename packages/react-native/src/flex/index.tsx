import React, { PropsWithChildren } from 'react';
import { ViewProps } from 'react-native';

import { BoxProps } from '@shopify/restyle';

import Box from '../box';
import { Theme } from '../theme';
import FlexItem from './FlexItem';

const Flex = ({ children, ...props }: PropsWithChildren<BoxProps<Theme> & ViewProps>) => {
  return (
    <Box flexDirection={'row'} flexWrap={'nowrap'} justifyContent={'flex-start'} alignItems={'center'} {...props}>
      {children}
    </Box>
  );
};
Flex.displayName = 'Flex';

export default Object.assign(Flex, { Item: FlexItem });
