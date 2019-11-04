import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { FormComponentProps } from 'antd/lib/form'; 
import SMSInput from '../sms-input';
import { auth ,validation} from '@td-design/utils';

const FormItem = Form.Item;

export interface ResetFormProps extends FormComponentProps {
  onSubmit: () => void; //登录成功的回调函数
}

const ResetForm: React.FC<ResetFormProps> = ({ form, onSubmit }) => {
  const { getFieldDecorator } = form;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    form.validateFields(async (err, values) => {
      if (!err) {
        const { newPassword, confirmPassword } = values;
        if (newPassword !== confirmPassword) {
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
    <Form onSubmit={handleSubmit} className="reset-form">
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
        {getFieldDecorator(' verificationCode', {
          rules: [
            {
              required: true,
              message: '请输入验证码',
            },
          ],
        })(
          <SMSInput
            phone={form.getFieldValue('phone')}
            type={auth.SMS_TYPE.changePassword} 
          />,
        )}
      </FormItem>

      <FormItem>
        {getFieldDecorator('newPassword', {
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
        })(<Input className="password" placeholder="请输入6-20位密码" type="password" />)}
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
        })(<Input className="password" placeholder="请再次输入6-20位密码" type="password" />)}
      </FormItem>

      <FormItem>
        <Button className="button" type="primary" htmlType="submit">
          提交
        </Button>
      </FormItem>
    </Form>
  );
};

export default Form.create<ResetFormProps>()(ResetForm);
