import React, { forwardRef, RefObject, useCallback, useEffect, useImperativeHandle, useReducer, useRef } from 'react';
import { Keyboard, NativeSyntheticEvent, Platform, TextInput, TextInputKeyPressEventData } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';

import Flex from '../flex';
import { PasscodeItem } from './PasscodeItem';

import type { PasscodeRef, PasscodeProps } from './type';
import reducer from './reducer';
import { fillOtpCode } from './helpers';

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
    const previousCopiedText = useRef<string>('');
    const inputs = useRef<Array<RefObject<TextInput>>>([]);

    const [{ otpCode, hasKeySupport }, dispatch] = useReducer(reducer, {
      otpCode: fillOtpCode(count, value),
      handleChange: onChange,
      hasKeySupport: Platform.OS === 'ios',
    });

    useEffect(() => {
      if (value) {
        dispatch({
          type: 'setOtpCode',
          payload: { count, code: value },
        });
      }
    }, [value, count]);

    useEffect(() => {
      dispatch({ type: 'setHandleChange', payload: onChange });
    }, [onChange]);

    const fillInputs = useCallback(
      (code: string) => {
        dispatch({
          type: 'setOtpCode',
          payload: { count, code },
        });
      },
      [count]
    );

    const listenOnCopiedText = useCallback(async () => {
      const copiedText = await Clipboard.getString();
      const otpCodeValue = Object.values(otpCode).join('');

      if (copiedText?.length === count && copiedText !== otpCodeValue && copiedText !== previousCopiedText.current) {
        previousCopiedText.current = copiedText;
        fillInputs(copiedText);
      }
    }, [fillInputs, count, otpCode]);

    useEffect(() => {
      let interval: NodeJS.Timeout;

      if (autofillFromClipboard) {
        interval = setInterval(() => {
          listenOnCopiedText();
        }, autofillListenerIntervalMS);
      }

      return () => {
        clearInterval(interval);
      };
    }, [autofillFromClipboard, autofillListenerIntervalMS, listenOnCopiedText, count]);

    useImperativeHandle(
      ref,
      () => ({
        reset: () => {
          dispatch({ type: 'clearOtp', payload: count });
          inputs.current.forEach(input => input?.current?.clear());
          previousCopiedText.current = '';
          Clipboard.setString('');
        },
        focus: () => {
          const firstInput = inputs.current[0];
          firstInput?.current?.focus();
        },
      }),
      [count]
    );

    const focusInput = useCallback(
      (index: number): void => {
        if (index >= 0 && index < count) {
          const input = inputs.current[index];
          input?.current?.focus();
        }
      },
      [count]
    );

    const handleClearInput = useCallback(
      (inputIndex: number) => {
        const input = inputs.current[inputIndex];
        input?.current?.clear();
        dispatch({
          type: 'setOtpTextForIndex',
          payload: {
            index: inputIndex,
            text: '',
          },
        });
        focusInput(inputIndex - 1);
      },
      [focusInput]
    );

    const handleKeyPress =
      (index: number) =>
      ({ nativeEvent: { key } }: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
        const text = key === 'Backspace' || key.length > 1 ? '' : key;
        handleInputTextChange(text, index);

        if (Platform.OS === 'android' && !hasKeySupport && !isNaN(parseInt(key)))
          dispatch({ type: 'setHasKeySupport', payload: true });
      };

    const handleTextChange = (index: number) => (text: string) => {
      if (
        (Platform.OS === 'android' && !hasKeySupport) ||
        // Pasted from input accessory
        (Platform.OS === 'ios' && text.length > 1)
      ) {
        handleInputTextChange(text, index);
      }
    };

    const handleInputTextChange = (text: string, index: number): void => {
      if (!text.length) {
        handleClearInput(index);
      }

      if (text.length > 1) {
        handleClearInput(index);
        Keyboard.dismiss();
        return fillInputs(text);
      }

      if (text) {
        dispatch({
          type: 'setOtpTextForIndex',
          payload: {
            text,
            index,
          },
        });
        focusInput(index + 1);
      }

      if (index === count - 1 && text) {
        Keyboard.dismiss();
      }
    };

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
