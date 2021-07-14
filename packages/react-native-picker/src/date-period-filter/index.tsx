import React, { FC, useCallback, useState } from 'react';
import { Keyboard, TouchableOpacity } from 'react-native';
import { Box, Text, Flex, helpers, Icon } from '@td-design/react-native';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { useTheme } from '@shopify/restyle';
import { DatePickerProps, ModalPickerProps } from '../date-picker/type';
import DatePicker from '../date-picker';

interface DatePeriodFilterProps extends Omit<DatePickerProps, 'value' | 'onChange'>, Omit<ModalPickerProps, 'visible'> {
  /** 标签文本 */
  label: string;
  /** 默认提示语 */
  placeholders?: string[];
  value?: [Date | undefined, Date | undefined];
  onChange?: (value: [Date | undefined, Date | undefined]) => void;
  /** 是否允许清除 */
  allowClear?: boolean;
}

const AnimatedTouchableIcon = Animated.createAnimatedComponent(TouchableOpacity);
const { px, ONE_PIXEL } = helpers;

/** 适用于筛选条件下的日期区间选择 */
const DatePeriodFilter: FC<DatePeriodFilterProps> = ({
  label,
  placeholders = ['请选择', '请选择'],
  format = 'YYYY-MM-DD',
  value,
  onChange,
  allowClear = true,
  ...restProps
}) => {
  const theme = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentTexts, setCurrentTexts] = useState(placeholders);
  const [visible, setVisible] = useState(false);

  const handleChange = useCallback(
    (date?: Date, formatDate?: string) => {
      const [firstDate, secondDate] = value ?? [undefined, undefined];
      setCurrentTexts(draft => {
        draft[currentIndex] = formatDate!;
        return draft;
      });
      if (currentIndex === 0) {
        onChange?.([date!, secondDate]);
      } else {
        onChange?.([firstDate, date!]);
      }
    },
    [currentIndex, onChange, setCurrentTexts, value]
  );

  const handleClose = useCallback(() => {
    setVisible(false);
  }, []);

  const handleInputClear1 = () => {
    const [, secondDate] = value ?? [, undefined];

    setCurrentTexts(draft => [placeholders[0], draft[1]]);
    onChange?.([undefined, secondDate]);
  };

  const handleInputClear2 = () => {
    const [firstDate] = value ?? [undefined];

    setCurrentTexts(draft => [draft[0], placeholders[1]]);
    onChange?.([firstDate, undefined]);
  };

  const clearIconStyle1 = useAnimatedStyle(() => {
    return {
      width: currentTexts[0] && currentTexts[0] !== placeholders[0] ? withTiming(24) : withTiming(0),
    };
  });

  const clearIconStyle2 = useAnimatedStyle(() => {
    return {
      width: currentTexts[1] && currentTexts[1] !== placeholders[1] ? withTiming(24) : withTiming(0),
    };
  });

  return (
    <Box>
      <Flex marginRight="x2" marginBottom="x1" alignItems="center">
        <Text variant="p0" color="gray500">
          {label}
        </Text>
      </Flex>
      <Flex justifyContent="space-between" alignItems="center">
        <TouchableOpacity
          onPress={() => {
            Keyboard.dismiss();
            setCurrentIndex(0);
            setVisible(true);
          }}
          activeOpacity={0.8}
          style={{
            flex: 1,
            height: px(40),
            paddingHorizontal: theme.spacing.x1,
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
            borderWidth: ONE_PIXEL,
            borderColor: theme.colors.border,
            borderRadius: theme.borderRadii.x1,
          }}
        >
          <Flex flex={1}>
            <Icon type="fontisto" name="date" size={px(16)} color={theme.colors.icon} />
            <Text variant="p1" color="gray300" marginLeft="x2">
              {currentTexts[0]}
            </Text>
          </Flex>
          <Flex>
            {allowClear && (
              <AnimatedTouchableIcon
                activeOpacity={0.8}
                onPress={handleInputClear1}
                style={[{ width: 0, overflow: 'hidden' }, clearIconStyle1]}
              >
                <Icon name="closecircleo" color={theme.colors.icon} />
              </AnimatedTouchableIcon>
            )}
            <Icon name="right" size={px(16)} color={theme.colors.icon} />
          </Flex>
        </TouchableOpacity>

        <Box width={px(12)} height={ONE_PIXEL} marginHorizontal="x2" backgroundColor="border" />
        <TouchableOpacity
          onPress={() => {
            Keyboard.dismiss();
            setCurrentIndex(1);
            setVisible(true);
          }}
          activeOpacity={0.8}
          style={{
            flex: 1,
            height: px(40),
            paddingHorizontal: theme.spacing.x1,
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
            borderWidth: ONE_PIXEL,
            borderColor: theme.colors.border,
            borderRadius: theme.borderRadii.x1,
          }}
        >
          <Flex flex={1}>
            <Icon type="fontisto" name="date" size={px(16)} color={theme.colors.icon} />
            <Text variant="p1" color="gray300" marginLeft="x2">
              {currentTexts[1]}
            </Text>
          </Flex>
          <Flex>
            {allowClear && (
              <AnimatedTouchableIcon
                activeOpacity={0.8}
                onPress={handleInputClear2}
                style={[{ width: 0, overflow: 'hidden' }, clearIconStyle2]}
              >
                <Icon name="closecircleo" color={theme.colors.icon} />
              </AnimatedTouchableIcon>
            )}
            <Icon name="right" size={px(16)} color={theme.colors.icon} />
          </Flex>
        </TouchableOpacity>
      </Flex>
      <DatePicker
        {...restProps}
        {...{ visible, format, onChange: handleChange, onClose: handleClose }}
        value={value?.[currentIndex]}
      />
    </Box>
  );
};

export default DatePeriodFilter;
