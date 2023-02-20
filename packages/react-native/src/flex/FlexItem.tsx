import React, { FC, PropsWithChildren } from 'react';
import { View } from 'react-native';

import {
  border,
  BorderProps,
  composeRestyleFunctions,
  layout,
  LayoutProps,
  spacing,
  SpacingProps,
  useRestyle,
} from '@shopify/restyle';

import { Theme } from '../theme';

const restyleFunctions = composeRestyleFunctions([spacing, border, layout]);

type FlexItemProps = PropsWithChildren<SpacingProps<Theme> & BorderProps<Theme> & Omit<LayoutProps<Theme>, 'width'>>;

const FlexItem: FC<FlexItemProps> = ({ children, ...restProps }) => {
  const props = useRestyle(restyleFunctions as any, {
    flex: 1,
    justifyContent: 'center',
    ...restProps,
  });
  return <View {...props}>{children}</View>;
};
FlexItem.displayName = 'FlexItem';

export default FlexItem;
