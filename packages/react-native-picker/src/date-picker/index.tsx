import React, { forwardRef, useImperativeHandle } from 'react';
import { TouchableOpacity } from 'react-native';
import { Flex, Text, Modal, helpers } from '@td-design/react-native';
import dayjs from 'dayjs';

import DatePickerRN from './components/DatePicker';
import { DatePickerProps, ModalPickerProps } from './type';
import useDatePicker from './useDatePicker';

const { px, ONE_PIXEL } = helpers;

export type DatePickerRef = {
  getValue: () => { date?: Date; formatDate: string };
};
const DatePicker = forwardRef<DatePickerRef, DatePickerProps & ModalPickerProps>((props, ref) => {
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
    style,
    cancelText = '取消',
    okText = '确定',
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

  const DatePickerComp = (
    <DatePickerRN
      {...restProps}
      {...{ mode, value: date, minDate, maxDate, labelUnit, format }}
      onChange={handleChange}
      style={[{ height: px(220) }, style]}
    />
  );

  if (displayType === 'modal') {
    return (
      <Modal visible={visible} onClose={handleClose}>
        <Flex
          height={px(50)}
          borderBottomWidth={ONE_PIXEL}
          borderBottomColor="border"
          backgroundColor="background"
          paddingHorizontal="x3"
        >
          <Flex.Item alignItems="flex-start">
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={handleClose}
              style={{ width: '100%', flex: 1, justifyContent: 'center', alignItems: 'flex-start' }}
            >
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
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={handleOk}
              style={{ width: '100%', flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}
            >
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
