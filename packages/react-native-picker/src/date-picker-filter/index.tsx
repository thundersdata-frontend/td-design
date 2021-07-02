import React, { FC, useCallback, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Box, Text, Flex, helpers, Icon } from '@td-design/react-native';
import { useTheme } from '@shopify/restyle';
import { DatePickerProps } from '../date-picker/type';
import { ModalPickerProps } from '../picker/type';
import DatePicker from '../date-picker';

interface DatePickerFilterProps extends DatePickerProps, Omit<ModalPickerProps, 'visible'> {
  label: string;
  placeholder?: string;
}

const { px, ONE_PIXEL } = helpers;

/** 适用于筛选条件下的日期选择 */
const DatePickerFilter: FC<DatePickerFilterProps> = ({
  label,
  placeholder = '请选择',
  display,
  format,
  value,
  onChange,
  ...restProps
}) => {
  const theme = useTheme();
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
    <Box>
      <Flex marginRight="x2" marginBottom="x1" alignItems="center">
        <Text variant="p0" color="gray500">
          {label}
        </Text>
      </Flex>
      <TouchableOpacity
        onPress={() => setVisible(true)}
        activeOpacity={0.8}
        style={{
          height: px(40),
          paddingHorizontal: theme.spacing.x1,
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
          borderWidth: ONE_PIXEL,
          borderColor: theme.colors.border,
          borderRadius: theme.borderRadii.x1,
        }}
      >
        <Flex>
          <Icon type="fontisto" name="date" size={px(16)} color={theme.colors.icon} />
          <Text variant="p1" color="gray300" marginLeft="x2">
            {currentText}
          </Text>
        </Flex>
        <Icon name="right" size={px(16)} color={theme.colors.icon} />
      </TouchableOpacity>
      <DatePicker
        {...restProps}
        {...{ value, visible, display, format, onChange: handleChange, onClose: handleClose }}
      />
    </Box>
  );
};
export default DatePickerFilter;
