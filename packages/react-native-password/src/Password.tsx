import React, { forwardRef } from 'react';
import { Keyboard } from 'react-native';

import {
  Box,
  Flex,
  helpers,
  Modal,
  NumberKeyboardView,
  Pressable,
  SvgIcon,
  Theme,
  useTheme,
} from '@td-design/react-native';

import usePassword, { PasswordProps } from './usePassword';

const { px, ONE_PIXEL } = helpers;

export interface PasswordInputRef {
  show: () => void;
  hide: () => void;
  clear: () => void;
}

const Password = forwardRef<PasswordInputRef, PasswordProps>(
  ({ length = 6, onDone, clean = true, onChange, showCursor = false, activeOpacity = 0.6 }, ref) => {
    const theme = useTheme<Theme>();
    const {
      show,
      hide,
      clear,
      password,
      itemWidth,
      handleLayout,
      combineText,
      visible,
      handleSubmit,
      handleDelete,
      setFalse,
    } = usePassword({
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
          width={itemWidth}
          height={itemWidth}
          justifyContent="center"
          alignItems="center"
          borderRightWidth={borderRightWidth}
          borderColor="border"
        >
          {password.length === i && visible && showCursor ? (
            <Box width={1} height={itemWidth / 3} backgroundColor={'primary200'} />
          ) : (
            <Box
              width={theme.spacing.x3}
              height={theme.spacing.x3}
              borderRadius="x3"
              backgroundColor="gray500"
              opacity={password.length > i ? 1 : 0}
            />
          )}
        </Box>
      );
    });

    return (
      <Box onLayout={handleLayout}>
        <Pressable onPress={show} activeOpacity={activeOpacity}>
          <Flex borderWidth={ONE_PIXEL} borderColor="border" borderRadius="x1">
            {passwordItems}
          </Flex>
        </Pressable>
        <Modal visible={visible} maskClosable={true} position="bottom" onClose={setFalse}>
          <Flex justifyContent="center" alignItems="center" height={px(48)}>
            <Pressable
              onPress={() => {
                Keyboard.dismiss();
                setFalse();
              }}
              activeOpacity={activeOpacity}
            >
              <SvgIcon name="down" size={px(24)} color={theme.colors.icon} />
            </Pressable>
          </Flex>
          <NumberKeyboardView onPress={combineText} onDelete={handleDelete} onSubmit={handleSubmit} type="integer" />
        </Modal>
      </Box>
    );
  }
);

export default Password;
