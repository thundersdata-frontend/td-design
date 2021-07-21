import React, { FC } from 'react';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { StyleSheet } from 'react-native';
import Iconfont from '../iconfont';
import { mix } from 'react-native-redash';
import { useTheme } from '@shopify/restyle';
import { Theme } from '../theme';
import helpers from '../helpers';

const { px } = helpers;
const Chevron: FC<{ progress: Animated.SharedValue<number> }> = ({ progress }) => {
  const theme = useTheme<Theme>();
  const style = useAnimatedStyle(() => ({
    transform: [{ rotateZ: `${mix(progress.value, 0, Math.PI)}rad` }],
  }));

  return (
    <Animated.View style={[styles.container, style]}>
      <Iconfont name="down" color={theme.colors.icon} size={px(18)} />
    </Animated.View>
  );
};

export default Chevron;

const size = 30;
const styles = StyleSheet.create({
  container: {
    height: size,
    width: size,
    borderRadius: size / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
