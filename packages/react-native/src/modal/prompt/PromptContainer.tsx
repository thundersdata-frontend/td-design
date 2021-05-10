import React, { FC, useState } from 'react';
import { TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import { useTheme } from '@shopify/restyle';
import Modal from '../Modal';
import Flex from '../../flex';
import Box from '../../box';
import Text from '../../text';
import { PromptProps } from '../type';
import helpers from '../../helpers';
import { Theme } from '../../theme';

const { ONE_PIXEL, px } = helpers;
const PromptContainer: FC<
  PromptProps & {
    afterClose: () => void;
  }
> = ({ title, content, okText, cancelText, onOk, onCancel, input, afterClose }) => {
  const [visible, setVisible] = useState(true);
  const [value, setValue] = useState<string>();
  const theme = useTheme<Theme>();

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
      onClose={() => setVisible(false)}
      afterClose={afterClose}
      bodyContainerStyle={{ marginHorizontal: theme.spacing.m }}
    >
      <Box marginBottom="m">
        <Flex flexDirection="column" justifyContent="center" marginBottom="m">
          <Flex justifyContent="center" marginVertical="m">
            <Text variant="title1">{title}</Text>
          </Flex>
          {content && <Text variant="content4">{content}</Text>}
        </Flex>
        <Box marginHorizontal="m">{InputComp}</Box>
      </Box>
      <Flex borderTopWidth={ONE_PIXEL} borderTopColor="modal_border">
        <Flex.Item borderRightWidth={ONE_PIXEL} borderRightColor="modal_border">
          <TouchableOpacity activeOpacity={0.8} onPress={handleCancel} style={btnStyle}>
            <Text variant="hint1">{cancelText}</Text>
          </TouchableOpacity>
        </Flex.Item>
        <Flex.Item>
          <TouchableOpacity activeOpacity={0.8} onPress={handleOk} style={btnStyle}>
            <Text variant="hint2">{okText}</Text>
          </TouchableOpacity>
        </Flex.Item>
      </Flex>
    </Modal>
  );
};
export default PromptContainer;
