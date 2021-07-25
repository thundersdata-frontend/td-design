import React, { FC } from 'react';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { StyleSheet } from 'react-native';
import SvgIcon from '../svg-icon';
import { useTheme } from '@shopify/restyle';
import { Theme } from '../theme';
import { mix } from 'react-native-redash';

const Chevron: FC<{ progress: Animated.SharedValue<number> }> = ({ progress }) => {
  const theme = useTheme<Theme>();
  const style = useAnimatedStyle(() => ({
    transform: [{ rotateZ: `${mix(progress.value, 0, Math.PI)}rad` }],
  }));

  return (
    <Animated.View style={[styles.container, style]}>
      <SvgIcon name="down" color={theme.colors.icon} />
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
