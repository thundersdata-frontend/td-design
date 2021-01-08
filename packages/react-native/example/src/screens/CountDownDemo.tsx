import React, { useState } from 'react';
import { CountDown, Input, WhiteSpace, WingBlank } from '@td-design/react-native';
import Container from '../components/Container';
import { useRequest } from 'ahooks';

const fetchData: (phone: string) => Promise<boolean> = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log('123');
      resolve(true);
    }, 1500);
  });
};

const { InputItem } = Input;

export default () => {
  const [value, setValue] = useState<string>('');

  const { run: send } = useRequest(fetchData, {
    manual: true,
  });

  return (
    <Container>
      {/* 默认配置 */}
      {/* <InputItem label="手机号" placeholder="请输入手机号" value={value} onChange={setValue} />
      <CountDown onClick={() => send(value)} onEnd={() => console.log('倒计时结束')} /> */}

      {/* 配置codeType */}
      <InputItem label="手机号" placeholder="请输入手机号" value={value} onChange={setValue} />
      <CountDown codeType="border" onClick={() => send(value)} onEnd={() => console.log('倒计时结束')} />
    </Container>
  );
};
