import { useTheme } from '@shopify/restyle';
import React, { FC } from 'react';
import { StyleSheet, TextStyle, View } from 'react-native';
import { GestureDetector } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import { ReText } from 'react-native-redash';

import Flex from '../flex';
import helpers from '../helpers';
import { Theme } from '../theme';
import useSlider from './useSlider';

const { px, deviceWidth, ONE_PIXEL } = helpers;
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
  /** 滑块边框颜色 */
  borderColor?: string;
  /** 滑块背景色 */
  handleBackground?: string;
  /** 是否显示滑块数字 */
  showLabel?: boolean;
  /** 滑块数字显示位置 */
  labelPosition?: 'top' | 'left' | 'right' | 'bottom';
  /** 文本样式 */
  labelStyle?: TextStyle;
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
    borderColor = theme.colors.primary200,
    handleBackground = theme.colors.white,
    showLabel = true,
    labelPosition = 'top',
    labelStyle,
  } = props;
  const KNOB_WIDTH = height * 1.25;
  const sliderRange = width - KNOB_WIDTH;
  const oneStepValue = sliderRange / 100;

  const { progressStyle, knobStyle, gesture, label } = useSlider({
    min,
    max,
    value,
    onChange,
    oneStepValue,
    knobWidth: KNOB_WIDTH,
  });

  const styles = StyleSheet.create({
    slider: {
      width,
      height: KNOB_WIDTH,
      borderRadius: KNOB_WIDTH / 2,
      backgroundColor,
      justifyContent: 'center',
    },
    progress: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: foregroundColor,
      borderRadius: KNOB_WIDTH / 2,
    },
    knob: {
      height: KNOB_WIDTH,
      width: KNOB_WIDTH,
      borderRadius: KNOB_WIDTH / 2,
      borderWidth: ONE_PIXEL,
      borderColor,
      backgroundColor: handleBackground,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  const SliderContent = (
    <View style={[styles.slider]}>
      <Animated.View style={[styles.progress, progressStyle]}></Animated.View>
      <GestureDetector gesture={gesture}>
        <Animated.View style={[styles.knob, knobStyle]}></Animated.View>
      </GestureDetector>
    </View>
  );

  if (!showLabel) {
    return SliderContent;
  }

  const Label = <ReText style={{ fontSize: px(14), color: theme.colors.gray500, ...labelStyle }} text={label} />;

  if (labelPosition === 'top' || labelPosition === 'bottom') {
    return (
      <View>
        {labelPosition === 'top' && (
          <Flex justifyContent="center" marginBottom="x1" width={width + KNOB_WIDTH - height / 2}>
            {Label}
          </Flex>
        )}
        {SliderContent}
        {labelPosition === 'bottom' && (
          <Flex justifyContent="center" marginTop="x1" width={width + KNOB_WIDTH - height / 2}>
            {Label}
          </Flex>
        )}
      </View>
    );
  }

  return (
    <Flex>
      {labelPosition === 'left' && (
        <View
          style={{
            alignItems: 'flex-end',
            marginRight: KNOB_WIDTH / 2,
          }}
        >
          {Label}
        </View>
      )}
      {SliderContent}
      {labelPosition === 'right' && (
        <View
          style={{
            alignItems: 'flex-end',
            marginLeft: height + KNOB_WIDTH / 2,
          }}
        >
          {Label}
        </View>
      )}
    </Flex>
  );
};

export default Slider;
