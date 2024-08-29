import React, { PropsWithChildren } from 'react';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
import Animated from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useTheme } from '@shopify/restyle';

import { Theme } from '../../theme';
import { ModalProps } from '../type';
import useModal from './useModal';

export default function ModalView(props: PropsWithChildren<ModalProps>) {
  const {
    bodyContainerStyle,
    animationType = 'slide',
    animationDuration = 300,
    visible = false,
    maskClosable = true,
    maskVisible = true,
    position = 'bottom',
    onClose,
    onAnimationEnd,
    onRequestClose,
    children,
  } = props;
  const theme = useTheme<Theme>();
  const { modalVisible, wrapStyle, defaultStyle, handleMaskClose, animationStyleMap } = useModal({
    animationType,
    animationDuration,
    visible,
    maskClosable,
    position,
    onClose,
    onAnimationEnd,
    onRequestClose,
  });

  if (!modalVisible) return null;

  const styles = StyleSheet.create({
    safeArea: { flex: 1, zIndex: 999 },
  });
  return (
    <SafeAreaView edges={[]} style={[styles.safeArea, defaultStyle]}>
      {maskVisible && (
        <TouchableWithoutFeedback onPress={handleMaskClose}>
          <Animated.View style={[StyleSheet.absoluteFill, { backgroundColor: theme.colors.mask }]} />
        </TouchableWithoutFeedback>
      )}
      <Animated.View style={[wrapStyle, bodyContainerStyle, animationStyleMap[animationType]]}>
        {children}
      </Animated.View>
    </SafeAreaView>
  );
}
