import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';
import Svg, { Circle, Defs, G, LinearGradient, Stop } from 'react-native-svg';

import { useTheme } from '@shopify/restyle';

import Box from '../box';
import helpers from '../helpers';
import Text from '../text';
import ReText from '../text/ReText';
import { Theme } from '../theme';
import { ProgressProps } from './type';
import useCircleProgress from './useCircleProgress';

const { px } = helpers;
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const CircleProgress: FC<Omit<ProgressProps, 'labelPosition'>> = props => {
  const theme = useTheme<Theme>();
  const {
    width = px(150),
    color = theme.colors.primary200,
    bgColor = theme.colors.gray200,
    strokeWidth = px(8),
    value = 0,
    label,
    showLabel = true,
    labelStyle,
    unit,
  } = props;

  const { radius, textLabel, circumference, animatedProps } = useCircleProgress({
    width,
    strokeWidth,
    unit,
    value,
  });

  return (
    <Box width={width} height={width} position={'relative'}>
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
      {showLabel ? (
        <Box
          style={[
            StyleSheet.absoluteFillObject,
            {
              width: '100%',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            },
            labelStyle,
          ]}
        >
          {typeof label === 'string' ? (
            <Text variant="p1" color="primary_text">
              {label}
            </Text>
          ) : (
            label
          )}
          <ReText
            text={textLabel}
            style={[
              {
                fontSize: px(14),
                color: typeof color === 'string' ? color : theme.colors.primary200,
                fontWeight: '500',
                textAlign: 'center',
              },
            ]}
          />
        </Box>
      ) : null}
    </Box>
  );
};
CircleProgress.displayName = 'CircleProgress';

export default CircleProgress;
