import React, { FC } from 'react';
import { View } from 'react-native';
import { useTheme } from '@shopify/restyle';
import { Theme, Spacing } from '../config/theme';

export interface WhiteSpaceProps {
  size?: Spacing;
  backgroundColor?: string;
}

const WhiteSpace: FC<WhiteSpaceProps> = ({ size = 'm', backgroundColor = 'transparent' }) => {
  const theme = useTheme<Theme>();
  return <View style={{ height: theme.spacing[size], backgroundColor }} />;
};

export default WhiteSpace;
