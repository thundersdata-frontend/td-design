import React, { forwardRef } from 'react';
import { Keyboard } from 'react-native';

import { useTheme } from '@shopify/restyle';

import Box from '../box';
import Brief from '../brief';
import Flex from '../flex';
import helpers from '../helpers';
import Label from '../label';
import Pressable from '../pressable';
import SvgIcon from '../svg-icon';
import Text from '../text';
import { Theme } from '../theme';
import NumberKeyboardModal from './NumberKeyboardModal';
import { NumberKeyboardInputProps, NumberKeyboardRef } from './type';
import useNumberKeyboard from './useNumberKeyboard';

const { ONE_PIXEL } = helpers;
const NumberKeyboardInput = forwardRef<NumberKeyboardRef, NumberKeyboardInputProps>(
  (
    {
      label,
      labelPosition = 'left',
      colon = false,
      required = false,
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
      brief,
      activeOpacity = 0.6,
      ...restProps
    },
    ref
  ) => {
    const theme = useTheme<Theme>();
    const { visible, setTrue, setFalse, currentText, handleSubmit, handleInputClear } = useNumberKeyboard({
      value,
      onCheck,
      onChange,
      digit,
      type,
      placeholder,
      ref,
    });

    const InputContent = (
      <Flex borderWidth={ONE_PIXEL} borderColor="border" borderRadius="x1" paddingHorizontal={'x1'} flex={1}>
        <Pressable
          activeOpacity={activeOpacity}
          onPress={() => {
            Keyboard.dismiss();
            setTrue();
          }}
          style={{
            paddingVertical: theme.spacing.x2,
            justifyContent: 'center',
          }}
        >
          <Text variant="p1" color={currentText === placeholder ? 'gray300' : 'text'} style={inputStyle} selectable>
            {currentText}
          </Text>
        </Pressable>
        {allowClear && !disabled && !!currentText && currentText !== placeholder && (
          <Pressable activeOpacity={1} onPress={handleInputClear} hitOffset={10} style={{ alignItems: 'center' }}>
            <SvgIcon name="closecircleo" color={theme.colors.icon} />
          </Pressable>
        )}
        <Brief brief={extra} />
      </Flex>
    );

    if (labelPosition === 'top')
      return (
        <Box style={style}>
          <Label {...{ colon, label, required }} />
          {InputContent}
          <Brief brief={brief} />
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

    return (
      <Box style={style}>
        <Flex alignItems="center">
          <Label {...{ colon, label, required }} />
          {InputContent}
        </Flex>
        <Brief brief={brief} />
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

NumberKeyboardInput.displayName = 'NumberKeyboardInput';

export default NumberKeyboardInput;
