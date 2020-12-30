import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import { BackHandler, TouchableOpacity } from 'react-native';
import Dayjs from 'dayjs';
import DatePickerRN from './DatePicker';
import { DatePickerProps, ModalPickerProps } from './type';
import Flex from '../flex';
import Text from '../text';
import Modal from '../modal/Modal';
import { ONE_PIXEL, px } from '../helper';

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

  /** 绑定物理返回键监听事件，如果当前picker是打开的，返回键作用是关闭picker，否则返回上一个界面 */
  useEffect(() => {
    const backHandler = () => {
      if (visible) {
        onClose?.();
        return false;
      }
      return true;
    };

    BackHandler.addEventListener('hardwareBackPress', backHandler);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backHandler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useImperativeHandle(ref, () => {
    return {
      getValue: () => {
        return {
          date,
          formatDate: Dayjs(date).format(format),
        };
      },
    };
  });

  const handleChange = (date?: Date) => {
    setDate(date);
    if (displayType === 'view') {
      onChange?.(date);
    }
  };

  const handleClose = () => {
    setDate(value);
    onClose?.();
  };

  const handleOk = () => {
    onChange?.(date, Dayjs(date).format(format));
    onClose?.();
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
            <TouchableOpacity activeOpacity={0.8} onPress={handleClose}>
              <Text variant="primaryTipReverse">取消</Text>
            </TouchableOpacity>
          </Flex.Item>
          <Flex.Item alignItems="center">
            <Text variant="primaryBody">{title}</Text>
          </Flex.Item>
          <Flex.Item alignItems="center">
            <TouchableOpacity activeOpacity={0.8} onPress={handleOk}>
              <Text variant="primaryTipReverse">确定</Text>
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
