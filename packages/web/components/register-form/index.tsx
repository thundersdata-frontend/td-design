import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import SMSInput from '../sms-input';
import { auth,validation } from '@td-design/utils';


const FormItem = Form.Item; 
const {password_min,password_max}=auth.getParams();

export interface RegisterFormProps extends FormComponentProps {
  onSubmit: () => void; //登录成功的回调函数
}

const RegisterForm: React.FC<RegisterFormProps> = ({ form, onSubmit }) => {
  const { getFieldDecorator } = form;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    form.validateFields(async (err, values) => {
      if (!err) {
        const { password, confirmPassword } = values;
        if (password !== confirmPassword) {
          message.error('两次输出的密码不一致');
          return;
        }
        const result = await auth.smsRegister(values);
        if (result.success) {
          onSubmit();
        }
      }
    });
  };
  return (
    <Form onSubmit={handleSubmit} >
      <FormItem>
        {getFieldDecorator('mobile', {
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
        })(<Input placeholder={`请输入${password_min}-${password_max}位密码`} type="password" />)}
      </FormItem>

      <FormItem>
        {getFieldDecorator('confirmPassword', {
          rules: [
            {
              required: true,
              message: '请输入密码',
            },
            {
              min: 6,
              message: '秘密长度不能小于6',
            },
            {
              max: 20,
              message: '密码长度不能大于20',
            },
          ],
        })(<Input  placeholder="请再次输入6-20位密码" type="password" />)}
      </FormItem>

      <FormItem>
        {getFieldDecorator('verification_code', {
          rules: [
            {
              required: true,
              message: '请输入验证码',
            },
          ],
        })(
          <SMSInput
            phone={form.getFieldValue('mobile')}
            type={auth.SMS_TYPE.register}
          />,
        )}
      </FormItem>

      <FormItem>
        <Button style={{width:'100%'}}  type="primary" htmlType="submit">
          立即注册
        </Button>
      </FormItem>
    </Form>
  );
};

export default Form.create<RegisterFormProps>()(RegisterForm);
