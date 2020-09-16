import React, { useState } from 'react';
import { Picker, Text } from '@td-design/react-native';
import { Button } from 'react-native';
import { ItemValue } from '../picker/type';

export default function ModalPickerDemo() {
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState<ItemValue>();

  return (
    <>
      <Button title="显示" onPress={() => setVisible(true)} />
      <Text>{value}</Text>
      <Picker
        title="请选择数字"
        displayType="modal"
        visible={visible}
        onClose={() => setVisible(false)}
        data={[
          { label: '1111', value: 1 },
          { label: '2222', value: 2 },
          { label: '3333', value: 3 },
          { label: '4444', value: 4 },
        ]}
        value={value}
        onChange={setValue}
      />
    </>
  );
}
