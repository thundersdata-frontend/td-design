import { useTheme } from '@shopify/restyle';
import React, { Children, cloneElement, FC, isValidElement, PropsWithChildren, ReactElement, useRef } from 'react';
import { View } from 'react-native';
import Animated from 'react-native-reanimated';
import { mix, mixColor } from 'react-native-redash';
import { Theme } from '../theme';

import helpers from '../helpers';
import useSwiper from './useSwiper';

const { deviceWidth, px } = helpers;

export type AlignType = 'left' | 'top' | 'center' | 'middle' | 'right' | 'bottom';
export type SwiperProps = PropsWithChildren<{
  /** 自动滚动 */
  auto?: boolean;
  /** 是否循环播放。默认为true */
  loop?: boolean;
  /** 宽度 */
  width?: number;
  /** 高度 */
  height?: number;
  /** 停留时长 */
  duration?: number;
  /** 是否水平滚动。默认为true */
  horizontal?: boolean;
  /** 是否显示原点指示器 */
  paginationEnabled?: boolean;
  /** 原点大小 */
  dotSize?: number;
  /** 原点选中时颜色 */
  dotActiveColor?: string;
  /** 原点未选中时颜色 */
  dotInactiveColor?: string;
  /** 指示器的位置。horizontal=true时可选值为left/right；horizontal=false时可选值为top/bottom */
  direction?: 'top' | 'left' | 'right' | 'bottom';
  /** 指示器内的点的布局方式。horizontal=true时可选值为left/center/right，表示居左/居中/居右；horizontal=false时可选值为top/middle/bottom，表示靠上/居中/靠下； */
  align?: AlignType;
}>;

const Swiper: FC<SwiperProps> = ({
  auto = true,
  loop = true,
  width = deviceWidth,
  height = px(320),
  duration = 3500,
  horizontal = true,
  direction = 'bottom',
  align = 'center',
  paginationEnabled = true,
  dotSize = px(10),
  dotActiveColor,
  dotInactiveColor,
  children,
}) => {
  const theme = useTheme<Theme>();
  const scrollViewRef = useRef<Animated.ScrollView>(null);

  // 放到hooks里面就不起作用了...
  const count = Children.toArray(children).length;
  const { handleScrollEnd, currentIndex } = useSwiper({
    scrollViewRef,
    count,
    auto,
    loop,
    width,
    height,
    duration,
    horizontal,
  });

  const dotStyle = {};
  if (horizontal) {
    if (direction === 'top') {
      Object.assign(dotStyle, { top: dotSize, justifyContent: getAlign(true, align) });
    } else if (direction === 'bottom') {
      Object.assign(dotStyle, { bottom: dotSize, justifyContent: getAlign(true, align) });
    }
  } else {
    if (direction === 'left') {
      Object.assign(dotStyle, { left: dotSize, justifyContent: getAlign(false, align) });
    } else {
      Object.assign(dotStyle, { right: dotSize, justifyContent: getAlign(false, align) });
    }
  }

  return (
    <View style={{ width, height }}>
      <Animated.ScrollView
        ref={scrollViewRef}
        horizontal={horizontal}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        scrollEnabled
        scrollEventThrottle={16}
        onMomentumScrollEnd={handleScrollEnd}
        bounces={false}
        pagingEnabled
        style={{ height }}
      >
        {Children.toArray(children)
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
          )}
      </Animated.ScrollView>
      {paginationEnabled && (
        <View
          style={[
            {
              position: 'absolute',
              alignItems: 'center',
            },
            horizontal
              ? {
                  width,
                  flexDirection: 'row',
                  left: 0,
                  right: 0,
                  ...dotStyle,
                }
              : {
                  height,
                  ...dotStyle,
                },
          ]}
        >
          {Array(count)
            .fill('')
            .map((_, index) => {
              const activeColor = dotActiveColor ?? theme.colors.gray50;
              const inactiveColor = dotInactiveColor ?? theme.colors.gray200;
              const backgroundColor = mixColor(+(currentIndex === index), inactiveColor, activeColor);
              const scale = mix(+(currentIndex === index), 1, 1.2);
              return (
                <Animated.View
                  key={index}
                  style={[
                    {
                      width: dotSize,
                      height: dotSize,
                      borderRadius: dotSize / 2,
                      backgroundColor,
                      transform: [{ scale }],
                    },
                    horizontal ? { marginHorizontal: dotSize / 2 } : { marginVertical: dotSize / 2 },
                  ]}
                />
              );
            })}
        </View>
      )}
    </View>
  );
};

export default Swiper;

function getAlign(horizontal: boolean, align: AlignType) {
  if (horizontal) {
    switch (align) {
      case 'left':
        return 'flex-start';
      case 'right':
        return 'flex-end';
      case 'center':
      default:
        return 'center';
    }
  } else {
    switch (align) {
      case 'top':
        return 'flex-start';
      case 'bottom':
        return 'flex-end';
      case 'middle':
      default:
        return 'center';
    }
  }
}
