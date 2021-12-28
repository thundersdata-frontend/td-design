import React, { forwardRef } from 'react';
import { Platform, TextInput } from 'react-native';

import Flex from '../flex';
import { PasscodeItem } from './PasscodeItem';

import type { PasscodeRef, PasscodeProps } from './type';
import usePasscode from './usePasscode';

const supportAutofillFromClipboard = Platform.OS === 'android' || parseInt(Platform.Version as string, 10) < 14;
const Passcode = forwardRef<PasscodeRef, PasscodeProps>(
  (
    {
      style,
      autofillFromClipboard = supportAutofillFromClipboard,
      autofillListenerIntervalMS = 1000,
      keyboardType = 'phone-pad',
      focusStyle,
      value,
      onChange,
      inputContainerStyle,
      inputStyle,
      count = 6,
      autoFocus = true,
      autoCapitalize = 'none',
      clearTextOnFocus = false,
      placeholder = '',
      secureTextEntry = false,
      selectTextOnFocus = true,
      ...restProps
    },
    ref
  ) => {
    const { otpCode, inputs, handleKeyPress, handleTextChange } = usePasscode({
      onChange,
      value,
      count,
      autofillFromClipboard,
      autofillListenerIntervalMS,
      ref,
    });

    return (
      <Flex justifyContent={'space-between'} style={style}>
        {Array(count)
          .fill('')
          .map((_, index) => {
            const inputValue = otpCode[`${index}`];

            if (!inputs.current[index]) {
              inputs.current[index] = React.createRef<TextInput>();
            }

            return (
              <PasscodeItem
                key={index}
                accessible
                autoCapitalize={autoCapitalize}
                autoFocus={index === 0 && autoFocus}
                clearTextOnFocus={clearTextOnFocus}
                focusStyle={focusStyle}
                handleKeyPress={handleKeyPress(index)}
                handleTextChange={handleTextChange(index)}
                inputContainerStyle={inputContainerStyle}
                inputStyle={inputStyle}
                inputValue={inputValue}
                keyboardType={keyboardType}
                maxLength={Platform.select({
                  android: 1,
                  ios: index === 0 ? count : 1,
                })}
                placeholder={placeholder}
                ref={inputs.current[index]}
                secureTextEntry={secureTextEntry}
                selectTextOnFocus={selectTextOnFocus}
                {...restProps}
              />
            );
          })}
      </Flex>
    );
  }
);

export default Passcode;

export type { PasscodeRef };
