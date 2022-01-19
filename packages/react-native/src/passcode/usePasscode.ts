import { ForwardedRef, RefObject, useCallback, useEffect, useImperativeHandle, useReducer, useRef } from 'react';
import { Keyboard, NativeSyntheticEvent, Platform, TextInput, TextInputKeyPressEventData } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';

import reducer from './reducer';
import { fillOtpCode } from './helpers';
import { useLatest, useMemoizedFn } from '@td-design/rn-hooks';
import { PasscodeProps, PasscodeRef } from './type';

export default function usePasscode({
  onChange,
  count,
  value,
  autofillFromClipboard,
  autofillListenerIntervalMS,
  ref,
  onFinish,
}: Pick<PasscodeProps, 'onChange' | 'value' | 'autofillFromClipboard' | 'autofillListenerIntervalMS' | 'onFinish'> & {
  count: number;
  ref: ForwardedRef<PasscodeRef>;
}) {
  const onChangeRef = useLatest(onChange);
  const onFinishRef = useLatest(onFinish);
  const previousCopiedText = useRef<string>('');
  const inputs = useRef<Array<RefObject<TextInput>>>([]);

  const [{ otpCode, hasKeySupport }, dispatch] = useReducer(reducer, {
    otpCode: fillOtpCode(count, value),
    handleChange: onChangeRef.current,
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
  }, [count, fillInputs, otpCode]);

  useEffect(() => {
    let interval: NodeJS.Timer;

    if (autofillFromClipboard) {
      interval = setInterval(() => {
        listenOnCopiedText();
      }, autofillListenerIntervalMS);
    }

    return () => {
      clearInterval(interval);
    };
  }, [autofillFromClipboard, autofillListenerIntervalMS, listenOnCopiedText, count]);

  useImperativeHandle(ref, () => ({
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
    focusInput(inputIndex - 1);
  };

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
      onFinishRef.current?.();
      Keyboard.dismiss();
    }
  };

  return {
    otpCode,
    inputs,
    handleKeyPress: useMemoizedFn(handleKeyPress),
    handleTextChange: useMemoizedFn(handleTextChange),
  };
}
