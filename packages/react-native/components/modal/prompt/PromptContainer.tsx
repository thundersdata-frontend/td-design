import React, { FC, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { useTheme } from '@shopify/restyle';
import Modal from '..';
import Flex from '../../flex';
import Box from '../../box';
import Text from '../../text';
import { Theme } from '../../config/theme';
import { PromptProps } from '../type';
import { ONE_PIXEL, px } from '../../helper';

const PromptContainer: FC<
  PromptProps & {
    afterClose: () => void;
  }
> = ({ title, content, okText, cancelText, onOk, onCancel, input, afterClose }) => {
  const theme = useTheme<Theme>();
  const [visible, setVisible] = useState(true);
  const [value, setValue] = useState<string>();

  const InputComp = React.cloneElement(input, {
    value,
    onChange: (text?: string) => setValue(text),
  });

  /** 确定操作 */
  const handleOk = () => {
    if (!value) return;
    const originPress = onOk || function () {};
    const res = originPress(value);
    if (res && res.then) {
      res.then(() => {
        setVisible(false);
      });
    } else {
      setVisible(false);
    }
  };

  /** 取消操作 */
  const handleCancel = () => {
    const originPress = onCancel || function () {};
    const res = originPress();
    if (res && res.then) {
      res.then(() => {
        setVisible(false);
      });
    } else {
      setVisible(false);
    }
  };

  return (
    <Modal
      position="center"
      visible={visible}
      maskClosable={false}
      onClose={() => setVisible(false)}
      afterClose={afterClose}
    >
      <Box>
        <Flex justifyContent="center">
          <Text variant="primaryTitle">{title}</Text>
        </Flex>
        {content && (
          <Flex justifyContent="center">
            <Text variant="secondaryBody">{content}</Text>
          </Flex>
        )}
        <Box marginVertical="s">{InputComp}</Box>
      </Box>
      <Flex borderTopWidth={ONE_PIXEL} borderTopColor="borderColor">
        <Flex.Item borderRightWidth={ONE_PIXEL} borderRightColor="borderColor">
          <TouchableOpacity
            onPress={handleCancel}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: px(54) - theme.spacing.m,
              paddingTop: theme.spacing.m,
            }}
          >
            <Text variant="primaryTipReverse">{cancelText}</Text>
          </TouchableOpacity>
        </Flex.Item>
        <Flex.Item>
          <TouchableOpacity
            onPress={handleOk}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: px(54) - theme.spacing.m,
              paddingTop: theme.spacing.m,
            }}
          >
            <Text variant="primaryTipReverse">{okText}</Text>
          </TouchableOpacity>
        </Flex.Item>
      </Flex>
    </Modal>
  );
};
export default PromptContainer;
