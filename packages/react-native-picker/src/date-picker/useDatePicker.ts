import { useEffect } from 'react';

import { useMemoizedFn, useSafeState } from '@td-design/rn-hooks';
import dayjs from 'dayjs';

import { DatePickerPropsBase, ModalPickerProps } from '../components/DatePicker/type';

export default function useDatePicker({
  onClose,
  onChange,
  value,
  displayType,
  format,
}: DatePickerPropsBase & ModalPickerProps) {
  const [date, setDate] = useSafeState<Date | undefined>(value);

  useEffect(() => {
    setDate(value);
  }, [value]);

  const handleChange = (date?: Date) => {
    setDate(date);
    if (displayType === 'view') {
      onChange?.(date);
    }
  };

  const handleClose = () => {
    setDate(value);
    onClose?.();
  };

  const handleOk = () => {
    const value = date ?? new Date();
    onChange?.(value, dayjs(value).format(format));
    onClose?.();
  };

  return {
    date,
    handleChange: useMemoizedFn(handleChange),
    handleOk: useMemoizedFn(handleOk),
    handleClose: useMemoizedFn(handleClose),
  };
}
