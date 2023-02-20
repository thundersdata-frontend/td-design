import { ForwardedRef, useImperativeHandle } from 'react';
import { Keyboard } from 'react-native';
import { useAnimatedStyle, withTiming } from 'react-native-reanimated';

import { useBoolean, useLatest, useMemoizedFn, useSafeState, useUpdateEffect } from '@td-design/rn-hooks';
import dayjs from 'dayjs';

import { DatePickerProps } from './date-picker/type';
import { PickerRef } from './type';

function getText(value?: Date, format?: string, placeholder?: string) {
  if (value) {
    return dayjs(value).format(format);
  }
  return placeholder;
}

export default function useDatePicker({
  value,
  onChange,
  placeholder = '请选择',
  format = 'YYYY-MM-DD',
  ref,
}: Pick<DatePickerProps, 'value' | 'onChange' | 'format'> & { placeholder?: string; ref: ForwardedRef<PickerRef> }) {
  const [date, setDate] = useSafeState(value);
  const [currentText, setCurrentText] = useSafeState(getText(value, format, placeholder));
  const [visible, { setTrue, setFalse }] = useBoolean(false);
  const onChangeRef = useLatest(onChange);

  useImperativeHandle(ref, () => {
    return {
      focus: () => {
        setTrue();
      },
    };
  });

  useUpdateEffect(() => {
    setDate(value ?? new Date());
    const text = getText(value, format, placeholder);
    setCurrentText(text);
  }, [value]);

  const handlePress = () => {
    Keyboard.dismiss();
    setTrue();
  };

  const handleChange = (date?: Date, formatDate?: string) => {
    setCurrentText(formatDate ?? '');
    setDate(date);
    onChangeRef.current?.(date, formatDate);
  };

  const handleInputClear = () => {
    setCurrentText(placeholder);
    setDate(undefined);
    onChangeRef.current?.(undefined);
  };

  const clearIconStyle = useAnimatedStyle(() => {
    return {
      width: !!currentText && currentText !== placeholder ? withTiming(24) : withTiming(0),
    };
  });

  return {
    date,
    currentText,
    visible,
    setFalse,
    clearIconStyle,
    handlePress: useMemoizedFn(handlePress),
    handleChange: useMemoizedFn(handleChange),
    handleInputClear: useMemoizedFn(handleInputClear),
  };
}
