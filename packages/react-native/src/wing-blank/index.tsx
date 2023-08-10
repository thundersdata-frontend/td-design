import React, { FC, PropsWithChildren } from 'react';

import { BoxProps } from '@shopify/restyle';

import Box from '../box';
import { Spacing, Theme } from '../theme';

export interface WingBlankProps extends BoxProps<Theme> {
  size?: Spacing;
}

const WingBlank: FC<PropsWithChildren<WingBlankProps>> = ({ children, size = 'x2', ...restProps }) => {
  return (
    <Box marginHorizontal={size} backgroundColor={'transparent'} {...restProps}>
      {children}
    </Box>
  );
};
WingBlank.displayName = 'WingBlank';

export default WingBlank;
