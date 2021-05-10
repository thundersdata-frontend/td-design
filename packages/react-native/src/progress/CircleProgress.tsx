import React, { FC, useEffect } from 'react';
import Svg, { Circle, Defs, LinearGradient, Stop, G } from 'react-native-svg';
import Animated, { useAnimatedProps, useSharedValue, withTiming } from 'react-native-reanimated';
import { useTheme } from '@shopify/restyle';
import helpers from '../helpers';
import { Theme } from '../theme';
import { ProgressProps } from './type';
import { ReText } from 'react-native-redash';
import Box from '../box';
import { StyleSheet } from 'react-native';

const { px } = helpers;
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const CircleProgress: FC<Omit<ProgressProps, 'labelPosition'>> = props => {
  const theme = useTheme<Theme>();
  const {
    width = px(150),
    color = theme.colors.progress_default,
    bgColor = theme.colors.progress_background,
    strokeWidth = px(10),
    value = 0,
    showLabel = true,
    showUnit = true,
  } = props;
  const radius = (width - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const progress = useSharedValue(0);
  const label = useSharedValue('');

  useEffect(() => {
    progress.value = withTiming(value, { duration: 600 });
    label.value = showUnit ? `${value}%` : `${value}`;
  }, [circumference, label, progress, showUnit, value]);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: circumference - (progress.value * circumference) / 100,
  }));

  return (
    <Box width={width} height={width}>
      <Svg width={width} height={width}>
        <Defs>
          <LinearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
            <Stop offset="0" stopColor={typeof color === 'string' ? color : color[0]} stopOpacity="1" />
            <Stop offset="1" stopColor={typeof color === 'string' ? color : color[1]} stopOpacity="1" />
          </LinearGradient>
        </Defs>
        <G rotation="-90" origin={`${width / 2}, ${width / 2}`}>
          <Circle
            cx={width / 2}
            cy={width / 2}
            r={radius}
            stroke={bgColor}
            strokeWidth={strokeWidth}
            strokeOpacity={1}
            fill="none"
          />
          <AnimatedCircle
            cx={width / 2}
            cy={width / 2}
            r={radius}
            stroke="url(#grad)"
            fill="none"
            strokeLinecap="round"
            strokeWidth={strokeWidth}
            strokeDasharray={`${circumference} ${circumference}`}
            animatedProps={animatedProps}
          />
        </G>
      </Svg>
      {showLabel && value > 0 && (
        <ReText
          text={label}
          style={[
            StyleSheet.absoluteFillObject,
            {
              fontSize: px(14),
              color: typeof color === 'string' ? color : theme.colors.progress_default,
              fontWeight: '500',
              textAlign: 'center',
            },
          ]}
        />
      )}
    </Box>
  );
};

export default CircleProgress;
