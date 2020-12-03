import React from 'react';
import Svg, { Circle } from 'react-native-svg';
import Animated, { Easing, useCode, set } from 'react-native-reanimated';
import { loop, mix, useValue } from 'react-native-redash';
import { WingBlank, WhiteSpace } from '@td-design/react-native';

export default function AnimationLoopDemo() {
  const animation = useValue(0);

  useCode(
    () =>
      set(
        animation,
        loop({
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          boomerang: true,
          autoStart: true,
        })
      ),
    []
  );

  const opacity = mix(animation, 0.2, 1);
  const scale = mix(animation, 1, 1.5);

  return (
    <WingBlank>
      <WhiteSpace />
      <Animated.View
        style={{
          flex: 1,
          marginTop: 150,
          justifyContent: 'center',
          alignItems: 'center',
          opacity,
          transform: [{ scale }],
        }}
      >
        <Svg width={100} height={100} viewBox="0 0 100 100">
          <Circle cx="50" cy="50" r="50" fill="red" fillOpacity="1" />
        </Svg>
      </Animated.View>
    </WingBlank>
  );
}
