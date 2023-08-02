import { ForwardedRef, useEffect, useImperativeHandle } from 'react';

import { useBoolean, useMemoizedFn, useSafeState } from '@td-design/rn-hooks';

import Toast from '../toast';
import type { NumberKeyboardInputProps, NumberKeyboardRef } from './type';
import { formatValue } from './util';

export default function useNumberKeyboard({
  type,
  value,
  onChange,
  onCheck,
  digit = 0,
  placeholder = '请输入',
  ref,
}: Pick<NumberKeyboardInputProps, 'value' | 'onChange' | 'onCheck' | 'digit' | 'placeholder' | 'type'> & {
  ref: ForwardedRef<NumberKeyboardRef>;
}) {
  const [visible, { setTrue, setFalse }] = useBoolean(false);
  const [currentText, setCurrentText] = useSafeState<string>();

  useImperativeHandle(ref, () => {
    return {
      focus: () => {
        setTrue();
      },
    };
  });

  useEffect(() => {
    setCurrentText(value ? String(value) : placeholder);
  }, [value, placeholder]);

  /**
   * 根据type对value进行合法性校验
   */
  const handleSubmit = async (value: string) => {
    if (value.split('').filter(item => item === '.').length > 1) {
      Toast.middle({ content: '输入的数字格式不合法' });
      return;
    }
    try {
      const text = formatValue(value, type, digit) + '';
      await onCheck?.(text);
      setCurrentText(text || placeholder);
      onChange?.(`${text}`);
      setFalse();
    } catch (error: any) {
      Toast.middle({ content: error.message });
    }
  };

  const handleInputClear = () => {
    setCurrentText(placeholder);
    onChange?.('');
  };

  return {
    visible,
    currentText,
    setTrue,
    setFalse,
    handleSubmit: useMemoizedFn(handleSubmit),
    handleInputClear: useMemoizedFn(handleInputClear),
  };
}
