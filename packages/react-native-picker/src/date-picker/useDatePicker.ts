import { ForwardedRef, useImperativeHandle } from 'react';

import { useMemoizedFn, useSafeState } from '@td-design/rn-hooks';
import dayjs from 'dayjs';

import { DatePickerPropsBase, ModalPickerProps } from '../components/DatePicker/type';
import { DatePickerRef } from '../type';

export default function useDatePicker({
  onChange,
  value,
  format,
  ref,
}: DatePickerPropsBase &
  ModalPickerProps & {
    ref: ForwardedRef<DatePickerRef>;
  }) {
  const [date, setDate] = useSafeState<Date | undefined>(value);
  const [visible, setVisible] = useSafeState(false);

  useImperativeHandle(ref, () => ({
    show: () => {
      setVisible(true);
    },
    hide: () => {
      setVisible(false);
    },
    getValue: () => {
      return {
        date,
        formatDate: dayjs(date).format(format),
      };
    },
  }));

  const handleChange = (date?: Date) => {
    setDate(date);
  };

  const handleClose = () => {
    setDate(value);
    setVisible(false);
  };

  const handleOk = () => {
    const value = date ?? new Date();
    onChange?.(value, dayjs(value).format(format));
    setVisible(false);
  };

  return {
    date,
    visible,
    handleChange: useMemoizedFn(handleChange),
    handleOk: useMemoizedFn(handleOk),
    handleClose: useMemoizedFn(handleClose),
  };
}
