import React, { useEffect, useState } from 'react';
import { Keyboard, ScrollView } from 'react-native';
import Form, { useForm, Field } from 'rc-field-form';

import {
  Button,
  Input,
  WhiteSpace,
  Modal,
  Text,
} from '@td-design/react-native';
import Container from '../components/Container';
import { useAMapSearch } from 'react-native-amap-search';

export default () => {
  const [form] = useForm();
  const [visible, toggleVisible] = useState(false);

  const { aMapPOIKeywordsSearch, data } = useAMapSearch();

  const handleFinish = (values: any) => {
    console.log('handleFinish', values);
    values.page = Number(values.page);
    values.pageSize = Number(values.pageSize);
    values.special = values.special == 'true';
    aMapPOIKeywordsSearch(values);
  };
  useEffect(() => {
    form.setFieldsValue({
      keywords: '充电桩',
      cityLimit: 'false',
      city: '杭州',
      special: 'true',
      page: '1',
      pageSize: '20',
      types: '',
    });
  }, [form]);

  return (
    <Container>
      <Button title="显示弹窗" onPress={() => toggleVisible(true)} />
      <ScrollView style={{ flex: 1 }}>
        {data?.map((item) => {
          return <Text key={item.uid}>{item.name}</Text>;
        })}
      </ScrollView>
      <Modal visible={visible} onClose={() => toggleVisible(false)}>
        <ScrollView>
          <Form component={false} form={form} onFinish={handleFinish}>
            <Field name="keywords">
              <Input
                label="关键字"
                onBlur={() => Keyboard.dismiss()}
                returnKeyType="next"
              />
            </Field>
            <WhiteSpace size="x4" />

            <WhiteSpace size="x4" />
            <Field name="city">
              <Input
                label="指定城市"
                onBlur={() => Keyboard.dismiss()}
                returnKeyType="next"
              />
            </Field>

            <WhiteSpace size="x4" />
            <Field name="page">
              <Input
                label="页数"
                onBlur={() => Keyboard.dismiss()}
                returnKeyType="next"
              />
            </Field>
            <WhiteSpace size="x4" />
            <Field name="pageSize">
              <Input
                label="pageSize"
                onBlur={() => Keyboard.dismiss()}
                returnKeyType="next"
              />
            </Field>
            <WhiteSpace size="x4" />
          </Form>
          <WhiteSpace size="x4" />
          <Button title="确定" onPress={form.submit} />
        </ScrollView>
      </Modal>
    </Container>
  );
};
