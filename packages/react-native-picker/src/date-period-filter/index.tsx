import React, { FC, useCallback, useState } from 'react';
import { Keyboard, TouchableOpacity } from 'react-native';
import { Box, Text, Flex, helpers, Icon } from '@td-design/react-native';
import { useTheme } from '@shopify/restyle';
import { DatePickerProps, ModalPickerProps } from '../date-picker/type';
import DatePicker from '../date-picker';

interface DatePeriodFilterProps extends Omit<DatePickerProps, 'value' | 'onChange'>, Omit<ModalPickerProps, 'visible'> {
  label: string;
  placeholders?: string[];
  value?: [Date | undefined, Date | undefined];
  onChange?: (value: [Date | undefined, Date | undefined]) => void;
}

const { px, ONE_PIXEL } = helpers;

/** 适用于筛选条件下的日期区间选择 */
const DatePeriodFilter: FC<DatePeriodFilterProps> = ({
  label,
  placeholders = ['请选择', '请选择'],
  display = 'Y-M-D',
  format = 'YYYY-MM-DD',
  value,
  onChange,
  ...restProps
}) => {
  const theme = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentTexts, setCurrentTexts] = useState(placeholders);
  const [visible, setVisible] = useState(false);

  const handleChange = useCallback(
    (date?: Date, formatDate?: string) => {
      const [firstDate, secondDate] = value ?? [undefined, undefined];
      setCurrentTexts(draft => {
        draft[currentIndex] = formatDate!;
        return draft;
      });
      if (currentIndex === 0) {
        onChange?.([date!, secondDate]);
      } else {
        onChange?.([firstDate, date!]);
      }
    },
    [currentIndex, onChange, setCurrentTexts, value]
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
      <Flex justifyContent="space-between" alignItems="center">
        <TouchableOpacity
          onPress={() => {
            Keyboard.dismiss();
            setCurrentIndex(0);
            setVisible(true);
          }}
          activeOpacity={0.8}
          style={{
            flex: 1,
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
              {currentTexts[0]}
            </Text>
          </Flex>
          <Icon name="right" size={px(16)} color={theme.colors.icon} />
        </TouchableOpacity>
        <Box width={px(12)} height={ONE_PIXEL} marginHorizontal="x4" backgroundColor="border" />
        <TouchableOpacity
          onPress={() => {
            Keyboard.dismiss();
            setCurrentIndex(1);
            setVisible(true);
          }}
          activeOpacity={0.8}
          style={{
            flex: 1,
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
              {currentTexts[1]}
            </Text>
          </Flex>
          <Icon name="right" size={px(16)} color={theme.colors.icon} />
        </TouchableOpacity>
      </Flex>
      <DatePicker
        {...restProps}
        {...{ visible, display, format, onChange: handleChange, onClose: handleClose }}
        value={value?.[currentIndex]}
      />
    </Box>
  );
};

export default DatePeriodFilter;
