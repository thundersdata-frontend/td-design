import React, { FC } from 'react';
import { View } from 'react-native';
import { spacing, SpacingProps, border, BorderProps, layout, LayoutProps, useRestyle } from '@shopify/restyle';
import { Theme } from '../config/theme';

const restyleFunctions = [spacing, border, layout];

type FlexItemProps = SpacingProps<Theme> & BorderProps<Theme> & Omit<LayoutProps<Theme>, 'width'>;

const FlexItem: FC<FlexItemProps> = ({ children, ...restProps }) => {
  const props = useRestyle(restyleFunctions, {
    flex: 1,
    justifyContent: 'center',
    ...restProps,
  });
  return <View {...props}>{children}</View>;
};

export default FlexItem;
