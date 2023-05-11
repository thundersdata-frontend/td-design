import React from 'react';
import { forwardRef } from 'react';
import { StyleProp, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import Animated from 'react-native-reanimated';

import { helpers, SvgIcon, Text, Theme, useTheme } from '@td-design/react-native';

import Picker from '../picker';
import { ModalPickerProps, PickerProps } from '../picker/type';
import { PickerRef } from '../type';
import usePicker from '../usePicker';

interface PickerItemProps extends PickerProps, Omit<ModalPickerProps, 'visible' | 'displayType'> {
  placeholder?: string;
  /** 是否允许清除 */
  allowClear?: boolean;
  /** 是否禁用 */
  disabled?: boolean;
  /** 自定义样式 */
  style?: StyleProp<ViewStyle>;
}

const AnimatedTouchableIcon = Animated.createAnimatedComponent(TouchableOpacity);
const { px } = helpers;
const PickerItem = forwardRef<PickerRef, PickerItemProps>(
  (
    {
      placeholder = '请选择',
      disabled = false,
      cascade,
      value,
      data,
      onChange,
      style,
      allowClear = true,
      ...restProps
    },
    ref
  ) => {
    const theme = useTheme<Theme>();
    const { currentText, visible, setFalse, clearIconStyle, handlePress, handleChange, handleInputClear } = usePicker({
      data,
      cascade,
      value,
      onChange,
      placeholder,
      ref,
    });

    const styles = StyleSheet.create({
      content: {
        flexGrow: 1,
        height: px(40),
        justifyContent: 'flex-end',
        alignItems: 'center',
        flexDirection: 'row',
      },
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
          <Text
            variant="p1"
            color={disabled ? 'disabled' : 'gray300'}
            numberOfLines={1}
            textAlign={'right'}
            style={{ flex: 1 }}
          >
            {currentText}
          </Text>
          {!disabled && allowClear && (
            <AnimatedTouchableIcon activeOpacity={0.5} onPress={handleInputClear} style={[styles.icon, clearIconStyle]}>
              <SvgIcon name="closecircleo" color={theme.colors.icon} />
            </AnimatedTouchableIcon>
          )}
        </TouchableOpacity>
        <Picker {...restProps} {...{ cascade, value, data, visible, onChange: handleChange, onClose: setFalse }} />
      </>
    );
  }
);

export default PickerItem;
