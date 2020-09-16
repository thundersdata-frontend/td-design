import React, { useState } from 'react';
import { DatePicker, Text } from '@td-design/react-native';
import { Button } from 'react-native';

export default function ModalDatePickerDemo() {
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState<Date>();

  return (
    <>
      <Button title="显示" onPress={() => setVisible(true)} />
      <Text>{value?.getTime()}</Text>
      <DatePicker
        title="请选择数字"
        displayType="modal"
        visible={visible}
        onClose={() => setVisible(false)}
        value={value}
        onChange={setValue}
      />
    </>
  );
}
