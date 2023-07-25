import React, { memo, PropsWithChildren } from 'react';
import { TextProps as RNTextProps } from 'react-native';

import { createText, TextProps } from '@shopify/restyle';

import { Theme } from '../theme';

type Props = TextProps<Theme> & RNTextProps;

const BaseText = createText<Theme>();

const Text = memo(({ children, style, ...props }: PropsWithChildren<Props>) => {
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
