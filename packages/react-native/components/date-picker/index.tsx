import React, { FC, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import Dayjs from 'dayjs';
import DatePickerRN from './DatePicker';
import { DatePickerProps, ModalPickerProps } from './type';
import Flex from '../flex';
import Text from '../text';
import Modal from '../modal';
import { ONE_PIXEL, px } from '../helper';

const DatePicker: FC<DatePickerProps & ModalPickerProps> = props => {
  const {
    title,
    displayType = 'modal',
    visible,
    onClose,
    format = 'YYYY-MM-DD HH:mm',
    display = 'Y-M-D-H-T', // 年月日时分
    minYear = Dayjs().subtract(10, 'year').get('year'),
    maxYear = Dayjs().add(10, 'year').get('year'),
    labelUnit = { year: '年', month: '月', day: '日', hour: '时', minute: '分' },
    value = new Date(),
    onChange,
    style,
    ...restProps
  } = props;
  const [date, setDate] = useState<Date | undefined>(value);

  const handleChange = (date?: Date) => {
    setDate(date);
    if (displayType === 'view' && onChange) {
      onChange(date);
    }
  };

  const handleClose = () => {
    setDate(value);
    if (onClose) {
      onClose();
    }
  };

  const handleOk = () => {
    if (onChange) {
      onChange(date, Dayjs(date).format(format));
    }
    if (onClose) {
      onClose();
    }
  };

  const DatePickerComp = (
    <DatePickerRN
      {...restProps}
      {...{ display, labelUnit, value: date, minYear, maxYear }}
      onChange={handleChange}
      style={[{ height: px(220) }, style]}
    />
  );

  if (displayType === 'modal') {
    return (
      <Modal visible={visible} onClose={handleClose}>
        <Flex height={px(50)} borderBottomWidth={ONE_PIXEL} borderBottomColor="borderColor">
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
