import React from 'react';
import { Form, Input, Button, Icon } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import SMSInput from '../sms-input';
import { auth, validation } from '@td-design/utils';

const FormItem = Form.Item;

export interface SMSFormProps extends FormComponentProps {
  onSubmit: () => void; //登录成功的回调函数
}

const SMSForm: React.FC<SMSFormProps> = ({ form, onSubmit }) => {
  const { getFieldDecorator } = form;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    form.validateFields(async (err, values) => {
      if (!err) {
        const result = await auth.smsLogin(values);
        if (result.success) {
          onSubmit();
        }
      }
    });
  };
  return (
    <Form onSubmit={handleSubmit}>
      <FormItem>
        {getFieldDecorator('phone', {
          rules: [
            {
              required: true,
              message: '请输入手机号码',
            },
            {
              validator: validation.phoneValidator,
            },
          ],
        })(<Input placeholder="请输入手机号码"  prefix={<Icon type="mobile"  style={{ color: 'rgba(0,0,0,.25)' }} />}/>)}
      </FormItem>

      <FormItem>
        {getFieldDecorator('code', {
          rules: [
            {
              required: true,
              message: '请输入验证码',
            },
          ],
        })(<SMSInput phone={form.getFieldValue('phone')} type={auth.SMS_TYPE.login} />)}
      </FormItem>

      <FormItem>
        <Button style={{ width: '100%' }} type="primary" htmlType="submit">
          登录
        </Button>
      </FormItem>
    </Form>
  );
};

export default Form.create<SMSFormProps>()(SMSForm);
