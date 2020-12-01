import React, { FC } from 'react';
import { StyleSheet, View, TextStyle } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import Animated, {
  add,
  call,
  concat,
  cond,
  diffClamp,
  divide,
  eq,
  interpolate,
  multiply,
  round,
  set,
  sub,
  useCode,
  useValue,
} from 'react-native-reanimated';
import { ReText, usePanGestureHandler } from 'react-native-redash';
import Svg, { Circle } from 'react-native-svg';
import { useTheme } from '@shopify/restyle';

import Flex from '../flex';
import { px, deviceWidth } from '../helper';
import { Theme } from '../config/theme';

interface SliderProps {
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
    backgroundColor = theme.colors.white,
    foregroundColor = theme.colors.primaryColor,
    borderColor = theme.colors.primaryColor,
    handleBackground = theme.colors.white,
    showLabel = true,
    labelPosition = 'top',
    labelStyle,
  } = props;

  const imgSize = height * 1.25;
  const minTranslateX = (min / 100) * width;
  const maxTranslateX = (max / 100) * width;

  const { gestureHandler, translation, state } = usePanGestureHandler();
  const translationX = useValue(0);
  const offsetX = useValue(0);

  const x = diffClamp(translationX, minTranslateX, maxTranslateX);
  const translateX = sub(x, imgSize / 2);

  const scaleX = interpolate(x, {
    inputRange: [0, width],
    outputRange: [0.0001, 1],
  });

  const val = round(multiply(divide(x, width), 100));
  const label = concat(val);

  useCode(
    () => [
      set(offsetX, multiply(width, divide(value - min, 100))),
      set(translationX, multiply(width, divide(value - min, 100))),
    ],
    [value]
  );

  useCode(
    () => [
      cond(eq(state, State.ACTIVE), [set(translationX, add(offsetX, translation.x))]),
      cond(eq(state, State.END), [set(offsetX, translationX), call([val], ([v]) => onChange?.(v))]),
    ],
    []
  );

  const styles = StyleSheet.create({
    slider: {
      width,
      height,
      justifyContent: 'center',
    },
    backgroundSlider: {
      height,
      backgroundColor,
    },
    sides: {
      ...StyleSheet.absoluteFillObject,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    left: {
      width: height,
      height,
      borderRadius: height / 2,
      left: -height / 2,
      backgroundColor: foregroundColor,
    },
    right: {
      width: height,
      height,
      borderRadius: height / 2,
      left: height / 2,
      backgroundColor: 'white',
    },
  });

  const SliderContent = (
    <View style={[styles.slider, { transform: [{ translateX: height / 2 }] }]}>
      <View>
        <View style={styles.backgroundSlider} />
        <View style={styles.sides}>
          <View style={styles.left} />
          <View style={styles.right} />
        </View>
        <Animated.View
          style={[
            styles.backgroundSlider,
            {
              ...StyleSheet.absoluteFillObject,
              backgroundColor: foregroundColor,
              transform: [{ translateX: -SLIDER_WIDTH / 2 }, { scaleX }, { translateX: SLIDER_WIDTH / 2 }],
            },
          ]}
        />
      </View>
      <PanGestureHandler minDist={0} {...gestureHandler}>
        <Animated.View
          style={{
            position: 'absolute',
            top: -(imgSize - height) / 2,
            left: 0,
            width: imgSize,
            height: imgSize,

            transform: [{ translateX }],
          }}
        >
          <Animated.View
            style={{
              ...StyleSheet.absoluteFillObject,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Svg height={imgSize} width={imgSize} viewBox={`0 0 ${imgSize} ${imgSize}`}>
              <Circle
                cx={imgSize / 2}
                cy={imgSize / 2}
                r={(imgSize - px(2)) / 2}
                strokeWidth={px(2)}
                stroke={borderColor}
                fill={handleBackground}
              />
            </Svg>
          </Animated.View>
        </Animated.View>
      </PanGestureHandler>
    </View>
  );

  if (!showLabel) {
    return SliderContent;
  }

  const Label = (
    <ReText style={{ fontSize: px(14), color: theme.colors.primaryTextColor, ...labelStyle }} text={label} />
  );

  if (labelPosition === 'top' || labelPosition === 'bottom') {
    return (
      <View>
        {labelPosition === 'top' && (
          <Flex justifyContent="center" marginBottom="xs" width={width + imgSize - height / 2}>
            {Label}
          </Flex>
        )}
        {SliderContent}
        {labelPosition === 'bottom' && (
          <Flex justifyContent="center" marginTop="xs" width={width + imgSize - height / 2}>
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
            marginRight: imgSize / 2,
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
            marginLeft: height + imgSize / 2,
          }}
        >
          {Label}
        </View>
      )}
    </Flex>
  );
};

export default Slider;
