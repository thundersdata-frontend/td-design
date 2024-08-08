import { useMemo } from 'react';

import { useMemoizedFn } from '@td-design/rn-hooks';
import dayjs, { Dayjs } from 'dayjs';

import { PickerData } from '../WheelPicker/type';
import { CascadePickerItemProps, DatePickerPropsBase } from './type';

export default function useDatePicker<T>({
  mode,
  labelUnit,
  format,
  value,
  minDate = '1970-01-01',
  maxDate = '2100-01-01',
  onChange,
}: Required<Pick<DatePickerPropsBase, 'value' | 'mode' | 'labelUnit' | 'format'>> &
  Pick<DatePickerPropsBase, 'minDate' | 'maxDate' | 'onChange'>) {
  const minDayjs = useMemo(() => dayjs(minDate), [minDate]);
  const maxDayjs = useMemo(() => dayjs(maxDate), [maxDate]);

  const clipDate = (date: Date) => {
    if (mode === 'datetime') {
      if (dayjs(date).isBefore(minDayjs)) {
        return cloneDate(minDayjs);
      }
      if (dayjs(date).isAfter(maxDayjs)) {
        return cloneDate(maxDayjs);
      }
    } else if (mode === 'date' || mode === 'year' || mode === 'month') {
      if (dayjs(date).add(1, 'day').isBefore(minDayjs)) {
        return cloneDate(minDayjs);
      }
      if (dayjs(date).isAfter(maxDayjs.add(1, 'day'))) {
        return cloneDate(maxDayjs);
      }
    }
    return dayjs(date);
  };

  const getDate = () => {
    return clipDate(value);
  };

  const getMinYear = () => {
    return minDayjs.get('year');
  };

  const getMaxYear = () => {
    return maxDayjs.get('year');
  };

  const getMinMonth = () => {
    return minDayjs.get('month');
  };

  const getMaxMonth = () => {
    return maxDayjs.get('month');
  };

  const getMinDay = () => {
    return minDayjs.get('date');
  };

  const getMaxDay = () => {
    return maxDayjs.get('date');
  };

  const cloneDate = (date: Dayjs) => {
    return dayjs(date);
  };

  const getDateData = () => {
    const date = getDate();
    const selYear = date.get('year');
    const selMonth = date.get('month');
    const minDateYear = getMinYear();
    const maxDateYear = getMaxYear();
    const minDateMonth = getMinMonth();
    const maxDateMonth = getMaxMonth();
    const minDateDay = getMinDay();
    const maxDateDay = getMaxDay();

    const years: CascadePickerItemProps<T>[] = [];
    for (let i = minDateYear; i <= maxDateYear; i++) {
      years.push({
        value: (i + '') as T,
        label: i + labelUnit.year,
      });
    }
    if (mode === 'year') {
      return [years];
    }

    const months: CascadePickerItemProps<T>[] = [];
    let minMonth = 0;
    let maxMonth = 11;
    if (minDateYear === selYear) {
      minMonth = minDateMonth;
    }
    if (maxDateYear === selYear) {
      maxMonth = maxDateMonth;
    }

    for (let i = minMonth; i <= maxMonth; i++) {
      months.push({
        value: (i + '') as T,
        label: i + 1 + labelUnit.month,
      });
    }
    if (mode === 'month') {
      return [years, months];
    }

    const days: CascadePickerItemProps<T>[] = [];
    let minDay = 1;
    let maxDay = getDaysInMonth(date.toDate());

    if (minDateYear === selYear && minDateMonth === selMonth) {
      minDay = minDateDay;
    }
    if (maxDateYear === selYear && maxDateMonth === selMonth) {
      maxDay = maxDateDay;
    }
    for (let i = minDay; i <= maxDay; i++) {
      days.push({
        value: (i + '') as T,
        label: i + labelUnit.day,
      });
    }
    return [years, months, days];
  };

  const getTimeData = (date: Dayjs) => {
    let minHour = 0;
    let maxHour = 23;
    let minMinute = 0;
    let maxMinute = 59;

    const hours: CascadePickerItemProps<T>[] = [];
    for (let i = minHour; i <= maxHour; i++) {
      hours.push({
        value: (i + '') as T,
        label: labelUnit.hour ? i + labelUnit.hour + '' : pad(i),
      });
    }

    const minutes: CascadePickerItemProps<T>[] = [];
    const selMinute = date.get('minute');
    for (let i = minMinute; i <= maxMinute; i += 1) {
      minutes.push({
        value: (i + '') as T,
        label: labelUnit.minute ? i + labelUnit.minute + '' : pad(i),
      });
      if (selMinute > i && selMinute < i + 1) {
        minutes.push({
          value: (selMinute + '') as T,
          label: labelUnit.minute ? selMinute + labelUnit.minute + '' : pad(selMinute),
        });
      }
    }
    const cols = [hours, minutes].concat([]);

    return { cols, selMinute };
  };

  const getValueCols = () => {
    const date = getDate();
    let cols: CascadePickerItemProps<T>[][] = [];
    let values: string[] = [];

    if (mode === 'year') {
      return {
        cols: getDateData(),
        values: [date.get('year') + ''],
      };
    }

    if (mode === 'month') {
      return {
        cols: getDateData(),
        values: [date.get('year') + '', date.get('month') + ''],
      };
    }

    if (mode === 'datetime' || mode === 'date') {
      cols = getDateData();
      values = [date.get('year') + '', date.get('month') + '', date.get('date') + ''];
    }

    if (mode === 'datetime' || mode === 'time') {
      const time = getTimeData(date);
      cols = cols.concat(time.cols);
      const hour = date.get('hour');
      const dtValue = [hour + '', time.selMinute + ''];
      values = values.concat(dtValue);
    }

    return {
      values,
      cols,
    };
  };

  const setMonth = (date: Date, month: number) => {
    date.setDate(Math.min(date.getDate(), getDaysInMonth(new Date(date.getFullYear(), month))));
    date.setMonth(month);
    return dayjs(date);
  };

  const getNewDate = (value: number, index: number) => {
    const date = cloneDate(getDate());
    let newValue: Dayjs | undefined = undefined;

    if (mode === 'datetime' || mode === 'date' || mode === 'year' || mode === 'month') {
      switch (index) {
        case 0:
          newValue = date.set('year', value);
          break;
        case 1:
          newValue = setMonth(date.toDate(), value);
          break;
        case 2:
          newValue = date.set('date', value);
          break;
        case 3:
          newValue = date.set('hour', value);
          break;
        case 4:
          newValue = date.set('minute', value);
          break;
        default:
          break;
      }
    } else if (mode === 'time') {
      switch (index) {
        case 0:
          newValue = date.set('hour', value);
          break;
        case 1:
          newValue = date.set('minute', value);
          break;
        default:
          break;
      }
    }
    return clipDate(newValue!.toDate());
  };

  const onValueChange = (data: PickerData<T>, index: number) => {
    const newDate = getNewDate(parseInt(data.value + '', 10), index);
    onChange?.(newDate.toDate(), newDate.format(format));
  };

  return {
    getValueCols: useMemoizedFn(getValueCols),
    onValueChange: useMemoizedFn(onValueChange),
  };
}

function pad(n: number) {
  return n < 10 ? `0${n}` : n + '';
}

function getDaysInMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}
