import React, { FC, PropsWithChildren } from 'react';
import { StyleProp, StyleSheet, TouchableWithoutFeedback, ViewStyle } from 'react-native';
import Animated from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import Box from '../../box';
import Portal from '../../portal';
import useModal from './useModal';

const AnimatedSafeAreaView = Animated.createAnimatedComponent(SafeAreaView);

export type ModalProps = PropsWithChildren<{
  /** 是否显示弹窗 */
  visible: boolean;
  /** 关闭弹窗事件 */
  onClose: () => void;
  /** 蒙层是否允许点击关闭弹窗 */
  maskClosable?: boolean;
  /** 是否显示蒙层背景 */
  maskVisible?: boolean;
  /** 内容显示位置。bottom在底部；center在中间；fullscreen全屏显示 */
  position?: 'bottom' | 'center' | 'fullscreen';
  bodyContainerStyle?: StyleProp<ViewStyle>;
}>;

const Modal: FC<ModalProps> = ({
  visible,
  onClose,
  children,
  maskClosable = true,
  maskVisible = true,
  position = 'bottom',
  bodyContainerStyle,
}) => {
  const { rendered, animatedStyle, wrapContainer, edges, hideModal } = useModal({
    visible,
    onClose,
    position,
    maskVisible,
  });

  if (!rendered) return null;
  return (
    <Portal>
      <AnimatedSafeAreaView style={animatedStyle} edges={edges}>
        <Box backgroundColor="background" zIndex="99" style={[wrapContainer, bodyContainerStyle]}>
          {children}
        </Box>
        {position !== 'fullscreen' && (
          <TouchableWithoutFeedback
            disabled={!maskClosable}
            onPress={maskClosable ? hideModal : undefined}
            style={{ zIndex: 19 }}
          >
            <Animated.View style={[StyleSheet.absoluteFill]} />
          </TouchableWithoutFeedback>
        )}
      </AnimatedSafeAreaView>
    </Portal>
  );
};

export default Modal;
