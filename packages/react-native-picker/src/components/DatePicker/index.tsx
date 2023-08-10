import React, { FC } from 'react';

import { Flex } from '@td-design/react-native';
import dayjs from 'dayjs';

import WheelPicker from '../WheelPicker';
import { DatePickerPropsBase } from './type';
import useDatePicker from './useDatePicker';

const DatePicker: FC<
  Omit<DatePickerPropsBase, 'mode' | 'labelUnit' | 'format'> &
    Required<Pick<DatePickerPropsBase, 'mode' | 'labelUnit' | 'format'>>
> = ({ value = new Date(), minDate, maxDate, mode, labelUnit, format, onChange, ...restProps }) => {
  const { onValueChange, getValueCols } = useDatePicker({
    minDate,
    maxDate,
    mode,
    labelUnit,
    format,
    value,
    onChange,
  });

  const { values, cols } = getValueCols();

  /** 生成日期picker */
  const renderDateTimePicker = () => {
    return cols.map((col, index) => {
      return (
        <WheelPicker
          key={index}
          {...restProps}
          data={col}
          value={values[index]}
          onChange={itemValue => onValueChange(itemValue, index)}
        />
      );
    });
  };

  return <Flex>{renderDateTimePicker()}</Flex>;
};

export default React.memo(DatePicker, (p, n) => {
  if (!p.value || !n.value) {
    return true;
  }

  return dayjs(p.value).isSame(dayjs(n.value));
});
