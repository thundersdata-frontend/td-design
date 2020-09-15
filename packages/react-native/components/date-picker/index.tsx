import React, { FC, useState, useEffect } from 'react';
import { useTheme } from '@shopify/restyle';
import DatePickerRN from './DatePicker';
import { Theme } from '../config/theme';
import { DatePickerProps } from './type';

const DatePicker: FC<DatePickerProps> = (props) => {
  const theme = useTheme<Theme>();
  const [date, selectDate] = useState<Date>();

  const {
    mode = 'date',
    textColor = theme.colors.primaryTextColor,
    textSize = theme.borderRadii.base * 6,
    itemSpace = theme.borderRadii.base * 5,
    labelUnit = { year: '年', month: '月', day: '日' },
    display = 'Y-M-D',
    onChange,
    style,
    ...restProps
  } = props;

  useEffect(() => {
    selectDate(props.value);
  }, [props.value]);

  const handleChange = (date?: Date) => {
    selectDate(date);

    if (onChange) {
      onChange(date);
    }
  };

  return (
    <DatePickerRN
      {...restProps}
      {...{ textColor, textSize, itemSpace, labelUnit, display, date, mode }}
      onChange={handleChange}
      style={[{ height: 220 }, style]}
    />
  );
};

export default DatePicker;
