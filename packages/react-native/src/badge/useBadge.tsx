import React, { useCallback, useState } from 'react';
import { LayoutChangeEvent, StyleSheet } from 'react-native';

import { useSafeState } from '@td-design/rn-hooks';

import type { BadgeProps } from '.';
import Box from '../box';
import Text from '../text';

const DOT_SIZE = 8; // 默认点大小
export default function useBadge({ type = 'text', containerStyle = {}, textStyle = {}, text, max = 99 }: BadgeProps) {
  text = typeof text === 'number' && text > max ? `${max}+` : text;

  const isZero = text === '0' || text === 0;
  const isEmpty = text === null || text === undefined || text === '';
  const isHidden = isEmpty || isZero;

  const [layout, setLayout] = useState({ width: 0, height: 0 });
  const [badgeOffset, setBadgeOffset] = useSafeState<{ top: number; right: number }>({
    top: 0,
    right: 0,
  });

  const onBadgeLayout = useCallback(
    (event: LayoutChangeEvent) => {
      const { width, height } = event.nativeEvent.layout;
      const newX = Math.round(-width / 2);
      const newY = Math.round(-height / 2);

      setLayout({ width, height });

      if (badgeOffset.top !== newY || badgeOffset.right !== newX) {
        setBadgeOffset({ top: newY, right: newX });
      }
    },
    [badgeOffset]
  );

  const renderContent = () => {
    if (isHidden) return null;

    if (type === 'dot')
      return (
        <Box
          width={DOT_SIZE}
          height={DOT_SIZE}
          position={'absolute'}
          top={-(DOT_SIZE / 2)}
          right={-(DOT_SIZE / 2)}
          backgroundColor={'func600'}
          style={StyleSheet.compose(
            {
              borderRadius: DOT_SIZE / 2,
            },
            containerStyle
          )}
        />
      );
    return (
      <Box
        borderRadius={'x1'}
        position={'absolute'}
        top={badgeOffset.top}
        right={badgeOffset.right}
        paddingHorizontal={'x1'}
        backgroundColor={'func600'}
        justifyContent={'center'}
        style={containerStyle}
      >
        <Text textAlign={'center'} color="white" style={textStyle}>
          {text}
        </Text>
      </Box>
    );
  };

  return {
    renderContent,
    onBadgeLayout,
    width: layout.width,
    height: layout.height,
  };
}
