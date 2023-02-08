import React, { FC } from 'react';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
import Animated from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import Box from '../../box';
import Portal from '../../portal';
import { ModalProps } from '../type';
import useModal from './useModal';

const AnimatedSafeAreaView = Animated.createAnimatedComponent(SafeAreaView);

const Modal: FC<ModalProps> = ({
  visible,
  onClose,
  children,
  duration = 100,
  maskClosable = true,
  maskVisible = true,
  position = 'bottom',
  bodyContainerStyle,
}) => {
  const { rendered, animatedStyle, wrapContainer, edges, hideModal } = useModal({
    visible,
    onClose,
    duration,
    position,
    maskVisible,
  });

  if (!rendered) return null;
  if (position !== 'fullscreen') {
    return (
      <Portal>
        <AnimatedSafeAreaView style={animatedStyle} edges={edges}>
          <Box backgroundColor="background" zIndex="29" style={[wrapContainer, bodyContainerStyle]}>
            {children}
          </Box>
          <TouchableWithoutFeedback
            disabled={!maskClosable}
            onPress={maskClosable ? hideModal : undefined}
            style={{ zIndex: 19 }}
          >
            <Animated.View style={[StyleSheet.absoluteFill]} />
          </TouchableWithoutFeedback>
        </AnimatedSafeAreaView>
      </Portal>
    );
  }
  return (
    <Portal>
      <Animated.View style={animatedStyle}>
        <Box backgroundColor="background" zIndex="29" style={[wrapContainer, bodyContainerStyle]}>
          {children}
        </Box>
      </Animated.View>
    </Portal>
  );
};
Modal.displayName = 'Modal';

export default Modal;
