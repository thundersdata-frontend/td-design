import React, { FC, useEffect, useMemo } from 'react';
import { ReactElement } from 'react';
import { LayoutChangeEvent, ViewStyle } from 'react-native';
import Animated, { Easing, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';

import { useSafeState } from '@td-design/rn-hooks';

import { calc } from './helper';
import { ShiverBone } from './ShiverBone';
import { StaticBone } from './StaticBone';
import { AnimationType, SkeletonProps } from './type';

const DEFAULT_BORDER_RADIUS = 4;

const getBoneStyles = (
  style: ViewStyle,
  size: { width: number; height: number },
  animationType: AnimationType,
  boneColor: string
) => {
  const boneWidth =
    (typeof style.width === 'string' && style.width.includes('%') ? calc(size.width, style.width) : style.width) ?? 0;

  const boneHeight =
    (typeof style.height === 'string' && style.height.includes('%') ? calc(size.height, style.height) : style.height) ??
    0;

  const boneStyle = {
    width: boneWidth,
    height: boneHeight,
    borderRadius: style.borderRadius || DEFAULT_BORDER_RADIUS,
    ...style,
  };

  if (animationType !== 'pulse') {
    boneStyle.overflow = 'hidden';
    boneStyle.backgroundColor = style.backgroundColor || boneColor;
  }
  return boneStyle;
};

const Skeleton: FC<SkeletonProps> = ({
  containerStyle,
  easing = Easing.bezierFn(0.5, 0, 0.25, 1),
  duration = 1200,
  styles,
  animationType = 'shiver',
  animationDirection = 'horizontalRight',
  loading = true,
  boneColor = '#E1E9EE',
  highlightColor = '#F2F8FC',
  children,
}) => {
  const [size, setSize] = useSafeState({ width: 0, height: 0 });
  const animationValue = useSharedValue(0);

  const onLayout = (e: LayoutChangeEvent) => {
    const { width, height } = e.nativeEvent.layout;
    setSize({ width, height });
  };

  useEffect(() => {
    // 重置动画
    animationValue.value = 0;

    if (loading) {
      if (animationType === 'shiver') {
        animationValue.value = withRepeat(withTiming(1, { duration, easing }), -1, false);
      } else {
        animationValue.value = withRepeat(withTiming(1, { duration: duration / 2, easing }), -1, true);
      }
    }
  }, [loading, animationType]);

  const Bones = useMemo(() => {
    if (styles.length > 0) {
      return styles.map((style, i) => {
        const boneStyle = getBoneStyles(style, size, animationType, boneColor);

        if (animationType === 'pulse' || animationType === 'none') {
          return (
            <StaticBone
              key={`${i}`}
              boneStyle={boneStyle}
              {...{ animationType, boneColor, highlightColor }}
              animation={animationValue}
            />
          );
        }

        return (
          <ShiverBone
            key={`${i}`}
            style={style}
            boneStyle={boneStyle}
            {...{ animationDirection, boneColor, highlightColor }}
            animation={animationValue}
            size={size}
          />
        );
      });
    }

    return React.Children.map(children, (child, i) => {
      const style = (child as ReactElement).props.style || {};
      const boneStyle = getBoneStyles(style, size, animationType, boneColor);

      if (animationType === 'pulse' || animationType === 'none') {
        return (
          <StaticBone
            key={`${i}`}
            boneStyle={boneStyle}
            {...{ animationType, boneColor, highlightColor }}
            animation={animationValue}
          />
        );
      }
      return (
        <ShiverBone
          key={`${i}`}
          style={style}
          boneStyle={boneStyle}
          {...{ animationDirection, boneColor, highlightColor }}
          animation={animationValue}
          size={size}
        />
      );
    });
  }, [styles, size, animationType, animationDirection, boneColor, highlightColor, animationValue]);

  return (
    <Animated.View style={containerStyle} onLayout={onLayout}>
      {loading ? Bones : children}
    </Animated.View>
  );
};

export default Skeleton;
