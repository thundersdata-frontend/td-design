import React, { useState } from 'react';
import { Keyboard } from 'react-native';
import Form, { useForm, Field } from 'rc-field-form';
import { Store } from 'rc-field-form/es/interface';
import { DatePickerFilter } from '@td-design/react-native-picker';
import { Box, Button, Input, WhiteSpace, Modal, helpers } from '@td-design/react-native';
import Container from '../components/Container';

const { px } = helpers;

export function DatePickerModalDemo() {
  const [form] = useForm();
  const [visible, toggleVisible] = useState(false);

  const handleFinish = (values: Store) => {
    console.log(values);
  };

  return (
    <Container>
      <Button title="显示弹窗" onPress={() => toggleVisible(true)} />

      <Modal visible={visible} onClose={() => toggleVisible(false)}>
        <Box height={px(325)} backgroundColor="white" padding="x3">
          <Form component={false} form={form} onFinish={handleFinish}>
            <Field name="value">
              <Input
                label="发货量"
                labelPosition="top"
                keyboardType="number-pad"
                onBlur={() => Keyboard.dismiss()}
                returnKeyType="next"
              />
            </Field>
            <WhiteSpace size="x4" />
            <Field name="date">
              <DatePickerFilter label="日期" />
            </Field>
          </Form>
          <WhiteSpace size="x4" />
          <Button title="确定" onPress={form.submit} />
        </Box>
      </Modal>
    </Container>
  );
}
