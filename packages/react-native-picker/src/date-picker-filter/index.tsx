import React, { FC } from 'react';
import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native';
import { Box, Text, Flex, helpers, SvgIcon } from '@td-design/react-native';
import Animated from 'react-native-reanimated';
import { useTheme } from '@shopify/restyle';
import { DatePickerProps } from '../date-picker/type';
import { ModalPickerProps } from '../picker/type';
import DatePicker from '../date-picker';
import useDatePicker from '../useDatePicker';

export interface DatePickerFilterProps extends DatePickerProps, Omit<ModalPickerProps, 'visible'> {
  /** 标签文本 */
  label: string;
  /** 默认提示语 */
  placeholder?: string;
  /** 自定义样式 */
  style?: StyleProp<ViewStyle>;
  /** 是否允许清除 */
  allowClear?: boolean;
}

const AnimatedTouchableIcon = Animated.createAnimatedComponent(TouchableOpacity);
const { px, ONE_PIXEL } = helpers;

/** 适用于筛选条件下的日期选择 */
const DatePickerFilter: FC<DatePickerFilterProps> = ({
  label,
  placeholder = '请选择',
  format = 'YYYY-MM-DD',
  value,
  onChange,
  style,
  allowClear = true,
  ...restProps
}) => {
  const theme = useTheme();
  const {
    date,
    currentText,
    visible,
    setFalse,
    clearIconStyle,
    handlePress,
    handleChange,
    handleInputClear,
  } = useDatePicker({ value, format, onChange, placeholder });

  return (
    <Box>
      <Flex marginRight="x2" marginBottom="x1" alignItems="center">
        <Text variant="p0" color="gray500">
          {label}
        </Text>
      </Flex>
      <TouchableOpacity
        onPress={handlePress}
        activeOpacity={0.5}
        style={[
          {
            height: px(40),
            paddingHorizontal: theme.spacing.x1,
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
            borderWidth: ONE_PIXEL,
            borderColor: theme.colors.border,
            borderRadius: theme.borderRadii.x1,
          },
          style,
        ]}
      >
        <Flex flex={1}>
          <SvgIcon name="date" color={theme.colors.icon} />
          <Text variant="p1" color="gray300" marginLeft="x2">
            {currentText}
          </Text>
        </Flex>
        <Flex>
          {allowClear && (
            <AnimatedTouchableIcon
              activeOpacity={0.5}
              onPress={handleInputClear}
              style={[{ width: 0, overflow: 'hidden', alignItems: 'flex-end' }, clearIconStyle]}
            >
              <SvgIcon name="closecircleo" color={theme.colors.icon} />
            </AnimatedTouchableIcon>
          )}
          <SvgIcon name="right" color={theme.colors.icon} />
        </Flex>
      </TouchableOpacity>
      <DatePicker {...restProps} {...{ value: date, visible, format, onChange: handleChange, onClose: setFalse }} />
    </Box>
  );
};
export default DatePickerFilter;
