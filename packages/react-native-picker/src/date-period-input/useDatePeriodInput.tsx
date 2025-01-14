import React, { useEffect } from 'react';
import { Keyboard } from 'react-native';

import { Modal } from '@td-design/react-native';
import { ImperativeModalChildrenProps } from '@td-design/react-native/lib/typescript/modal/type';
import { useMemoizedFn, useSafeState } from '@td-design/rn-hooks';
import dayjs from 'dayjs';

import type { DatePeriodInputProps } from '.';
import DatePicker from '../date-picker';

export default function useDatePeriodInput({
  value,
  onChange,
  format,
  ...restProps
}: ImperativeModalChildrenProps<Pick<DatePeriodInputProps, 'value' | 'onChange' | 'format'>>) {
  const [currentIndex, setCurrentIndex] = useSafeState(0);
  const [dates, setDates] = useSafeState<[Date | undefined, Date | undefined]>(value ?? [undefined, undefined]);
  const [minDate, setMinDate] = useSafeState<string | undefined>(undefined); // 对结束时间来说，它的最小值就是开始时间的值
  const [maxDate, setMaxDate] = useSafeState<string | undefined>(undefined); // 对开始时间来说，它的最大值就是结束时间的值

  useEffect(() => {
    value && setDates(value);
  }, [value]);

  const handleChange = (date?: Date) => {
    const [startDate, endDate] = dates;
    if (onChange) {
      onChange(currentIndex === 0 ? [date!, endDate] : [startDate, date!]);
    } else {
      setDates(draft => {
        draft[currentIndex] = date;
        return draft;
      });
    }
  };

  /** 点开开始时间选择器 */
  const handleStartPress = () => {
    Keyboard.dismiss();
    setCurrentIndex(0);
    if (dates[1]) {
      setMinDate(undefined);
      setMaxDate(dayjs(dates[1]).format(format));
    }
    Modal.show(
      <DatePicker
        {...restProps}
        {...{
          format,
          onChange: handleChange,
          minDate,
          maxDate,
          value: dates[currentIndex],
        }}
      />,
      {
        position: 'bottom',
      }
    );
  };

  /** 点开结束时间选择器 */
  const handleEndPress = () => {
    Keyboard.dismiss();
    setCurrentIndex(1);
    if (dates[0]) {
      setMinDate(dayjs(dates[0]).format(format));
      setMaxDate(undefined);
    }
    Modal.show(
      <DatePicker
        {...restProps}
        {...{
          format,
          onChange: handleChange,
          minDate,
          maxDate,
          value: dates[currentIndex],
        }}
      />,
      {
        position: 'bottom',
      }
    );
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
    setMinDate(undefined);
    if (endDate) {
      setMaxDate(dayjs(endDate).format(format));
    } else {
      setMaxDate(undefined);
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
    setMaxDate(undefined);
    if (startDate) {
      setMinDate(dayjs(startDate).format(format));
    } else {
      setMinDate(undefined);
    }
  };

  return {
    currentIndex,
    dates,
    minDate,
    maxDate,
    handleStartPress: useMemoizedFn(handleStartPress),
    handleEndPress: useMemoizedFn(handleEndPress),
    handleChange: useMemoizedFn(handleChange),
    clearStartDate: useMemoizedFn(clearStartDate),
    clearEndDate: useMemoizedFn(clearEndDate),
  };
}
