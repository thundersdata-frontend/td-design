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
const PromptContainer: FC<PromptProps> = ({ title, content, okText, cancelText, onOk, onCancel, input }) => {
  const [visible, setVisible] = useState(true);
  const [value, setValue] = useState<string>();
  const theme = useTheme<Theme>();

  const InputComp = React.cloneElement(input, {
    value,
    onChange: (text?: string) => setValue(text),
  });

  /** 确定操作 */
  const handleOk = () => {
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
      bodyContainerStyle={{ marginHorizontal: theme.spacing.x3, borderRadius: theme.borderRadii.x1 }}
    >
      <Box marginBottom="x3">
        <Flex flexDirection="column" justifyContent="center" marginBottom="x3">
          <Flex justifyContent="center" marginVertical="x3">
            <Text variant="h1" color="gray500">
              {title}
            </Text>
          </Flex>
          {content && (
            <Text variant="p1" color="gray500">
              {content}
            </Text>
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
export default PromptContainer;
