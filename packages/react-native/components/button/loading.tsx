import React, { FC, useEffect, useState } from 'react';
import { View, StyleSheet, LayoutChangeEvent } from 'react-native';
import Animated, { Easing, Value } from 'react-native-reanimated';
import { timing } from 'react-native-redash';
import { px } from '../helper';
import Svg, { G, Circle, Path } from 'react-native-svg';
import { useImmer } from 'use-immer';
import { ButtonType } from '.';
import { useTheme } from '@shopify/restyle';
import { Theme } from '..';

interface LoadingProps {
  loading: boolean;
  type: ButtonType;
}

interface AnimateConfigProps {
  [name: string]: Animated.Node<number>;
}

const Loading: FC<LoadingProps> = ({ loading, type }) => {
  const theme = useTheme<Theme>();
  const roundColor = theme.colors[['default', 'link'].includes(type) ? 'primaryColor' : 'white'];
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const [containerHeight, setContainerHeight] = useState<number>(0);
  const [animateConfig, setAnimateConfig] = useImmer<AnimateConfigProps>({
    width: new Value(0),
    height: new Value(0),
    rotate: new Value(0),
  });
  const { width, height, rotate } = animateConfig;

  const styles = StyleSheet.create({
    roundSvg: {
      position: 'absolute',
      left: 0,
      top: 0,
    },
    container: {
      position: 'relative',
      marginRight: px(6),
      marginTop: px(1),
      width: px(12),
      height: px(12),
    },
  });

  /** 执行动画 */
  const runningAnimate = () => {
    const actionEasing = Easing.bezier(0.42, 0, 0.58, 1);
    const width = timing({
      duration: 1200,
      from: 0,
      to: 20,
      easing: actionEasing,
    });
    const height = timing({
      duration: 1200,
      from: 10,
      to: 0,
      easing: Easing.ease,
    });
    const rotate = timing({
      duration: 1200,
      from: 0,
      to: Math.PI * 2,
      easing: actionEasing,
    });
    return { width, height, rotate };
  };
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (loading) {
      timer = setInterval(() => {
        const { width: currentWidth, height: currentHeight, rotate: currentRotate } = runningAnimate();
        setAnimateConfig(config => {
          config.width = currentWidth;
          config.height = currentHeight;
          config.rotate = currentRotate;
        });
      }, 1400);
    }
    return () => clearInterval(timer);
  }, []);

  /** 获得容器宽度和高度 */
  const handleLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setContainerWidth(width);
    setContainerHeight(height);
  };

  return loading ? (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ rotate }],
        },
      ]}
      onLayout={handleLayout}
    >
      {/** 底层的大圆 svg */}
      <Svg style={styles.roundSvg} viewBox="0 0 15.799 15.799">
        <G
          data-name="Oval 1"
          fill="none"
          stroke={roundColor}
          strokeLinecap="round"
          strokeMiterlimit={10}
          strokeWidth={1.5}
          opacity={0.5}
        >
          <Circle cx={7.9} cy={7.9} r={7.9} stroke="none" />
          <Circle cx={7.9} cy={7.9} r={7.15} />
        </G>
      </Svg>
      <Animated.View
        style={{
          width,
          height,
          overflow: 'hidden',
        }}
      >
        {/** 上层的小圆 svg */}
        <Svg style={styles.roundSvg} width={containerWidth} height={containerHeight} viewBox="0 0 15.799 15.799">
          <G data-name="Oval 2" fill="none" strokeLinecap="round">
            <Path d="M7.9 0A7.9 7.9 0 110 7.9 7.9 7.9 0 017.9 0z" />
            <Path
              d="M7.9 1.5c-3.53 0-6.4 2.87-6.4 6.4 0 3.528 2.87 6.4 6.4 6.4 3.528 0 6.4-2.872 6.4-6.4 0-3.53-2.872-6.4-6.4-6.4m0-1.5a7.9 7.9 0 110 15.8A7.9 7.9 0 017.9 0z"
              fill={roundColor}
            />
          </G>
        </Svg>
      </Animated.View>
    </Animated.View>
  ) : (
    <View />
  );
};

export default Loading;
