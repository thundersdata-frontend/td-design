import React from 'react';
import { CountDown, WhiteSpace, WingBlank } from '@td-design/react-native';
import Container from '../components/Container';

export default () => {
  const beforeSend = async () => {
    return true;
  };

  return (
    <Container>
      <WingBlank>
        {/* 默认配置 */}
        {/* <InputItem label="手机号" placeholder="请输入手机号" value={value} onChange={setValue} />
      <CountDown onSend={() => {console.log('222')}} onEnd={() => console.log('倒计时结束')} /> */}

        {/* 配置codeType */}
        <WhiteSpace />
        <CountDown
          codeType="border"
          onSend={() => {
            console.log('222');
          }}
          onBeforeSend={beforeSend}
        />
        <WhiteSpace />
        <CountDown
          bordered
          onSend={() => {
            console.log('222');
          }}
        />
      </WingBlank>
    </Container>
  );
};
