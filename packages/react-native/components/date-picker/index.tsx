import React, { FC, useState } from 'react';
import { useTheme } from '@shopify/restyle';
import { StyleSheet, TouchableOpacity } from 'react-native';
import DatePickerRN from './DatePicker';
import { Theme } from '../config/theme';
import { DatePickerProps, ModalPickerProps } from './type';
import Flex from '../flex';
import Text from '../text';
import Modal from '../modal';
import { px } from '../helper';

const DatePicker: FC<DatePickerProps & ModalPickerProps> = props => {
  const theme = useTheme<Theme>();
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
      <Modal visible={visible} onClose={handleClose}>
        <Flex height={px(50)} borderBottomWidth={StyleSheet.hairlineWidth} borderBottomColor="borderColor">
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
      </Modal>
    );
  }
  return DatePickerComp;
};

export default DatePicker;
