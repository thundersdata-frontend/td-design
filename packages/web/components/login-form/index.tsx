import React from 'react';
import { Form, Input, Button } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { phoneValidator } from '../../../utils/src/validators';
import Auth from '../../../utils/src/auth';

const FormItem = Form.Item;

export interface LoginFormProps extends FormComponentProps {
  phone?: boolean; //true为手机号登录，false为用户名登录
  onSubmit: () => void; //登录成功的回调函数
}

const LoginForm: React.FC<LoginFormProps> = ({ form, phone, onSubmit }) => {
  const { getFieldDecorator } = form;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    form.validateFields(async (err, values) => {
      if (!err) {
        const result = phone ? await Auth.passwordLoginWithPhone(values) : await Auth.passwordLoginWithUsername(values);
        if (result.success) {
          onSubmit();
        }
      }
    });
  };
  return (
    <Form onSubmit={handleSubmit} className="login-form">
      {phone ? (
        <FormItem>
          {getFieldDecorator('phone', {
            rules: [
              {
                required: true,
                message: '请输入手机号码',
              },
              {
                validator: phoneValidator,
              },
            ],
          })(<Input className="phone" placeholder="请输入手机号码" />)}
        </FormItem>
      ) : (
        <FormItem>
          {getFieldDecorator('userName', {
            rules: [
              {
                required: true,
                message: '请输入用户名',
              },
            ],
          })(<Input className="userName" placeholder="请输入用户名" />)}
        </FormItem>
      )}

      <FormItem>
        {getFieldDecorator('password', {
          rules: [
            {
              required: true,
              message: '请输入密码',
            },
          ],
        })(<Input className="password" placeholder="请输入密码" type="password" />)}
      </FormItem>

      <FormItem>
        <Button className="button" type="primary" htmlType="submit">
          登录
        </Button>
      </FormItem>
    </Form>
  );
};

export default Form.create<LoginFormProps>()(LoginForm);
