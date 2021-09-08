import React, { FC } from 'react';
import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native';
import { helpers, SvgIcon, Text, Theme } from '@td-design/react-native';
import Animated from 'react-native-reanimated';

import DatePicker from '../date-picker';
import { DatePickerProps } from '../date-picker/type';
import { ModalPickerProps } from '../picker/type';
import { useTheme } from '@shopify/restyle';
import useDatePicker from '../useDatePicker';

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
};

export default DatePickerItem;
