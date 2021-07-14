import React, { FC, useCallback, useEffect, useState } from 'react';
import { Keyboard, TouchableOpacity } from 'react-native';
import { helpers, Text } from '@td-design/react-native';
import dayjs from 'dayjs';

import DatePicker from '../date-picker';
import { DatePickerProps } from '../date-picker/type';
import { ModalPickerProps } from '../picker/type';

interface PickerItemProps extends DatePickerProps, Omit<ModalPickerProps, 'visible'> {
  placeholder?: string;
}

const { px } = helpers;
const DatePickerItem: FC<PickerItemProps> = ({ placeholder = '请选择', format, value, onChange, ...restProps }) => {
  const [currentText, setCurrentText] = useState(placeholder);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (value) {
      const label = dayjs(value).format(format);
      setCurrentText(label ?? placeholder);
    }
  }, [format, placeholder, value]);

  const handleChange = useCallback(
    (date?: Date, formatDate?: string) => {
      setCurrentText(formatDate ?? '');

      onChange?.(date, formatDate);
    },
    [onChange]
  );

  const handleClose = useCallback(() => {
    setVisible(false);
  }, []);

  return (
    <>
      <TouchableOpacity
        onPress={() => {
          Keyboard.dismiss();
          setVisible(true);
        }}
        activeOpacity={0.8}
        style={{ flex: 1, minHeight: px(32), justifyContent: 'center', alignItems: 'flex-end' }}
      >
        <Text variant="p1" color="gray300">
          {currentText}
        </Text>
      </TouchableOpacity>
      <DatePicker {...restProps} {...{ value, visible, format, onChange: handleChange, onClose: handleClose }} />
    </>
  );
};

export default DatePickerItem;
