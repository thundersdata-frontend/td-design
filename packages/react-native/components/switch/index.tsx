import React, { FC, useEffect, useRef } from 'react';
import { Animated, View, PanResponder, Easing, PanResponderInstance } from 'react-native';
import { Theme } from '../config/theme';
import { useTheme } from '@shopify/restyle';

import { px } from '../helper';

interface SwitchProps {
  onChange?: (checked: boolean) => void;
  checked?: boolean;
  disabled?: boolean;
  color?: string;
}

const Switch: FC<SwitchProps> = ({ checked, disabled, onChange,color }) => {

  const theme = useTheme<Theme>();
  const thumbWidth = px(27);
  /**
   * 椭圆滑动动画
   */
  const thumbTranslateAnimation = useRef(new Animated.Value(0)).current;

  /**
   * 长按椭圆宽度变化
   */

  const thumbWidthAnimation = useRef(new Animated.Value(thumbWidth)).current;

  /**
   * 背景颜色渐变动画
   */
  const backgroundColorAnimation = useRef(new Animated.Value(checked ? 1 : 0)).current;


  const bgColor = backgroundColorAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [theme.colors.white, color||theme.colors.primaryColor],
  });



  /**
   * 手势事件
   */

  const panResponder = (useRef<PanResponderInstance>().current = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onStartShouldSetPanResponderCapture: () => true,
    onMoveShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponderCapture: () => true,

    onPanResponderGrant: () => {
      if (disabled) {
        return;
      }
      animateThumbWidth(thumbWidth * 1.2);
    },
    onPanResponderRelease: () => {
      if (disabled) {
        return;
      }
      toggle(onChange);
    },
  }));

  useEffect(() => {
    const color = checked ? 1 : 0;
    backgroundColorAnimation.setValue(color);
  }, [checked]);

  const animateThumbTranslate = (value: number, callback?: () => void): void => {
    Animated.timing(thumbTranslateAnimation, {
      toValue: value,
      duration: 150,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start(() => {
      callback && callback();
    });
  };

  const animateThumbWidth = (value: number, callback: () => void = () => null): void => {
    Animated.timing(thumbWidthAnimation, {
      toValue: value,
      duration: 150,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start(callback);
  };

  /**
   * 优化背景渐变动画
   */
  const animateBgColor = (value: number, callback: () => void = () => null): void => {
    Animated.timing(backgroundColorAnimation, {
      toValue: value,
      duration: 150,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start(callback);
  };

  const toggle = (callback?: (checked: boolean) => void) => {
    const value: number = checked ? -px(24) : px(24);
    const color = checked ? 0 : 1;
    animateThumbTranslate(value, () => {
      thumbTranslateAnimation.setValue(0);
      callback && callback(!checked);
    });
    animateBgColor(color);
    animateThumbWidth(thumbWidth);
  };

  const styles = {
    highlight: {
      width: px(51),
      height: px(31),
      borderRadius: px(30),
    },
    ellipse: {
      width: thumbWidthAnimation,
      backgroundColor: theme.colors.white,
      height: thumbWidth,
      borderRadius: thumbWidth,
      transform: [{ translateX: thumbTranslateAnimation }],
      borderColor: theme.colors.borderColor,
      borderWidth: 2,
    },
  };

  return (
    /**
     * TODO增加边框阴影
     */

      <Animated.View
      {...panResponder.panHandlers}
        style={[
          { borderColor:theme.colors.borderColor ,
            borderWidth: 2,
            width: px(50),
            height: px(30),
            borderRadius: px(30),
            overflow: 'hidden'},
          {
            backgroundColor: disabled
              ? checked
                ? theme.colors.backgroundColor1
                : theme.colors.borderColor
              : bgColor,
          },
          styles.highlight,
        ]}
      >
      <Animated.View
        style={[
          {
            alignSelf: checked ? 'flex-end' : 'flex-start',
            position: 'absolute',
          },
          styles.ellipse,
        ]}
      />
      </Animated.View>
  );
};

export default Switch;
