import React, { FC, useState } from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { Easing } from 'react-native-reanimated';
import { useTimingTransition } from 'react-native-redash';
import { useTheme } from '@shopify/restyle';

import Box from '../box';
import { px } from '../helper';
import { Theme } from '../config/theme';

import ActionButtonItem from './ActionButtonItem';
import MainButton from './MainButton';
import Actions from './Actions';
import { ActionButtonProps } from './type';

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
    duration = 600,
    zIndex = 99,
    position = 'right',
    verticalOrientation = 'up',
    style,
    size = px(50),
    spacing = px(20),
    onPress,
    onLongPress,
    buttonColor = theme.colors.black,
    btnOutRange = theme.colors.black,
    paddingHorizontal = px(20),
    paddingVertical = px(20),
    outRangeScale = 1.2,
    renderIcon,
    children,
  } = props;

  const [active, setActive] = useState(false);
  const animation = useTimingTransition(active, { duration, easing: Easing.inOut(Easing.ease) });

  const handlePress = () => {
    if (children) {
      setActive(!active);
    } else if (onPress) {
      onPress();
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
            animation,
            size,
            position,
            buttonColor,
          }}
        />
      )}
      <MainButton
        {...{
          animation,
          size,
          zIndex,
          onLongPress,
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
            animation,
            size,
            position,
            buttonColor,
          }}
        />
      )}
    </Box>
  );
};

export default Object.assign(ActionButton, { Item: ActionButtonItem });

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
  },
});
