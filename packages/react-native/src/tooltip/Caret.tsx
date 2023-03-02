import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { BORDER_RADIUS, CARET_SIDE_SIZE, POPOVER_BACKGROUND_COLOR } from './constant';
import { CaretPosition, TooltipProps } from './type';

export default ({
  align,
  backgroundColor,
  position,
  style,
}: Pick<TooltipProps, 'backgroundColor' | 'position'> & { align?: CaretPosition; style: StyleProp<ViewStyle> }) => {
  return (
    <View
      style={[
        styles.container,
        align === 'center' && styles.containerCenter,
        align === 'right' && styles.containerRight,
        !!backgroundColor && { backgroundColor },
        position === 'top' && styles.containerPositionTop,
        position === 'bottom' && styles.containerPositionBottom,
        position === 'left' && styles.containerPositionLeft,
        position === 'right' && styles.containerPositionRight,
        style,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    width: CARET_SIDE_SIZE,
    height: CARET_SIDE_SIZE,
    backgroundColor: POPOVER_BACKGROUND_COLOR,
    transform: [{ rotate: '45deg' }],
    borderRadius: BORDER_RADIUS,
  },
  containerPositionTop: {
    marginTop: (CARET_SIDE_SIZE / 2 + BORDER_RADIUS / 2) * -1,
    marginBottom: CARET_SIDE_SIZE / 2 + BORDER_RADIUS / 2,
  },
  containerPositionBottom: {
    marginBottom: (CARET_SIDE_SIZE / 2 + BORDER_RADIUS / 2) * -1,
    marginTop: CARET_SIDE_SIZE / 2 + BORDER_RADIUS / 2,
  },
  containerPositionLeft: {
    marginLeft: (CARET_SIDE_SIZE / 2 + BORDER_RADIUS / 2) * -1,
    marginRight: CARET_SIDE_SIZE / 2 + BORDER_RADIUS / 2,
  },
  containerPositionRight: {
    marginRight: (CARET_SIDE_SIZE / 2 + BORDER_RADIUS / 2) * -1,
    marginLeft: CARET_SIDE_SIZE / 2 + BORDER_RADIUS / 2,
  },
  containerCenter: {
    alignSelf: 'center',
  },
  containerRight: {
    alignSelf: 'flex-end',
  },
});
