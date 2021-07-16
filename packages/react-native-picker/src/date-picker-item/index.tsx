import React, { FC, useCallback, useEffect, useState } from 'react';
import { Keyboard, StyleProp, TouchableOpacity, ViewStyle } from 'react-native';
import { helpers, Icon, Text, Theme } from '@td-design/react-native';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import dayjs from 'dayjs';

import DatePicker from '../date-picker';
import { DatePickerProps } from '../date-picker/type';
import { ModalPickerProps } from '../picker/type';
import { useTheme } from '@shopify/restyle';

interface PickerItemProps extends DatePickerProps, Omit<ModalPickerProps, 'visible'> {
  placeholder?: string;
  style?: StyleProp<ViewStyle>;
  /** 是否允许清除 */
  allowClear?: boolean;
}

const AnimatedTouchableIcon = Animated.createAnimatedComponent(TouchableOpacity);
const { px } = helpers;
const DatePickerItem: FC<PickerItemProps> = ({
  placeholder = '请选择',
  format = 'YYYY-MM-DD',
  value,
  onChange,
  style,
  allowClear = true,
  ...restProps
}) => {
  const theme = useTheme<Theme>();
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
    <>
      <TouchableOpacity
        onPress={() => {
          Keyboard.dismiss();
          setVisible(true);
        }}
        activeOpacity={0.8}
        style={[{ height: px(40), justifyContent: 'flex-end', alignItems: 'center', flexDirection: 'row' }, style]}
      >
        <Text variant="p1" color="gray300">
          {currentText}
        </Text>
        {allowClear && (
          <AnimatedTouchableIcon
            activeOpacity={0.8}
            onPress={handleInputClear}
            style={[{ width: 0, overflow: 'hidden' }, clearIconStyle]}
          >
            <Icon name="closecircleo" color={theme.colors.icon} />
          </AnimatedTouchableIcon>
        )}
      </TouchableOpacity>
      <DatePicker {...restProps} {...{ value, visible, format, onChange: handleChange, onClose: handleClose }} />
    </>
  );
};

export default DatePickerItem;
