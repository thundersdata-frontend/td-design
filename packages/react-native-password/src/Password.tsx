import React, { forwardRef } from 'react';
import { Keyboard, TouchableOpacity } from 'react-native';

import { Box, Flex, helpers, Modal, NumberKeyboard, SvgIcon, Text, Theme, useTheme } from '@td-design/react-native';

import PasswordModal from './PasswordModal';
import usePassword, { PasswordProps } from './usePassword';

const { NumberKeyboardView } = NumberKeyboard;
const { px, ONE_PIXEL } = helpers;

export interface PasswordInputRef {
  show: () => void;
  hide: () => void;
  clear: () => void;
}

const Password = forwardRef<PasswordInputRef, PasswordProps>(
  ({ length = 6, onDone, clean = true, onChange, showCursor = false, activeOpacity = 0.5 }, ref) => {
    const theme = useTheme<Theme>();
    const { show, hide, clear, password, combineText, visible, handleSubmit, handleDelete, setFalse } = usePassword({
      clean,
      length,
      onDone,
      onChange,
    });

    React.useImperativeHandle(ref, () => {
      return {
        show: show,
        hide: hide,
        clear: clear,
      };
    });

    /** 密码框的render */
    const passwordItems: React.ReactNode[] = [...Array(length)].map((_, i) => {
      let borderRightWidth = ONE_PIXEL;
      if (i === length - 1) {
        borderRightWidth = 0;
      }
      return (
        <Box
          key={i}
          flex={1}
          height={px(48)}
          justifyContent="center"
          alignItems="center"
          borderRightWidth={borderRightWidth}
          borderColor="border"
        >
          {password.length === i && visible && showCursor ? (
            <Box>
              <Text variant="p0" color="primary200">
                |
              </Text>
            </Box>
          ) : (
            <Box
              width={px(12)}
              height={px(12)}
              borderRadius="x3"
              backgroundColor="gray500"
              opacity={password.length > i ? 1 : 0}
            />
          )}
        </Box>
      );
    });

    return (
      <Box>
        <TouchableOpacity onPress={show} activeOpacity={activeOpacity}>
          <Flex borderWidth={ONE_PIXEL} borderColor="border" borderRadius="x1">
            {passwordItems}
          </Flex>
        </TouchableOpacity>
        <Modal visible={visible} maskClosable={true} position="bottom" onClose={setFalse}>
          <Flex justifyContent="center" alignItems="center" height={px(48)}>
            <TouchableOpacity
              onPress={() => {
                Keyboard.dismiss();
                setFalse();
              }}
              activeOpacity={activeOpacity}
            >
              <SvgIcon name="down" size={px(24)} color={theme.colors.icon} />
            </TouchableOpacity>
          </Flex>
          <NumberKeyboardView onPress={combineText} onDelete={handleDelete} onSubmit={handleSubmit} type="integer" />
        </Modal>
      </Box>
    );
  }
);

export default Object.assign(Password, { PasswordModal });
