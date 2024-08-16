import React, { FC, memo } from 'react';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';

import { useTheme } from '@shopify/restyle';

import SvgIcon from '../svg-icon';
import { Theme } from '../theme';
import { mix } from '../utils/redash';

const Chevron: FC<{ progress: Animated.SharedValue<number> }> = ({ progress }) => {
  const theme = useTheme<Theme>();
  const style = useAnimatedStyle(() => ({
    transform: [{ rotateZ: `${mix(progress.value, 0, Math.PI)}rad` }],
  }));

  return (
    <Animated.View style={style}>
      <SvgIcon name="down" color={theme.colors.gray500} />
    </Animated.View>
  );
};

export default memo(Chevron);
