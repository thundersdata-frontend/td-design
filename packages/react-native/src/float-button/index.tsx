import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import { useDerivedValue, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';

import { useTheme } from '@shopify/restyle';
import { useMemoizedFn } from '@td-design/rn-hooks';

import Box from '../box';
import helpers from '../helpers';
import { Theme } from '../theme';
import Actions from './Actions';
import MainButton from './MainButton';
import { ActionButtonProps } from './type';

const { px } = helpers;

const alignItemsMap = {
  center: 'center',
  left: 'flex-start',
  right: 'flex-end',
};

const ActionButton: FC<ActionButtonProps> = props => {
  const theme = useTheme<Theme>();

  const {
    items,
    position = 'right',
    verticalOrientation = 'up',
    style,
    size = px(40),
    spacing = theme.spacing.x2,
    buttonColor = theme.colors.gray500,
    btnOutRange = theme.colors.black,
    outRangeScale = 1,
    customIcon,
    activeOpacity = 0.6,
  } = props;

  const active = useSharedValue(false);
  const progress = useDerivedValue(() => (active.value ? withSpring(1) : withTiming(0)));

  const handlePress = useMemoizedFn(() => {
    active.value = !active.value;
  });

  const styles = StyleSheet.create({
    container: {
      backgroundColor: 'transparent',
      zIndex: 99,
      padding: theme.spacing.x2,
      justifyContent: verticalOrientation === 'up' ? 'flex-end' : 'flex-start',
      alignItems: alignItemsMap[position] as any,
    },
  });

  return (
    <Box pointerEvents="box-none" style={[StyleSheet.absoluteFill, styles.container, style]}>
      {verticalOrientation === 'up' && (
        <Actions
          {...{
            items,
            verticalOrientation,
            spacing,
            progress,
            size,
            position,
            activeOpacity,
          }}
        />
      )}
      <MainButton
        {...{
          progress,
          size,
          buttonColor,
          btnOutRange,
          outRangeScale,
          customIcon,
          activeOpacity,
          verticalOrientation,
        }}
        onPress={handlePress}
      />
      {verticalOrientation === 'down' && (
        <Actions
          {...{
            items,
            verticalOrientation,
            spacing,
            progress,
            size,
            position,
            activeOpacity,
          }}
        />
      )}
    </Box>
  );
};
ActionButton.displayName = 'ActionButton';

export default ActionButton;
