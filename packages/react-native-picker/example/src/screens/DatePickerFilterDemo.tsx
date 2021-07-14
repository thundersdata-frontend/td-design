import React from 'react';
import { DatePickerFilter, DatePickerItem, DatePeriodFilter } from '@td-design/react-native-picker';
import Container from '../components/Container';

export function DatePickerFilterDemo() {
  return (
    <Container>
      <DatePickerFilter label="运单时间" />
      <DatePickerItem />
      <DatePeriodFilter label="订单时间" />
    </Container>
  );
}
