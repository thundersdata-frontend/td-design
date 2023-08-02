import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';
import { ReText } from 'react-native-redash';
import Svg, { Circle, Defs, G, LinearGradient, Stop } from 'react-native-svg';

import { useTheme } from '@shopify/restyle';

import Box from '../box';
import helpers from '../helpers';
import Text from '../text';
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
    strokeWidth = theme.spacing.x2,
    innerWidth = theme.spacing.x2,
    value = 0,
    showLabel = true,
    showUnit = true,
    label,
  } = props;

  const { radius, textLabel, circumference, animatedProps } = useCircleProgress({
    width,
    strokeWidth,
    showUnit,
    value,
  });

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
            strokeWidth={innerWidth > strokeWidth ? strokeWidth : innerWidth}
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
      {label ? (
        <Box
          style={[
            StyleSheet.absoluteFillObject,
            {
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            },
          ]}
        >
          {typeof label === 'string' ? (
            <Text variant="p1" color="primary_text">
              {label}
            </Text>
          ) : (
            label
          )}
        </Box>
      ) : (
        showLabel &&
        value > 0 && (
          <ReText
            text={textLabel}
            style={[
              StyleSheet.absoluteFillObject,
              {
                fontSize: px(14),
                color: typeof color === 'string' ? color : theme.colors.primary200,
                fontWeight: '500',
                textAlign: 'center',
              },
            ]}
          />
        )
      )}
    </Box>
  );
};
CircleProgress.displayName = 'CircleProgress';

export default CircleProgress;
