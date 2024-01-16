import React, { forwardRef, useImperativeHandle } from 'react';
import { Keyboard, StyleSheet } from 'react-native';

import { useTheme } from '@shopify/restyle';

import { showNumberKeyboard } from '.';
import Box from '../box';
import Brief from '../brief';
import Flex from '../flex';
import Pressable from '../pressable';
import SvgIcon from '../svg-icon';
import Text from '../text';
import { Theme } from '../theme';
import { NumberKeyboardItemProps, NumberKeyboardRef } from './type';
import useNumberKeyboard from './useNumberKeyboard';

const NumberKeyboardItem = forwardRef<NumberKeyboardRef, NumberKeyboardItemProps>(
  (
    {
      value,
      onChange,
      onCheck,
      placeholder = '请输入',
      disabled = false,
      type,
      style,
      inputStyle,
      extra,
      allowClear = true,
      digit = 0,
      activeOpacity = 0.6,
      inForm,
      ...restProps
    },
    ref
  ) => {
    const theme = useTheme<Theme>();
    const { currentText, handleSubmit, handleInputClear } = useNumberKeyboard({
      value,
      onChange,
      onCheck,
      digit,
      type,
      placeholder,
    });

    const show = () => {
      Keyboard.dismiss();
      if (disabled) return;
      showNumberKeyboard({
        ...restProps,
        type,
        value: currentText === placeholder ? '' : currentText,
        onSubmit: handleSubmit,
        activeOpacity,
      });
    };

    useImperativeHandle(ref, () => {
      return {
        focus: show,
      };
    });

    const styles = StyleSheet.create({
      content: {
        flexGrow: 1,
        justifyContent: 'center',
      },
      clearIcon: { alignItems: 'center' },
    });

    return (
      <Box flexGrow={1} paddingHorizontal={inForm ? 'x0' : 'x1'} justifyContent={'center'} style={style}>
        <Flex>
          <Pressable activeOpacity={activeOpacity} onPress={show} style={styles.content}>
            <Text
              variant="p1"
              color={currentText === placeholder ? 'gray300' : 'text'}
              textAlign={'right'}
              style={inputStyle}
              selectable
            >
              {currentText}
            </Text>
          </Pressable>
          {allowClear && !disabled && !!currentText && currentText !== placeholder && (
            <Pressable activeOpacity={1} onPress={handleInputClear} hitOffset={10} style={styles.clearIcon}>
              <SvgIcon name="closecircleo" color={theme.colors.icon} />
            </Pressable>
          )}
          <Brief brief={extra} />
        </Flex>
      </Box>
    );
  }
);
NumberKeyboardItem.displayName = 'NumberKeyboardItem';

export default NumberKeyboardItem;
