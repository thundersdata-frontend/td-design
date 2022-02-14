import React, { RefObject, useEffect, forwardRef } from 'react';
import { Platform, TextInput } from 'react-native';
import { useBoolean } from '@td-design/rn-hooks';
import Box from '../box';

import type { PasscodeItemProps } from './type';
import { ONE_PIXEL } from '../helpers/normalize';

const majorVersionIOS: number = parseInt(`${Platform.Version}`, 10);
const isOTPSupported: boolean = Platform.OS === 'ios' && majorVersionIOS >= 12;
export const PasscodeItem = forwardRef<TextInput, PasscodeItemProps>(
  (
    {
      inputContainerStyle,
      focusStyle,
      inputStyle,
      handleTextChange,
      inputValue,
      handleKeyPress,
      selectTextOnFocus,
      ...rest
    },
    ref
  ) => {
    const [focused, { setTrue, setFalse }] = useBoolean(false);

    useEffect(() => {
      (ref as RefObject<TextInput>)?.current?.setNativeProps({
        value: inputValue,
        text: inputValue,
      });
    }, [ref, inputValue]);

    return (
      <Box
        borderWidth={ONE_PIXEL}
        borderColor="primary200"
        borderRadius={'x2'}
        style={[inputContainerStyle, focused && focusStyle]}
      >
        <TextInput
          ref={ref}
          onBlur={setFalse}
          onFocus={setTrue}
          onChangeText={handleTextChange}
          onKeyPress={handleKeyPress}
          style={[
            {
              textAlign: 'center',
              height: 40,
              width: 40,
              padding: 0,
            },
            inputStyle,
          ]}
          textContentType={isOTPSupported ? 'oneTimeCode' : 'none'}
          underlineColorAndroid="transparent"
          // https://github.com/facebook/react-native/issues/18339
          selectTextOnFocus={Platform.select({
            ios: selectTextOnFocus,
            android: true,
          })}
          {...rest}
        />
      </Box>
    );
  }
);
