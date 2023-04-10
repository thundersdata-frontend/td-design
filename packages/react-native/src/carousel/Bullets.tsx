import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import Animated from 'react-native-reanimated';
import { mix, mixColor } from 'react-native-redash';

import { useTheme } from '@shopify/restyle';

import Box from '../box';
import { Theme } from '../theme';
import { AlignType, CarouselProps } from './type';

const Bullets = ({
  indicatorEnabled,
  indicatorSize,
  activeColor,
  inactiveColor,
  currentIndex,
  count,
  width,
  align,
}: Required<Pick<CarouselProps, 'indicatorEnabled' | 'indicatorSize' | 'width' | 'align'>> &
  Pick<CarouselProps, 'activeColor' | 'inactiveColor'> & {
    currentIndex: number;
    count: number;
  }) => {
  const theme = useTheme<Theme>();

  if (!indicatorEnabled) return null;

  const dotStyle: StyleProp<ViewStyle> = {
    bottom: indicatorSize,
    justifyContent: getAlign(align),
  };

  return (
    <Box
      position={'absolute'}
      alignItems={'center'}
      width={width}
      left={0}
      right={0}
      flexDirection={'row'}
      style={dotStyle}
    >
      {Array(count)
        .fill('')
        .map((_, index) => {
          const _activeColor = activeColor ?? theme.colors.gray50;
          const _inactiveColor = inactiveColor ?? theme.colors.gray200;
          const backgroundColor = mixColor(+(currentIndex === index), _inactiveColor, _activeColor) as any;
          const scale = mix(+(currentIndex === index), 1, 1.2);
          return (
            <Animated.View
              key={index}
              style={{
                width: indicatorSize,
                height: indicatorSize,
                borderRadius: indicatorSize / 2,
                backgroundColor,
                transform: [{ scale }],
                marginHorizontal: indicatorSize / 2,
              }}
            />
          );
        })}
    </Box>
  );
};
Bullets.displayName = 'Bullets';

export default Bullets;

function getAlign(align: AlignType) {
  switch (align) {
    case 'left':
      return 'flex-start';

    case 'right':
      return 'flex-end';

    case 'center':
    default:
      return 'center';
  }
}
