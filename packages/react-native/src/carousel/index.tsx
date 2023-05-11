import React, { Children, cloneElement, FC, isValidElement, ReactElement } from 'react';
import Animated from 'react-native-reanimated';

import Box from '../box';
import helpers from '../helpers';
import Bullets from './Bullets';
import { CarouselProps } from './type';
import useCarousel from './useCarousel';

const { deviceWidth, px } = helpers;

const Carousel: FC<CarouselProps> = ({
  auto = true,
  width = deviceWidth,
  height = px(320),
  duration = 2000,
  indicatorEnabled = true,
  indicatorSize = px(10),
  align = 'center',
  activeColor,
  inactiveColor,
  children,
}) => {
  // 放到hooks里面就不起作用了...
  const validChildren = Children.toArray(children)
    .filter(child => isValidElement(child))
    .map(child =>
      cloneElement(child as ReactElement, {
        ...(child as ReactElement).props,
        style: {
          ...(child as ReactElement).props.style,
          width,
          height,
        },
      })
    );

  const count = validChildren.length;
  const { onTouchStart, onTouchEnd, onScrollEnd, currentIndex, scrollViewRef } = useCarousel({
    auto,
    width,
    duration,
    count,
  });

  return (
    <Box width={width} height={height}>
      <Animated.ScrollView
        ref={scrollViewRef}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        snapToAlignment={'center'}
        bounces={false}
        scrollEnabled
        pagingEnabled
        scrollEventThrottle={1}
        decelerationRate={'fast'}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onMomentumScrollEnd={onScrollEnd}
        style={{ height }}
      >
        {validChildren}
      </Animated.ScrollView>
      <Bullets
        {...{ indicatorEnabled, indicatorSize, activeColor, inactiveColor, align, currentIndex, count, width }}
      />
    </Box>
  );
};
Carousel.displayName = 'Carousel';

export default Carousel;
