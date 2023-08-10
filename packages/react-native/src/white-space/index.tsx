import React, { FC } from 'react';

import { useTheme } from '@shopify/restyle';

import Box from '../box';
import { Spacing, Theme } from '../theme';

export interface WhiteSpaceProps {
  size?: Spacing;
  backgroundColor?: string;
}

const WhiteSpace: FC<WhiteSpaceProps> = ({ size = 'x2', backgroundColor = 'transparent' }) => {
  const theme = useTheme<Theme>();
  return <Box height={theme.spacing[size]} style={{ backgroundColor }} />;
};
WhiteSpace.displayName = 'WhiteSpace';

export default WhiteSpace;
