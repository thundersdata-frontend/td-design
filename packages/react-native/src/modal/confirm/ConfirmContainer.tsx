import React, { FC } from 'react';
import { StyleSheet } from 'react-native';

import { useTheme } from '@shopify/restyle';

import Box from '../../box';
import Button from '../../button';
import Flex from '../../flex';
import helpers from '../../helpers';
import Text from '../../text';
import { Theme } from '../../theme';
import Modal from '../Modal';
import { ConfirmProps } from '../type';
import useConfirm from './useConfirm';

const { ONE_PIXEL } = helpers;
const ConfirmContainer: FC<
  ConfirmProps & {
    onAnimationEnd?: (visible: boolean) => void;
  }
> = ({ icon, title, content, okText, cancelText, onOk, onCancel, onAnimationEnd }) => {
  const theme = useTheme<Theme>();

  const { visible, okBtnLoading, cancelBtnLoading, hide, handleOk, handleCancel } = useConfirm({ onOk, onCancel });

  const styles = StyleSheet.create({
    modal: { marginHorizontal: theme.spacing.x3, borderRadius: theme.borderRadii.x3 },
  });

  return (
    <Modal
      position="center"
      visible={visible}
      maskClosable={false}
      onAnimationEnd={onAnimationEnd}
      onClose={hide}
      bodyContainerStyle={styles.modal}
    >
      <Box marginBottom="x2">
        {!!icon && <Flex justifyContent="center">{icon}</Flex>}
        <Flex flexDirection="column" justifyContent="center" marginVertical="x2">
          <Text variant="h1" color="text">
            {title}
          </Text>
        </Flex>
        {typeof content === 'string' ? (
          <Flex justifyContent="center">
            <Text variant="p1" color="text">
              {content}
            </Text>
          </Flex>
        ) : (
          content
        )}
      </Box>
      <Flex borderTopWidth={ONE_PIXEL} borderTopColor="border">
        <Flex.Item borderRightWidth={ONE_PIXEL} borderRightColor="border">
          <Button
            loading={cancelBtnLoading}
            onPress={handleCancel}
            title={
              <Text variant="p0" color="text">
                {cancelText}
              </Text>
            }
            type="secondary"
            bordered={false}
            style={{ paddingVertical: theme.spacing.x3 }}
          />
        </Flex.Item>
        <Flex.Item>
          <Button
            loading={okBtnLoading}
            onPress={handleOk}
            title={okText}
            type="secondary"
            bordered={false}
            style={{ paddingVertical: theme.spacing.x3 }}
          />
        </Flex.Item>
      </Flex>
    </Modal>
  );
};
export default ConfirmContainer;
