import React, { FC, PropsWithChildren } from 'react';
import { View } from 'react-native';
import {
  spacing,
  SpacingProps,
  border,
  BorderProps,
  layout,
  LayoutProps,
  useRestyle,
  composeRestyleFunctions,
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

export default FlexItem;
