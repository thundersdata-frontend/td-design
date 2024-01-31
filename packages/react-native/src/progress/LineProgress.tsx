import React, { FC } from 'react';
import Animated from 'react-native-reanimated';
import { ReText } from 'react-native-redash';
import Svg, { Defs, Line, LinearGradient, Stop } from 'react-native-svg';

import { useTheme } from '@shopify/restyle';

import Box from '../box';
import Flex from '../flex';
import helpers from '../helpers';
import Text from '../text';
import { Theme } from '../theme';
import { ProgressProps } from './type';
import useLineProgress from './useLineProgress';

const { px } = helpers;
const AnimatedLine = Animated.createAnimatedComponent(Line);

const LineProgress: FC<Omit<ProgressProps, 'innerWidth'>> = props => {
  const theme = useTheme<Theme>();
  const {
    width = px(250),
    color = theme.colors.primary200,
    bgColor = theme.colors.gray200,
    strokeWidth = theme.spacing.x2,
    value = 0,
    showLabel = true,
    labelPosition = 'right',
    unit,
    label,
    labelStyle,
  } = props;

  const { animatedProps, textLabel } = useLineProgress({ width, strokeWidth, unit, value });

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

  const LabelComp = showLabel ? (
    <Box style={labelStyle}>
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
  ) : null;

  if (labelPosition === 'top')
    return (
      <Box width={width}>
        {LabelComp}
        {SvgComp}
      </Box>
    );

  return (
    <Flex width={width}>
      {SvgComp}
      {LabelComp}
    </Flex>
  );
};
LineProgress.displayName = 'LineProgress';

export default LineProgress;
