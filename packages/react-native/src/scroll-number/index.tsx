import React, { FC, useCallback } from 'react';
import { LayoutChangeEvent, StyleProp, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import Animated, { useAnimatedStyle, withSpring, withTiming } from 'react-native-reanimated';

import { useTheme } from '@shopify/restyle';
import { useBoolean, useSafeState } from '@td-design/rn-hooks';

import Box from '../box';
import Flex from '../flex';
import helpers from '../helpers';
import Text from '../text';
import { Theme } from '../theme';

const { px } = helpers;

export interface ScrollNumberProps {
  /** 滚动的文字区间。默认是0-9的数字  */
  numberRange?: string[];
  /** 当前值 */
  value: string | number;
  /** 显示高度（不传的时候默认计算文字的高度） */
  height?: number;
  /** 容器样式 */
  containerStyle?: StyleProp<ViewStyle>;
  /** 文字样式 */
  textStyle?: StyleProp<TextStyle>;
  /** 滚动动画类型 */
  animationType?: 'timing' | 'spring';
}

const defaultNumberRange = Array(10)
  .fill('')
  .map((_, index) => index.toString());

const ScrollNumber: FC<ScrollNumberProps> = ({
  numberRange = defaultNumberRange,
  value,
  height = 0,
  containerStyle,
  textStyle,
  animationType = 'timing',
}) => {
  const theme = useTheme<Theme>();
  const [measured, { setTrue }] = useBoolean(!!height);
  const [currentHeight, setCurrentHeight] = useSafeState(height);

  const handleLayout = useCallback(
    (e: LayoutChangeEvent) => {
      if (height) return;
      const layoutHeight = e.nativeEvent.layout.height;
      setCurrentHeight(layoutHeight);
      setTrue();
    },
    [height]
  );

  const styles = StyleSheet.create({
    height: {
      height: currentHeight,
    },
    opacity: {
      opacity: 0,
    },
    text: { fontSize: 18, color: theme.colors.gray500 },
  });

  return (
    <Box overflow="hidden" style={measured ? styles.height : styles.opacity}>
      <Flex>
        {value
          .toString()
          .split('')
          .map((item, index) => (
            <Box key={index} overflow="hidden" style={[containerStyle, measured ? styles.height : styles.opacity]}>
              <Tick value={item} height={currentHeight} {...{ numberRange, textStyle, animationType }} />
            </Box>
          ))}
      </Flex>
      <Box opacity={0} style={!!height && { height }}>
        <Text fontSize={px(18)} color="text" style={textStyle} onLayout={handleLayout}>
          {numberRange[0]}
        </Text>
      </Box>
    </Box>
  );
};
ScrollNumber.displayName = 'ScrollNumber';

export default ScrollNumber;

export interface TickProps
  extends Pick<ScrollNumberProps, 'numberRange' | 'containerStyle' | 'textStyle' | 'animationType'> {
  value: string;
  height: number;
}
const Tick: FC<TickProps> = ({ numberRange, value, height, containerStyle, textStyle, animationType }) => {
  const getPosition = (value: string, height: number) => {
    'worklet';
    const index = numberRange?.findIndex(item => item === value);
    if (index && index > -1) return index * height * -1;
    return 0;
  };

  const animatedStyle = useAnimatedStyle(() => {
    const position = getPosition(value, height);
    return {
      transform: [
        {
          translateY: animationType === 'timing' ? withTiming(position) : withSpring(position),
        },
      ],
    };
  });

  if (!numberRange || numberRange.length === 0) return null;

  return (
    <Animated.View style={[animatedStyle]}>
      {numberRange.map(i => (
        <Box key={i} justifyContent={'center'} alignItems={'center'} style={[containerStyle, !!height && { height }]}>
          <Text fontSize={px(18)} color="text" style={textStyle}>
            {i}
          </Text>
        </Box>
      ))}
    </Animated.View>
  );
};
