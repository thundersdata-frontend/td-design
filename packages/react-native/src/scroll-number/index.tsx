import { useBoolean, useSafeState } from '@td-design/rn-hooks';
import React, { FC, ReactText } from 'react';
import { LayoutChangeEvent, StyleProp, TextStyle, ViewStyle } from 'react-native';
import Animated, { useAnimatedStyle, withSpring, withTiming } from 'react-native-reanimated';

import Box from '../box';
import Flex from '../flex';
import Text from '../text';

export interface ScrollNumberProps {
  /** 滚动的文字区间。默认是0-9的数字  */
  numberRange?: string[];
  /** 当前值 */
  value: ReactText;
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
  const [measured, { setTrue }] = useBoolean(!!height);
  const [currentHeight, setCurrentHeight] = useSafeState(height);

  const handleLayout = (e: LayoutChangeEvent) => {
    if (height) return;
    const layoutHeight = e.nativeEvent.layout.height;
    setCurrentHeight(layoutHeight);
    setTrue();
  };

  return (
    <Box overflow="hidden" style={measured ? { height: currentHeight } : { opacity: 0 }}>
      <Flex>
        {value
          .toString()
          .split('')
          .map((item, index) => (
            <Box
              key={index}
              overflow="hidden"
              style={[containerStyle, measured ? { height: currentHeight } : { opacity: 0 }]}
            >
              <Tick value={item} height={currentHeight} {...{ numberRange, textStyle, animationType }} />
            </Box>
          ))}
      </Flex>
      <Box opacity={0} style={!!height && { height }}>
        <Text style={[{ fontSize: 18, color: '#333' }, textStyle]} onLayout={handleLayout}>
          {numberRange[0]}
        </Text>
      </Box>
    </Box>
  );
};

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

  return (
    <Animated.View style={[animatedStyle]}>
      {numberRange?.map(i => (
        <Box
          key={i}
          style={[containerStyle, { justifyContent: 'center', alignItems: 'center' }, !!height && { height }]}
        >
          <Text style={[{ fontSize: 18, color: '#333' }, textStyle]}>{i}</Text>
        </Box>
      ))}
    </Animated.View>
  );
};
