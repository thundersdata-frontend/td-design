import React, { FC } from 'react';
import Svg, { Line, Defs, LinearGradient, Stop } from 'react-native-svg';
import Animated, { interpolate, Easing } from 'react-native-reanimated';
import { timing } from 'react-native-redash';
import { px } from '../helper';
import { useTheme } from '@shopify/restyle';
import { Theme } from '../config/theme';
import { ProgressProps } from './type';
import Box from '../box';
import Text from '../text';
import Flex from '../flex';

const AnimatedLine = Animated.createAnimatedComponent(Line);

const LineProgress: FC<Omit<ProgressProps, 'type'>> = props => {
  const theme = useTheme<Theme>();
  const {
    width = px(250),
    color = theme.colors.primaryColor,
    bgColor = theme.colors.overlayColor,
    strokeWidth = px(8),
    value = 1,
    label = {
      show: true,
      position: 'right',
    },
  } = props;
  const progress = timing({
    duration: 1000,
    from: 0,
    to: 1,
    easing: Easing.inOut(Easing.linear),
  });
  const progressWidth = interpolate(progress, {
    inputRange: [0, 1],
    outputRange: [0, value * width - 5],
  });
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
        x2={progressWidth}
        y1={strokeWidth / 2}
        y2={strokeWidth / 2}
        fill="none"
        stroke="url(#grad)"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </Svg>
  );
  const LabelComp = <Text variant="primaryDate">{`${value * 100}%`}</Text>;

  if (label.show) {
    if (label.position === 'top') {
      return (
        <Box>
          {LabelComp}
          {SvgComp}
        </Box>
      );
    }
    return (
      <Flex>
        {SvgComp}
        <Box marginLeft="s">{LabelComp}</Box>
      </Flex>
    );
  }

  return SvgComp;
};

export default LineProgress;
