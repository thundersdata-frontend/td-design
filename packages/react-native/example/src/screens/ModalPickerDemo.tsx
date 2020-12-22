import React, { useState } from 'react';
import { Picker, Text } from '@td-design/react-native';
import { Button } from 'react-native';
import { ItemValue } from '../../picker/type';
import Container from '../components/Container';

export default function ModalPickerDemo() {
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState<ItemValue[] | undefined>([]);

  const cascadeData = [
    {
      label: '1',
      value: 1,
      children: [
        {
          label: '5',
          value: 5,
          children: [
            { label: '11', value: 11 },
            { label: '12', value: 12 },
          ],
        },
        {
          label: '6',
          value: 6,
          children: [
            { label: '9', value: 9 },
            { label: '10', value: 10 },
          ],
        },
      ],
    },
    {
      label: '2',
      value: 2,
      children: [
        {
          label: '7',
          value: 7,
          children: [
            { label: '14', value: 14 },
            { label: '15', value: 15 },
          ],
        },
        {
          label: '8',
          value: 8,
          children: [
            { label: '16', value: 16 },
            { label: '17', value: 17 },
          ],
        },
      ],
    },
  ];

  const multipleData = [
    [
      { label: '1111', value: 1 },
      { label: '2222', value: 2 },
      { label: '3333', value: 3 },
      { label: '4444', value: 4 },
    ],
    [
      { label: 'aaaa', value: 'a' },
      { label: 'bbbb', value: 'b' },
    ],
  ];

  const singleData = [
    { label: '1111', value: 1 },
    { label: '2222', value: 2 },
    { label: '3333', value: 3 },
    { label: '4444', value: 4 },
  ];

  return (
    <Container>
      <Button title="显示" onPress={() => setVisible(true)} />
      <Text>{value}</Text>
      <Picker
        title="请选择数字"
        displayType="modal"
        visible={visible}
        onClose={() => setVisible(false)}
        // data={singleData}
        // data={multipleData}
        cascade
        data={cascadeData}
        value={value}
        onChange={setValue}
      />
    </Container>
  );
}
