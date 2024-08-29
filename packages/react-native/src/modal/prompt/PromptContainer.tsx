import React, { FC } from 'react';
import { StyleSheet } from 'react-native';

import { useTheme } from '@shopify/restyle';

import Box from '../../box';
import Button from '../../button';
import Flex from '../../flex';
import helpers from '../../helpers';
import Text from '../../text';
import { Theme } from '../../theme';
import ModalView from '../Modal/ModalView';
import { PromptProps } from '../type';
import usePrompt from './usePrompt';

const { ONE_PIXEL } = helpers;
const PromptContainer: FC<
  PromptProps & {
    onAnimationEnd?: (visible: boolean) => void;
  }
> = ({ title, content, okText, cancelText, onOk, onCancel, onAnimationEnd, input }) => {
  const theme = useTheme<Theme>();
  const { value, onChange, visible, hide, handleOk, handleCancel, okBtnLoading, cancelBtnLoading } = usePrompt({
    onOk,
    onCancel,
  });

  const InputComp = React.cloneElement(input, {
    value,
    onChange,
  });

  const styles = StyleSheet.create({
    modal: { marginHorizontal: theme.spacing.x3, borderRadius: theme.borderRadii.x3 },
  });

  return (
    <ModalView
      position="center"
      visible={visible}
      maskClosable={false}
      onAnimationEnd={onAnimationEnd}
      onClose={hide}
      bodyContainerStyle={styles.modal}
    >
      <Box marginBottom="x2">
        <Flex flexDirection="column" justifyContent="center" marginBottom="x2">
          <Flex justifyContent="center" marginVertical="x2">
            {typeof title === 'string' ? (
              <Text variant="h1" color="text">
                {title}
              </Text>
            ) : (
              title
            )}
          </Flex>
          {typeof content === 'string' ? (
            <Text variant="p1" color="text">
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
    </ModalView>
  );
};
export default PromptContainer;
