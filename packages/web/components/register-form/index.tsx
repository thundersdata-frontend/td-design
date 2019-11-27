import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { Form, Input, Button, message, Icon } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import SMSInput from '../sms-input';
import { auth, validation } from '@td-design/utils';

const FormItem = Form.Item;
const { password_min, password_max } = auth.getParams();

export interface RegisterFormProps extends FormComponentProps {
  beforeSubmit?: () => Promise<boolean>; // 提交之前
  afterSubmit: () => void; //登录成功的回调函数
}

const RegisterForm = forwardRef<FormComponentProps, RegisterFormProps>(({ form, afterSubmit, beforeSubmit }, ref) => {
  useImperativeHandle(ref, () => ({ form }));

  const { getFieldDecorator } = form;
  const [loading, handleLoading] = useState(false);

  const handleBeforeSubmit = async () => {
    // 执行登录之前执行自定义方法
    let response = true;
    if (beforeSubmit) {
      response = await beforeSubmit();
    }
    return response;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    form.validateFields(async (err, values) => {
      try {
        if (!err && (await handleBeforeSubmit())) {
          handleLoading(true);
          const result = await auth.smsRegister(values);
          if (!result.success) throw new Error(`注册失败:${result.msg}`);
          afterSubmit();
        }
      } catch (error) {
        message.error(error.message);
      }
      handleLoading(false);
    });
  };
  return (
    <Form onSubmit={handleSubmit}>
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
        })(<Input placeholder="请输入手机号码" prefix={<Icon type="mobile" style={{ color: 'rgba(0,0,0,.25)' }} />} />)}
      </FormItem>

      <FormItem>
        {getFieldDecorator('password', {
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
        })(
          <Input
            placeholder={`请输入${password_min}-${password_max}位密码`}
            type="password"
            prefix={<Icon type="unlock" style={{ color: 'rgba(0,0,0,.25)' }} />}
          />,
        )}
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
            {
              validator: validation.compareToFirstPassword(form.getFieldValue('password')),
            },
          ],
        })(
          <Input
            placeholder="请再次输入6-20位密码"
            type="password"
            prefix={<Icon type="unlock" style={{ color: 'rgba(0,0,0,.25)' }} />}
          />,
        )}
      </FormItem>

      <FormItem>
        {getFieldDecorator('verification_code', {
          rules: [
            {
              required: true,
              message: '请输入验证码',
            },
          ],
        })(<SMSInput phone={form.getFieldValue('mobile')} type={auth.SMS_TYPE.register} />)}
      </FormItem>

      <FormItem>
        <Button style={{ width: '100%' }} type="primary" htmlType="submit" loading={loading}>
          立即注册
        </Button>
      </FormItem>
    </Form>
  );
});

export default Form.create<RegisterFormProps>()(RegisterForm);
