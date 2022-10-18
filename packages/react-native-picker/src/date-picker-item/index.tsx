import React, { forwardRef } from 'react';
import { TouchableOpacity } from 'react-native';
import { helpers, SvgIcon, Text, Theme } from '@td-design/react-native';
import Animated from 'react-native-reanimated';

import DatePicker from '../date-picker';
import { DatePickerProps } from '../date-picker/type';
import { ModalPickerProps } from '../picker/type';
import { useTheme } from '@shopify/restyle';
import useDatePicker from '../useDatePicker';
import { PickerRef } from '../type';

interface PickerItemProps extends DatePickerProps, Omit<ModalPickerProps, 'visible' | 'displayType'> {
  placeholder?: string;
  /** 是否允许清除 */
  allowClear?: boolean;
}

const AnimatedTouchableIcon = Animated.createAnimatedComponent(TouchableOpacity);
const { px } = helpers;
const DatePickerItem = forwardRef<PickerRef, PickerItemProps>(
  ({ placeholder = '请选择', format = 'YYYY-MM-DD', value, onChange, style, allowClear = true, ...restProps }, ref) => {
    const theme = useTheme<Theme>();
    const { date, currentText, visible, setFalse, clearIconStyle, handlePress, handleChange, handleInputClear } =
      useDatePicker({ value, format, onChange, placeholder, ref });

    return (
      <>
        <TouchableOpacity
          onPress={handlePress}
          activeOpacity={0.5}
          style={[{ height: px(40), justifyContent: 'flex-end', alignItems: 'center', flexDirection: 'row' }, style]}
        >
          <Text variant="p1" color="gray300">
            {currentText}
          </Text>
          {allowClear && (
            <AnimatedTouchableIcon
              activeOpacity={0.5}
              onPress={handleInputClear}
              style={[{ width: 0, overflow: 'hidden', alignItems: 'flex-end' }, clearIconStyle]}
            >
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
