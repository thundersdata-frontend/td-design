import React, { FC, useState, useEffect } from 'react';
import { View, StyleSheet, LayoutChangeEvent } from 'react-native';
import Animated, { Easing } from 'react-native-reanimated';
import { mix, timing } from 'react-native-redash';
import { useTheme } from '@shopify/restyle';
import { px } from '../helper';
import { Theme } from '..';

interface RippleProps {
  isSpawned: boolean;
  setIsSpawned: (isSpawned: boolean) => void;
  transition: Animated.Node<number>;
  buttonProps: any;
}

const Ripple: FC<RippleProps> = ({ isSpawned, setIsSpawned, transition, children, buttonProps }) => {
  const theme = useTheme<Theme>();
  const { left, top } = buttonProps;
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  // 计算真实点击坐标定位
  const x = px(-200 + (left / 64) * (1.17 * width));
  const y = px(-50 + (top / 47) * (1.84 * height));
  const [scale, setScale] = useState(mix(transition, 0, 10));
  const [opacity, setOpacity] = useState(mix(transition, 0, 1));

  useEffect(() => {
    if (isSpawned) {
      // 动画过渡
      setScale(
        timing({
          duration: 600,
          from: 0,
          to: 10,
          easing: Easing.ease,
        })
      );
      setOpacity(
        timing({
          duration: 600,
          from: 1,
          to: 0,
          easing: Easing.ease,
        })
      );
      setTimeout(() => {
        // 设置动画状态为原始值
        setIsSpawned(false);
      }, 600);
    }
  }, [isSpawned]);

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
