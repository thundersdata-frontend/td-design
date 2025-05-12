import { useRef } from 'react';
import { Keyboard } from 'react-native';

import { useMemoizedFn, useSafeState } from '@td-design/rn-hooks';
import dayjs from 'dayjs';

import { DatePickerPropsBase } from './components/DatePicker/type';
import { DatePickerRef } from './type';

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
}: Pick<DatePickerPropsBase, 'value' | 'onChange' | 'format'> & {
  placeholder?: string;
}) {
  const datePickerRef = useRef<DatePickerRef>(null);
  const [date, setDate] = useSafeState(value);

  const currentText = getText(date, format, placeholder);

  const handlePress = () => {
    Keyboard.dismiss();
    datePickerRef.current?.show();
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
    datePickerRef,
    handlePress: useMemoizedFn(handlePress),
    handleChange: useMemoizedFn(handleChange),
    handleInputClear: useMemoizedFn(handleInputClear),
  };
}
