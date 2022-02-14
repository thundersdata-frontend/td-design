import React from 'react';
import Container from '../components/Container';
import { Form, Button, WingBlank, WhiteSpace } from '@td-design/react-native';
import { ScrollView } from 'react-native';
import { PickerInput, PickerItem, DatePickerItem, DatePickerInput } from '@td-design/react-native-picker';

const loadTypeData = [
  { label: '小于等于4.5吨', value: 1 },
  { label: '大于4.5吨', value: 2 },
];

const { FormItem, FormListItem, useForm } = Form;
export function FormDemo() {
  const [form] = useForm();

  return (
    <Container>
      <ScrollView>
        <WingBlank>
          <Form form={form}>
            <FormListItem
              title="驾驶车辆总重量"
              arrow="horizontal"
              name="loadType"
              required
              rules={[{ required: true, message: '请选择' }]}
            >
              <PickerItem data={loadTypeData} />
            </FormListItem>
            {/* <WhiteSpace size="x4" />
            <FormItem type="all" name="loadType2" rules={[{ required: true, message: '请选择' }]}>
              <PickerInput required label="hahaha" data={loadTypeData} />
            </FormItem>
            <WhiteSpace size="x4" />
            <FormItem type="all" name="loadType3" rules={[{ required: true, message: '请选择' }]}>
              <PickerInput required label="标签在左侧" labelPosition="left" data={loadTypeData} />
            </FormItem>
            <WhiteSpace size="x4" />
            <FormListItem
              title="选择日期"
              arrow="horizontal"
              name="date1"
              required
              rules={[{ required: true, message: '请选择' }]}
            >
              <DatePickerItem />
            </FormListItem>
            <WhiteSpace size="x4" /> */}
            {/* <FormItem type="all" name="date2" rules={[{ required: true, message: '请选择' }]}>
              <DatePickerInput required label="aaaaaa" allowClear />
            </FormItem>
            <WhiteSpace size="x4" />
            <FormItem type="all" name="date3" rules={[{ required: true, message: '请选择' }]}>
              <DatePickerInput required label="标签在左侧" labelPosition="left" />
            </FormItem> */}
          </Form>
        </WingBlank>
      </ScrollView>
      <Button title="确定" onPress={form.submit} />
    </Container>
  );
}
