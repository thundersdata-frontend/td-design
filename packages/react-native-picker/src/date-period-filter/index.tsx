import React, { FC, useCallback, useEffect, useState } from 'react';
import { Keyboard, TouchableOpacity } from 'react-native';
import { Box, Text, Flex, helpers, Icon } from '@td-design/react-native';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { useTheme } from '@shopify/restyle';
import { DatePickerProps, ModalPickerProps } from '../date-picker/type';
import DatePicker from '../date-picker';
import dayjs from 'dayjs';

interface DatePeriodFilterProps
  extends Omit<DatePickerProps, 'value' | 'onChange' | 'minDate' | 'maxDate'>,
    Omit<ModalPickerProps, 'visible'> {
  /** 标签文本 */
  label: string;
  /** 默认提示语 */
  placeholders?: string[];
  value?: [Date | undefined, Date | undefined];
  onChange?: (value: [Date | undefined, Date | undefined]) => void;
  /** 是否允许清除 */
  allowClear?: boolean;
}

const AnimatedTouchableIcon = Animated.createAnimatedComponent(TouchableOpacity);
const { px, ONE_PIXEL } = helpers;

/** 适用于筛选条件下的日期区间选择 */
const DatePeriodFilter: FC<DatePeriodFilterProps> = ({
  label,
  placeholders = ['请选择', '请选择'],
  format = 'YYYY-MM-DD',
  value,
  onChange,
  allowClear = true,
  ...restProps
}) => {
  const theme = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dates, setDates] = useState<[Date | undefined, Date | undefined]>([undefined, undefined]);
  const [visible, setVisible] = useState(false);
  const [minDate, setMinDate] = useState<string | undefined>(undefined); // 对第二个日期输入框来说，它的最小值就是第一个日期输入框的值
  const [maxDate, setMaxDate] = useState<string | undefined>(undefined); // 对第一个日期输入框来说，它的最大值就是第二个日期输入框的值

  useEffect(() => {
    if (value) {
      setDates(value);
    }
  }, [value]);

  const handleChange = useCallback(
    (date?: Date) => {
      const [firstDate, secondDate] = dates;
      setDates(draft => {
        draft[currentIndex] = date;
        return draft;
      });
      if (currentIndex === 0) {
        onChange?.([date!, secondDate]);
      } else {
        onChange?.([firstDate, date!]);
      }
    },
    [currentIndex, onChange, dates]
  );

  const handleClose = useCallback(() => {
    setVisible(false);
  }, []);

  const handleInputClear1 = () => {
    const [, secondDate] = value ?? [, undefined];

    setDates(draft => [undefined, draft[1]]);
    onChange?.([undefined, secondDate]);
  };

  const handleInputClear2 = () => {
    const [firstDate] = value ?? [undefined];

    setDates(draft => [draft[0], undefined]);
    onChange?.([firstDate, undefined]);
  };

  const clearIconStyle1 = useAnimatedStyle(() => {
    return {
      width: dates[0] ? withTiming(24) : withTiming(0),
    };
  }, [dates[0]]);

  const clearIconStyle2 = useAnimatedStyle(() => {
    return {
      width: dates[1] ? withTiming(24) : withTiming(0),
    };
  }, [dates[1]]);

  return (
    <Box>
      <Flex marginRight="x2" marginBottom="x1" alignItems="center">
        <Text variant="p0" color="gray500">
          {label}
        </Text>
      </Flex>
      <Flex
        justifyContent="space-between"
        alignItems="center"
        borderWidth={ONE_PIXEL}
        borderColor="border"
        borderRadius="x1"
      >
        <TouchableOpacity
          onPress={() => {
            Keyboard.dismiss();
            setCurrentIndex(0);
            if (dates[1]) {
              setMinDate(undefined);
              setMaxDate(dayjs(dates[1]).format(format));
            }
            setVisible(true);
          }}
          activeOpacity={0.5}
          style={{
            flex: 1,
            height: px(40),
            paddingHorizontal: theme.spacing.x1,
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
          }}
        >
          <Flex>
            <Icon type="fontisto" name="date" size={px(16)} color={theme.colors.icon} />
            <Text variant="p1" color="gray300" marginLeft="x2">
              {dates[0] ? dayjs(dates[0]).format(format) : placeholders[0]}
            </Text>
          </Flex>
          {allowClear && (
            <AnimatedTouchableIcon
              activeOpacity={0.5}
              onPress={handleInputClear1}
              style={[{ width: 0, overflow: 'hidden' }, clearIconStyle1]}
            >
              <Icon name="closecircleo" size={px(16)} color={theme.colors.icon} />
            </AnimatedTouchableIcon>
          )}
        </TouchableOpacity>
        <Box marginHorizontal="x2">
          <Text variant="p1" color="gray300">
            ~
          </Text>
        </Box>
        <TouchableOpacity
          onPress={() => {
            Keyboard.dismiss();
            setCurrentIndex(1);
            if (dates[0]) {
              setMinDate(dayjs(dates[0]).format(format));
              setMaxDate(undefined);
            }
            setVisible(true);
          }}
          activeOpacity={0.5}
          style={{
            flex: 1,
            height: px(40),
            paddingHorizontal: theme.spacing.x1,
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
          }}
        >
          <Flex>
            <Icon type="fontisto" name="date" size={px(16)} color={theme.colors.icon} />
            <Text variant="p1" color="gray300" marginLeft="x2">
              {dates[1] ? dayjs(dates[1]).format(format) : placeholders[1]}
            </Text>
          </Flex>
          {allowClear && (
            <AnimatedTouchableIcon
              activeOpacity={0.5}
              onPress={handleInputClear2}
              style={[{ width: 0, overflow: 'hidden' }, clearIconStyle2]}
            >
              <Icon name="closecircleo" size={px(16)} color={theme.colors.icon} />
            </AnimatedTouchableIcon>
          )}
        </TouchableOpacity>
      </Flex>
      <DatePicker
        {...restProps}
        {...{
          visible,
          format,
          onChange: handleChange,
          onClose: handleClose,
          minDate,
          maxDate,
          value: dates[currentIndex],
        }}
      />
    </Box>
  );
};

export default DatePeriodFilter;
