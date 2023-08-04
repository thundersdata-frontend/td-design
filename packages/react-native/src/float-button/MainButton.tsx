import React, { FC, memo } from 'react';
import { StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { mix, mixColor } from 'react-native-redash';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useTheme } from '@shopify/restyle';

import Pressable from '../pressable';
import SvgIcon from '../svg-icon';
import { Theme } from '../theme';
import { MainButtonProps } from './type';

const MainButton: FC<MainButtonProps> = ({
  size,
  progress,
  buttonColor,
  btnOutRange,
  onPress,
  outRangeScale,
  customIcon,
  activeOpacity,
  verticalOrientation,
}) => {
  const theme = useTheme<Theme>();
  const insets = useSafeAreaInsets();

  const wrapperStyle = useAnimatedStyle(() => {
    const style = {
      zIndex: 99,
      width: size,
      height: size,
      borderRadius: size,
      backgroundColor: mixColor(progress.value, buttonColor, btnOutRange || buttonColor),
    };
    if (verticalOrientation === 'up') {
      Object.assign(style, {
        marginBottom: insets.bottom,
      });
    }

    return style;
  });

  const styles = StyleSheet.create({
    button: {
      width: size,
      height: size,
      borderRadius: size,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  const style = useAnimatedStyle(() => ({
    transform: [
      {
        scale: mix(progress.value, 1, outRangeScale),
      },
      {
        rotateZ: `${mix(progress.value, 0, 135)}deg`,
      },
    ],
  }));

  return (
    <Animated.View style={wrapperStyle}>
      <Animated.View style={[styles.button, style]}>
        <Pressable style={styles.button} activeOpacity={activeOpacity} onPress={onPress}>
          {customIcon ? customIcon : <SvgIcon name="plus" color={theme.colors.white} size={24} />}
        </Pressable>
      </Animated.View>
    </Animated.View>
  );
};
MainButton.displayName = 'MainButton';

export default memo(MainButton);
