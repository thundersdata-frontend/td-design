import React, { useEffect, useState } from 'react';
import { Keyboard, ScrollView } from 'react-native';
import Form, { useForm, Field } from 'rc-field-form';

import {
  Button,
  Input,
  WhiteSpace,
  Modal,
  Switch,
  Text,
} from '@td-design/react-native';
import Container from '../components/Container';
import { useAMapSearch } from 'react-native-amap-search';

export default () => {
  const [form] = useForm();
  const [visible, toggleVisible] = useState(false);

  const { aMapPOIAroundSearch, data } = useAMapSearch();

  const handleFinish = (values: any) => {
    values.latitude = Number(values.latitude);
    values.longitude = Number(values.longitude);
    values.radius = Number(values.radius);
    values.page = Number(values.page);
    values.pageSize = Number(values.pageSize);
    values.special = values.special == 'true';
    aMapPOIAroundSearch(values);
  };

  useEffect(() => {
    form.setFieldsValue({
      latitude: '39.990459',
      longitude: '116.481476',
      keywords: '充电桩',
      radius: '1500',
      city: '',
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
            <Field name="latitude">
              <Input
                label="纬度"
                onBlur={() => Keyboard.dismiss()}
                returnKeyType="next"
              />
            </Field>
            <WhiteSpace size="x4" />
            <Field name="longitude">
              <Input
                label="经度"
                onBlur={() => Keyboard.dismiss()}
                returnKeyType="next"
              />
            </Field>
            <WhiteSpace size="x4" />
            <Field name="keywords">
              <Input
                label="关键字"
                onBlur={() => Keyboard.dismiss()}
                returnKeyType="next"
              />
            </Field>
            <WhiteSpace size="x4" />
            <Field name="radius">
              <Input
                label="范围"
                onBlur={() => Keyboard.dismiss()}
                returnKeyType="next"
              />
            </Field>
            <WhiteSpace size="x4" />
            <Field name="city">
              <Input
                label="指定城市"
                onBlur={() => Keyboard.dismiss()}
                returnKeyType="next"
              />
            </Field>
            <WhiteSpace size="x4" />
            <Field name="special">
              <Switch />
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
