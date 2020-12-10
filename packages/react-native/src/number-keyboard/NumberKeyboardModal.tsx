import React, { useState, FC } from 'react';
import NumberKeyboardView, { NumberKeyboardProps } from './NumberKeyboard';
import { Modal, Flex, Icon, Theme } from '..';
import { px } from '../helper';
import { useTheme } from '@shopify/restyle';
import { TouchableOpacity } from 'react-native';

export type NumberKeyboardModalProps = NumberKeyboardProps & {
  afterClose: () => void;
};

const NumberKeyboardModal: FC<NumberKeyboardModalProps> = ({ afterClose, type, onPress, onDelete, onSubmit }) => {
  const theme = useTheme<Theme>();
  const [visible, setVisible] = useState(true);

  return (
    <Modal
      visible={visible}
      maskClosable={true}
      position="bottom"
      onClose={() => setVisible(false)}
      afterClose={afterClose}
    >
      <Flex justifyContent="center" alignItems="center" height={px(48)}>
        <TouchableOpacity onPress={() => setVisible(false)}>
          <Icon name="down" color={theme.colors.keyboardIconColor} />
        </TouchableOpacity>
      </Flex>
      <NumberKeyboardView
        type={type}
        onPress={onPress}
        onDelete={onDelete}
        onSubmit={() => {
          onSubmit?.();
          setVisible(false);
        }}
      />
    </Modal>
  );
};

export default NumberKeyboardModal;
