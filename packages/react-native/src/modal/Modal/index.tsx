import React, { FC } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Animated, TouchableWithoutFeedback, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { useTheme } from '@shopify/restyle';
import { Theme } from '../../theme';
import Box from '../../box';
import Portal from '../../portal';
import useModal from './useModal';

const AnimatedSafeAreaView = Animated.createAnimatedComponent(SafeAreaView);
export interface ModalProps {
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
  /** children 类型 */
  children?: ChildrenType;
}

const Modal: FC<ModalProps> = ({
  visible,
  onClose,
  children,
  maskClosable = true,
  maskVisible = true,
  position = 'bottom',
  bodyContainerStyle,
}) => {
  const theme = useTheme<Theme>();
  const { rendered, opacity, wrapContainer, edges, hideModal } = useModal({ visible, onClose, position });

  if (!rendered) return null;
  return (
    <Portal>
      <AnimatedSafeAreaView
        style={[
          {
            zIndex: 99,
            flex: 1,
            backgroundColor: maskVisible ? theme.colors.mask : theme.colors.transparent,
            flexDirection: position === 'bottom' ? 'column-reverse' : 'column',
          },
          position === 'center'
            ? {
                justifyContent: 'center',
              }
            : {},
          {
            opacity: opacity.current,
          },
        ]}
        edges={edges}
      >
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
