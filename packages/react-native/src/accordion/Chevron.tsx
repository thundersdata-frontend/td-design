import React, { FC } from 'react';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { StyleSheet } from 'react-native';
import Icon from '../icon';
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
      <Icon name="chevron-down" type="feather" color={theme.colors.icon} size={24} />
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
