import { useTheme } from '@shopify/restyle';
import React, { FC } from 'react';
import { View } from 'react-native';
import Animated from 'react-native-reanimated';
import { ReText } from 'react-native-redash';
import Svg, { Defs, Line, LinearGradient, Stop } from 'react-native-svg';

import Box from '../box';
import Flex from '../flex';
import helpers from '../helpers';
import { Theme } from '../theme';
import { ProgressProps } from './type';
import useLineProgress from './useLineProgress';

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
    label,
  } = props;

  const { animatedProps, textLabel } = useLineProgress({ width, strokeWidth, showUnit, value });

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
      text={textLabel}
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
        {label ? label : <Box marginLeft="x2">{LabelComp}</Box>}
      </Flex>
    );
  }

  return SvgComp;
};

export default LineProgress;
