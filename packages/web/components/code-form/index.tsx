import React from 'react';
import { Form, Input, Button } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import CheckCode from '../check-code';
import { auth, validation } from '@td-design/utils';

const FormItem = Form.Item;

export interface CodeFormProps extends FormComponentProps {
  onSubmit: () => void; //登录成功的回调函数
}

const CodeForm: React.FC<CodeFormProps> = ({ form, onSubmit }) => {
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
    <Form onSubmit={handleSubmit} className="code-form">
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
        })(<Input className="input" placeholder="请输入手机号码" />)}
      </FormItem>

      <FormItem>
        {getFieldDecorator('code', {
          rules: [
            {
              required: true,
              message: '请输入验证码',
            },
          ],
        })(<CheckCode phone={form.getFieldValue('phone')} type={auth.SMS_TYPE.login} />)}
      </FormItem>

      <FormItem>
        <Button className="button" type="primary" htmlType="submit">
          登录
        </Button>
      </FormItem>
    </Form>
  );
};

export default Form.create<CodeFormProps>()(CodeForm);
