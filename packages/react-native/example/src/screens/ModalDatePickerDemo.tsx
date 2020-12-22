import React, { useState, useRef } from 'react';
import { DatePicker, Text } from '@td-design/react-native';
import { Button } from 'react-native';
import Container from '../components/Container';

export default function ModalDatePickerDemo() {
  const [value, setValue] = useState<Date>();
  const [formattedValue, setFormattedValue] = useState<string>();
  const datePickerRef = useRef<{ getValue: () => { date: Date; formatDate: string } }>(null);

  return (
    <Container>
      <Button
        title="getValue"
        onPress={() => {
          if (datePickerRef.current) {
            const { date, formatDate } = datePickerRef.current.getValue();
            setValue(date);
            setFormattedValue(formatDate);
          }
        }}
      />
      <Text>{formattedValue}</Text>
      <DatePicker ref={datePickerRef} value={value} title="请选择日期" displayType="view" />
    </Container>
  );
}
