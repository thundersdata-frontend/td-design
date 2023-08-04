import { useEffect } from 'react';
import { Keyboard } from 'react-native';

import { useBoolean, useMemoizedFn, useSafeState } from '@td-design/rn-hooks';
import dayjs from 'dayjs';

import type { DatePeriodInputProps } from '.';

export default function useDatePeriodInput({
  value,
  onChange,
  format,
}: Pick<DatePeriodInputProps, 'value' | 'onChange' | 'format'>) {
  const [currentIndex, setCurrentIndex] = useSafeState(0);
  const [dates, setDates] = useSafeState<[Date | undefined, Date | undefined]>(value ?? [undefined, undefined]);
  const [visible, { setTrue, setFalse }] = useBoolean(false);
  const [minDate, setMinDate] = useSafeState<string | undefined>(undefined); // 对第二个日期输入框来说，它的最小值就是第一个日期输入框的值
  const [maxDate, setMaxDate] = useSafeState<string | undefined>(undefined); // 对第一个日期输入框来说，它的最大值就是第二个日期输入框的值

  useEffect(() => {
    value && setDates(value);
  }, [value]);

  const handleChange = (date?: Date) => {
    const [firstDate, secondDate] = dates;
    setDates(draft => {
      draft[currentIndex] = date;
      return draft;
    });
    if (currentIndex === 0) {
      onChange?.([date!, secondDate]);
    } else {
      onChange?.([firstDate, date!]);
    }
  };

  const handleStartPress = () => {
    Keyboard.dismiss();
    setCurrentIndex(0);
    if (dates[1]) {
      setMinDate(undefined);
      setMaxDate(dayjs(dates[1]).format(format));
    }
    setTrue();
  };

  const handleEndPress = () => {
    Keyboard.dismiss();
    setCurrentIndex(1);
    if (dates[0]) {
      setMinDate(dayjs(dates[0]).format(format));
      setMaxDate(undefined);
    }
    setTrue();
  };

  const handleInputClear1 = () => {
    const [, secondDate] = value ?? [, undefined];

    setDates(draft => [undefined, draft[1]]);
    onChange?.([undefined, secondDate]);
  };

  const handleInputClear2 = () => {
    const [firstDate] = value ?? [undefined];

    setDates(draft => [draft[0], undefined]);
    onChange?.([firstDate, undefined]);
  };

  return {
    currentIndex,
    dates,
    visible,
    minDate,
    maxDate,
    setFalse: useMemoizedFn(setFalse),
    handleStartPress: useMemoizedFn(handleStartPress),
    handleEndPress: useMemoizedFn(handleEndPress),
    handleChange: useMemoizedFn(handleChange),
    handleInputClear1: useMemoizedFn(handleInputClear1),
    handleInputClear2: useMemoizedFn(handleInputClear2),
  };
}
