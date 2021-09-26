import { useBoolean, useLatest, useMemoizedFn, useSafeState, useUpdateEffect } from '@td-design/rn-hooks';
import { useAnimatedStyle, withTiming } from 'react-native-reanimated';

import type { NumberKeyboardInputProps } from './type';
import { formatValue } from './util';

import Toast from '../toast';

export default function useNumberKeyboard({
  type,
  value,
  onChange,
  digit = 2,
  placeholder = '请输入',
}: Pick<NumberKeyboardInputProps, 'value' | 'onChange' | 'digit' | 'placeholder' | 'type'>) {
  const [visible, { toggle, setFalse }] = useBoolean(false);
  const [currentText, setCurrentText] = useSafeState(placeholder);
  const onChangeRef = useLatest(onChange);

  useUpdateEffect(() => {
    setCurrentText(value ? value + '' : placeholder);
  }, [value, placeholder]);

  /**
   * 根据type对value进行合法性校验
   */
  const handleSubmit = (value: string) => {
    if (value.split('').filter(item => item === '.').length > 1) {
      Toast.fail({ content: '输入的数字格式不合法' });
      return;
    }
    const text = formatValue(value, type, digit) + '';
    setCurrentText(text || placeholder);
    setFalse();
    onChangeRef.current?.(`${text}`);
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
    toggle,
    clearIconStyle,
    currentText,
    handleSubmit: useMemoizedFn(handleSubmit),
    handleInputClear: useMemoizedFn(handleInputClear),
  };
}
