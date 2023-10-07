import React, { createElement, memo, PropsWithChildren } from 'react';
import { TextProps as RNTextProps } from 'react-native';

import { createText, TextProps } from '@shopify/restyle';

import { Theme } from '../theme';

type Props = TextProps<Theme> & Omit<RNTextProps, 'onLongPress' | 'onPress' | 'onPressIn' | 'onPressOut'>;

const NativeText = ({ onLongPress, onPress, onPressIn, onPressOut, ...props }: RNTextProps) =>
  createElement('RCTText', props);

const BaseText = createText<Theme>(NativeText);

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
