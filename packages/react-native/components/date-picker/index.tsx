import React, { FC, useState } from 'react';
import { useTheme } from '@shopify/restyle';
import { Modal, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import DatePickerRN from './DatePicker';
import { Theme } from '../config/theme';
import { DatePickerProps, ModalPickerProps } from './type';
import Flex from '../flex';
import Text from '../text';
import { px } from '../helper';

const DatePicker: FC<DatePickerProps & ModalPickerProps> = (props) => {
  const theme = useTheme<Theme>();
  const insets = useSafeAreaInsets();
  const [date, setDate] = useState(props.value);

  const {
    title,
    displayType = 'modal',
    visible,
    onClose,
    mode = 'date',
    textColor = theme.colors.primaryTextColor,
    textSize = px(20),
    itemSpace = px(32),
    labelUnit = { year: '年', month: '月', day: '日' },
    display = 'Y-M-D',
    value,
    onChange,
    style,
    ...restProps
  } = props;

  const handleChange = (date?: Date) => {
    setDate(date);
    if (displayType === 'view' && props.onChange) {
      props.onChange(date);
    }
  };

  const handleClose = () => {
    setDate(value);
    if (onClose) {
      onClose();
    }
  };

  const handleOk = () => {
    if (props.onChange) {
      props.onChange(date);
    }
    if (onClose) {
      onClose();
    }
  };

  const DatePickerComp = (
    <DatePickerRN
      {...restProps}
      {...{ textColor, textSize, itemSpace, labelUnit, display, value: date, mode }}
      onChange={handleChange}
      style={[{ height: px(220) }, style]}
    />
  );

  if (displayType === 'modal') {
    return (
      <Modal animationType="slide" transparent statusBarTranslucent visible={visible}>
        <SafeAreaView
          style={{
            flex: 1,
            flexDirection: 'column-reverse',
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
          }}
          edges={['top']}
        >
          <View style={{ backgroundColor: 'white', paddingBottom: insets.bottom }}>
            <Flex
              height={px(50)}
              borderBottomWidth={StyleSheet.hairlineWidth}
              borderBottomColor="borderColor"
            >
              <Flex.Item alignItems="center">
                <TouchableOpacity onPress={handleClose}>
                  <Text variant="primaryTipReverse">取消</Text>
                </TouchableOpacity>
              </Flex.Item>
              <Flex.Item alignItems="center">
                <Text variant="primaryBody">{title}</Text>
              </Flex.Item>
              <Flex.Item alignItems="center">
                <TouchableOpacity onPress={handleOk}>
                  <Text variant="primaryTipReverse">确定</Text>
                </TouchableOpacity>
              </Flex.Item>
            </Flex>
            {DatePickerComp}
          </View>
        </SafeAreaView>
      </Modal>
    );
  }
  return DatePickerComp;
};

export default DatePicker;
