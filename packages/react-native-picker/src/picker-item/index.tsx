import { useTheme } from '@shopify/restyle';
import { helpers, SvgIcon, Text, Theme } from '@td-design/react-native';
import React from 'react';
import { forwardRef } from 'react';
import { TouchableOpacity } from 'react-native';
import Animated from 'react-native-reanimated';

import Picker from '../picker';
import { ModalPickerProps, PickerProps } from '../picker/type';
import { PickerRef } from '../type';
import usePicker from '../usePicker';

interface PickerItemProps extends PickerProps, Omit<ModalPickerProps, 'visible' | 'displayType'> {
  placeholder?: string;
  /** 是否允许清除 */
  allowClear?: boolean;
  /** 是否为禁用状态 */
  disabled?: boolean;
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

    return (
      <>
        <TouchableOpacity
          onPress={() => {
            if (!disabled) {
              handlePress();
            }
          }}
          activeOpacity={disabled ? 1 : 0.5}
          style={[
            {
              flexGrow: 1,
              height: px(40),
              justifyContent: 'flex-end',
              alignItems: 'center',
              flexDirection: 'row',
            },
            style,
          ]}
        >
          <Text
            variant="p1"
            color={disabled ? 'disabled' : 'gray300'}
            numberOfLines={1}
            style={{ flex: 1, textAlign: 'right' }}
          >
            {currentText}
          </Text>
          {!disabled && allowClear && (
            <AnimatedTouchableIcon
              activeOpacity={0.5}
              onPress={handleInputClear}
              style={[{ width: 0, overflow: 'hidden', alignItems: 'flex-end' }, clearIconStyle]}
            >
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
