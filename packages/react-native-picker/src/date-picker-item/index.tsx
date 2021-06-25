import React, { FC, useCallback, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { helpers, Text } from '@td-design/react-native';

import DatePicker from '../date-picker';
import { DatePickerProps } from '../date-picker/type';
import { ModalPickerProps } from '../picker/type';

interface PickerItemProps extends DatePickerProps, Omit<ModalPickerProps, 'visible'> {
  placeholder?: string;
}

const { px } = helpers;
const DatePickerItem: FC<PickerItemProps> = ({
  placeholder = '请选择',
  display,
  format,
  value,
  onChange,
  ...restProps
}) => {
  const [currentText, setCurrentText] = useState(placeholder);
  const [visible, setVisible] = useState(false);

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
        onPress={() => setVisible(true)}
        activeOpacity={0.8}
        style={{ flex: 1, minHeight: px(32), justifyContent: 'center', alignItems: 'flex-end' }}
      >
        <Text variant="p1" color="gray300">
          {currentText}
        </Text>
      </TouchableOpacity>
      <DatePicker
        {...restProps}
        {...{ value, visible, display, format, onChange: handleChange, onClose: handleClose }}
      />
    </>
  );
};

export default DatePickerItem;
