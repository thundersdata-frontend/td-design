import React, { useRef, useState } from 'react';
import { CountDown, Flex, Input, Box } from '@td-design/react-native';

import Container from '../components/Container';
import { useRequest } from 'ahooks';

const fetchData: (phone: string) => Promise<boolean> = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true);
    }, 1500);
  });
};

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
      <Flex>
        <Box flex={3}>
          <Input placeholder="请输入手机号" value={value} onChange={setValue} />
        </Box>
        <CountDown
          ref={countDownRef}
          handleClick={() => send(value)}
          onEnd={() => console.log('倒计时结束')}
          style={{ flex: 1 }}
        />
      </Flex>
    </Container>
  );
};
