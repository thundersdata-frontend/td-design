import React, { useState, FC } from 'react';
import { TouchableOpacity } from 'react-native';
import { useTheme } from '@shopify/restyle';
import { px } from '../helper';
import { Theme } from '../config/theme';
import Modal from '../modal/Modal';
import Flex from '../flex';
import Icon from '../icon';
import NumberKeyboardView, { NumberKeyboardProps } from './NumberKeyboard';

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
