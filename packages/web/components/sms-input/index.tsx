import React, { useState, useRef, useEffect } from 'react';
import { Input, message } from 'antd';
import { regex, auth } from '@td-design/utils';

interface SMSInputProps {
  phone?: string;
  type: number;
  value?: string;
  onChange?: (e: React.FormEvent<HTMLInputElement>) => void;
}

const SMSInput: React.FC<SMSInputProps> = ({ phone, type, value, onChange }) => {
  const [smsText, setSmsText] = useState('获取验证码');
  const countRef = useRef(60);
  let interval: NodeJS.Timeout = {
    hasRef() {
      return false;
    },
    ref() {
      return this;
    },
    refresh() {
      return this;
    },
    unref() {
      return this;
    },
  };

  const sendSms = async () => {
    if (!phone) {
      message.error('请输入手机号码');
    } else if (!regex.isPhone(phone)) {
      message.error('请先输入有效的电话号码');
    } else if (countRef.current < 60) {
      return;
    } else {
      try {
        const params = {
          mobile: phone,
          type: type,
        };
        const response = await auth.sendSmsCode(params);
        if (response.success) {
          message.success('验证码发送成功');
          interval = setInterval(() => {
            countRef.current = countRef.current - 1;
            setSmsText(`${countRef.current}s 后再次发送`);
            if (countRef.current === 0) {
              clearInterval(interval);
              countRef.current = 60;
              setSmsText('获取验证码');
            }
          }, 1000);
        } else {
          message.error('验证码发送失败:' + response.msg);
        }
      } catch (error) {
        message.error('验证码发送失败：' + error);
      }
    }
  };

  useEffect(() => {
    return () => {
      clearInterval(interval);
    };
  }, [interval]);

  return (
    <Input
      value={value}
      onChange={onChange}
      placeholder="请输入短信校验码"
      addonAfter={<a onClick={() => sendSms}>{smsText}</a>}
    />
  );
};

export default SMSInput;
