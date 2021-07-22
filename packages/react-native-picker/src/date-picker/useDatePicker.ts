import dayjs, { Dayjs } from 'dayjs';
import { DatePickerProps, CascadePickerItemProps } from './type';
import { useCallback, useMemo } from 'react';

export default function useDatePicker({
  mode,
  labelUnit,
  format,
  value,
  minDate = '1970-01-01 00:00:00',
  maxDate = '2100-01-01 00:00:00',
  onChange,
}: Required<Pick<DatePickerProps, 'value' | 'mode' | 'labelUnit' | 'format'>> &
  Pick<DatePickerProps, 'minDate' | 'maxDate' | 'onChange'>) {
  const minDayjs = useMemo(() => dayjs(minDate), [minDate]);
  const maxDayjs = useMemo(() => dayjs(maxDate), [maxDate]);

  const clipDate = useCallback(
    (date: Date) => {
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
      } else if (mode === 'time') {
        const maxHour = maxDayjs.get('hour');
        const maxMinutes = maxDayjs.get('minute');
        const minHour = minDayjs.get('hour');
        const minMinutes = minDayjs.get('minute');
        const hour = dayjs(date).get('hour');
        const minutes = dayjs(date).get('minute');

        if (hour < minHour || (hour === minHour && minutes < minMinutes)) {
          return cloneDate(minDayjs);
        }
        if (hour > maxHour || (hour === maxHour && minutes > maxMinutes)) {
          return cloneDate(maxDayjs);
        }
      }
      return dayjs(date);
    },
    [maxDayjs, minDayjs, mode]
  );

  const getDate = useCallback(() => {
    return clipDate(value);
  }, [clipDate, value]);

  const getMinYear = useCallback(() => {
    return minDayjs.get('year');
  }, [minDayjs]);

  const getMaxYear = useCallback(() => {
    return maxDayjs.get('year');
  }, [maxDayjs]);

  const getMinMonth = useCallback(() => {
    return minDayjs.get('month');
  }, [minDayjs]);

  const getMaxMonth = useCallback(() => {
    return maxDayjs.get('month');
  }, [maxDayjs]);

  const getMinDay = useCallback(() => {
    return minDayjs.get('date');
  }, [minDayjs]);

  const getMaxDay = useCallback(() => {
    return maxDayjs.get('date');
  }, [maxDayjs]);

  const getMinHour = useCallback(() => {
    return minDayjs.get('hour');
  }, [minDayjs]);

  const getMaxHour = useCallback(() => {
    return maxDayjs.get('hour');
  }, [maxDayjs]);

  const getMinMinute = useCallback(() => {
    return minDayjs.get('minute');
  }, [minDayjs]);

  const getMaxMinute = useCallback(() => {
    return maxDayjs.get('minute');
  }, [maxDayjs]);

  const cloneDate = (date: Dayjs) => {
    return dayjs(date);
  };

  const getDateData = useCallback(() => {
    const date = getDate();
    const selYear = date.get('year');
    const selMonth = date.get('month');
    const minDateYear = getMinYear();
    const maxDateYear = getMaxYear();
    const minDateMonth = getMinMonth();
    const maxDateMonth = getMaxMonth();
    const minDateDay = getMinDay();
    const maxDateDay = getMaxDay();

    const years: CascadePickerItemProps[] = [];
    for (let i = minDateYear; i <= maxDateYear; i++) {
      years.push({
        value: i + '',
        label: i + labelUnit.year,
      });
    }
    if (mode === 'year') {
      return [years];
    }

    const months: CascadePickerItemProps[] = [];
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
        value: i + '',
        label: i + 1 + labelUnit.month,
      });
    }
    if (mode === 'month') {
      return [years, months];
    }

    const days: CascadePickerItemProps[] = [];
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
        value: i + '',
        label: i + labelUnit.day,
      });
    }
    return [years, months, days];
  }, [
    getDate,
    getMaxDay,
    getMaxMonth,
    getMaxYear,
    getMinDay,
    getMinMonth,
    getMinYear,
    labelUnit.day,
    labelUnit.month,
    labelUnit.year,
    mode,
  ]);

  const getTimeData = useCallback(
    (date: Dayjs) => {
      let minHour = 0;
      let maxHour = 23;
      let minMinute = 0;
      let maxMinute = 59;
      const minDateMinute = getMinMinute();
      const maxDateMinute = getMaxMinute();
      const minDateHour = getMinHour();
      const maxDateHour = getMaxHour();
      const hour = date.get('hour');

      if (mode === 'datetime') {
        const year = date.get('year');
        const month = date.get('month') + 1;
        const day = date.get('date');
        const minDateYear = getMinYear();
        const maxDateYear = getMaxYear();
        const minDateMonth = getMinMonth();
        const maxDateMonth = getMaxMonth();
        const minDateDay = getMinDay();
        const maxDateDay = getMaxDay();

        if (minDateYear === year && minDateMonth === month && minDateDay === day) {
          minHour = minDateHour;
          if (minDateHour === hour) {
            minMinute = minDateMinute;
          }
        }
        if (maxDateYear === year && maxDateMonth === month && maxDateDay === day) {
          maxHour = maxDateHour;
          if (maxDateHour === hour) {
            maxMinute = maxDateMinute;
          }
        }
      } else {
        minHour = minDateHour;
        if (minDateHour === hour) {
          minMinute = minDateMinute;
        }
        maxHour = maxDateHour;
        if (maxDateHour === hour) {
          maxMinute = maxDateMinute;
        }
      }

      const hours: CascadePickerItemProps[] = [];
      for (let i = minHour; i <= maxHour; i++) {
        hours.push({
          value: i + '',
          label: labelUnit.hour ? i + labelUnit.hour + '' : pad(i),
        });
      }

      const minutes: CascadePickerItemProps[] = [];
      const selMinute = date.get('minute');
      for (let i = minMinute; i <= maxMinute; i += 1) {
        minutes.push({
          value: i + '',
          label: labelUnit.minute ? i + labelUnit.minute + '' : pad(i),
        });
        if (selMinute > i && selMinute < i + 1) {
          minutes.push({
            value: selMinute + '',
            label: labelUnit.minute ? selMinute + labelUnit.minute + '' : pad(selMinute),
          });
        }
      }
      const cols = [hours, minutes].concat([]);

      return { cols, selMinute };
    },
    [
      getMaxDay,
      getMaxHour,
      getMaxMinute,
      getMaxMonth,
      getMaxYear,
      getMinDay,
      getMinHour,
      getMinMinute,
      getMinMonth,
      getMinYear,
      labelUnit.hour,
      labelUnit.minute,
      mode,
    ]
  );

  const getValueCols = useCallback(() => {
    const date = getDate();
    let cols: CascadePickerItemProps[][] = [];
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
  }, [getDate, getDateData, getTimeData, mode]);

  const setMonth = useCallback((date: Date, month: number) => {
    date.setDate(Math.min(date.getDate(), getDaysInMonth(new Date(date.getFullYear(), month))));
    date.setMonth(month);
    return dayjs(date);
  }, []);

  const getNewDate = useCallback(
    (value: number, index: number) => {
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
    },
    [clipDate, getDate, mode, setMonth]
  );

  const onValueChange = useCallback(
    (value: string, index: number) => {
      const newDate = getNewDate(parseInt(value, 10), index);
      onChange?.(newDate.toDate(), newDate.format(format));
    },
    [format, getNewDate, onChange]
  );

  return {
    getValueCols,
    onValueChange,
  };
}

function pad(n: number) {
  return n < 10 ? `0${n}` : n + '';
}

function getDaysInMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}
