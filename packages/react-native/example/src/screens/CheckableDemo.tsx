import React, { ReactText, useState } from 'react';
import { Checkable, helpers, WhiteSpace } from '@td-design/react-native';
import { ScrollView } from 'react-native';

const { px } = helpers;

export default function CheckableDemo() {
  const [value, setValue] = useState<ReactText[]>(['peer']);

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <Checkable
        type="checkbox"
        options={[
          { label: 'Apple', value: 1 },
          { label: 'Banana', value: 2 },
          { label: 'Peer', value: 3 },
        ]}
      />
      <WhiteSpace />
      <Checkable
        type="radio"
        options={[
          { label: 'Apple', value: 1 },
          { label: 'Banana', value: 2 },
          { label: 'Peer', value: 3 },
        ]}
      />
      <WhiteSpace />

      <Checkable
        type="checkbox"
        options={[1, 2, 3]}
        defaultValue={[1, 3]}
      />
      <WhiteSpace />
      <Checkable
        type="radio"
        options={['苹果', '香蕉', '梨']}
      />

      <Checkable
        type="checkbox"
        options={[
          { label: 'Apple', value: 1 },
          { label: 'Banana', value: 2 },
          { label: 'Peer', value: 3 },
        ]}
        disabledValue={[1, 2]}
        defaultValue={[1, 3]}
        onChange={value => {
          console.log(value);
        }}
      />
      <WhiteSpace />
      <Checkable
        type="radio"
        options={[
          { label: 'Apple', value: 1 },
          { label: 'Banana', value: 2 },
          { label: 'Peer', value: 3 },
        ]}
        disabledValue={[1, 2]}
        defaultValue={[1]}
        onChange={value => {
          console.log(value);
        }}
      />
      <WhiteSpace />

      <Checkable
        type="checkbox"
        options={['apple', 'banana', 'peer', 'apple1', 'banana2', 'peer3']}
        containerStyle={{ borderWidth: px(1) }}
        itemStyle={{ width: '100%' }}
        labelStyle={{ color: 'red' }}
        value={value}
        onChange={value => {
          console.log(value);
          setValue(value);
        }}
      />
      <WhiteSpace />
      <Checkable
        type="radio"
        options={['apple', 'banana', 'peer', 'apple1', 'banana2', 'peer3']}
        containerStyle={{ borderWidth: px(1) }}
        itemStyle={{ width: '100%' }}
        labelStyle={{ color: 'red' }}
        value={value}
        onChange={value => {
          console.log(value);
          setValue(value);
        }}
      />

    </ScrollView>
  );
}
