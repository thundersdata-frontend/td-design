import React, { FC } from 'react';
import Svg, { Circle, Text, Defs, LinearGradient, Stop } from 'react-native-svg';
import Animated, { multiply, interpolate, Easing } from 'react-native-reanimated';
import { timing } from 'react-native-redash/lib/module/v1';
import { px } from '../helper';
import { useTheme } from '@shopify/restyle';
import { Theme } from '../config/theme';
import { ProgressProps } from './type';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const CircleProgress: FC<Omit<ProgressProps, 'type'>> = props => {
  const theme = useTheme<Theme>();
  const {
    width = px(100),
    color = theme.colors.primaryColor,
    bgColor = theme.colors.overlayColor,
    strokeWidth = px(8),
    value = 1,
    label = { show: true },
  } = props;

  const radius = (width - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;

  const progress = timing({
    duration: 1000,
    from: 0,
    to: 1,
    easing: Easing.inOut(Easing.linear),
  });
  const α = interpolate(progress, {
    inputRange: [0, 1],
    outputRange: [(value * circumference) / radius, 0],
  });
  const strokeDashoffset = multiply(α, radius);
  const strokeDasharray = `${value * circumference} ${circumference}`;

  const { fontSize, fontFamily } = theme.textVariants.primaryNumber;
  return (
    <Svg width={width} height={width} style={{ transform: [{ rotate: '-90deg' }] }}>
      <Defs>
        <LinearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
          <Stop offset="0" stopColor={typeof color === 'string' ? color : color[0]} stopOpacity="1" />
          <Stop offset="1" stopColor={typeof color === 'string' ? color : color[1]} stopOpacity="1" />
        </LinearGradient>
      </Defs>
      <Circle cx={width / 2} cy={width / 2} r={radius} stroke={bgColor} fill="none" {...{ strokeWidth }} />
      <AnimatedCircle
        cx={width / 2}
        cy={width / 2}
        r={radius}
        stroke="url(#grad)"
        fill="none"
        strokeLinecap="round"
        {...{ strokeWidth, strokeDashoffset, strokeDasharray }}
      />
      {label.show && (
        <Text
          x={width / 2}
          y={(width + fontSize) / 2}
          fontSize={fontSize}
          fontFamily={fontFamily}
          fill={theme.colors.primaryColor}
          textAnchor="middle"
          rotation="90"
          originX={width / 2}
          originY={width / 2}
        >
          {`${value * 100}%`}
        </Text>
      )}
    </Svg>
  );
};

export default CircleProgress;
