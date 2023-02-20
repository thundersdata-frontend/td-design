import React, { FC, PropsWithChildren } from 'react';
import { View, ViewProps } from 'react-native';

import { composeRestyleFunctions, spacing, useRestyle } from '@shopify/restyle';

import { Spacing } from '../theme';

export interface WingBlankProps extends ViewProps {
  size?: Spacing;
}

const WingBlank: FC<PropsWithChildren<WingBlankProps>> = ({ children, size = 'x3', ...restProps }) => {
  const restyleFunctions = composeRestyleFunctions([spacing]);

  const props = useRestyle(restyleFunctions as any, {
    marginHorizontal: size,
    backgroundColor: 'transparent',
  });
  return (
    <View {...restProps} {...props}>
      {children}
    </View>
  );
};
WingBlank.displayName = 'WingBlank';

export default WingBlank;
