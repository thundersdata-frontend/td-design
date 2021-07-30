import React, { FC, useCallback, useEffect, useState } from 'react';
import { useTheme } from '@shopify/restyle';
import { Keyboard, StyleProp, TouchableOpacity, ViewStyle } from 'react-native';
import { Box, Text, helpers, Flex, SvgIcon } from '@td-design/react-native';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';

import { ModalPickerProps, PickerProps, ItemValue } from '../picker/type';
import { transformValueToLabel } from '../utils';
import Picker from '../picker';

interface PickerFilterProps extends PickerProps, Omit<ModalPickerProps, 'visible'> {
  label: string;
  placeholder?: string;
  style?: StyleProp<ViewStyle>;
  /** 是否允许清除 */
  allowClear?: boolean;
}

const AnimatedTouchableIcon = Animated.createAnimatedComponent(TouchableOpacity);
const { px, ONE_PIXEL } = helpers;
const PickerFilter: FC<PickerFilterProps> = ({
  label,
  placeholder = '请选择',
  cascade,
  value,
  data,
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
        <Box flex={1}>
          <Text variant="p1" color="gray300" marginLeft="x2">
            {currentText}
          </Text>
        </Box>
        <Flex>
          {allowClear && (
            <AnimatedTouchableIcon
              activeOpacity={0.5}
              onPress={handleInputClear}
              style={[{ width: 0, overflow: 'hidden', alignItems: 'flex-end' }, clearIconStyle]}
            >
              <SvgIcon name="closecircleo" color={theme.colors.icon} />
            </AnimatedTouchableIcon>
          )}
          <SvgIcon name="down" color={theme.colors.icon} />
        </Flex>
      </TouchableOpacity>
      <Picker {...restProps} {...{ cascade, value, data, visible, onChange: handleChange, onClose: handleClose }} />
    </Box>
  );
};
export default PickerFilter;
