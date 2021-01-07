import React, { useRef, useState } from 'react';
import { CountDown, Input, WhiteSpace, WingBlank } from '@td-design/react-native';
import Container from '../components/Container';
import { useRequest } from 'ahooks';

const fetchData: (phone: string) => Promise<boolean> = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true);
    }, 1500);
  });
};

const { InputItem } = Input;

export default () => {
  const countDownRef = useRef<{ onStart: () => void }>(null);
  const [value, setValue] = useState<string>('');

  const { run: send } = useRequest(fetchData, {
    manual: true,
    onSuccess: () => {
      countDownRef.current?.onStart();
    },
  });

  return (
    <Container>
      {/* 默认配置 */}
      <WingBlank>
        <InputItem label="手机号" placeholder="请输入手机号" value={value} onChange={setValue} />
        <CountDown ref={countDownRef} handleClick={() => send(value)} onEnd={() => console.log('倒计时结束')} />
      </WingBlank>
      <WhiteSpace />

      {/* 配置codeType */}
      {/* <WingBlank>
        <InputItem label="手机号" placeholder="请输入手机号" value={value} onChange={setValue} />
        <CountDown
          codeType="border"
          ref={countDownRef}
          handleClick={() => send(value)}
          onEnd={() => console.log('倒计时结束')}
        />
      </WingBlank> */}
    </Container>
  );
};
