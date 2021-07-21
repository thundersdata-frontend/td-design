import React from 'react';
import Container from '../components/Container';
import Form, { useForm, Field } from 'rc-field-form';
import { ScrollView } from 'react-native';
import { Store } from 'rc-field-form/es/interface';
import { ListItem, Input, NumberKeyboard, helpers } from '@td-design/react-native';

const { px } = helpers;
const { InputItem } = Input;
const { NumberKeyboardInput, NumberKeyboardFilter } = NumberKeyboard;

const loadTypeData = [
  { label: '小于等于4.5吨', value: 1 },
  { label: '大于4.5吨', value: 2 },
];

export default function FormDemo() {
  const [form] = useForm();

  const handleFinish = (values: Store) => {
    console.log(values);
  };

  return (
    <Container>
      <ScrollView>
        <Form component={false} form={form} onFinish={handleFinish}>
          <ListItem
            title="使用性质"
            extra={
              <Field name="useCharacter" rules={[{ required: true, message: '请输入使用性质' }]}>
                <InputItem border={false} placeholder="请输入使用性质" style={{ textAlign: 'right', height: px(32) }} />
              </Field>
            }
          />
          <ListItem
            title="核定载质量(吨)"
            extra={
              <Field name="vehicleLoad1" rules={[{ required: true, message: '请输入核定载质量' }]}>
                <NumberKeyboardInput type="number" placeholder="请输入核定载质量" style={{ height: px(32) }} />
              </Field>
            }
          />
          <Field name="useCharacter2" rules={[{ required: true, message: '请输入使用性质' }]}>
            <InputItem label="姓名" placeholder="请输入使用性质" />
          </Field>
          <Field name="useCharacter" rules={[{ required: true, message: '请输入使用性质' }]}>
            <Input label="使用性质" labelPosition="top" placeholder="请输入使用性质" />
          </Field>
          <Field name="vehicleLoad2" rules={[{ required: true, message: '请输入核定载质量' }]}>
            <NumberKeyboardFilter label="核定载质量" type="number" placeholder="请输入核定载质量" />
          </Field>
        </Form>
      </ScrollView>
    </Container>
  );
}
