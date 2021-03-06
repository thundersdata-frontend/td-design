import React, { FC, useState, useCallback, useEffect } from 'react';
import { TouchableOpacity, Keyboard } from 'react-native';
import { useTheme } from '@shopify/restyle';
import helpers from '../helpers';
import { Theme } from '../theme';
import Modal from '../modal/Modal';
import Flex from '../flex';
import Iconfont from '../iconfont';
import NumberKeyboardView from './NumberKeyboardView';
import { NumberKeyboardModalProps } from './type';
import Text from '../text';
import Box from '../box';

const { px } = helpers;
const SIZE = px(48);
const NumberKeyboardModal: FC<NumberKeyboardModalProps> = ({
  type,
  value = '',
  onPress,
  onDelete,
  onSubmit,
  visible,
  onClose,
}) => {
  const theme = useTheme<Theme>();
  const [text, setText] = useState('');

  useEffect(() => {
    setText(value);
  }, [value]);

  const handleChange = useCallback(
    (key: string) => {
      setText(text => text + key);
      onPress?.(key);
    },
    [onPress]
  );

  const handleDelete = useCallback(() => {
    setText(text => (text.length > 0 ? text.slice(0, text.length - 1) : ''));
    onDelete?.();
  }, [onDelete]);

  const handleSubmit = useCallback(() => {
    onSubmit?.(text);
  }, [onSubmit, text]);

  return (
    <Modal visible={visible} maskClosable={true} position="bottom" onClose={onClose}>
      <Flex justifyContent="space-between" alignItems="center" height={SIZE} paddingHorizontal="x4">
        <Box flex={1}>
          <Text variant="p0" color="gray500">
            当前值：{text}
          </Text>
        </Box>
        <TouchableOpacity
          style={{
            width: SIZE,
            height: SIZE,
            justifyContent: 'center',
            alignItems: 'flex-end',
          }}
          onPress={() => {
            Keyboard.dismiss();
            onClose();
          }}
        >
          <Iconfont name="down" size={px(16)} color={theme.colors.gray500} />
        </TouchableOpacity>
      </Flex>
      <NumberKeyboardView type={type} onPress={handleChange} onDelete={handleDelete} onSubmit={handleSubmit} />
    </Modal>
  );
};

export default NumberKeyboardModal;
