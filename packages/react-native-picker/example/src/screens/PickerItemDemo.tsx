import React from 'react';
import { Box, Button } from '@td-design/react-native';
import Container from '../components/Container';
import Form, { Field, useForm } from 'rc-field-form';
import { PickerFilter, PickerItem } from '@td-design/react-native-picker';
import { Store } from 'rc-field-form/es/interface';

export function PickerItemDemo() {
  const [form] = useForm();

  const handleFinish = (values: Store) => {
    console.log(values);
  };

  return (
    <Container>
      <Box>
        <Form component={false} form={form} onFinish={handleFinish}>
          <Field name="test">
            <PickerItem
              data={[
                { label: 'aaa', value: 1 },
                { label: 'bbb', value: 2 },
              ]}
            />
          </Field>
          <Field name="test2">
            <PickerFilter
              label="test"
              data={[
                { label: 'aaa', value: 1 },
                { label: 'bbb', value: 2 },
              ]}
            />
          </Field>
        </Form>
        <Button title="确定" onPress={form.submit} />
      </Box>
    </Container>
  );
}
