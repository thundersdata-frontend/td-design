import React from 'react';
import { Form, Input, Button } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { auth, validation } from '@td-design/utils';

const FormItem = Form.Item;
const {password_min,password_max}=auth.getParams();

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
        const result = phone ? await auth.passwordLoginWithPhone(values) : await auth.passwordLoginWithUsername(values);
        if (result.success) {
          onSubmit();
        }
      }
    });
  };
  return (
    <Form onSubmit={handleSubmit} >
      {phone ? (
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
          })(<Input  placeholder="请输入手机号码" />)}
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
          })(<Input  placeholder="请输入用户名" />)}
        </FormItem>
      )}

      <FormItem>
        {getFieldDecorator('password', {
          rules: [
            {
              required: true,
              message: '请输入密码',
            },
            {
              min:password_min,
              message: `秘密长度不能小于${password_min}`,
            },
            {
              max: password_max,
              message: `密码长度不能大于${password_max}`,
            },
          ],
        })(<Input  placeholder={`请输入${password_min}-${password_max}位密码`} type="password" />)}
      </FormItem>

      <FormItem>
        <Button style={{width:'100%'}} type="primary" htmlType="submit">
          登录
        </Button>
      </FormItem>
    </Form>
  );
};

export default Form.create<LoginFormProps>()(LoginForm);
