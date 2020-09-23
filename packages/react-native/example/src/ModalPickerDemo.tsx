import React, { useState } from 'react';
import { Picker, Text } from '@td-design/react-native';
import { Button } from 'react-native';
import { ItemValue } from '../picker/type';

export default function ModalPickerDemo() {
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState<ItemValue[] | undefined>([1, 6, 10]);

  const cascadeData = [
    {
      label: '1111',
      value: 1,
      children: [
        {
          label: 'aaa',
          value: 5,
          children: [
            { label: 'ggg', value: 11 },
            { label: 'hhh', value: 12 },
          ],
        },
        {
          label: 'bbb',
          value: 6,
          children: [
            { label: 'eee', value: 9 },
            { label: 'fff', value: 10 },
          ],
        },
      ],
    },
    {
      label: '2222',
      value: 2,
      children: [
        {
          label: 'ccc',
          value: 7,
          children: [
            { label: '3333', value: 14 },
            { label: '4444', value: 15 },
          ],
        },
        {
          label: 'ddd',
          value: 8,
          children: [
            { label: '5555', value: 16 },
            { label: '6666', value: 17 },
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
    <>
      <Button title="显示" onPress={() => setVisible(true)} />
      <Text>{value}</Text>
      <Picker
        title="请选择数字"
        displayType="modal"
        visible={visible}
        cascade
        cols={3}
        onClose={() => setVisible(false)}
        // data={singleData}
        // data={multipleData}
        data={cascadeData}
        value={value}
        onChange={val => setValue(val)}
      />
    </>
  );
}
