import React, { FC, ReactNode } from 'react';
import { TouchableOpacity } from 'react-native';
import Animated from 'react-native-reanimated';

import { useTheme } from '@shopify/restyle';
import { Box, Flex, helpers, SvgIcon, Text } from '@td-design/react-native';
import dayjs from 'dayjs';

import { DatePickerPropsBase, ModalPickerProps } from '../components/DatePicker/type';
import DatePicker from '../date-picker';
import useDatePeriodInput from './useDatePeriodInput';

export interface DatePeriodInputProps
  extends Omit<DatePickerPropsBase, 'value' | 'onChange' | 'minDate' | 'maxDate'>,
    Omit<ModalPickerProps, 'visible' | 'displayType'> {
  /** 标签文本 */
  label?: ReactNode;
  /** 默认提示语 */
  placeholders?: string[];
  value?: [Date | undefined, Date | undefined];
  onChange?: (value: [Date | undefined, Date | undefined]) => void;
  /** 是否允许清除 */
  allowClear?: boolean;
  /** 是否禁用 */
  disabled?: boolean;
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
  disabled = false,
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
      {label && (
        <Flex marginRight="x2" marginBottom="x1" alignItems="center">
          {typeof label === 'string' ? (
            <Text variant="p1" color="gray500">
              {label}
            </Text>
          ) : (
            label
          )}
        </Flex>
      )}
      <Flex
        justifyContent="space-between"
        alignItems="center"
        borderWidth={ONE_PIXEL}
        borderColor="border"
        borderRadius="x1"
      >
        <TouchableOpacity
          onPress={() => {
            if (!disabled) {
              handleStartPress();
            }
          }}
          activeOpacity={disabled ? 1 : 0.5}
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
            <Text variant="p1" color={disabled ? 'disabled' : 'gray300'} marginLeft="x2">
              {dates[0] ? dayjs(dates[0]).format(format) : placeholders[0]}
            </Text>
          </Flex>
          {!disabled && allowClear && (
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
          onPress={() => {
            if (!disabled) {
              handleEndPress();
            }
          }}
          activeOpacity={disabled ? 1 : 0.5}
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
            <Text variant="p1" color={disabled ? 'disabled' : 'gray300'} marginLeft="x2">
              {dates[1] ? dayjs(dates[1]).format(format) : placeholders[1]}
            </Text>
          </Flex>
          {!disabled && allowClear && (
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
