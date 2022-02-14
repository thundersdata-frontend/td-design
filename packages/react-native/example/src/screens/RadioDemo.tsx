import React, { ReactText } from 'react';
import { Radio } from '@td-design/react-native';
import Container from '../components/Container';
import { useState } from 'react';

const { RadioList } = Radio;
export default function RadioDemo() {
  const [value, setValue] = useState<ReactText | undefined>();

  const handleChange = (value: ReactText) => {
    console.log(value);
    setValue(value);
  };
  return (
    <Container>
      <RadioList
        options={[
          { label: 'Apple', value: 'Apple' },
          { label: 'Pear', value: 'Pear' },
          { label: 'Orange', value: 'Orange' },
        ]}
        // disabledValue={['Apple']}
        // defaultCheckedValue={'Pear'}
        // value={value}
        // onChange={handleChange}
        // itemStyle={{ width: '25%' }}
      />
    </Container>
  );
}
