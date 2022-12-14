import { useTheme } from '@shopify/restyle';
import React from 'react';
import { View } from 'react-native';

import type { BadgeProps } from '.';
import Text from '../text';
import { Theme } from '../theme';

const DOT_SIZE = 8; // 默认点大小
export default function useBadge({ type = 'text', containerStyle = {}, textStyle = {}, text, max = 99 }: BadgeProps) {
  const theme = useTheme<Theme>();

  text = typeof text === 'number' && text > max ? `${max}+` : text;

  const isZero = text === '0' || text === 0;
  const isEmpty = text === null || text === undefined || text === '';
  const isHidden = isEmpty || isZero;

  const contentDom =
    type === 'dot' ? (
      <View
        style={{
          width: DOT_SIZE,
          height: DOT_SIZE,
          borderRadius: DOT_SIZE / 2,
          position: 'absolute',
          top: -(DOT_SIZE / 2),
          right: -(DOT_SIZE / 2),
          backgroundColor: theme.colors.func600,
          ...containerStyle,
        }}
      />
    ) : (
      <View
        style={{
          borderRadius: 12,
          position: 'absolute',
          top: 0,
          right: 0,
          paddingHorizontal: 6,
          backgroundColor: theme.colors.func600,
          justifyContent: 'center',
          ...containerStyle,
        }}
      >
        <Text
          style={{
            color: theme.colors.white,
            textAlign: 'center',
            ...textStyle,
          }}
        >
          {text}
        </Text>
      </View>
    );

  return {
    isHidden,
    contentDom,
  };
}
