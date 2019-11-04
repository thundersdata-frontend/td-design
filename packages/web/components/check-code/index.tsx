import React, { Component } from 'react';
import { Input, message } from 'antd';
import { regex, auth } from '@td-design/utils';

interface CheckCodeProps {
  phone?: string;
  type: number;
  value?: string;
  onChange?: (e: React.FormEvent<HTMLInputElement>) => void;
}

interface CheckCodeState {
  flag: boolean;
  count: number;
  spanString: string;
}
export default class CheckCode extends Component<CheckCodeProps> {
  state: CheckCodeState = {
    flag: true,
    count: 60,
    spanString: '获取验证码',
  };

  sendSMSCode = async () => {
    const { phone, type } = this.props;
    const { flag } = this.state;
    if (phone === undefined || !regex.isPhone(phone)) {
      message.error('请先输入有效的电话号码');
    } else {
      if (flag) {
        //第一次点击获取验证码
        this.setState({ count: 60, flag: false, spanString: '60s后再次发送' });
        const params = {
          mobile: phone,
          type: type,
        };
        const success = await auth.sendSmsCode(params);
        let time = window.setInterval(() => {
          const { count } = this.state;
          this.setState({
            count: count - 1,
            spanString: `${count - 1}s后再次发送`,
          });
          if (count <= 0) {
            window.clearInterval(time);
            this.setState({
              flag: true,
              spanString: '获取验证码',
            });
          }
        }, 1000);
        if (!success) {
          window.clearInterval(time);
          this.setState({
            flag: true,
            spanString: '获取验证码',
          });
        }
      }
    }
  };
  render() {
    const { value, onChange } = this.props;
    const { spanString } = this.state;
    return (
      <Input
        className="code"
        value={value}
        onChange={onChange}
        placeholder="请输入短信校验码"
        addonAfter={<a onClick={this.sendSMSCode}>{spanString}</a>}
      />
    );
  }
}
