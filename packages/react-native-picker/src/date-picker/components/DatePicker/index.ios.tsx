import { PickerIOS } from '@react-native-picker/picker';
import { useTheme } from '@shopify/restyle';
import { Flex, Theme } from '@td-design/react-native';
import React, { FC } from 'react';

import { DatePickerProps } from '../../type';
import useDatePicker from './useDatePicker';

const DatePickerIOS: FC<
  Omit<DatePickerProps, 'mode' | 'labelUnit' | 'format'> &
    Required<Pick<DatePickerProps, 'mode' | 'labelUnit' | 'format'>>
> = ({
  value = new Date(),
  minDate,
  maxDate,
  mode,
  labelUnit,
  format,
  onChange,
  textColor,
  textSize,
  ...restProps
}) => {
  const { onValueChange, getValueCols } = useDatePicker({
    minDate,
    maxDate,
    mode,
    labelUnit,
    format,
    value,
    onChange,
  });
  const theme = useTheme<Theme>();

  const pickerProps = {};
  const pickerItemProps = {
    color: theme.colors.gray500,
  };

  const { values, cols } = getValueCols();

  /** 生成日期picker */
  const renderDateTimePicker = () => {
    return cols.map((col, index) => {
      return (
        <Flex.Item flex={1} key={`${index}`}>
          <PickerIOS
            {...pickerProps}
            {...restProps}
            itemStyle={{ fontSize: textSize, color: textColor }}
            selectedValue={values[index]}
            onValueChange={itemValue => onValueChange(itemValue as string, index)}
          >
            {col.map(year => (
              <PickerIOS.Item {...pickerItemProps} key={year.value} {...year} />
            ))}
          </PickerIOS>
        </Flex.Item>
      );
    });
  };

  return <Flex backgroundColor="background">{renderDateTimePicker()}</Flex>;
};

export default React.memo(DatePickerIOS);
