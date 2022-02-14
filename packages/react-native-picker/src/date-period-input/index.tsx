import React, { FC } from 'react';
import { TouchableOpacity } from 'react-native';
import { Box, Text, Flex, helpers, SvgIcon } from '@td-design/react-native';
import Animated from 'react-native-reanimated';
import { useTheme } from '@shopify/restyle';
import { DatePickerProps, ModalPickerProps } from '../date-picker/type';
import DatePicker from '../date-picker';
import dayjs from 'dayjs';
import useDatePeriodInput from './useDatePeriodInput';

export interface DatePeriodInputProps
  extends Omit<DatePickerProps, 'value' | 'onChange' | 'minDate' | 'maxDate'>,
    Omit<ModalPickerProps, 'visible' | 'displayType'> {
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
const DatePeriodInput: FC<DatePeriodInputProps> = ({
  label,
  placeholders = ['请选择', '请选择'],
  format = 'YYYY-MM-DD',
  value,
  onChange,
  allowClear = true,
  ...restProps
}) => {
  const theme = useTheme();
  const {
    currentIndex,
    dates,
    visible,
    minDate,
    maxDate,
    clearIconStyle1,
    clearIconStyle2,
    setFalse,
    handleStartPress,
    handleEndPress,
    handleChange,
    handleInputClear1,
    handleInputClear2,
  } = useDatePeriodInput({ value, onChange, format });

  return (
    <Box>
      <Flex marginRight="x2" marginBottom="x1" alignItems="center">
        <Text variant="p1" color="gray500">
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
          onPress={handleStartPress}
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
            <SvgIcon name="date" color={theme.colors.icon} />
            <Text variant="p1" color="gray300" marginLeft="x2">
              {dates[0] ? dayjs(dates[0]).format(format) : placeholders[0]}
            </Text>
          </Flex>
          {allowClear && (
            <AnimatedTouchableIcon
              activeOpacity={0.5}
              onPress={handleInputClear1}
              style={[{ width: 0, overflow: 'hidden', alignItems: 'flex-end' }, clearIconStyle1]}
            >
              <SvgIcon name="closecircleo" color={theme.colors.icon} />
            </AnimatedTouchableIcon>
          )}
        </TouchableOpacity>
        <Box marginHorizontal="x2">
          <Text variant="p1" color="gray300">
            ~
          </Text>
        </Box>
        <TouchableOpacity
          onPress={handleEndPress}
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
            <SvgIcon name="date" color={theme.colors.icon} />
            <Text variant="p1" color="gray300" marginLeft="x2">
              {dates[1] ? dayjs(dates[1]).format(format) : placeholders[1]}
            </Text>
          </Flex>
          {allowClear && (
            <AnimatedTouchableIcon
              activeOpacity={0.5}
              onPress={handleInputClear2}
              style={[{ width: 0, overflow: 'hidden', alignItems: 'flex-end' }, clearIconStyle2]}
            >
              <SvgIcon name="closecircleo" color={theme.colors.icon} />
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
          onClose: setFalse,
          minDate,
          maxDate,
          value: dates[currentIndex],
        }}
      />
    </Box>
  );
};

export default DatePeriodInput;
