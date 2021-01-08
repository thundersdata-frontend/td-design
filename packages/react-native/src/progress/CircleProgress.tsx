import React, { FC, useRef } from 'react';
import Svg, { Circle, Defs, LinearGradient, Stop, G } from 'react-native-svg';
import Animated, { interpolate, Easing, useCode, call } from 'react-native-reanimated';
import { timing } from 'react-native-redash';
import { px } from '../helper';
import { useTheme } from '@shopify/restyle';
import { Theme } from '../config/theme';
import { ProgressProps } from './type';
import { StyleSheet, TextInput, View } from 'react-native';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

const CircleProgress: FC<Omit<ProgressProps, 'labelPosition'>> = props => {
  const theme = useTheme<Theme>();
  const inputRef = useRef<TextInput>();
  const {
    width = px(100),
    color = theme.colors.primaryColor,
    bgColor = theme.colors.overlayColor,
    strokeWidth = px(10),
    value = 1,
    showLabel = true,
    showUnit = true,
  } = props;

  const radius = width / 2;
  const halfCircle = radius + strokeWidth;
  const circumference = 2 * Math.PI * radius;

  const animation = timing({
    duration: 1000,
    from: 0,
    to: 1,
    easing: Easing.inOut(Easing.linear),
  });

  const strokeDashoffset = interpolate(animation, {
    inputRange: [0, 1],
    outputRange: [circumference, circumference - (value * circumference) / 100],
  });

  const textValue = interpolate(animation, {
    inputRange: [0, 1],
    outputRange: [0, value],
  });

  useCode(
    () => [
      call([textValue], ([textValue]) => {
        if (inputRef.current) {
          inputRef.current.setNativeProps({
            text: showUnit ? `${Math.round(textValue)}%` : `${Math.round(textValue)}`,
          });
        }
      }),
    ],
    [textValue]
  );

  const { fontSize } = theme.textVariants.primaryNumber;
  return (
    <View style={{ width, height: width }}>
      <Svg width={width} height={width} viewBox={`0 0 ${halfCircle * 2} ${halfCircle * 2}`}>
        <Defs>
          <LinearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
            <Stop offset="0" stopColor={typeof color === 'string' ? color : color[0]} stopOpacity="1" />
            <Stop offset="1" stopColor={typeof color === 'string' ? color : color[1]} stopOpacity="1" />
          </LinearGradient>
        </Defs>
        <G rotation="-90" origin={`${halfCircle}, ${halfCircle}`}>
          <Circle
            cx="50%"
            cy="50%"
            stroke={bgColor}
            strokeWidth={strokeWidth}
            r={radius}
            fill="transparent"
            strokeOpacity={0.2}
          />
          <AnimatedCircle
            cx="50%"
            cy="50%"
            r={radius}
            stroke="url(#grad)"
            fill="transparent"
            strokeLinecap="round"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
          />
        </G>
      </Svg>
      {showLabel && (
        <AnimatedTextInput
          ref={inputRef}
          underlineColorAndroid="transparent"
          editable={false}
          defaultValue={showUnit ? '0%' : '0'}
          style={[
            StyleSheet.absoluteFillObject,
            {
              fontSize,
              color: typeof color === 'string' ? color : theme.colors.primaryColor,
              fontWeight: '500',
              textAlign: 'center',
            },
          ]}
        />
      )}
    </View>
  );
};

export default CircleProgress;
