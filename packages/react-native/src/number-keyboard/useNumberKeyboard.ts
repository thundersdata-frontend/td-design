import { useBoolean, useLatest, useMemoizedFn, useSafeState, useUpdateEffect } from '@td-design/rn-hooks';
import { useAnimatedStyle, withTiming } from 'react-native-reanimated';

import type { NumberKeyboardInputProps, NumberKeyboardRef } from './type';
import { formatValue } from './util';

import Toast from '../toast';
import { ForwardedRef, useImperativeHandle } from 'react';

export default function useNumberKeyboard({
  type,
  value,
  onChange,
  digit = 0,
  placeholder = '请输入',
  ref,
}: Pick<NumberKeyboardInputProps, 'value' | 'onChange' | 'digit' | 'placeholder' | 'type'> & {
  ref: ForwardedRef<NumberKeyboardRef>;
}) {
  const [visible, { setTrue, setFalse }] = useBoolean(false);
  const [currentText, setCurrentText] = useSafeState(placeholder);
  const onChangeRef = useLatest(onChange);

  useImperativeHandle(ref, () => {
    return {
      focus: () => {
        setTrue();
      },
    };
  });

  useUpdateEffect(() => {
    setCurrentText(value ? value + '' : placeholder);
  }, [value, placeholder]);

  /**
   * 根据type对value进行合法性校验
   */
  const handleSubmit = (value: string) => {
    if (value.split('').filter(item => item === '.').length > 1) {
      Toast.middle({ content: '输入的数字格式不合法' });
      return;
    }
    const text = formatValue(value, type, digit) + '';
    setCurrentText(text || placeholder);
    onChangeRef.current?.(`${text}`);
    setFalse();
  };

  const handleInputClear = () => {
    setCurrentText(placeholder);
    onChangeRef.current?.('');
  };

  const clearIconStyle = useAnimatedStyle(() => {
    return {
      width: !!currentText && currentText !== placeholder ? withTiming(24) : withTiming(0),
    };
  });

  return {
    visible,
    clearIconStyle,
    currentText,
    setTrue,
    setFalse,
    handleSubmit: useMemoizedFn(handleSubmit),
    handleInputClear: useMemoizedFn(handleInputClear),
  };
}
