import { useSafeState } from '@td-design/rn-hooks';
import React, { FC, ReactNode, ReactText } from 'react';
import { ReactElement } from 'react';
import { LayoutChangeEvent, ViewStyle } from 'react-native';
import Animated, { Easing, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';
import { ShiverBone } from './ShiverBone';
import { StaticBone } from './StaticBone';
import { SkeletonProps } from './type';
import { calc } from './helper';

const DEFAULT_BORDER_RADIUS = 4;
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
  const loadingValue = useSharedValue(+loading);
  const animationValue = useSharedValue(0);
  const shiverValue = useSharedValue(animationType === 'shiver' ? 1 : 0);

  const onLayout = (e: LayoutChangeEvent) => {
    const { width, height } = e.nativeEvent.layout;
    setSize({ width, height });
  };

  if (loadingValue.value === 1) {
    if (shiverValue.value === 1) {
      animationValue.value = withRepeat(withTiming(1, { duration, easing }), -1, false);
    } else {
      animationValue.value = withRepeat(withTiming(1, { duration: duration / 2, easing }), -1, true);
    }
  }

  const getBoneStyles = (style: ViewStyle) => {
    const { backgroundColor, borderRadius } = style;
    const boneWidth =
      (typeof style.width === 'string' && style.width.includes('%') ? calc(size.width, style.width) : style.width) ?? 0;
    const boneHeight =
      (typeof style.height === 'string' && style.height.includes('%')
        ? calc(size.height, style.height)
        : style.height) ?? 0;

    const boneStyle = {
      width: boneWidth,
      height: boneHeight,
      borderRadius: borderRadius || DEFAULT_BORDER_RADIUS,
      ...style,
    };
    if (animationType !== 'pulse') {
      boneStyle.overflow = 'hidden';
      boneStyle.backgroundColor = backgroundColor || boneColor;
    }
    return boneStyle;
  };

  const getBones = (styles: ViewStyle[] = [], children: ReactNode, prefix: ReactText = ''): ReactNode => {
    if (styles.length > 0) {
      return styles.map((style, i) => {
        const boneStyle = getBoneStyles(style);
        const _prefix = prefix ? `${prefix}_${i}` : `${i}`;
        if (animationType === 'pulse' || animationType === 'none') {
          return (
            <StaticBone
              key={_prefix}
              boneStyle={boneStyle}
              {...{ animationType, boneColor, highlightColor }}
              animation={animationValue}
            />
          );
        }
        return (
          <ShiverBone
            key={_prefix}
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
      const boneStyle = getBoneStyles(style);
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
  };

  return (
    <Animated.View style={containerStyle} onLayout={onLayout}>
      {loading ? getBones(styles, children) : children}
    </Animated.View>
  );
};

export default Skeleton;
