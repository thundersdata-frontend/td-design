import React, { ReactNode, forwardRef } from 'react';
import { useTheme } from '@shopify/restyle';
import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native';
import { Box, Text, helpers, Flex, SvgIcon } from '@td-design/react-native';
import Animated from 'react-native-reanimated';

import { ModalPickerProps, PickerProps } from '../picker/type';
import Picker from '../picker';
import usePicker from '../usePicker';
import { PickerRef } from '../type';
import { Label } from '../components/Label';
import { Brief } from '../components/Brief';

interface PickerFilterProps extends PickerProps, Omit<ModalPickerProps, 'visible'> {
  /** 标签文本 */
  label: ReactNode;
  /** 标签文本位置 */
  labelPosition?: 'top' | 'left';
  /** 是否必填 */
  required?: boolean;
  /** 默认提示语 */
  placeholder?: string;
  style?: StyleProp<ViewStyle>;
  /** 是否允许清除 */
  allowClear?: boolean;
  /** 额外内容 */
  brief?: ReactNode;
}

const AnimatedTouchableIcon = Animated.createAnimatedComponent(TouchableOpacity);
const { px, ONE_PIXEL } = helpers;
const PickerFilter = forwardRef<PickerRef, PickerFilterProps>(
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
      ...restProps
    },
    ref
  ) => {
    const theme = useTheme();
    const { state, currentText, visible, setFalse, clearIconStyle, handlePress, handleChange, handleInputClear } =
      usePicker({
        data,
        cascade,
        value,
        onChange,
        placeholder,
        ref,
      });

    const Content = (
      <TouchableOpacity
        onPress={handlePress}
        activeOpacity={0.5}
        style={[
          {
            flex: 1,
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
        <Picker
          {...restProps}
          {...{ cascade, value: state, data, visible, onChange: handleChange, onClose: setFalse }}
        />
      </>
    );
  }
);
export default PickerFilter;
