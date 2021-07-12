import React, { useState } from 'react';
import { DatePicker } from '@td-design/react-native-picker';
import { Button, Text, WhiteSpace } from '@td-design/react-native';
import Container from '../components/Container';

export function DatePickerDemo() {
  const [visible, toggleVisible] = useState(false);
  const [date, setDate] = useState<Date>();

  return (
    <Container>
      <Button title="显示弹窗" onPress={() => toggleVisible(true)} />
      <WhiteSpace size="x4" />
      <Text>{`${date?.getFullYear()}, ${date ? date.getMonth() + 1 : 0}, ${date?.getDate()}`}</Text>
      <WhiteSpace size="x4" />
      <DatePicker
        visible={visible}
        onClose={() => toggleVisible(false)}
        value={date}
        onChange={setDate}
        minDate="2020-06-20"
        maxDate="2022-11-21"
      />
    </Container>
  );
}
