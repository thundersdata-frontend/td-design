import React, { Children, FC, useState, ReactElement } from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';
import { State, TapGestureHandler } from 'react-native-gesture-handler';
import Animated, { useCode, cond, eq, call, onChange, greaterThan, diff, or, Easing } from 'react-native-reanimated';
import { useTapGestureHandler, translate, withTransition, vec, mix } from 'react-native-redash';
import { useTheme } from '@shopify/restyle';
import { Theme } from '../config/theme';

interface RippleProps {
  onPress?: () => void;
  children: ReactElement<ViewProps>;
  disabled: boolean;
}

const Ripple: FC<RippleProps> = ({ onPress, children, disabled }) => {
  const theme = useTheme<Theme>();
  const [radius, setRadius] = useState(-1);
  const { gestureHandler, position, state } = useTapGestureHandler();
  const child = Children.only(children);
  const progress = withTransition(eq(state, State.BEGAN), {
    easing: Easing.bezier(0.13, 0.57, 0.44, 0.83),
    duration: 1000,
  });
  const isGoingUp = or(greaterThan(diff(progress), 0), eq(progress, 1));
  const scale = mix(progress, 0.001, 1);
  const opacity = mix(progress, isGoingUp, 0);

  useCode(() => onChange(state, cond(eq(state, State.END), [call([], onPress || (() => null))])), []);

  return (
    <TapGestureHandler {...gestureHandler}>
      <Animated.View {...child.props} style={[child.props.style]}>
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
            overflow: 'hidden',
          }}
          onLayout={({
            nativeEvent: {
              layout: { height, width },
            },
          }) => setRadius(Math.sqrt(width ** 2 + height ** 2))}
        >
          {!disabled && (
            <Animated.View
              style={{
                opacity,
                width: radius * 2,
                height: radius * 2,
                borderRadius: radius,
                backgroundColor: theme.colors.rippleColor,
                transform: [...translate(vec.create(-radius)), ...translate(position), { scale }],
              }}
            />
          )}
        </View>
        {children}
      </Animated.View>
    </TapGestureHandler>
  );
};

export default Ripple;
