import React from 'react';
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
  const [dates, setDates] = useSafeState(value ?? [undefined, undefined]);

  const handleChange = useMemoizedFn((date: Date | undefined, index: number) => {
    const [startDate, endDate] = dates;
    if (onChange) {
      onChange(index === 0 ? [date!, endDate] : [startDate, date!]);
    } else {
      setDates((draft: any[]) => {
        const nextDates = [...draft];
        nextDates[index] = date;
        return nextDates;
      });
    }
  });

  /** 点开开始时间选择器 */
  const handleStartPress = () => {
    Keyboard.dismiss();
    Modal.show(
      <DatePicker
        {...restProps}
        {...{
          format,
          onChange: date => handleChange(date, 0),
          value: dates[0],
        }}
        minDate={undefined}
        maxDate={dates[1] ? dayjs(dates[1]).format(format) : undefined}
      />,
      {
        position: 'bottom',
      }
    );
  };

  /** 点开结束时间选择器 */
  const handleEndPress = () => {
    Keyboard.dismiss();
    Modal.show(
      <DatePicker
        {...restProps}
        {...{
          format,
          onChange: date => handleChange(date, 1),
          value: dates[1],
        }}
        minDate={dates[0] ? dayjs(dates[0]).format(format) : undefined}
        maxDate={undefined}
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
    handleStartPress: useMemoizedFn(handleStartPress),
    handleEndPress: useMemoizedFn(handleEndPress),
    clearStartDate: useMemoizedFn(clearStartDate),
    clearEndDate: useMemoizedFn(clearEndDate),
  };
}
