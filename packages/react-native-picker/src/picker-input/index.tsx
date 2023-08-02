import React, { forwardRef, ReactNode } from 'react';
import { StyleProp, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import Animated, { FadeInRight, FadeOutRight } from 'react-native-reanimated';

import { Box, Flex, helpers, SvgIcon, Text, useTheme } from '@td-design/react-native';

import { Brief } from '../components/Brief';
import { Label } from '../components/Label';
import Picker from '../picker';
import { ModalPickerProps, PickerProps } from '../picker/type';
import { PickerRef } from '../type';
import usePicker from '../usePicker';

interface PickerInputProps extends PickerProps, Omit<ModalPickerProps, 'visible' | 'displayType'> {
  /** 标签文本 */
  label?: ReactNode;
  /** 标签文本位置 */
  labelPosition?: 'top' | 'left';
  /** 是否必填 */
  required?: boolean;
  /** 默认提示语 */
  placeholder?: string;
  /** 是否允许清除 */
  allowClear?: boolean;
  /** 是否禁用 */
  disabled?: boolean;
  /** 额外内容 */
  brief?: ReactNode;
  /** 自定义样式 */
  style?: StyleProp<ViewStyle>;
}

const AnimatedTouchableIcon = Animated.createAnimatedComponent(TouchableOpacity);
const { ONE_PIXEL } = helpers;
const PickerInput = forwardRef<PickerRef, PickerInputProps>(
  (
    {
      label,
      labelPosition = 'top',
      placeholder = '请选择',
      required = false,
      cascade,
      value,
      data,
      onChange,
      style,
      brief,
      allowClear = true,
      disabled = false,
      activeOpacity = 0.6,
      ...restProps
    },
    ref
  ) => {
    const theme = useTheme();
    const { state, currentText, visible, setFalse, handlePress, handleChange, handleInputClear } = usePicker({
      data,
      cascade,
      value,
      onChange,
      placeholder,
      ref,
    });

    const styles = StyleSheet.create({
      content: {
        paddingVertical: theme.spacing.x2,
        paddingHorizontal: theme.spacing.x1,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        borderWidth: ONE_PIXEL,
        borderColor: theme.colors.border,
        borderRadius: theme.borderRadii.x1,
      },
      top: {},
      left: { flex: 1 },
      icon: { alignItems: 'flex-end' },
    });

    const renderContent = () => {
      const Content = (
        <>
          <Box flex={1}>
            <Text variant="p1" color={disabled ? 'disabled' : 'gray300'} marginLeft="x2">
              {currentText}
            </Text>
          </Box>
          <Flex>
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
            <SvgIcon name="down" color={theme.colors.icon} />
          </Flex>
        </>
      );
      if (!disabled)
        return (
          <TouchableOpacity
            onPress={handlePress}
            activeOpacity={activeOpacity}
            style={[styles.content, style, labelPosition === 'top' ? styles.top : styles.left]}
          >
            {Content}
          </TouchableOpacity>
        );

      return <Box style={[styles.content, style, labelPosition === 'top' ? styles.top : styles.left]}>{Content}</Box>;
    };

    return (
      <>
        {labelPosition === 'top' ? (
          <Box>
            <Label {...{ label, required }} />
            {renderContent()}
            <Brief brief={brief} />
          </Box>
        ) : (
          <Box>
            <Flex>
              <Label {...{ label, required }} />
              {renderContent()}
            </Flex>
            <Brief brief={brief} />
          </Box>
        )}
        <Picker
          {...restProps}
          {...{ cascade, value: state, data, visible, onChange: handleChange, onClose: setFalse }}
        />
      </>
    );
  }
);
export default PickerInput;
