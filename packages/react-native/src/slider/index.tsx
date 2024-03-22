import React, { FC } from 'react';
import { StyleSheet, TextStyle } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import { ReText } from 'react-native-redash';

import { useTheme } from '@shopify/restyle';

import Box from '../box';
import Flex from '../flex';
import helpers from '../helpers';
import { Theme } from '../theme';
import useSlider from './useSlider';

const { px } = helpers;

export interface SliderProps {
  /** 最小值 */
  min?: number;
  /** 最大值 */
  max?: number;
  /** 当前值 */
  value?: number;
  /** 宽度 */
  width?: number;
  /** 标签文本宽度 */
  labelWidth?: number;
  /** 高度 */
  height?: number;
  /** 滑块拖动后触发事件 */
  onChange?: (value: number) => void;
  /** 滑块左侧颜色 */
  foregroundColor?: string;
  /** 滑块右侧颜色 */
  backgroundColor?: string;
  /** 滑块背景色 */
  handleBackground?: string;
  /** 是否显示滑块数字 */
  showText?: boolean;
  /** 滑块数字显示位置 */
  textPosition?: 'top' | 'left' | 'right' | 'bottom';
  /** 文本样式 */
  textStyle?: TextStyle;
}

const SLIDER_HEIGHT = px(20);

const Slider: FC<SliderProps> = props => {
  const theme = useTheme<Theme>();
  const {
    min = 0,
    max = 100,
    value = 0,
    onChange,
    width = px(250),
    labelWidth = px(40),
    height = SLIDER_HEIGHT,
    backgroundColor = theme.colors.gray200,
    foregroundColor = theme.colors.primary200,
    handleBackground = theme.colors.white,
    showText = true,
    textPosition = 'top',
    textStyle,
  } = props;
  const KNOB_WIDTH = height;
  const sliderRange = width - KNOB_WIDTH;
  const oneStepValue = Math.floor(sliderRange / (max - min)) || 1;

  const { progressStyle, knobStyle, onGestureEvent, label } = useSlider({
    min,
    max,
    value,
    onChange,
    oneStepValue,
    knobWidth: KNOB_WIDTH,
  });

  const styles = StyleSheet.create({
    progress: {
      backgroundColor: foregroundColor,
      borderRadius: KNOB_WIDTH,
    },
    knob: {
      height: KNOB_WIDTH,
      width: KNOB_WIDTH,
      borderRadius: KNOB_WIDTH,
      borderColor: foregroundColor,
      borderWidth: 1,
      backgroundColor: handleBackground,
      justifyContent: 'center',
      alignItems: 'center',
    },
    content: {
      borderRadius: KNOB_WIDTH,
      backgroundColor,
    },
  });

  const SliderContent = (
    <Box width={width} height={KNOB_WIDTH} style={styles.content}>
      <Animated.View style={[StyleSheet.absoluteFillObject, styles.progress, progressStyle]} />
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View style={[styles.knob, knobStyle]} />
      </PanGestureHandler>
    </Box>
  );

  const Label = <ReText style={{ fontSize: px(14), color: theme.colors.gray500, ...textStyle }} text={label} />;

  if (!showText) return SliderContent;

  if (textPosition === 'top' || textPosition === 'bottom')
    return (
      <Box>
        {textPosition === 'top' && <Box marginBottom="x1">{Label}</Box>}
        {SliderContent}
        {textPosition === 'bottom' && <Box marginTop="x1">{Label}</Box>}
      </Box>
    );

  return (
    <Flex position={'relative'}>
      {textPosition === 'left' && (
        <Box width={labelWidth} alignItems={'flex-start'}>
          {Label}
        </Box>
      )}
      {SliderContent}
      {textPosition === 'right' && (
        <Box width={labelWidth} alignItems={'flex-end'}>
          {Label}
        </Box>
      )}
    </Flex>
  );
};
Slider.displayName = 'Slider';

export default Slider;
