import React, { FC } from 'react';
import { Flex } from '@td-design/react-native';
import { DatePickerProps } from './type';
import WheelPicker from '../picker/WheelPicker.android';
import useDatePicker from './useDatePicker';

const DatePickerAndroid: FC<
  Omit<DatePickerProps, 'mode' | 'labelUnit' | 'format'> &
    Required<Pick<DatePickerProps, 'mode' | 'labelUnit' | 'format'>>
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
        <Flex.Item flex={1} key={`${index}`}>
          <WheelPicker
            {...restProps}
            value={values[index]}
            data={col}
            onChange={itemValue => onValueChange(itemValue as string, index)}
          />
        </Flex.Item>
      );
    });
  };

  return <Flex>{renderDateTimePicker()}</Flex>;
};

export default DatePickerAndroid;
