import { useTheme } from '@shopify/restyle';
import React, { FC } from 'react';
import { Modal as RNModal, TouchableWithoutFeedback } from 'react-native';
import { Edge, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import Box from '../box';
import { Theme } from '../config/theme';

interface ModalProps {
  /**  */
  visible?: boolean;
  /**  */
  onClose: () => void;
  /**  */
  closable?: boolean;
  /** 内容显示位置。bottom在底部；center在中间；fullscreen全屏显示 */
  position?: 'bottom' | 'center' | 'fullscreen';
}

const Modal: FC<ModalProps> = ({ visible, onClose, children, closable = true, position = 'bottom' }) => {
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

  const content = (
    <SafeAreaView
      style={[
        {
          flex: 1,
          backgroundColor: theme.colors.overlayColor,
        },
        position === 'center'
          ? {
              justifyContent: 'center',
            }
          : {},
      ]}
      edges={edges}
    >
      {closable && position !== 'fullscreen' && (
        <TouchableWithoutFeedback onPress={onClose}>
          <Box flex={1} />
        </TouchableWithoutFeedback>
      )}
      <Box backgroundColor="white" style={wrapContainer}>
        {children}
      </Box>
    </SafeAreaView>
  );

  return (
    <RNModal animationType="slide" transparent statusBarTranslucent visible={visible}>
      {content}
    </RNModal>
  );
};

export default Modal;
