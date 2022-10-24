import React, { FC } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Animated, { interpolate, useAnimatedStyle } from 'react-native-reanimated';

import { calc } from './helper';
import { ShiverBoneProps } from './type';

/**
 * 渐变的骨架组件
 */
export const ShiverBone: FC<ShiverBoneProps> = ({
  style,
  boneStyle,
  animationDirection,
  boneColor,
  highlightColor,
  animation,
  size,
}) => {
  const animatedStyle = useAnimatedStyle(() => {
    const boneWidth =
      (typeof style.width === 'string' && style.width.includes('%') ? calc(size.width, style.width) : style.width) ?? 0;
    const boneHeight =
      (typeof style.height === 'string' && style.height.includes('%')
        ? calc(size.height, style.height)
        : style.height) ?? 0;
    const outputRange: number[] = [];

    if (animationDirection === 'horizontalRight') {
      outputRange.push(-boneWidth, +boneWidth);
    } else if (animationDirection === 'horizontalLeft') {
      outputRange.push(+boneWidth, -boneWidth);
    } else if (animationDirection === 'verticalDown') {
      outputRange.push(-boneHeight, +boneHeight);
    } else if (animationDirection === 'verticalUp') {
      outputRange.push(+boneHeight, -boneHeight);
    }
    const position = interpolate(animation.value, [0, 1], outputRange);
    if (animationDirection === 'verticalUp' || animationDirection === 'verticalDown') {
      return {
        transform: [{ translateY: position }],
      };
    }
    return {
      transform: [{ translateX: position }],
    };
  });

  return (
    <Animated.View style={boneStyle}>
      <Animated.View style={[{ position: 'absolute', height: '100%', width: '100%' }, animatedStyle]}>
        <LinearGradient
          style={{ flex: 1 }}
          colors={[boneColor!, highlightColor!, boneColor!]}
          start={{ x: 0, y: 0 }}
          end={animationDirection?.startsWith('horizontal') ? { x: 1, y: 0 } : { x: 0, y: 1 }}
        />
      </Animated.View>
    </Animated.View>
  );
};
