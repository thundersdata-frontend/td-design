import React from 'react';
import Container from '../components/Container';
import { ScrollView } from 'react-native';
import { Store } from 'rc-field-form/es/interface';
import { Box, Input, Form, CountDown, WingBlank, WhiteSpace } from '@td-design/react-native';
import { useSafeState } from '@td-design/rn-hooks';

const { InputItem } = Input;
const { FormItem, FormListItem, useForm } = Form;
export default () => {
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
                title="手机号"
                required
                name="useCharacter"
                rules={[{ required: true, message: '请输入手机号' }]}
              >
                <InputItem border={false} placeholder="请输入手机号" inputStyle={{ textAlign: 'right' }} />
              </FormListItem>
              <WhiteSpace size="x4" />
              <FormItem
                type={bordered ? 'all' : 'bottom'}
                name="sms"
                rules={[{ required: true, message: '请输入验证码' }]}
              >
                <CountDown
                  bordered={bordered}
                  codeType="border"
                  onSend={() => {
                    console.log('123');
                  }}
                />
              </FormItem>
            </Form>
          </WingBlank>
        </ScrollView>
      </Box>
    </Container>
  );
};
