import React, { useState } from 'react';
import { DatePickerInput, DatePickerItem, DatePeriodInput } from '@td-design/react-native-picker';
import Container from '../components/Container';
import { WingBlank, Text, WhiteSpace } from '@td-design/react-native';

export function DatePickerInputDemo() {
  const [date, setDate] = useState<[Date | undefined, Date | undefined]>([new Date(), new Date()]);
  return (
    <Container>
      <WingBlank size="x4">
        {/* <Text>value: {date?.toString()}</Text> */}
        {/* <DatePickerInput label="运单时间" />
        <WhiteSpace />
        <DatePickerInput label="运单时间" labelPosition="left" /> */}
        <DatePickerItem />
        {/* <DatePeriodInput label="订单时间" /> */}
      </WingBlank>
    </Container>
  );
}
