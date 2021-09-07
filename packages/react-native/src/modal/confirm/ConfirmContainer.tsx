import React, { FC } from 'react';
import { TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import { useTheme } from '@shopify/restyle';
import Modal from '../Modal';
import Flex from '../../flex';
import Box from '../../box';
import Text from '../../text';
import { ConfirmProps } from '../type';
import helpers from '../../helpers';
import { Theme } from '../../theme';
import useConfirm from './useConfirm';

const { ONE_PIXEL, px } = helpers;
const ConfirmContainer: FC<ConfirmProps> = ({ icon, title, content, okText, cancelText, onOk, onCancel }) => {
  const theme = useTheme<Theme>();

  const { visible, setFalse, handleOk, handleCancel } = useConfirm({ onOk, onCancel });

  const btnStyle: StyleProp<ViewStyle> = {
    justifyContent: 'center',
    alignItems: 'center',
    height: px(54),
  };

  return (
    <Modal
      position="center"
      visible={visible}
      maskClosable={false}
      onClose={setFalse}
      bodyContainerStyle={{ marginHorizontal: theme.spacing.x3, borderRadius: theme.borderRadii.x1 }}
    >
      <Box marginBottom="x3">
        {icon && <Flex justifyContent="center">{icon}</Flex>}
        <Flex flexDirection="column" justifyContent="center" marginVertical="x3">
          <Text variant="h1" color="gray500">
            {title}
          </Text>
        </Flex>
        {typeof content === 'string' ? (
          <Flex justifyContent="center">
            <Text variant="p1" color="gray500">
              {content}
            </Text>
          </Flex>
        ) : (
          content
        )}
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
export default ConfirmContainer;
