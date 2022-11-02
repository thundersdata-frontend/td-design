import React, { FC, PropsWithChildren } from 'react';
import { View } from 'react-native';
import { useRestyle, spacing, composeRestyleFunctions } from '@shopify/restyle';
import { Spacing } from '../theme';

export interface WingBlankProps {
  size?: Spacing;
}

const WingBlank: FC<PropsWithChildren<WingBlankProps>> = ({ children, size = 'x3' }) => {
  const restyleFunctions = composeRestyleFunctions([spacing]);

  const props = useRestyle(restyleFunctions as any, {
    marginHorizontal: size,
    flex: 1,
    backgroundColor: 'transparent',
  });
  return <View {...props}>{children}</View>;
};

export default WingBlank;
