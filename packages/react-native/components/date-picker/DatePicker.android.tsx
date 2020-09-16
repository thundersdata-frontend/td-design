import React, { FC, useEffect, useRef } from 'react';
import { useImmer } from 'use-immer';
import Dayjs, { UnitType } from 'dayjs';
import { DatePickerProps, PickerItemProps } from './type';
import WheelCurvedPicker from '../picker/WheelCurvedPicker.android';
import Flex from '../flex';

type DateUnit = 'year' | 'month' | 'date' | 'hour' | 'minute';
type DateRef = { [key in DateUnit]: number };

const DatePickerAndroid: FC<DatePickerProps> = ({
  value = new Date(),
  minimumDate = Dayjs().subtract(10, 'year').toDate(),
  maximumDate = Dayjs().add(10, 'year').toDate(),
  labelUnit,
  display = 'Y-M-D',
  mode,
  onChange,
  ...restProps
}) => {
  const newValue = useRef<DateRef>({
    year: 0,
    month: 0,
    date: 0,
    hour: 0,
    minute: 0,
  });
  const [dayRange, setDayRange] = useImmer<PickerItemProps[]>([]);
  const [yearRange, setYearRange] = useImmer<PickerItemProps[]>([]);
  /** 可选月 */
  const [monthRange] = useImmer<PickerItemProps[]>(
    new Array(12).fill('').map((_, index) => ({
      label: `${index + 1}${labelUnit?.month}`,
      value: index + 1,
    })),
  );

  /** 根据当前日期，生成可选天 */
  useEffect(() => {
    const date = Dayjs(value);
    parseDate(date);

    const dayNum = date.daysInMonth();
    setDayRange((draft) => {
      for (let i = 1; i <= dayNum; i += 1) {
        draft.push({ value: i, label: `${i}${labelUnit?.day}` });
      }
    });
  }, [value]);

  /** 根据最大最小日期，生成可选年 */
  useEffect(() => {
    setYearRange((draft) => {
      const minYear = minimumDate?.getFullYear() ?? 0;
      const maxYear = maximumDate?.getFullYear() ?? 0;
      for (let i = minYear + 1; i <= maxYear; i += 1) {
        draft.push({ value: i, label: `${i}${labelUnit?.year}` });
      }
    });
  }, []);

  const parseDate = (val: Dayjs.Dayjs) => {
    ['year', 'month', 'date', 'hour', 'minute'].forEach((s) => {
      newValue.current[s] = val.get(s as UnitType);
    });
  };

  const onYearChange = (year: number) => {
    const oldYear = newValue.current.year;

    newValue.current.year = year;
    checkDate(oldYear, newValue.current.month);
    if (onChange) {
      onChange(getValue());
    }
  };

  const onMonthChange = (month: number) => {
    const oldMonth = newValue.current.month;

    newValue.current.month = month - 1;
    checkDate(newValue.current.year, oldMonth);
    if (onChange) {
      onChange(getValue());
    }
  };

  const onDayChange = (day: number) => {
    newValue.current.date = day;

    checkDate(newValue.current.year, newValue.current.month);
    if (onChange) {
      onChange(getValue());
    }
  };

  const onHourChange = (hour: number) => {
    newValue.current.hour = hour;

    if (onChange) {
      onChange(getValue());
    }
  };

  const onMinuteChange = (minute: number) => {
    newValue.current.minute = minute;

    if (onChange) {
      onChange(getValue());
    }
  };

  const checkDate = (oldYear: number, oldMonth: number) => {
    const currentMonth = newValue.current.month;
    const currentYear = newValue.current.year;
    const currentDay = newValue.current.date;

    let dayNum = dayRange.length;
    if (oldMonth !== currentMonth || oldYear !== currentYear) {
      dayNum = Dayjs(`${currentYear}-${currentMonth + 1}`, 'YYYY-MM').daysInMonth();
    }

    if (dayNum !== dayRange.length) {
      if (currentDay > dayNum) {
        newValue.current.date = dayNum;
      }

      setDayRange((draft) => {
        for (let i = 1; i <= dayNum; i += 1) {
          draft.push({ value: i, label: `${i}${labelUnit?.day}` });
        }
      });
    }
  };

  const getValue = () => {
    const { year, month, date, hour, minute } = newValue.current;
    const nextDate = new Date(year, month, date, hour, minute);

    if (nextDate < minimumDate) {
      return minimumDate;
    }

    return nextDate > maximumDate ? maximumDate : nextDate;
  };

  /** 生成日期picker */
  const renderDatePicker = () => {
    return display.split('-').map((key) => {
      switch (key) {
        case 'D':
          return (
            <Flex.Item key="date">
              <WheelCurvedPicker
                {...restProps}
                selectedValue={value.getDate()}
                data={dayRange}
                onValueChange={(itemValue) => onDayChange(itemValue as number)}
              />
            </Flex.Item>
          );
        case 'M':
          return (
            <Flex.Item key="month">
              <WheelCurvedPicker
                {...restProps}
                selectedValue={value.getMonth() + 1}
                data={monthRange}
                onValueChange={(itemValue) => onMonthChange(itemValue as number)}
              />
            </Flex.Item>
          );
        case 'Y':
          return (
            <Flex.Item key="year">
              <WheelCurvedPicker
                {...restProps}
                selectedValue={value.getFullYear()}
                data={yearRange}
                onValueChange={(itemValue) => onYearChange(itemValue as number)}
              />
            </Flex.Item>
          );
        default:
          return null;
      }
    });
  };

  /** 生成时间picker */
  const renderTimePicker = () => {
    const [hours, minutes]: [PickerItemProps[], PickerItemProps[]] = [[], []];

    for (let i = 0; i <= 24; i += 1) {
      hours.push({ label: `${i}`, value: i });
    }

    for (let i = 0; i <= 59; i += 1) {
      minutes.push({ label: `${i}`, value: i });
    }

    return [
      <Flex.Item key="hour">
        <WheelCurvedPicker
          {...restProps}
          selectedValue={value.getHours()}
          data={hours}
          onValueChange={(itemValue) => onHourChange(itemValue as number)}
        />
      </Flex.Item>,
      <Flex.Item key="minute">
        <WheelCurvedPicker
          {...restProps}
          selectedValue={value.getMinutes()}
          data={minutes}
          onValueChange={(itemValue) => onMinuteChange(itemValue as number)}
        />
      </Flex.Item>,
    ];
  };

  return <Flex>{mode === 'date' ? renderDatePicker() : renderTimePicker()}</Flex>;
};

export default DatePickerAndroid;
