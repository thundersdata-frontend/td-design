import React, { forwardRef, ReactNode } from 'react';
import { View } from 'react-native';
import {
  spacing,
  SpacingProps,
  border,
  BorderProps,
  backgroundColor,
  BackgroundColorProps,
  layout,
  LayoutProps,
  useRestyle,
} from '@shopify/restyle';
import { Theme } from '../config/theme';
import FlexItem from './FlexItem';

const restyleFunctions = [spacing, border, backgroundColor, layout];

type FlexProps = SpacingProps<Theme> &
  BorderProps<Theme> &
  LayoutProps<Theme> &
  BackgroundColorProps<Theme> & { children: ReactNode };

const Flex = forwardRef<View, FlexProps>(({ children, ...restProps }, ref) => {
  const props = useRestyle(restyleFunctions, {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'flex-start',
    alignItems: 'center',
    ...restProps,
  });

  return (
    <View ref={ref} {...props}>
      {children}
    </View>
  );
});

export default Object.assign(Flex, { Item: FlexItem });
