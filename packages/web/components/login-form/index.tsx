import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { Form, Input, Button, Icon, message } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { auth, validation } from '@td-design/utils';
import lscache from 'lscache';

const FormItem = Form.Item;
const { password_min, password_max } = auth.getParams();

export interface LoginFormProps extends FormComponentProps {
  phone?: boolean; //true为手机号登录，false为用户名登录
  beforeSubmit?: () => Promise<boolean>; // 提交之前
  afterSubmit: () => void; //登录成功的回调函数
}

const LoginForm = forwardRef<FormComponentProps, LoginFormProps>(({ form, phone, afterSubmit, beforeSubmit }, ref) => {
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
          const result = phone
            ? await auth.passwordLoginWithPhone(values)
            : await auth.passwordLoginWithUsername(values);
          lscache.set('access_token', result.result.access_token);
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
          })(
            <Input placeholder="请输入手机号码" prefix={<Icon type="mobile" style={{ color: 'rgba(0,0,0,.25)' }} />} />,
          )}
        </FormItem>
      ) : (
        <FormItem>
          {getFieldDecorator('username', {
            rules: [
              {
                required: true,
                message: '请输入用户名',
              },
            ],
          })(<Input placeholder="请输入用户名" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} />)}
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
        <Button style={{ width: '100%' }} type="primary" htmlType="submit" loading={loading}>
          登录
        </Button>
      </FormItem>
    </Form>
  );
});

export default Form.create<LoginFormProps>()(LoginForm);
