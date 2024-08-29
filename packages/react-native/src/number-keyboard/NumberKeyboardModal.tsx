import React, { FC } from 'react';
import { Keyboard, StyleSheet } from 'react-native';

import { useTheme } from '@shopify/restyle';

import Box from '../box';
import Flex from '../flex';
import helpers from '../helpers';
import Modal from '../modal/Modal/ModalView';
import Pressable from '../pressable';
import SvgIcon from '../svg-icon';
import Text from '../text';
import { Theme } from '../theme';
import NumberKeyboardView from './NumberKeyboardView';
import { NumberKeyboardModalProps } from './type';
import useNumberKeyboardModal from './useNumberKeyboardModal';

const { px } = helpers;
const SIZE = px(48);
const NumberKeyboardModal: FC<
  NumberKeyboardModalProps & {
    onAnimationEnd?: (visible: boolean) => void;
  }
> = ({
  type,
  allowClear = true,
  allowNegative,
  value = '',
  onPress,
  onDelete,
  onSubmit,
  prefixLabel = '当前值',
  onAnimationEnd,
}) => {
  const theme = useTheme<Theme>();
  const { text, visible, setFalse, handleChange, handleInputClear, handleSubmit, handleDelete } =
    useNumberKeyboardModal({
      value,
      onPress,
      onDelete,
      onSubmit,
    });

  const styles = StyleSheet.create({
    content: {
      justifyContent: 'center',
      alignItems: 'flex-end',
    },
  });

  return (
    <Modal
      visible={visible}
      maskClosable={true}
      position="bottom"
      animationType="slide"
      onClose={setFalse}
      onAnimationEnd={onAnimationEnd}
    >
      <Flex justifyContent="space-between" alignItems="center" height={SIZE} paddingHorizontal="x4">
        <Box flex={1}>
          <Text variant="p0" color="text" selectable>
            {prefixLabel}：{text}
          </Text>
        </Box>
        {allowClear && (
          <Pressable style={[styles.content, { marginRight: px(8) }]} activeOpacity={1} onPress={handleInputClear}>
            <SvgIcon name="closecircleo" color={theme.colors.icon} />
          </Pressable>
        )}
        <Pressable
          style={styles.content}
          onPress={() => {
            Keyboard.dismiss();
            setFalse();
          }}
          activeOpacity={1}
        >
          <SvgIcon name="down" size={px(20)} color={theme.colors.gray500} />
        </Pressable>
      </Flex>
      <NumberKeyboardView
        type={type}
        allowNegative={allowNegative}
        onPress={handleChange}
        onDelete={handleDelete}
        onSubmit={handleSubmit}
      />
    </Modal>
  );
};
NumberKeyboardModal.displayName = 'NumberKeyboardModal';

export default NumberKeyboardModal;
