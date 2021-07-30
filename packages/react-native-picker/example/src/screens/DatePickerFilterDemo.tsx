import React from 'react';
import { DatePickerFilter, DatePickerItem, DatePeriodFilter } from '@td-design/react-native-picker';
import Container from '../components/Container';
import { WingBlank } from '@td-design/react-native';

export function DatePickerFilterDemo() {
  return (
    <Container>
      <WingBlank size="x4">
        <DatePickerFilter label="运单时间" />
        <DatePickerItem />
        <DatePeriodFilter label="订单时间" mode="datetime" format="YYYY-MM-DD HH:mm" />
      </WingBlank>
    </Container>
  );
}
