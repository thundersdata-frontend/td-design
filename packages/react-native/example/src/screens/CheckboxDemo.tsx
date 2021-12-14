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
      <CheckboxList
        options={[
          { label: 'Apple', value: 'Apple' },
          { label: 'Pear', value: 'Pear' },
          { label: 'Orange', value: 'Orange' },
          { label: 'Orange', value: 'Orange1' },
          { label: 'Orange', value: 'Orange2' },
          { label: 'Orange', value: 'Orange3' },
        ]}
        // disabledValue={['Apple']}
        defaultCheckedValue={['Pear']}
        value={value}
        onChange={handleChange}
        showCheckAll={true}
      />
    </Container>
  );
}
