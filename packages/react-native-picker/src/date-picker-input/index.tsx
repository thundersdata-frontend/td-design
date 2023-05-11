import React, { forwardRef, ReactNode } from 'react';
import { StyleProp, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import Animated from 'react-native-reanimated';

import { Box, Flex, helpers, SvgIcon, Text, useTheme } from '@td-design/react-native';

import { Brief } from '../components/Brief';
import { DatePickerPropsBase } from '../components/DatePicker/type';
import { Label } from '../components/Label';
import DatePicker from '../date-picker';
import { ModalPickerProps } from '../picker/type';
import { PickerRef } from '../type';
import useDatePicker from '../useDatePicker';

export interface DatePickerInputProps extends DatePickerPropsBase, Omit<ModalPickerProps, 'visible' | 'displayType'> {
  /** 标签文本 */
  label?: ReactNode;
  /** 标签文本位置 */
  labelPosition?: 'top' | 'left';
  /** 是否必填 */
  required?: boolean;
  /** 是否禁用 */
  disabled?: boolean;
  /** 默认提示语 */
  placeholder?: string;
  /** 是否允许清除 */
  allowClear?: boolean;
  /** 额外内容 */
  brief?: ReactNode;
  style?: StyleProp<ViewStyle>;
}

const AnimatedTouchableIcon = Animated.createAnimatedComponent(TouchableOpacity);
const { px, ONE_PIXEL } = helpers;

/** 适用于筛选条件下的日期选择 */
const DatePickerInput = forwardRef<PickerRef, DatePickerInputProps>(
  (
    {
      label,
      labelPosition = 'top',
      placeholder = '请选择',
      required = false,
      format = 'YYYY-MM-DD',
      value,
      onChange,
      style,
      brief,
      allowClear = true,
      disabled = false,
      ...restProps
    },
    ref
  ) => {
    const theme = useTheme();
    const { date, currentText, visible, setFalse, clearIconStyle, handlePress, handleChange, handleInputClear } =
      useDatePicker({ value, format, onChange, placeholder, ref });

    const styles = StyleSheet.create({
      content: {
        paddingHorizontal: theme.spacing.x1,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        borderWidth: ONE_PIXEL,
        borderColor: theme.colors.border,
        borderRadius: theme.borderRadii.x1,
      },
      top: { height: px(40) },
      bottom: { flex: 1, height: px(40) },
      icon: { width: 0, overflow: 'hidden', alignItems: 'flex-end' },
    });

    const Content = (
      <TouchableOpacity
        onPress={() => {
          if (!disabled) {
            handlePress();
          }
        }}
        activeOpacity={disabled ? 1 : 0.5}
        style={[styles.content, style, labelPosition === 'top' ? styles.top : styles.bottom]}
      >
        <Flex flex={1}>
          <SvgIcon name="date" color={theme.colors.icon} />
          <Text variant="p1" color={disabled ? 'disabled' : 'gray300'} marginLeft="x2">
            {currentText}
          </Text>
        </Flex>
        <Flex>
          {!disabled && allowClear && (
            <AnimatedTouchableIcon activeOpacity={0.5} onPress={handleInputClear} style={[styles.icon, clearIconStyle]}>
              <SvgIcon name="closecircleo" color={theme.colors.icon} />
            </AnimatedTouchableIcon>
          )}
          <SvgIcon name="right" color={theme.colors.icon} />
        </Flex>
      </TouchableOpacity>
    );

    return (
      <>
        {labelPosition === 'top' ? (
          <Box>
            <Label {...{ label, labelPosition, required }} />
            {Content}
            <Brief brief={brief} />
          </Box>
        ) : (
          <Box>
            <Flex>
              <Label {...{ label, labelPosition, required }} />
              {Content}
            </Flex>
            <Brief brief={brief} />
          </Box>
        )}
        <DatePicker {...restProps} {...{ value: date, visible, format, onChange: handleChange, onClose: setFalse }} />
      </>
    );
  }
);
export default DatePickerInput;
