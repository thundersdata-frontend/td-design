import React, { forwardRef, useImperativeHandle, useMemo } from 'react';
import { StyleSheet } from 'react-native';

import { Flex, helpers, Modal, Pressable, Text } from '@td-design/react-native';
import dayjs from 'dayjs';

import DatePickerRN from '../components/DatePicker';
import { DatePickerPropsBase, ModalPickerProps } from '../components/DatePicker/type';
import useDatePicker from './useDatePicker';

const { ONE_PIXEL } = helpers;

export type DatePickerRef = {
  getValue: () => { date?: Date; formatDate: string };
};
export type DatePickerProps = DatePickerPropsBase & ModalPickerProps;

const DatePicker = forwardRef<DatePickerRef, DatePickerProps>((props, ref) => {
  const {
    title,
    displayType = 'modal',
    visible = false,
    onClose,
    format = 'YYYY-MM-DD HH:mm',
    labelUnit = { year: '年', month: '月', day: '日', hour: '时', minute: '分' },
    mode = 'date',
    minDate,
    maxDate,
    value,
    onChange,
    cancelText = '取消',
    okText = '确定',
    activeOpacity = 0.6,
    ...restProps
  } = props;

  const { date, handleChange, handleOk, handleClose } = useDatePicker({
    onClose,
    onChange,
    value,
    displayType,
    visible,
    format,
  });

  useImperativeHandle(ref, () => {
    return {
      getValue: () => {
        return {
          date,
          formatDate: dayjs(date).format(format),
        };
      },
    };
  });

  const DatePickerComp = useMemo(() => {
    if (!visible) return null;

    return (
      <DatePickerRN
        {...restProps}
        {...{ mode, value: date, minDate, maxDate, labelUnit, format }}
        onChange={handleChange}
      />
    );
  }, [visible, date, mode, minDate, maxDate, labelUnit, format, restProps]);

  if (displayType === 'modal') {
    return (
      <Modal position="bottom" animationType="slide" visible={visible} onClose={handleClose}>
        <Flex
          borderBottomWidth={ONE_PIXEL}
          borderBottomColor="border"
          backgroundColor="white"
          paddingVertical="x3"
          paddingHorizontal="x3"
        >
          <Pressable activeOpacity={activeOpacity} onPress={handleClose} style={styles.cancel}>
            <Text variant="p0" color="primary200">
              {cancelText}
            </Text>
          </Pressable>
          <Flex.Item alignItems="center">
            <Text variant="p0" color="text">
              {title}
            </Text>
          </Flex.Item>
          <Pressable activeOpacity={activeOpacity} onPress={handleOk} style={styles.submit}>
            <Text variant="p0" color="primary200">
              {okText}
            </Text>
          </Pressable>
        </Flex>
        {DatePickerComp}
      </Modal>
    );
  }
  return DatePickerComp;
});

export default DatePicker;

const styles = StyleSheet.create({
  cancel: { justifyContent: 'center', alignItems: 'flex-start' },
  submit: { justifyContent: 'center', alignItems: 'flex-end' },
});
