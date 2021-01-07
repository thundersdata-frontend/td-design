import React, { FC } from 'react';
import {
  Modal as RNModal,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  StyleSheet,
  ViewStyle,
  StyleProp,
} from 'react-native';
import { Edge, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@shopify/restyle';
import { deviceHeight, deviceWidth, isIOS } from '../../helper';
import { Theme } from '../../config/theme';
import Box from '../../box';

export interface ModalProps {
  /** 是否显示弹窗 */
  visible: boolean;
  /** 关闭弹窗事件 */
  onClose: () => void;
  /** 弹窗关闭之后触发的事件 */
  afterClose?: () => void;
  /** 蒙层是否允许点击关闭弹窗 */
  maskClosable?: boolean;
  /** 内容显示位置。bottom在底部；center在中间；fullscreen全屏显示 */
  position?: 'bottom' | 'center' | 'fullscreen';
  bodyContainerStyle?: StyleProp<ViewStyle>;
}

const Modal: FC<ModalProps> = ({
  visible,
  onClose,
  afterClose,
  children,
  maskClosable = true,
  position = 'bottom',
  bodyContainerStyle,
}) => {
  const insets = useSafeAreaInsets();
  const theme = useTheme<Theme>();

  const wrapContainer = { zIndex: 99 };
  let edges: Edge[] = [];

  switch (position) {
    case 'bottom':
      Object.assign(wrapContainer, { paddingBottom: insets.bottom });
      edges = ['top'];
      break;
    case 'center':
      Object.assign(wrapContainer);
      edges = ['top', 'bottom'];
      break;
    case 'fullscreen':
      Object.assign(wrapContainer, { flex: 1, paddingTop: insets.top, paddingBottom: insets.bottom });
      edges = ['left', 'right'];
      break;
    default:
      break;
  }

  const content = (
    <SafeAreaView
      style={[
        {
          flex: 1,
          backgroundColor: theme.colors.overlayColor,
          flexDirection: position === 'bottom' ? 'column-reverse' : 'column',
        },
        position === 'center'
          ? {
              justifyContent: 'center',
            }
          : {},
      ]}
      edges={edges}
    >
      <Box backgroundColor="white" borderRadius="base" style={[wrapContainer, bodyContainerStyle]}>
        <KeyboardAvoidingView behavior="padding" enabled={isIOS}>
          {children}
        </KeyboardAvoidingView>
      </Box>
      {maskClosable && position !== 'fullscreen' && (
        <TouchableWithoutFeedback onPress={onClose}>
          <Box
            style={{
              ...StyleSheet.absoluteFillObject,
              width: deviceWidth,
              height: deviceHeight,
            }}
          />
        </TouchableWithoutFeedback>
      )}
    </SafeAreaView>
  );

  return (
    <RNModal animationType="slide" transparent statusBarTranslucent visible={visible} onDismiss={afterClose}>
      {content}
    </RNModal>
  );
};

export default Modal;
