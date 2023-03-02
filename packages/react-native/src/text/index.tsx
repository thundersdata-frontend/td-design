import React, { memo } from 'react';
import { TextProps as RNTextProps } from 'react-native';

import { createText, TextProps } from '@shopify/restyle';

import { Theme } from '../theme';

type Props = TextProps<Theme> &
  RNTextProps & {
    children?: React.ReactNode;
  };

const BaseText = createText<Theme>();

const Text = memo(({ children, style, ...props }: Props) => {
  return (
    <BaseText
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
    </BaseText>
  );
});
Text.displayName = 'Text';

export default Text;
