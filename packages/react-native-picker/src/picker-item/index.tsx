import React, { FC, useCallback, useEffect, useState } from 'react';
import { Keyboard, StyleProp, TouchableOpacity, ViewStyle } from 'react-native';
import { Text, helpers, SvgIcon, Theme } from '@td-design/react-native';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';

import Picker from '../picker';
import { ModalPickerProps, PickerProps, ItemValue } from '../picker/type';
import { transformValueToLabel } from '../utils';
import { useTheme } from '@shopify/restyle';

interface PickerItemProps extends PickerProps, Omit<ModalPickerProps, 'visible'> {
  placeholder?: string;
  style?: StyleProp<ViewStyle>;
  /** 是否允许清除 */
  allowClear?: boolean;
}

const AnimatedTouchableIcon = Animated.createAnimatedComponent(TouchableOpacity);
const { px } = helpers;
const PickerItem: FC<PickerItemProps> = ({
  placeholder = '请选择',
  cascade,
  value,
  data,
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
      const label = transformValueToLabel(data, value, cascade);
      setCurrentText(label ?? placeholder);
    }
  }, [cascade, data, placeholder, value]);

  const handleChange = useCallback(
    (value?: ItemValue[]) => {
      const label = transformValueToLabel(data, value, cascade);
      setCurrentText(label ?? placeholder);
      onChange?.(value);
    },
    [cascade, data, onChange, placeholder]
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
        activeOpacity={0.5}
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
        <Text variant="p1" color="gray300">
          {currentText}
        </Text>
        {allowClear && (
          <AnimatedTouchableIcon
            activeOpacity={0.5}
            onPress={handleInputClear}
            style={[{ width: 0, overflow: 'hidden' }, clearIconStyle]}
          >
            <SvgIcon name="closecircleo" color={theme.colors.icon} />
          </AnimatedTouchableIcon>
        )}
      </TouchableOpacity>
      <Picker {...restProps} {...{ cascade, value, data, visible, onChange: handleChange, onClose: handleClose }} />
    </>
  );
};

export default PickerItem;
