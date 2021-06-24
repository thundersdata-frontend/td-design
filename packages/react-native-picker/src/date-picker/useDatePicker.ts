import { useRef, useEffect } from 'react';
import Dayjs, { UnitType } from 'dayjs';
import { useImmer } from 'use-immer';
import { DatePickerProps, DateRef, CascadePickerItemProps } from './type';

export default function useDatePicker({
  labelUnit,
  value,
  minYear,
  maxYear,
  onChange,
}: Required<Pick<DatePickerProps, 'labelUnit' | 'value' | 'minYear' | 'maxYear'>> & Pick<DatePickerProps, 'onChange'>) {
  const dayNumRef = useRef<number>(0);
  const newValue = useRef<DateRef>({
    year: '0',
    month: '0',
    date: '0',
    hour: '0',
    minute: '0',
  });
  const [dayRange, setDayRange] = useImmer<CascadePickerItemProps[]>([]);
  const [yearRange, setYearRange] = useImmer<CascadePickerItemProps[]>([]);
  /** 可选月 */
  const monthRange = new Array(12).fill('').map((_, index) => ({
    label: `${index + 1}${labelUnit?.month}`,
    value: `${index + 1}`,
  }));
  const hourRange = new Array(23).fill('').map((_, index) => ({
    label: `${index + 1}${labelUnit?.hour}`,
    value: `${index + 1}`,
  }));
  const minuteRange = new Array(59).fill('').map((_, index) => ({
    label: `${index + 1}${labelUnit?.minute}`,
    value: `${index + 1}`,
  }));

  /** 根据当前日期，生成可选天 */
  useEffect(() => {
    const date = Dayjs(value);
    parseDate(date);

    const dayNum = date.daysInMonth();
    if (dayNum !== dayNumRef.current) {
      dayNumRef.current = dayNum;
      setDayRange(draft => {
        draft.length = 0;
        for (let i = 1; i <= dayNum; i += 1) {
          draft.push({ value: `${i}`, label: `${i}${labelUnit?.day}` });
        }
      });
    }
  }, [value, labelUnit?.day, setDayRange]);

  /** 根据最大最小日期，生成可选年 */
  useEffect(() => {
    setYearRange(draft => {
      draft.length = 0;
      for (let i = +minYear; i <= +maxYear; i += 1) {
        draft.push({ value: `${i}`, label: `${i}${labelUnit?.year}` });
      }
    });
  }, [labelUnit?.year, minYear, maxYear, setYearRange]);

  const parseDate = (val: Dayjs.Dayjs) => {
    ['year', 'month', 'date', 'hour', 'minute'].forEach(s => {
      newValue.current[s] = val.get(s as UnitType) + '';
    });
  };

  const onYearChange = (year: number) => {
    const oldYear = newValue.current.year;

    newValue.current.year = `${year}`;
    checkDate(oldYear, newValue.current.month);
    onChange?.(getValue());
  };

  const onMonthChange = (month: number) => {
    const oldMonth = newValue.current.month;

    newValue.current.month = `${Number(month) - 1}`;
    checkDate(newValue.current.year, oldMonth);
    onChange?.(getValue());
  };

  const onDayChange = (day: number) => {
    newValue.current.date = `${day}`;

    checkDate(newValue.current.year, newValue.current.month);
    onChange?.(getValue());
  };

  const onHourChange = (hour: number) => {
    newValue.current.hour = `${hour}`;
    onChange?.(getValue());
  };

  const onMinuteChange = (minute: number) => {
    newValue.current.minute = `${minute}`;
    onChange?.(getValue());
  };

  const checkDate = (oldYear: string, oldMonth: string) => {
    const currentMonth = newValue.current.month;
    const currentYear = newValue.current.year;
    const currentDay = newValue.current.date;

    let dayNum = dayRange.length;
    if (oldMonth !== currentMonth || oldYear !== currentYear) {
      dayNum = Dayjs(`${currentYear}-${Number(currentMonth) + 1}-01`, 'YYYY-MM-DD').daysInMonth();
    }

    if (dayNum !== dayRange.length) {
      if (+currentDay > dayNum) {
        newValue.current.date = `${dayNum}`;
      }

      setDayRange(draft => {
        draft.length = 0;
        for (let i = 1; i <= dayNum; i += 1) {
          draft.push({ value: `${i}`, label: `${i}${labelUnit?.day}` });
        }
      });
    }
  };

  const getValue = () => {
    const { year, month, date, hour, minute } = newValue.current;
    return new Date(+year, +month, +date, +hour, +minute);
  };

  return {
    yearRange,
    dayRange,
    monthRange,
    hourRange,
    minuteRange,
    onYearChange,
    onMonthChange,
    onDayChange,
    onHourChange,
    onMinuteChange,
  };
}
