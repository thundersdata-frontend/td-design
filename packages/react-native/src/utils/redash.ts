import { interpolateColor } from 'react-native-reanimated';

export const mix = (value: number, x: number, y: number) => {
  'worklet';
  return x * (1 - value) + y * value;
};

type AnimatedColor = string | number;

export const mixColor = (
  value: number,
  color1: AnimatedColor,
  color2: AnimatedColor,
  colorSpace: 'RGB' | 'HSV' = 'RGB'
) => {
  'worklet';
  return interpolateColor(value, [0, 1], [color1, color2], colorSpace);
};

export const clamp = (value: number, lowerBound: number, upperBound: number) => {
  'worklet';
  return Math.min(Math.max(lowerBound, value), upperBound);
};
