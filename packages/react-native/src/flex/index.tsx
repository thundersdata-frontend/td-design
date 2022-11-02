import {
  backgroundColor,
  BackgroundColorProps,
  border,
  BorderProps,
  composeRestyleFunctions,
  layout,
  LayoutProps,
  spacing,
  SpacingProps,
  useRestyle,
} from '@shopify/restyle';
import React, { forwardRef, ReactNode } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';

import { Theme } from '../theme';
import FlexItem from './FlexItem';

const restyleFunctions = composeRestyleFunctions([spacing, border, backgroundColor, layout]);

type FlexProps = SpacingProps<Theme> &
  BorderProps<Theme> &
  LayoutProps<Theme> &
  BackgroundColorProps<Theme> & { style?: StyleProp<ViewStyle>; children?: ReactNode };

const Flex = forwardRef<View, FlexProps>(({ children, ...restProps }, ref) => {
  const props = useRestyle(restyleFunctions as any, {
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
