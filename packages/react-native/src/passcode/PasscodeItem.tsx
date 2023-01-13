import { useTheme } from '@shopify/restyle';
import { useBoolean } from '@td-design/rn-hooks';
import React, { forwardRef, RefObject, useEffect } from 'react';
import { Platform, TextInput } from 'react-native';

import Box from '../box';
import { ONE_PIXEL } from '../helpers/normalize';
import { Theme } from '../theme';
import type { PasscodeItemProps } from './type';

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
    const theme = useTheme<Theme>();
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
              color: theme.colors.primary_text,
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
