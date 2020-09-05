import React, { FC } from 'react';
import { View } from 'react-native';
import { useRestyle, spacing } from '@shopify/restyle';
import { Spacing } from '../config/theme';

type WingBlankProps = {
  size?: Spacing;
};

const WingBlank: FC<WingBlankProps> = ({ children, size = 'l' }) => {
  const props = useRestyle([spacing], {
    marginHorizontal: size,
  });
  return <View {...props}>{children}</View>;
};

export default WingBlank;
