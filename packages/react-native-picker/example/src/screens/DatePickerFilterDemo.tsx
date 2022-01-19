import React, { useState } from 'react';
import { DatePickerFilter, DatePickerItem, DatePeriodFilter } from '@td-design/react-native-picker';
import Container from '../components/Container';
import { WingBlank, Text } from '@td-design/react-native';

export function DatePickerFilterDemo() {
  const [date, setDate] = useState<[Date | undefined, Date | undefined]>([new Date(), new Date()]);
  return (
    <Container>
      <WingBlank size="x4">
        {/* <Text>value: {date?.toString()}</Text> */}
        <DatePickerFilter label="运单时间" />
        <DatePickerItem />
        <DatePeriodFilter label="订单时间" value={date} onChange={setDate} />
      </WingBlank>
    </Container>
  );
}
