import { ForwardedRef, RefObject, useEffect, useImperativeHandle, useReducer, useRef } from 'react';
import { Keyboard, NativeSyntheticEvent, Platform, TextInput, TextInputKeyPressEventData } from 'react-native';

import { useMemoizedFn } from '@td-design/rn-hooks';

import { fillOtpCode } from './helpers';
import reducer from './reducer';
import { PasscodeProps, PasscodeRef } from './type';

export default function usePasscode({
  onChange,
  count,
  value,
  ref,
  onFinish,
}: Pick<PasscodeProps, 'onChange' | 'value' | 'onFinish'> & {
  count: number;
  ref: ForwardedRef<PasscodeRef>;
}) {
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

  useImperativeHandle(ref, () => ({
    reset: () => {
      dispatch({ type: 'clearOtp', payload: count });
      inputs.current.forEach(input => input?.current?.clear());
      previousCopiedText.current = '';
    },
    focus: () => {
      const firstInput = inputs.current[0];
      firstInput?.current?.focus();
    },
    getValue: () => {
      return Object.values(otpCode).join('');
    },
  }));

  const focusInput = (index: number): void => {
    if (index >= 0 && index < count) {
      const input = inputs.current[index];
      input?.current?.focus();
    }
  };

  const handleClearInput = (inputIndex: number) => {
    const input = inputs.current[inputIndex];
    input?.current?.clear();
    dispatch({
      type: 'setOtpTextForIndex',
      payload: {
        index: inputIndex,
        text: '',
      },
    });
  };

  const handleChangeText = (index: number) => (text: string) => {
    handleInputTextChange(text, index);
  };

  const handleKeyPress =
    (index: number) =>
    ({ nativeEvent: { key } }: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
      if (Platform.OS === 'android' && !hasKeySupport && !isNaN(parseInt(key))) {
        dispatch({ type: 'setHasKeySupport', payload: true });
      }

      if (key === 'Backspace') {
        // 当前输入框的值
        const value = otpCode[`${index}`];
        // 清除当前输入框的值
        handleClearInput(index);
        // 如果当前输入框的值为空，则聚焦上一个输入框
        if (!value) {
          focusInput(index - 1);
        }
      }
    };

  const handleInputTextChange = (text: string, index: number): void => {
    if ([1, 2, 3, 4, 5, 6, 7, 8, 9, 0].includes(parseInt(text))) {
      dispatch({
        type: 'setOtpTextForIndex',
        payload: {
          text,
          index,
        },
      });
      focusInput(index + 1);
    } else {
      handleClearInput(index);
    }
  };

  useEffect(() => {
    const value = Object.values(otpCode).join('');
    if (value.length === count) {
      onFinish?.(value);
      Keyboard.dismiss();
    }
  }, [count, otpCode]);

  return {
    otpCode,
    inputs,
    handleKeyPress: useMemoizedFn(handleKeyPress),
    handleChangeText: useMemoizedFn(handleChangeText),
  };
}
