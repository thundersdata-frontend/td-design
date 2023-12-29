import React, { FC, useMemo } from 'react';
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

const { px, deviceWidth } = helpers;
export interface SliderProps {
  /** 最小值 */
  min?: number;
  /** 最大值 */
  max?: number;
  /** 当前值 */
  value?: number;
  /** 宽度 */
  width?: number;
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

const LABEL_WIDTH = px(100);
const SLIDER_WIDTH = deviceWidth - LABEL_WIDTH;
const SLIDER_HEIGHT = px(20);

const Slider: FC<SliderProps> = props => {
  const theme = useTheme<Theme>();
  const {
    min = 0,
    max = 100,
    value = 0,
    onChange,
    width = SLIDER_WIDTH,
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
  const oneStepValue = sliderRange / 100;

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
      ...StyleSheet.absoluteFillObject,
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
    labelLeft: {
      marginRight: KNOB_WIDTH / 2,
    },
    labelRight: {
      marginLeft: height + KNOB_WIDTH / 2,
    },
  });

  const SliderContent = useMemo(
    () => (
      <Box width={width} height={KNOB_WIDTH} justifyContent={'center'} style={styles.content}>
        <Animated.View style={[styles.progress, progressStyle]} />
        <PanGestureHandler onGestureEvent={onGestureEvent}>
          <Animated.View style={[styles.knob, knobStyle]} />
        </PanGestureHandler>
      </Box>
    ),
    [width, KNOB_WIDTH, progressStyle, onGestureEvent, knobStyle]
  );

  if (!showText) {
    return SliderContent;
  }

  const Label = useMemo(
    () => <ReText style={{ fontSize: px(14), color: theme.colors.gray500, ...textStyle }} text={label} />,
    [label, textStyle]
  );

  if (textPosition === 'top' || textPosition === 'bottom') {
    return (
      <Box>
        {textPosition === 'top' && (
          <Flex justifyContent="center" marginBottom="x1" width={width + KNOB_WIDTH - height / 2}>
            {Label}
          </Flex>
        )}
        {SliderContent}
        {textPosition === 'bottom' && (
          <Flex justifyContent="center" marginTop="x1" width={width + KNOB_WIDTH - height / 2}>
            {Label}
          </Flex>
        )}
      </Box>
    );
  }

  return (
    <Flex>
      {textPosition === 'left' && (
        <Box alignItems={'flex-end'} style={styles.labelLeft}>
          {Label}
        </Box>
      )}
      {SliderContent}
      {textPosition === 'right' && (
        <Box alignItems={'flex-end'} style={styles.labelRight}>
          {Label}
        </Box>
      )}
    </Flex>
  );
};
Slider.displayName = 'Slider';

export default Slider;
