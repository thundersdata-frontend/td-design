import { useEffect } from 'react';
import { BackHandler } from 'react-native';

import { useMemoizedFn, useSafeState } from '@td-design/rn-hooks';
import dayjs from 'dayjs';

import { DatePickerPropsBase, ModalPickerProps } from '../components/DatePicker/type';

export default function useDatePicker({
  onClose,
  onChange,
  value,
  displayType,
  visible,
  format,
}: DatePickerPropsBase & ModalPickerProps) {
  const [date, setDate] = useSafeState<Date | undefined>(value ?? new Date());

  useEffect(() => {
    setDate(value ?? new Date());
  }, [value]);

  /** 绑定物理返回键监听事件，如果当前picker是打开的，返回键作用是关闭picker，否则返回上一个界面 */
  useEffect(() => {
    const sub = BackHandler.addEventListener('hardwareBackPress', () => visible);
    return () => sub.remove();
  }, [visible]);

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
    onChange?.(date, dayjs(date).format(format));
    onClose?.();
  };

  return {
    date,
    handleChange: useMemoizedFn(handleChange),
    handleOk: useMemoizedFn(handleOk),
    handleClose: useMemoizedFn(handleClose),
  };
}
