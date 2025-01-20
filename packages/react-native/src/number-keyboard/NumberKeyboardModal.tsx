import React, { FC } from 'react';
import { Keyboard, StyleSheet } from 'react-native';

import { useTheme } from '@shopify/restyle';

import Box from '../box';
import Flex from '../flex';
import helpers from '../helpers';
import type { ImperativeModalChildrenProps } from '../modal/type';
import Pressable from '../pressable';
import SvgIcon from '../svg-icon';
import Text from '../text';
import { Theme } from '../theme';
import NumberKeyboardView from './NumberKeyboardView';
import { NumberKeyboardModalProps } from './type';
import useNumberKeyboardModal from './useNumberKeyboardModal';

const { px } = helpers;
const SIZE = px(48);
const NumberKeyboardModal: FC<ImperativeModalChildrenProps<NumberKeyboardModalProps>> = ({
  type,
  allowClear = true,
  allowNegative,
  value = '',
  onPress,
  onDelete,
  onSubmit,
  prefixLabel = '当前值',
  closeModal,
}) => {
  const theme = useTheme<Theme>();
  const { text, handleChange, handleInputClear, handleSubmit, handleDelete } = useNumberKeyboardModal({
    value,
    onPress,
    onDelete,
    onSubmit,
    closeModal,
  });

  const styles = StyleSheet.create({
    content: {
      justifyContent: 'center',
      alignItems: 'flex-end',
    },
  });

  return (
    <Box>
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
            closeModal?.();
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
    </Box>
  );
};
NumberKeyboardModal.displayName = 'NumberKeyboardModal';

export default NumberKeyboardModal;
