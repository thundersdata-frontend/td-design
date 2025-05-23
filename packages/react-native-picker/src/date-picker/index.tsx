import React, { forwardRef } from 'react';
import { Modal, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { Box, Flex, helpers, Pressable, Text } from '@td-design/react-native';

import DatePickerRN from '../components/DatePicker';
import { DatePickerPropsBase, ModalPickerProps } from '../components/DatePicker/type';
import { DatePickerRef } from '../type';
import useDatePicker from './useDatePicker';

const { ONE_PIXEL } = helpers;

export type DatePickerProps = DatePickerPropsBase & ModalPickerProps;

const DatePicker = forwardRef<DatePickerRef, DatePickerProps>((props, ref) => {
  const {
    title,
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

  const { date, handleChange, handleOk, handleClose, visible } = useDatePicker({
    onChange,
    value,
    format,
    ref,
  });

  return (
    <Modal visible={visible} statusBarTranslucent animationType="none" transparent>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Box flex={1} justifyContent={'flex-end'} style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
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
          <DatePickerRN
            {...restProps}
            {...{ mode, value: date, minDate, maxDate, labelUnit, format }}
            onChange={handleChange}
          />
        </Box>
      </GestureHandlerRootView>
    </Modal>
  );
});

export default DatePicker;

const styles = StyleSheet.create({
  cancel: { justifyContent: 'center', alignItems: 'flex-start' },
  submit: { justifyContent: 'center', alignItems: 'flex-end' },
});
