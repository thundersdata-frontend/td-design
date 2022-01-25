import React, { ReactText } from 'react';
import { Checkbox } from '@td-design/react-native';
import Container from '../components/Container';
import { useState } from 'react';

const { CheckboxList } = Checkbox;
export default function CheckboxDemo() {
  const [value, setValue] = useState<ReactText[] | undefined>();

  const handleChange = (value: ReactText[]) => {
    setValue(value);
  };
  return (
    <Container>
      <Checkbox
        options={[
          { label: 'Apple', value: 'Apple' },
          { label: 'Pear', value: 'Pear' },
          { label: 'Orange', value: 'Orange' },
        ]}
        disabledValue={['Apple']}
      />

      {/* <CheckboxList
        options={[
          { label: 'Apple', value: 'Apple' },
          { label: 'Pear', value: 'Pear' },
          { label: 'Orange', value: 'Orange' },
        ]}
        // disabledValue={['Apple']}
        defaultCheckedValue={['Pear']}
        value={value}
        onChange={handleChange}
        showCheckAll={true}
      /> */}
    </Container>
  );
}
