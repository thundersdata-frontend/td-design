import React, { ForwardedRef, useEffect, useImperativeHandle } from 'react';
import { Keyboard } from 'react-native';

import { Modal } from '@td-design/react-native';
import { ImperativeModalChildrenProps } from '@td-design/react-native/lib/typescript/modal/type';
import { useMemoizedFn, useSafeState } from '@td-design/rn-hooks';
import dayjs from 'dayjs';

import { DatePickerPropsBase } from './components/DatePicker/type';
import DatePicker from './date-picker';
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
  ...restProps
}: ImperativeModalChildrenProps<
  Pick<DatePickerPropsBase, 'value' | 'onChange' | 'format'> & {
    placeholder?: string;
    ref: ForwardedRef<PickerRef>;
  }
>) {
  const [date, setDate] = useSafeState(value);

  const currentText = getText(date, format, placeholder);

  useImperativeHandle(ref, () => {
    return {
      focus: () => {
        Modal.show(<DatePicker {...restProps} {...{ value: date, format, onChange: handleChange }} />, {
          position: 'bottom',
        });
      },
    };
  });

  useEffect(() => {
    setDate(value);
  }, [value]);

  const handlePress = () => {
    Keyboard.dismiss();
    Modal.show(<DatePicker {...restProps} {...{ value: date, format, onChange: handleChange }} />, {
      position: 'bottom',
    });
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
    handlePress: useMemoizedFn(handlePress),
    handleChange: useMemoizedFn(handleChange),
    handleInputClear: useMemoizedFn(handleInputClear),
  };
}
