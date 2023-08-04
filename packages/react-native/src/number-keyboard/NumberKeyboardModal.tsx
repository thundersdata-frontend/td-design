import React, { FC } from 'react';
import { Keyboard, StyleSheet } from 'react-native';

import { useTheme } from '@shopify/restyle';

import Box from '../box';
import Flex from '../flex';
import helpers from '../helpers';
import Modal from '../modal/Modal';
import Pressable from '../pressable';
import SvgIcon from '../svg-icon';
import Text from '../text';
import { Theme } from '../theme';
import NumberKeyboardView from './NumberKeyboardView';
import { NumberKeyboardModalProps } from './type';
import useNumberKeyboardModal from './useNumberKeyboardModal';

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
  prefixLabel = '当前值',
}) => {
  const theme = useTheme<Theme>();
  const { text, handleChange, handleSubmit, handleDelete } = useNumberKeyboardModal({
    value,
    onPress,
    onDelete,
    onSubmit,
  });

  const styles = StyleSheet.create({
    content: {
      width: SIZE,
      height: SIZE,
      justifyContent: 'center',
      alignItems: 'flex-end',
    },
  });

  return (
    <Modal visible={visible} maskClosable={true} position="bottom" onClose={onClose}>
      <Flex justifyContent="space-between" alignItems="center" height={SIZE} paddingHorizontal="x4">
        <Box flex={1}>
          <Text variant="p0" color="text" selectable>
            {prefixLabel}：{text}
          </Text>
        </Box>
        <Pressable
          style={styles.content}
          onPress={() => {
            Keyboard.dismiss();
            onClose();
          }}
          hitOffset={10}
          activeOpacity={1}
        >
          <SvgIcon name="down" size={px(20)} color={theme.colors.gray500} />
        </Pressable>
      </Flex>
      <NumberKeyboardView type={type} onPress={handleChange} onDelete={handleDelete} onSubmit={handleSubmit} />
    </Modal>
  );
};
NumberKeyboardModal.displayName = 'NumberKeyboardModal';

export default NumberKeyboardModal;
