import { useTheme } from '@shopify/restyle';
import React, { useCallback } from 'react';
import { LayoutChangeEvent, View } from 'react-native';

import type { BadgeProps } from '.';
import Text from '../text';
import { Theme } from '../theme';
import { useSafeState } from '@td-design/rn-hooks';


const DOT_SIZE = 8; // 默认点大小
export default function useBadge({ type = 'text', containerStyle = {}, textStyle = {}, text, max = 99 }: BadgeProps) {
  const theme = useTheme<Theme>();

  text = typeof text === 'number' && text > max ? `${max}+` : text;

  const isZero = text === '0' || text === 0;
  const isEmpty = text === null || text === undefined || text === '';
  const isHidden = isEmpty || isZero;
  const [badgeOffset, setBadgeOffset] = useSafeState<{ top: number; right: number }>({
    top: 0,
    right: 0,
  });

  const onBadgeLayout = useCallback(
    (event: LayoutChangeEvent) => {
      const { width, height } = event.nativeEvent.layout;
      const newX = Math.round(-width / 2);
      const newY = Math.round(-height / 2);

      if (badgeOffset.top !== newY || badgeOffset.right !== newX) {
        setBadgeOffset({ top: newY, right: newX });
      }
    },
    [text]
  );

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
        onLayout={onBadgeLayout}
        style={{
          borderRadius: 12,
          position: 'absolute',
          top: badgeOffset.top,
          right: badgeOffset.right,
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
