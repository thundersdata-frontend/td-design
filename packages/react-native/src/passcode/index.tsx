import React, { forwardRef } from 'react';
import { Platform, TextInput } from 'react-native';

import Flex from '../flex';
import PasscodeItem from './PasscodeItem';
import type { PasscodeProps, PasscodeRef } from './type';
import usePasscode from './usePasscode';

const Passcode = forwardRef<PasscodeRef, PasscodeProps>(
  (
    {
      style,
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
      onFinish,
      ...restProps
    },
    ref
  ) => {
    const { otpCode, inputs, handleKeyPress, handleChangeText } = usePasscode({
      onChange,
      value,
      count,
      ref,
      onFinish,
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
                handleChangeText={handleChangeText(index)}
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
Passcode.displayName = 'Passcode';

export default Passcode;

export type { PasscodeRef };
