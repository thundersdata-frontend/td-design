import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { Form, Input, Button, Icon, message } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import SMSInput from '../sms-input';
import { auth, validation } from '@td-design/utils';
import lscache from 'lscache';

const FormItem = Form.Item;

export interface SMSFormProps extends FormComponentProps {
  beforeSubmit?: () => Promise<boolean>; // 提交之前
  afterSubmit: () => void; //登录成功的回调函数
}

const SMSForm = forwardRef<FormComponentProps, SMSFormProps>(({ form, afterSubmit, beforeSubmit }, ref) => {
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
          const result = await auth.smsLogin(values);
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
        })(<Input placeholder="请输入手机号码" prefix={<Icon type="mobile" style={{ color: 'rgba(0,0,0,.25)' }} />} />)}
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
        <Button style={{ width: '100%' }} type="primary" htmlType="submit" loading={loading}>
          登录
        </Button>
      </FormItem>
    </Form>
  );
});

export default Form.create<SMSFormProps>()(SMSForm);
