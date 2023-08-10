import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import { useDerivedValue, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';

import { useTheme } from '@shopify/restyle';
import { useMemoizedFn } from '@td-design/rn-hooks';

import Box from '../box';
import helpers from '../helpers';
import { Theme } from '../theme';
import ActionButtonItem from './ActionButtonItem';
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
    zIndex = 99,
    position = 'right',
    verticalOrientation = 'up',
    style,
    size = px(50),
    spacing = px(20),
    onPress,
    onLongPress,
    buttonColor = theme.colors.gray500,
    btnOutRange = theme.colors.black,
    paddingHorizontal = px(20),
    paddingVertical = px(20),
    outRangeScale = 1.2,
    renderIcon,
    children,
    activeOpacity = 0.5,
  } = props;

  const active = useSharedValue(false);
  const progress = useDerivedValue(() => (active.value ? withSpring(1) : withTiming(0)));

  const handlePress = useMemoizedFn(() => {
    if (children) {
      active.value = !active.value;
    } else {
      onPress?.();
    }
  });

  const styles = StyleSheet.create({
    container: {
      backgroundColor: 'transparent',
      zIndex: zIndex,
      justifyContent: verticalOrientation === 'up' ? 'flex-end' : 'flex-start',
      paddingHorizontal,
      paddingVertical,
      alignItems: alignItemsMap[position] as any,
    },
  });

  return (
    <Box pointerEvents="box-none" style={[StyleSheet.absoluteFill, styles.container, style]}>
      {verticalOrientation === 'up' && children && (
        <Actions
          {...{
            children,
            verticalOrientation,
            spacing,
            zIndex,
            progress,
            size,
            position,
            buttonColor,
          }}
        />
      )}
      <MainButton
        {...{
          progress,
          size,
          zIndex,
          onLongPress,
          buttonColor,
          btnOutRange,
          outRangeScale,
          renderIcon,
          activeOpacity,
        }}
        onPress={handlePress}
      />
      {verticalOrientation === 'down' && children && (
        <Actions
          {...{
            children,
            verticalOrientation,
            spacing,
            zIndex,
            progress,
            size,
            position,
            buttonColor,
          }}
        />
      )}
    </Box>
  );
};
ActionButton.displayName = 'ActionButton';

export default Object.assign(ActionButton, { Item: ActionButtonItem });
