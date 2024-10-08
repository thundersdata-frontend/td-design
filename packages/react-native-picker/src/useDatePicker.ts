import { ForwardedRef, useEffect, useImperativeHandle } from 'react';
import { Keyboard } from 'react-native';

import { useBoolean, useMemoizedFn, useSafeState } from '@td-design/rn-hooks';
import dayjs from 'dayjs';

import { DatePickerPropsBase } from './components/DatePicker/type';
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
}: Pick<DatePickerPropsBase, 'value' | 'onChange' | 'format'> & {
  placeholder?: string;
  ref: ForwardedRef<PickerRef>;
}) {
  const [date, setDate] = useSafeState(value);
  const [visible, { setTrue, setFalse }] = useBoolean(false);

  const currentText = getText(date, format, placeholder);

  useImperativeHandle(ref, () => {
    return {
      focus: () => {
        setTrue();
      },
    };
  });

  useEffect(() => {
    setDate(value);
  }, [value]);

  const handlePress = () => {
    Keyboard.dismiss();
    setTrue();
  };

  const handleChange = (date?: Date, formatDate?: string) => {
    setDate(date);
    onChange?.(date, formatDate);
  };

  const handleInputClear = () => {
    setDate(undefined);
    onChange?.(undefined);
  };

  return {
    date,
    currentText,
    visible,
    setFalse,
    handlePress: useMemoizedFn(handlePress),
    handleChange: useMemoizedFn(handleChange),
    handleInputClear: useMemoizedFn(handleInputClear),
  };
}
