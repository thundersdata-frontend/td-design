import { useEffect } from 'react';
import { BackHandler } from 'react-native';

import { useLatest, useMemoizedFn, useSafeState } from '@td-design/rn-hooks';
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
  const onChangeRef = useLatest(onChange);
  const onCloseRef = useLatest(onClose);

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
      onChangeRef.current?.(date);
    }
  };

  const handleClose = () => {
    setDate(value);
    onCloseRef.current?.();
  };

  const handleOk = () => {
    onChangeRef.current?.(date, dayjs(date).format(format));
    onCloseRef.current?.();
  };

  return {
    date,
    handleChange: useMemoizedFn(handleChange),
    handleOk: useMemoizedFn(handleOk),
    handleClose: useMemoizedFn(handleClose),
  };
}
