import React, { FC } from 'react';
import { Modal as RNModal, TouchableWithoutFeedback, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { Edge, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@shopify/restyle';
import Box from '../box';
import { Theme } from '../config/theme';
import alert from './alert';
import { deviceHeight, deviceWidth } from '../helper';

interface ModalProps {
  /** 是否显示弹窗 */
  visible?: boolean;
  /** 关闭弹窗事件 */
  onClose: () => void;
  /** 蒙层是否允许点击关闭弹窗 */
  maskClosable?: boolean;
  /** 内容显示位置。bottom在底部；center在中间；fullscreen全屏显示 */
  position?: 'bottom' | 'center' | 'fullscreen';
}

const Modal: FC<ModalProps> = ({ visible, onClose, children, maskClosable = true, position = 'bottom' }) => {
  const insets = useSafeAreaInsets();
  const theme = useTheme<Theme>();

  const wrapContainer = {};
  let edges: Edge[] = [];

  switch (position) {
    case 'bottom':
      Object.assign(wrapContainer, { paddingBottom: insets.bottom });
      edges = ['top'];
      break;
    case 'center':
      Object.assign(wrapContainer, { marginHorizontal: theme.spacing.m });
      edges = ['top', 'bottom'];
      break;
    case 'fullscreen':
      Object.assign(wrapContainer, { flex: 1, paddingTop: insets.top, paddingBottom: insets.bottom });
      edges = ['left', 'right'];
      break;
    default:
      break;
  }

  console.log(wrapContainer);

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
      <Box backgroundColor="white" borderRadius="base" padding="m" style={wrapContainer}>
        <KeyboardAvoidingView behavior="padding" enabled={Platform.OS === 'ios'}>
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
    <RNModal animationType="slide" transparent statusBarTranslucent visible={visible}>
      {content}
    </RNModal>
  );
};

export default Object.assign(Modal, { alert });
