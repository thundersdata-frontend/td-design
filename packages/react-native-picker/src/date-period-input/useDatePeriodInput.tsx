import { useRef } from 'react';
import { Keyboard } from 'react-native';

import { useMemoizedFn, useSafeState } from '@td-design/rn-hooks';

import type { DatePeriodInputProps } from '.';
import { DatePickerRef } from '../type';

export default function useDatePeriodInput({ value, onChange }: Pick<DatePeriodInputProps, 'value' | 'onChange'>) {
  const datePickerRef = useRef<DatePickerRef>(null);
  const [order, setOrder] = useSafeState<'start' | 'end'>('start');
  const [dates, setDates] = useSafeState(value ?? [undefined, undefined]);

  const handleChange = useMemoizedFn((date: Date | undefined) => {
    const [startDate, endDate] = dates;
    if (onChange) {
      onChange(order === 'start' ? [date!, endDate] : [startDate, date!]);
    } else {
      setDates((draft: any[]) => {
        const nextDates = [...draft];
        nextDates[order === 'start' ? 0 : 1] = date;
        return nextDates;
      });
    }
  });

  /** 点开开始时间选择器 */
  const handleStartPress = () => {
    Keyboard.dismiss();
    setOrder('start');
    datePickerRef.current?.show();
  };

  /** 点开结束时间选择器 */
  const handleEndPress = () => {
    Keyboard.dismiss();
    setOrder('end');
    datePickerRef.current?.show();
  };

  /**
   * 清除开始时间
   * 不光是要把date改掉，同时还需要判断结束时间是否有值
   * 如果有值，需要设置结束时间为最大时间
   * 如果没有值，则最大时间
   */
  const clearStartDate = () => {
    const [, endDate] = value ?? [, undefined];
    if (onChange) {
      onChange([undefined, endDate]);
    } else {
      setDates(draft => [undefined, draft[1]]);
    }
  };

  /** 清除结束时间 */
  const clearEndDate = () => {
    const [startDate] = value ?? [undefined];
    if (onChange) {
      onChange([startDate, undefined]);
    } else {
      setDates(draft => [draft[0], undefined]);
    }
  };

  return {
    dates,
    order,
    datePickerRef,
    handleChange: useMemoizedFn(handleChange),
    handleStartPress: useMemoizedFn(handleStartPress),
    handleEndPress: useMemoizedFn(handleEndPress),
    clearStartDate: useMemoizedFn(clearStartDate),
    clearEndDate: useMemoizedFn(clearEndDate),
  };
}
