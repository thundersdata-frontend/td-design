import React, { PropsWithChildren } from 'react';
import { Animated, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';

import Box from '../../box';
import Portal from '../../portal';
import { ModalProps } from '../type';
import useModal from './useModal';

export default function ModalView(props: PropsWithChildren<ModalProps>) {
  const {
    bodyContainerStyle,
    animationType = 'slide-up',
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
  const { modalVisible, maskStyle, wrapStyle, defaultStyle, handleMaskClose, opacity, animationStyleMap } = useModal({
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
  return (
    <Portal>
      <Box flex={1} zIndex={'999'} style={defaultStyle}>
        {maskVisible && (
          <TouchableWithoutFeedback onPress={handleMaskClose}>
            <Animated.View style={[StyleSheet.absoluteFill, { opacity }]}>
              <View style={[StyleSheet.absoluteFill, maskStyle]} />
            </Animated.View>
          </TouchableWithoutFeedback>
        )}
        <Animated.View style={[wrapStyle, bodyContainerStyle, animationStyleMap[animationType]]}>
          {children}
        </Animated.View>
      </Box>
    </Portal>
  );
}
