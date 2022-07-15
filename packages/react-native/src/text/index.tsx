import React, { memo } from 'react';
import { TextProps as RNTextProps } from 'react-native';
import { createText, TextProps } from '@shopify/restyle';
import { Theme } from '../theme';

type Props = TextProps<Theme> &
  RNTextProps & {
    children?: React.ReactNode;
  };

const Text = createText<Theme>();

export default memo(({ children, style, ...props }: Props) => {
  return (
    <Text
      {...props}
      style={[
        {
          includeFontPadding: false,
          textAlignVertical: 'center',
          fontVariant: ['tabular-nums'],
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
});
