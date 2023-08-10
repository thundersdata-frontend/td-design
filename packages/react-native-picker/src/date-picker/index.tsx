import React, { forwardRef, useImperativeHandle } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { Flex, helpers, Modal, Text } from '@td-design/react-native';
import dayjs from 'dayjs';

import DatePickerRN from '../components/DatePicker';
import { DatePickerPropsBase, ModalPickerProps } from '../components/DatePicker/type';
import useDatePicker from './useDatePicker';

const { px, ONE_PIXEL } = helpers;

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
    activeOpacity = 0.5,
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

  const styles = StyleSheet.create({
    cancel: { width: '100%', flex: 1, justifyContent: 'center', alignItems: 'flex-start' },
    submit: { width: '100%', flex: 1, justifyContent: 'center', alignItems: 'flex-end' },
  });

  const DatePickerComp = (
    <DatePickerRN
      {...restProps}
      {...{ mode, value: date, minDate, maxDate, labelUnit, format }}
      onChange={handleChange}
    />
  );

  if (displayType === 'modal') {
    return (
      <Modal visible={visible} onClose={handleClose} animationDuration={150}>
        <Flex
          height={px(50)}
          borderBottomWidth={ONE_PIXEL}
          borderBottomColor="border"
          backgroundColor="background"
          paddingHorizontal="x3"
        >
          <Flex.Item alignItems="flex-start">
            <TouchableOpacity activeOpacity={activeOpacity} onPress={handleClose} style={styles.cancel}>
              <Text variant="p0" color="primary200">
                {cancelText}
              </Text>
            </TouchableOpacity>
          </Flex.Item>
          <Flex.Item alignItems="center">
            <Text variant="p0" color="gray500">
              {title}
            </Text>
          </Flex.Item>
          <Flex.Item alignItems="flex-end">
            <TouchableOpacity activeOpacity={activeOpacity} onPress={handleOk} style={styles.submit}>
              <Text variant="p0" color="primary200">
                {okText}
              </Text>
            </TouchableOpacity>
          </Flex.Item>
        </Flex>
        {DatePickerComp}
      </Modal>
    );
  }
  return DatePickerComp;
});

export default DatePicker;
