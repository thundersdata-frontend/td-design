import React, { forwardRef } from 'react';
import { Keyboard, StyleSheet } from 'react-native';

import { useTheme } from '@shopify/restyle';

import Box from '../box';
import Brief from '../brief';
import Flex from '../flex';
import Pressable from '../pressable';
import SvgIcon from '../svg-icon';
import Text from '../text';
import { Theme } from '../theme';
import NumberKeyboardModal from './NumberKeyboardModal';
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
    const { visible, setTrue, setFalse, currentText, handleSubmit, handleInputClear } = useNumberKeyboard({
      value,
      onChange,
      onCheck,
      digit,
      type,
      placeholder,
      ref,
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
          <Pressable
            activeOpacity={activeOpacity}
            onPress={() => {
              Keyboard.dismiss();
              if (disabled) return;
              setTrue();
            }}
            style={styles.content}
          >
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
        <NumberKeyboardModal
          {...restProps}
          type={type}
          value={currentText === placeholder ? '' : currentText}
          visible={visible}
          onClose={setFalse}
          onSubmit={handleSubmit}
          activeOpacity={activeOpacity}
        />
      </Box>
    );
  }
);
NumberKeyboardItem.displayName = 'NumberKeyboardItem';

export default NumberKeyboardItem;
