import { useTheme } from '@shopify/restyle';
import { Box, Flex, helpers, Modal, NumberKeyboard, Portal, SvgIcon, Text, Theme } from '@td-design/react-native';
import React, { forwardRef } from 'react';
import { Keyboard, TouchableOpacity } from 'react-native';

import PasswordModal, { PasswordModalProps } from './PasswordModal';
import usePassword from './usePassword';

const { NumberKeyboardView } = NumberKeyboard;
const { px } = helpers;
export interface PasswordProps {
  /** 密码框长度 */
  length?: number;
  /** 完成事件 */
  onDone?: (password: string) => void;
  /** 是否清除 */
  clean?: boolean;
  /** 密码改变 */
  onChange?: (password: string) => void;
  /** 是否显示光标 */
  showCursor?: boolean;
}

export interface PasswordInputRef {
  show: () => void;
  hide: () => void;
  clear: () => void;
}

const Password = forwardRef<PasswordInputRef, PasswordProps>(
  ({ length = 6, onDone, clean = true, onChange, showCursor = false }, ref) => {
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
      let borderRightWidth = px(1);
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
              width={px(10)}
              height={px(10)}
              borderRadius="x1"
              backgroundColor="black"
              opacity={password.length > i ? 1 : 0}
            />
          )}
        </Box>
      );
    });

    return (
      <Box>
        <TouchableOpacity onPress={show} activeOpacity={0.5}>
          <Flex borderWidth={px(1)} borderColor="border" borderRadius="x1">
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
              activeOpacity={0.5}
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

function modal(props: PasswordModalProps) {
  const key = Portal.add(<PasswordModal {...props} />);
  return key;
}

export default Object.assign(Password, {
  modal,
});
