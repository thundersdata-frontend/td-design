import React, { forwardRef } from 'react';
import { StyleProp, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import Animated from 'react-native-reanimated';

import { helpers, SvgIcon, Text, Theme, useTheme } from '@td-design/react-native';

import { DatePickerPropsBase } from '../components/DatePicker/type';
import DatePicker from '../date-picker';
import { ModalPickerProps } from '../picker/type';
import { PickerRef } from '../type';
import useDatePicker from '../useDatePicker';

interface PickerItemProps extends DatePickerPropsBase, Omit<ModalPickerProps, 'visible' | 'displayType'> {
  placeholder?: string;
  /** 是否允许清除 */
  allowClear?: boolean;
  /** 是否禁用 */
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

const AnimatedTouchableIcon = Animated.createAnimatedComponent(TouchableOpacity);
const { px } = helpers;
const DatePickerItem = forwardRef<PickerRef, PickerItemProps>(
  (
    {
      placeholder = '请选择',
      format = 'YYYY-MM-DD',
      value,
      onChange,
      style,
      allowClear = true,
      disabled = false,
      ...restProps
    },
    ref
  ) => {
    const theme = useTheme<Theme>();
    const { date, currentText, visible, setFalse, clearIconStyle, handlePress, handleChange, handleInputClear } =
      useDatePicker({ value, format, onChange, placeholder, ref });

    const styles = StyleSheet.create({
      content: { height: px(40), justifyContent: 'flex-end', alignItems: 'center', flexDirection: 'row' },
      icon: { width: 0, overflow: 'hidden', alignItems: 'flex-end' },
    });

    return (
      <>
        <TouchableOpacity
          onPress={() => {
            if (!disabled) {
              handlePress();
            }
          }}
          activeOpacity={disabled ? 1 : 0.5}
          style={[styles.content, style]}
        >
          <Text variant="p1" color={disabled ? 'disabled' : 'gray300'}>
            {currentText}
          </Text>
          {!disabled && allowClear && (
            <AnimatedTouchableIcon activeOpacity={0.5} onPress={handleInputClear} style={[styles.icon, clearIconStyle]}>
              <SvgIcon name="closecircleo" color={theme.colors.icon} />
            </AnimatedTouchableIcon>
          )}
        </TouchableOpacity>
        <DatePicker {...restProps} {...{ value: date, visible, format, onChange: handleChange, onClose: setFalse }} />
      </>
    );
  }
);

export default DatePickerItem;
