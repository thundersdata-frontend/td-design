import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { mix } from 'react-native-redash';

import { useTheme } from '@shopify/restyle';
import { SvgIcon, Theme } from '@td-design/react-native';

const Chevron: FC<{ progress: Animated.SharedValue<number> }> = ({ progress }) => {
  const theme = useTheme<Theme>();
  const style = useAnimatedStyle(() => ({
    transform: [{ rotateZ: `${mix(progress.value, 0, Math.PI)}rad` }],
  }));

  return (
    <Animated.View style={[styles.container, style]}>
      <SvgIcon name="down" color={theme.colors.gray500} />
    </Animated.View>
  );
};

export default Chevron;

const size = 24;
const styles = StyleSheet.create({
  container: {
    height: size,
    width: size,
    borderRadius: size,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
