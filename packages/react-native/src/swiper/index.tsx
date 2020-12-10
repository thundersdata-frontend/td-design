import React, { Children, cloneElement, FC, isValidElement, ReactElement, useEffect, useRef, useState } from 'react';
import { View, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import Animated from 'react-native-reanimated';
import { mix } from 'react-native-redash';

import { deviceWidth, px } from '../helper';

type AlignType = 'left' | 'top' | 'center' | 'middle' | 'right' | 'bottom';
interface SwiperProps {
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
  /** 原点颜色 */
  dotColor?: string;
  /** 指示器的位置。horizontal=true时可选值为left/right；horizontal=false时可选值为top/bottom */
  direction?: 'top' | 'left' | 'right' | 'bottom';
  /** 指示器内的点的布局方式。horizontal=true时可选值为left/center/right，表示居左/居中/居右；horizontal=false时可选值为top/middle/bottom，表示靠上/居中/靠下； */
  align?: AlignType;
}

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
  dotColor = '#fff',
  children,
}) => {
  const count = Children.toArray(children).length;
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef<Animated.ScrollView>(null);
  const timer = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (auto) {
      if (timer.current) {
        clearTimeout(timer.current);
      }
      timer.current = setTimeout(() => {
        if (loop) {
          // 循环滚动，在滚动到最后一个之后，设置重新开始
          if (currentIndex === count - 1) {
            setCurrentIndex(0);
            scrollViewRef.current?.getNode().scrollTo(horizontal ? { x: 0, animated: true } : { y: 0, animated: true });
          } else {
            setCurrentIndex(currentIndex + 1);
            scrollViewRef.current
              ?.getNode()
              .scrollTo(
                horizontal
                  ? { x: (currentIndex + 1) * width, animated: true }
                  : { y: (currentIndex + 1) * height, animated: true }
              );
          }
        } else if (currentIndex !== count - 1) {
          setCurrentIndex(currentIndex + 1);
          scrollViewRef.current
            ?.getNode()
            .scrollTo(
              horizontal
                ? { x: (currentIndex + 1) * width, animated: true }
                : { y: (currentIndex + 1) * height, animated: true }
            );
        }
      }, duration);
    }

    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count, currentIndex]);

  const handleScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { x, y } = e.nativeEvent.contentOffset;
    const index = horizontal ? x / width : y / height;
    setCurrentIndex(index);
  };

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
              const opacity = mix(+(currentIndex === index), 0.5, 1);
              return (
                <Animated.View
                  key={index}
                  style={[
                    {
                      width: dotSize,
                      height: dotSize,
                      borderRadius: dotSize / 2,
                      backgroundColor: dotColor,
                      opacity,
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
