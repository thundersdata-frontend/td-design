import React, { FC, useEffect } from 'react';
import { View } from 'react-native';
import Animated, { useSharedValue, withTiming, useAnimatedProps } from 'react-native-reanimated';
import Svg, { Line, Defs, LinearGradient, Stop } from 'react-native-svg';
import { ReText } from 'react-native-redash';
import helpers from '../helpers';
import { useTheme } from '@shopify/restyle';
import { Theme } from '../theme';
import { ProgressProps } from './type';
import Flex from '../flex';
import Box from '../box';

const { px } = helpers;
const AnimatedLine = Animated.createAnimatedComponent(Line);

const LineProgress: FC<ProgressProps> = props => {
  const theme = useTheme<Theme>();
  const {
    width = px(250),
    color = theme.colors.primary200,
    bgColor = theme.colors.gray200,
    strokeWidth = px(8),
    value = 0,
    showLabel = true,
    labelPosition = 'right',
    showUnit = true,
  } = props;
  const progressWidth = useSharedValue(0);
  const label = useSharedValue('');

  useEffect(() => {
    progressWidth.value = withTiming((value * width) / 100 - strokeWidth / 2, { duration: 600 });
    label.value = showUnit ? `${value}%` : `${value}`;
  }, [label, progressWidth, showUnit, value, width, strokeWidth]);

  const animatedProps = useAnimatedProps(() => ({
    x2: progressWidth.value,
  }));

  const SvgComp = (
    <Svg width={width} height={strokeWidth}>
      <Defs>
        <LinearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
          <Stop offset="0" stopColor={typeof color === 'string' ? color : color[0]} stopOpacity="1" />
          <Stop offset="1" stopColor={typeof color === 'string' ? color : color[1]} stopOpacity="1" />
        </LinearGradient>
      </Defs>
      <Line
        x1={strokeWidth / 2}
        x2={width - strokeWidth / 2}
        y1={strokeWidth / 2}
        y2={strokeWidth / 2}
        fill="none"
        stroke={bgColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <AnimatedLine
        x1={strokeWidth / 2}
        y1={strokeWidth / 2}
        y2={strokeWidth / 2}
        fill="none"
        stroke="url(#grad)"
        strokeLinecap="round"
        strokeWidth={strokeWidth}
        animatedProps={animatedProps}
      />
    </Svg>
  );

  const LabelComp = value > 0 && (
    <ReText
      text={label}
      style={[
        {
          fontSize: px(14),
          color: typeof color === 'string' ? color : theme.colors.primary200,
          fontWeight: '500',
        },
      ]}
    />
  );

  if (showLabel) {
    if (labelPosition === 'top') {
      return (
        <View>
          {LabelComp}
          {SvgComp}
        </View>
      );
    }
    return (
      <Flex>
        {SvgComp}
        <Box marginLeft="x2">{LabelComp}</Box>
      </Flex>
    );
  }

  return SvgComp;
};

export default LineProgress;
