import React from 'react';
import { Form, Input, Button, message, Icon } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import SMSInput from '../sms-input';
import { auth, validation } from '@td-design/utils';

const FormItem = Form.Item;
const { password_min, password_max } = auth.getParams();

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
        }else{
          message.error(`失败:${result.msg}`);
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
        })(<Input placeholder="请输入手机号码" prefix={<Icon type="mobile"  style={{ color: 'rgba(0,0,0,.25)' }} />}/>)}
      </FormItem>

      <FormItem>
        {getFieldDecorator(' verificationCode', {
          rules: [
            {
              required: true,
              message: '请输入验证码',
            },
          ],
        })(<SMSInput phone={form.getFieldValue('phone')} type={auth.SMS_TYPE.changePassword} />)}
      </FormItem>

      <FormItem>
        {getFieldDecorator('newPassword', {
          rules: [
            {
              required: true,
              message: '请输入密码',
            },
            {
              min: password_min,
              message: `密码长度不能小于${password_min}`,
            },
            {
              max: password_max,
              message: `密码长度不能大于${password_max}`,
            },
          ],
        })(<Input placeholder={`请输入${password_min}-${password_max}位密码`} type="password"  prefix={<Icon type="unlock"  style={{ color: 'rgba(0,0,0,.25)' }} />}/>)}
      </FormItem>

      <FormItem>
        {getFieldDecorator('confirmPassword', {
          rules: [
            {
              required: true,
              message: '请输入密码',
            },
            {
              min: password_min,
              message: `密码长度不能小于${password_min}`,
            },
            {
              max: password_max,
              message: `密码长度不能大于${password_max}`,
            },
          ],
        })(<Input placeholder={`请输入${password_min}-${password_max}位密码`} type="password"  prefix={<Icon type="unlock"  style={{ color: 'rgba(0,0,0,.25)' }} />}/>)}
      </FormItem>

      <FormItem>
        <Button style={{ width: '100%' }} type="primary" htmlType="submit">
          提交
        </Button>
      </FormItem>
    </Form>
  );
};

export default Form.create<ResetFormProps>()(ResetForm);
