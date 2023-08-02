import React, { forwardRef } from 'react';
import { StyleProp, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import Animated, { FadeInRight, FadeOutRight } from 'react-native-reanimated';

import { Box, SvgIcon, Text, Theme, useTheme } from '@td-design/react-native';

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
      activeOpacity = 0.6,
      ...restProps
    },
    ref
  ) => {
    const theme = useTheme<Theme>();
    const { date, currentText, visible, setFalse, handlePress, handleChange, handleInputClear } = useDatePicker({
      value,
      format,
      onChange,
      placeholder,
      ref,
    });

    const styles = StyleSheet.create({
      content: {
        paddingVertical: theme.spacing.x1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        flexDirection: 'row',
      },
      icon: { alignItems: 'flex-end' },
    });

    const renderContent = () => (
      <>
        <Text variant="p1" color={disabled ? 'disabled' : 'gray300'}>
          {currentText}
        </Text>
        {!disabled && allowClear && !!currentText && currentText !== placeholder && (
          <AnimatedTouchableIcon
            entering={FadeInRight}
            exiting={FadeOutRight}
            activeOpacity={1}
            onPress={handleInputClear}
            style={styles.icon}
          >
            <SvgIcon name="closecircleo" color={theme.colors.icon} />
          </AnimatedTouchableIcon>
        )}
      </>
    );

    if (!disabled)
      return (
        <>
          <TouchableOpacity onPress={handlePress} activeOpacity={activeOpacity} style={[styles.content, style]}>
            {renderContent()}
          </TouchableOpacity>
          <DatePicker {...restProps} {...{ value: date, visible, format, onChange: handleChange, onClose: setFalse }} />
        </>
      );
    return <Box style={[styles.content, style]}>{renderContent()}</Box>;
  }
);

export default DatePickerItem;
