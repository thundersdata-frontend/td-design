import React, { FC } from 'react';
import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native';

import NiceModal from '@ebay/nice-modal-react';
import { useTheme } from '@shopify/restyle';

import Box from '../../box';
import Flex from '../../flex';
import helpers from '../../helpers';
import Text from '../../text';
import { Theme } from '../../theme';
import Modal from '../Modal';
import { PromptProps } from '../type';
import usePrompt from './usePrompt';

const { ONE_PIXEL, px } = helpers;
const PromptContainer: FC<PromptProps> = ({ title, content, okText, cancelText, onOk, onCancel, input }) => {
  const theme = useTheme<Theme>();
  const { value, onChange, modal, handleOk, handleCancel } = usePrompt({ onOk, onCancel });

  const InputComp = React.cloneElement(input, {
    value,
    onChange,
  });

  const btnStyle: StyleProp<ViewStyle> = {
    justifyContent: 'center',
    alignItems: 'center',
    height: px(54),
  };

  return (
    <Modal
      position="center"
      visible={modal.visible}
      maskClosable={false}
      onClose={modal.hide}
      bodyContainerStyle={{ marginHorizontal: theme.spacing.x3, borderRadius: theme.borderRadii.x1 }}
    >
      <Box marginBottom="x3">
        <Flex flexDirection="column" justifyContent="center" marginBottom="x3">
          <Flex justifyContent="center" marginVertical="x3">
            <Text variant="h1" color="gray500">
              {title}
            </Text>
          </Flex>
          {typeof content === 'string' ? (
            <Text variant="p1" color="gray500">
              {content}
            </Text>
          ) : (
            content
          )}
        </Flex>
        <Box marginHorizontal="x3">{InputComp}</Box>
      </Box>
      <Flex borderTopWidth={ONE_PIXEL} borderTopColor="border">
        <Flex.Item borderRightWidth={ONE_PIXEL} borderRightColor="border">
          <TouchableOpacity activeOpacity={0.5} onPress={handleCancel} style={btnStyle}>
            <Text variant="p0" color="gray500">
              {cancelText}
            </Text>
          </TouchableOpacity>
        </Flex.Item>
        <Flex.Item>
          <TouchableOpacity activeOpacity={0.5} onPress={handleOk} style={btnStyle}>
            <Text variant="p0" color="primary200">
              {okText}
            </Text>
          </TouchableOpacity>
        </Flex.Item>
      </Flex>
    </Modal>
  );
};
export default NiceModal.create(PromptContainer);
