import React, { forwardRef, ReactNode } from 'react';
import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native';
import { Box, Text, Flex, helpers, SvgIcon } from '@td-design/react-native';
import Animated from 'react-native-reanimated';
import { useTheme } from '@shopify/restyle';
import { DatePickerProps } from '../date-picker/type';
import { ModalPickerProps } from '../picker/type';
import DatePicker from '../date-picker';
import useDatePicker from '../useDatePicker';
import { PickerRef } from '../type';
import { Label } from '../components/Label';
import { Brief } from '../components/Brief';

export interface DatePickerFilterProps extends DatePickerProps, Omit<ModalPickerProps, 'visible'> {
  /** 标签文本 */
  label: ReactNode;
  /** 标签文本位置 */
  labelPosition?: 'top' | 'left';
  /** 是否必填 */
  required?: boolean;
  /** 默认提示语 */
  placeholder?: string;
  /** 自定义样式 */
  style?: StyleProp<ViewStyle>;
  /** 是否允许清除 */
  allowClear?: boolean;
  /** 额外内容 */
  brief?: ReactNode;
}

const AnimatedTouchableIcon = Animated.createAnimatedComponent(TouchableOpacity);
const { px, ONE_PIXEL } = helpers;

/** 适用于筛选条件下的日期选择 */
const DatePickerFilter = forwardRef<PickerRef, DatePickerFilterProps>(
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
      ...restProps
    },
    ref
  ) => {
    const theme = useTheme();
    const { date, currentText, visible, setFalse, clearIconStyle, handlePress, handleChange, handleInputClear } =
      useDatePicker({ value, format, onChange, placeholder, ref });

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
        <Flex flex={1}>
          <SvgIcon name="date" color={theme.colors.icon} />
          <Text variant="p1" color="gray300" marginLeft="x2">
            {currentText}
          </Text>
        </Flex>
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
export default DatePickerFilter;
