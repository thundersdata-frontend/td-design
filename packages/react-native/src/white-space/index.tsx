import React, { FC } from 'react';
import { View } from 'react-native';
import { backgroundColor, BackgroundColorProps, useRestyle, useTheme } from '@shopify/restyle';
import { Theme, Spacing } from '../config/theme';

const restyleFunctions = [backgroundColor];

type WhiteSpaceProps = BackgroundColorProps<Theme> & {
  size?: Spacing;
};

const WhiteSpace: FC<WhiteSpaceProps> = ({ size = 'm', backgroundColor = 'transparent' }) => {
  const theme = useTheme<Theme>();

  const props = useRestyle(restyleFunctions, {
    height: theme.spacing[size],
    backgroundColor,
  });
  return <View {...props} />;
};

export default WhiteSpace;
