import React, { FC } from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';
import { useRestyle, spacing } from '@shopify/restyle';
import { Spacing } from '../config/theme';

type WingBlankProps = {
  size?: Spacing;
  style?: StyleProp<ViewStyle>;
};

const WingBlank: FC<WingBlankProps> = ({ children, size = 'm', style }) => {
  const props = useRestyle([spacing], {
    marginHorizontal: size,
    style,
  });
  return <View {...props}>{children}</View>;
};

export default WingBlank;
