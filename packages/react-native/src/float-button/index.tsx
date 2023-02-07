import { useTheme } from '@shopify/restyle';
import { useLatest } from '@td-design/rn-hooks';
import React, { FC } from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { useDerivedValue, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';

import Box from '../box';
import helpers from '../helpers';
import { Theme } from '../theme';
import ActionButtonItem from './ActionButtonItem';
import Actions from './Actions';
import MainButton from './MainButton';
import { ActionButtonProps } from './type';

const { px } = helpers;
const getOverlayStyles: (zIndex: number, verticalOrientation: string) => StyleProp<ViewStyle> = (
  zIndex: number,
  verticalOrientation: string
) => {
  return [
    styles.overlay,
    {
      zIndex: zIndex,
      justifyContent: verticalOrientation === 'up' ? 'flex-end' : 'flex-start',
    },
  ];
};

const getPosition: (position: string) => StyleProp<ViewStyle> = (position: string) => {
  const alignItemsMap: { [key: string]: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline' } = {
    center: 'center',
    left: 'flex-start',
    right: 'flex-end',
  };
  return { alignItems: alignItemsMap[position] };
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
  } = props;
  const onPressRef = useLatest(onPress);
  const onLongPressRef = useLatest(onLongPress);

  const active = useSharedValue(false);
  const progress = useDerivedValue(() => (active.value ? withSpring(1) : withTiming(0)));

  const handlePress = () => {
    if (children) {
      active.value = !active.value;
    } else if (onPress) {
      onPressRef.current?.();
    }
  };

  return (
    <Box
      pointerEvents="box-none"
      style={[
        getOverlayStyles(zIndex, verticalOrientation),
        getPosition(position),
        { paddingHorizontal, paddingVertical },
        style,
      ]}
    >
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
          onLongPress: onLongPressRef.current,
          buttonColor,
          btnOutRange,
          outRangeScale,
          renderIcon,
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

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
  },
});
