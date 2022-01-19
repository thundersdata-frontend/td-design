import React from 'react';
import Container from '../components/Container';
import { ScrollView } from 'react-native';
import { Store } from 'rc-field-form/es/interface';
import {
  Button,
  Box,
  Input,
  Form,
  CountDown,
  WingBlank,
  WhiteSpace,
  Radio,
  Checkbox,
  Stepper,
  Switch,
  NumberKeyboard,
} from '@td-design/react-native';
import { useSafeState } from '@td-design/rn-hooks';

const { InputItem, TextArea } = Input;
const { FormItem, FormListItem, useForm } = Form;
const { NumberKeyboardInput, NumberKeyboardFilter } = NumberKeyboard;
export default function FormDemo() {
  const [bordered] = useSafeState(true);
  const [form] = useForm();
  const handleFinish = (values: Store) => {
    console.log(values);
  };

  return (
    <Container>
      <Box flex={1}>
        <ScrollView>
          <WingBlank>
            <Form onFinish={handleFinish} form={form}>
              <FormListItem
                title="使用性质"
                required
                name="useCharacter"
                rules={[{ required: true, message: '请输入使用性质' }]}
              >
                <InputItem border={false} placeholder="请输入使用性质" inputStyle={{ textAlign: 'right' }} />
              </FormListItem>
              <FormListItem
                title="核定载质量(吨)"
                required
                name="vehicleLoad1"
                rules={[{ required: true, message: '请输入核定载质量' }]}
              >
                <InputItem border={false} placeholder="请输入核定载质量" inputStyle={{ textAlign: 'right' }} />
              </FormListItem>
              <FormItem name="useCharacter2" rules={[{ required: true, message: '请输入姓名' }]}>
                <InputItem required label="姓名" placeholder="请输入姓名" inputStyle={{ textAlign: 'right' }} />
              </FormItem>
              <FormItem name="vehicleLoad2" rules={[{ required: true, message: '请输入密码' }]}>
                <InputItem required label="密码" placeholder="请输入密码" inputStyle={{ textAlign: 'right' }} />
              </FormItem>
              <FormItem type="all" name="name" rules={[{ required: true, message: '请输入用户名' }]}>
                <Input required label="用户名" labelPosition="left" placeholder="请输入用户名" />
              </FormItem>
              <FormItem type="all" name="password" rules={[{ required: true, message: '请输入密码' }]}>
                <Input required label="密码" labelPosition="top" placeholder="请输入密码" />
              </FormItem>
              <FormItem type="all" name="name" rules={[{ required: true, message: '请输入用户名' }]}>
                <TextArea required label="用户名" placeholder="请输入用户名" />
              </FormItem>
              <WhiteSpace size="x4" />
              <FormItem
                type={bordered ? 'all' : 'bottom'}
                name="sms"
                rules={[{ required: true, message: '请输入验证码' }]}
              >
                <CountDown
                  bordered={bordered}
                  onSend={() => {
                    console.log('123');
                  }}
                />
              </FormItem>
              <FormListItem
                title="性别"
                required
                name="gender"
                minHeight={54}
                rules={[{ required: true, message: '请选择性别' }]}
              >
                <Radio
                  options={[
                    { label: '男', value: '1' },
                    { label: '女', value: '0' },
                  ]}
                />
              </FormListItem>
              <FormListItem
                title="性别"
                required
                name="gender"
                minHeight={54}
                rules={[{ required: true, message: '请选择性别' }]}
              >
                <Checkbox
                  showCheckAll={false}
                  options={[
                    { label: '男', value: '1' },
                    { label: '女', value: '0' },
                  ]}
                />
              </FormListItem>
              <FormListItem
                title="数量"
                required
                name="count"
                minHeight={48}
                rules={[{ required: true, message: '请选择数量' }]}
              >
                <Stepper />
              </FormListItem>
              <FormListItem
                title="数量"
                required
                name="count"
                minHeight={48}
                rules={[{ required: true, message: '请选择数量' }]}
              >
                <Switch />
              </FormListItem>
              <FormListItem
                title="数量"
                required
                name="count"
                minHeight={48}
                rules={[{ required: true, message: '请选择数量' }]}
              >
                <NumberKeyboardInput type="number" placeholder="请输入核定载质量" />
              </FormListItem>
              <FormItem type="all" name="count2" rules={[{ required: true, message: '请选择数量' }]}>
                <NumberKeyboardFilter label="核定载质量" type="number" placeholder="请输入核定载质量" />
              </FormItem>
            </Form>
          </WingBlank>
        </ScrollView>
        <Button title="提交" onPress={form.submit} />
      </Box>
    </Container>
  );
}
