import React, { FC, useCallback, useEffect, useState } from 'react';
import { Keyboard, StyleProp, TouchableOpacity, ViewStyle } from 'react-native';
import { Box, Text, Flex, helpers, Icon } from '@td-design/react-native';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { useTheme } from '@shopify/restyle';
import { DatePickerProps } from '../date-picker/type';
import { ModalPickerProps } from '../picker/type';
import DatePicker from '../date-picker';
import dayjs from 'dayjs';

interface DatePickerFilterProps extends DatePickerProps, Omit<ModalPickerProps, 'visible'> {
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

  const handleInputClear = () => {
    setCurrentText(placeholder);
    onChange?.(undefined);
  };

  const clearIconStyle = useAnimatedStyle(() => {
    return {
      width: !!currentText && currentText !== placeholder ? withTiming(24) : withTiming(0),
    };
  });

  return (
    <Box>
      <Flex marginRight="x2" marginBottom="x1" alignItems="center">
        <Text variant="p0" color="gray500">
          {label}
        </Text>
      </Flex>
      <TouchableOpacity
        onPress={() => {
          Keyboard.dismiss();
          setVisible(true);
        }}
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
          <Icon type="fontisto" name="date" size={px(16)} color={theme.colors.icon} />
          <Text variant="p1" color="gray300" marginLeft="x2">
            {currentText}
          </Text>
        </Flex>
        <Flex>
          {allowClear && (
            <AnimatedTouchableIcon
              activeOpacity={0.5}
              onPress={handleInputClear}
              style={[{ width: 0, overflow: 'hidden' }, clearIconStyle]}
            >
              <Icon name="closecircleo" color={theme.colors.icon} />
            </AnimatedTouchableIcon>
          )}
          <Icon name="right" size={px(16)} color={theme.colors.icon} />
        </Flex>
      </TouchableOpacity>
      <DatePicker {...restProps} {...{ value, visible, format, onChange: handleChange, onClose: handleClose }} />
    </Box>
  );
};
export default DatePickerFilter;
