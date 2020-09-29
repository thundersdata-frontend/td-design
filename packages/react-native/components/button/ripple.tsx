import React, { FC, useState, useEffect } from 'react';
import { View, StyleSheet, LayoutChangeEvent } from 'react-native';
import Animated, { Easing, Value, set, useCode, cond, eq } from 'react-native-reanimated';
import { timing } from 'react-native-redash';
import { useTheme } from '@shopify/restyle';
import { px } from '../helper';
import { Theme } from '..';

interface RippleProps {
  setIsSpawned: (isSpawned: boolean) => void;
  buttonProps: {
    isSpawned: boolean;
    left: number;
    top: number;
  };
}

const Ripple: FC<RippleProps> = ({ setIsSpawned, children, buttonProps }) => {
  const theme = useTheme<Theme>();
  const { left, top, isSpawned } = buttonProps;
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  // 计算真实点击坐标定位
  const x = px(-200 + (left / 64) * (1.17 * width));
  const y = px(-50 + (top / 47) * (1.84 * height));
  // 动画开始标记
  const [sign, setSign] = useState<number>(0);
  const scale = new Value(0);
  const opacity = new Value(0);

  useEffect(() => {
    if (isSpawned) {
      setSign(1);
      setTimeout(() => {
        setSign(0);
        // 设置动画状态为原始值
        setIsSpawned(false);
      }, 1200);
    }
  }, [isSpawned, setIsSpawned]);

  useCode(
    () =>
      cond(eq(sign, 1), [
        // 动画过渡
        set(
          scale,
          timing({
            duration: 1200,
            from: 0,
            to: 10,
            easing: Easing.ease,
          })
        ),
        set(
          opacity,
          timing({
            duration: 600,
            from: 0,
            to: 0.7,
            easing: Easing.ease,
          })
        ),
        set(
          opacity,
          timing({
            duration: 1200,
            from: 0.7,
            to: 0,
            easing: Easing.ease,
          })
        ),
      ]),
    [sign, scale, opacity]
  );

  /** 获得容器宽度和高度 */
  const handleLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setWidth(width);
    setHeight(height);
  };

  return (
    <View onLayout={handleLayout} style={styles.container}>
      <Animated.View
        style={{
          position: 'absolute',
          left: x,
          top: y,
          width: px(100),
          height: px(100),
          borderRadius: px(90),
          backgroundColor: theme.colors.rippleColor,
          opacity,
          transform: [{ scale }],
        }}
      />
      {children}
    </View>
  );
};

export default Ripple;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
});
