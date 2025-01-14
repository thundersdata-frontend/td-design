import { useEffect } from 'react';

import { ImperativeModalChildrenProps } from '@td-design/react-native/lib/typescript/modal/type';
import { useMemoizedFn, useSafeState } from '@td-design/rn-hooks';
import dayjs from 'dayjs';

import { DatePickerPropsBase, ModalPickerProps } from '../components/DatePicker/type';

export default function useDatePicker({
  onChange,
  value,
  format,
  closeModal,
}: ImperativeModalChildrenProps<DatePickerPropsBase & ModalPickerProps>) {
  const [date, setDate] = useSafeState<Date | undefined>(value);

  useEffect(() => {
    setDate(value);
  }, [value]);

  const handleChange = (date?: Date) => {
    setDate(date);
  };

  const handleClose = () => {
    setDate(value);
    closeModal?.();
  };

  const handleOk = () => {
    const value = date ?? new Date();
    onChange?.(value, dayjs(value).format(format));
    closeModal?.();
  };

  return {
    date,
    handleChange: useMemoizedFn(handleChange),
    handleOk: useMemoizedFn(handleOk),
    handleClose: useMemoizedFn(handleClose),
  };
}
