import React, { ReactText, useState } from 'react';
import { Checkable, WhiteSpace } from '@td-design/react-native';

export default function ListItemDemo() {
  const [value, setValue] = useState<ReactText[]>(['peer'])
  return (
    <>
      <WhiteSpace />
      <Checkable
        type="checkbox"
        multiple
        options={[{ label: 'Apple', value: 1 }, { label: 'Banana', value: 2 }, { label: 'Peer', value: 3 }]}
        disabledValue={[1, 2]}
        defaultValue={[1, 3]}
        onChange={value => {
          console.log(value);
        }}
      />
      <WhiteSpace />
      <Checkable
        type="checkbox"
        multiple
        options={['apple', 'banana', 'peer', 'apple1', 'banana2', 'peer3']}
        itemStyle={{ width: '100%' }}
        labelStyle={{ color: 'red' }}
        value={value}
        // disabledValue={['apple']}
        onChange={value => {
          console.log(value);
          setValue(value);
        }}
      />
      <WhiteSpace />
      <Checkable
        type="checkbox"
        multiple={false}
        options={[1, 2, 3]}
        defaultValue={[1, 3]}
        itemStyle={{ width: '50%' }}
        onChange={value => {
          console.log(value);
        }}
      />
      <WhiteSpace />
      <Checkable
        type="radio"
        options={[{ label: 'Apple', value: 1 }, { label: 'Banana', value: 2 }, { label: 'Peer', value: 3 }]}
        defaultValue={[1]}
        multiple={false}
        onChange={value => {
          console.log(value);
        }}
      />
      <WhiteSpace />
      <Checkable
        type="radio"
        multiple={false}
        options={['苹果', '香蕉', '梨']}
        onChange={value => {
          console.log(value);
        }}
      />
      <WhiteSpace />
      <Checkable
        type="radio"
        multiple
        options={[1, 2, 3]}
        onChange={value => {
          console.log(value);
        }}
      />
    </>
  );
}
