import { useTheme } from '@shopify/restyle';
import React, { FC } from 'react';
import { View } from 'react-native';

import { Spacing, Theme } from '../theme';

export interface WhiteSpaceProps {
  size?: Spacing;
  backgroundColor?: string;
}

const WhiteSpace: FC<WhiteSpaceProps> = ({ size = 'x3', backgroundColor = 'transparent' }) => {
  const theme = useTheme<Theme>();
  return <View style={{ height: theme.spacing[size], backgroundColor }} />;
};

export default WhiteSpace;
