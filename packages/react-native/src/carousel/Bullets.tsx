import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';

import { useTheme } from '@shopify/restyle';

import Box from '../box';
import { Theme } from '../theme';
import { mix, mixColor } from '../utils/redash';
import { CarouselProps } from './type';

const justifyContentMap = {
  left: 'flex-start',
  right: 'flex-end',
  center: 'center',
};

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
  if (!indicatorEnabled) return null;

  const styles = StyleSheet.create({
    dot: {
      bottom: indicatorSize,
      justifyContent: justifyContentMap[align] as any,
    },
  });

  return (
    <Box
      position={'absolute'}
      alignItems={'center'}
      width={width}
      left={0}
      right={0}
      flexDirection={'row'}
      style={styles.dot}
    >
      {Array(count)
        .fill('')
        .map((_, index) => (
          <Dot key={index} isCurrent={currentIndex === index} {...{ activeColor, inactiveColor, indicatorSize }} />
        ))}
    </Box>
  );
};
Bullets.displayName = 'Bullets';

export default memo(Bullets);

const Dot = memo(
  (props: { isCurrent: boolean; activeColor?: string; inactiveColor?: string; indicatorSize: number }) => {
    const theme = useTheme<Theme>();
    const { isCurrent, activeColor = theme.colors.gray50, inactiveColor = theme.colors.gray200, indicatorSize } = props;

    const backgroundColor = mixColor(+isCurrent, inactiveColor, activeColor) as any;
    const scale = mix(+isCurrent, 1, 1.2);

    const styles = StyleSheet.create({
      dot: {
        width: indicatorSize,
        height: indicatorSize,
        borderRadius: indicatorSize / 2,
        backgroundColor,
        transform: [{ scale }],
        marginHorizontal: indicatorSize / 2,
      },
    });

    return <Animated.View style={styles.dot} />;
  }
);
