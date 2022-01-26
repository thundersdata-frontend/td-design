import React, { useState } from 'react';
import { ScrollView, Alert } from 'react-native';
import { NumberKeyboard, WhiteSpace, Button, Text } from '@td-design/react-native';
import Form, { useForm, Field } from 'rc-field-form';
import { Store } from 'rc-field-form/es/interface';

const { NumberKeyboardView, NumberKeyboardModal, NumberKeyboardInput, NumberKeyboardFilter } = NumberKeyboard;

export default () => {
  const [form] = useForm();
  const [visible, setVisible] = useState(false);

  const handleFinish = (values: Store) => {
    console.log(values);
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      {/* <WhiteSpace />
      <Text>数组键盘带小数点:</Text>
      <WhiteSpace />
      <NumberKeyboardView
        onPress={e => {
          Alert.alert(e);
        }}
        onDelete={() => {
          Alert.alert('delete');
        }}
        onSubmit={() => {
          Alert.alert('submit');
        }}
      /> */}
      {/* <WhiteSpace />
      <Text>身份证键盘:</Text>
      <WhiteSpace />
      <NumberKeyboardView
        type="IdCard"
        onPress={e => {
          Alert.alert(e);
        }}
        onDelete={() => {
          Alert.alert('delete');
        }}
        onSubmit={() => {
          Alert.alert('submit');
        }}
      /> */}
      {/* <WhiteSpace />
      <Text>数字键盘不带小数:</Text>
      <WhiteSpace />
      <NumberKeyboardView
        type="integer"
        onPress={e => {
          Alert.alert(e);
        }}
        onDelete={() => {
          Alert.alert('delete');
        }}
        onSubmit={() => {
          Alert.alert('submit');
        }}
      /> */}

      {/* <Button title="显示弹窗" onPress={() => setVisible(true)} />
      <NumberKeyboardModal
        visible={visible}
        onClose={() => setVisible(false)}
        type="IdCard"
        onSubmit={(value: string) => {
          Alert.alert(value);
        }}
      /> */}

      {/* <Form component={false} form={form} initialValues={{ quantity: '6543' }} onFinish={handleFinish}>
        <Field name="quantity">
          <NumberKeyboardInput type="number" digit={2} />
        </Field>
      </Form> */}

      <Form component={false} form={form} initialValues={{ quantity: '6543' }} onFinish={handleFinish}>
        <Field name="quantity">
          <NumberKeyboardFilter label="运单量" type="number" digit={2} />
        </Field>
      </Form>
    </ScrollView>
  );
};
