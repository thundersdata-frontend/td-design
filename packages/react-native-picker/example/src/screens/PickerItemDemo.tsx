import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, ScrollView } from 'react-native';
import { helpers, ListItem, Input, Button } from '@td-design/react-native';
import { PickerInput, PickerItem } from '@td-design/react-native-picker';
import Form, { Field, useForm } from 'rc-field-form';

import Container from '../components/Container';
import { CascadePickerItemProps } from '../../picker/type';
import { WhiteSpace } from '@td-design/react-native';

const { px } = helpers;
const { InputItem } = Input;

const loadTypeData = [
  { label: '小于等于4.5吨', value: 1 },
  { label: '大于4.5吨', value: 2 },
];

function fetchCarrierList(): Promise<CascadePickerItemProps[]> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        { label: '公司', value: 2 },
        { label: '集团', value: 3 },
      ]);
    }, 2000);
  });
}

function fetchCertificate(): Promise<{ carrierCode: number; loadType: number; loadType2: number }> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        carrierCode: 2,
        loadType: 2,
        loadType2: 2,
      });
    }, 2000);
  });
}

/**
 * 驾驶证认证页面
 */
export function PickerItemDemo() {
  const [form] = useForm();
  const [carrierList, setCarrierList] = useState<CascadePickerItemProps[]>([]);

  // useEffect(() => {
  //   (async () => {
  //     const result = await fetchCarrierList();
  //     setCarrierList(result);
  //   })();
  // }, []);

  // useEffect(() => {
  //   (async () => {
  //     const result = await fetchCertificate();
  //     form.setFieldsValue({
  //       carrierCode: result.carrierCode ? [result.carrierCode + ''] : undefined,
  //       loadType: result.loadType ? [result.loadType + ''] : undefined,
  //       loadType2: result.loadType2 ? [result.loadType2 + ''] : undefined,
  //     });
  //   })();
  // }, []);

  return (
    <Container>
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
          <Form component={false} form={form}>
            {/* <ListItem
              title="承运商"
              arrow="horizontal"
              extra={
                <Field name="carrierCode">
                  <PickerItem data={carrierList} />
                </Field>
              }
            /> */}
            {/* <ListItem
              title="承运商"
              arrow="horizontal"
              extra={
                <Field name="carrierCode">
                  <PickerItem data={carrierList} disabled />
                </Field>
              }
            /> */}
            {/* <ListItem
              title="驾驶车辆总重量"
              arrow="horizontal"
              extra={
                <Field name="loadType">
                  <PickerItem data={loadTypeData} />
                </Field>
              }
            /> */}
            <PickerItem data={loadTypeData} />
            {/* <Field name="loadType2">
              <PickerInput label="hahaha" data={loadTypeData} />
            </Field>
            <WhiteSpace />
            <Field name="loadType3">
              <PickerInput label="hahaha" labelPosition="left" data={loadTypeData} />
            </Field> */}
          </Form>
        </ScrollView>
      </KeyboardAvoidingView>
      {/* <Button title="确认提交" type="primary" onPress={form.submit} /> */}
    </Container>
  );
}
