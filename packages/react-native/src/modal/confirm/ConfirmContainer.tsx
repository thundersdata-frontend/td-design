import React, { FC, useState } from 'react';
import { TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import Modal from '../Modal';
import Flex from '../../flex';
import Box from '../../box';
import Text from '../../text';
import { ConfirmProps } from '../type';
import { ONE_PIXEL, px } from '../../helper';

const ConfirmContainer: FC<
  ConfirmProps & {
    afterClose: () => void;
  }
> = ({ title, content, okText, cancelText, onOk, onCancel, afterClose }) => {
  const [visible, setVisible] = useState(true);

  /** 确定操作 */
  const handleOk = () => {
    const originPress = onOk || function () {};
    const res = originPress();
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
    >
      <Box paddingVertical="m">
        <Flex flexDirection="column" justifyContent="center" marginBottom="m">
          <Text variant="primaryTitle">{title}</Text>
          {content && <Text variant="secondaryBody">{content}</Text>}
        </Flex>
      </Box>
      <Flex borderTopWidth={ONE_PIXEL} borderTopColor="borderColor">
        <Flex.Item borderRightWidth={ONE_PIXEL} borderRightColor="borderColor">
          <TouchableOpacity activeOpacity={0.8} onPress={handleCancel} style={btnStyle}>
            <Text variant="primaryTipReverse">{cancelText}</Text>
          </TouchableOpacity>
        </Flex.Item>
        <Flex.Item>
          <TouchableOpacity activeOpacity={0.8} onPress={handleOk} style={btnStyle}>
            <Text variant="primaryTipReverse">{okText}</Text>
          </TouchableOpacity>
        </Flex.Item>
      </Flex>
    </Modal>
  );
};
export default ConfirmContainer;
