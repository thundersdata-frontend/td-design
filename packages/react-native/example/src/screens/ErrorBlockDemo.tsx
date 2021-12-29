import React, { ErrorInfo } from 'react';
import { ErrorBlock, Box, Text, Button } from '@td-design/react-native';
import Container from '../components/Container';
import { View } from 'react-native';
import { useEffect } from 'react';
import { useRequest } from '@td-design/rn-hooks';

export default function ErrorBlockDemo() {
  const onError = (err: Error, errorInfo: ErrorInfo) => {
    console.log(err, errorInfo);
  };

  const onRefresh = () => {
    console.log('refresh');
  };

  const ErrorNode = () => (
    <Box>
      <Text>hahaha</Text>
    </Box>
  );

  return (
    <Container>
      <Box width={300} height={300} style={{ borderWidth: 1, borderColor: 'red' }}>
        <ErrorBlock onError={onError} onRefresh={onRefresh}>
          <Demo1 />
        </ErrorBlock>
      </Box>
      <Box width={300} height={300} style={{ borderWidth: 1, borderColor: 'red' }}>
        <ErrorBlock onError={onError} customNode={<ErrorNode />}>
          <Demo1 />
        </ErrorBlock>
      </Box>
    </Container>
  );
}

function Demo1(props: { a?: number }) {
  useEffect(() => {
    console.log('11');
    // @ts-ignore
    // props.a.b;
    // throw new Error(JSON.stringify({ type: 'request', message: '网络请求失败' }));
    // throw new Error(JSON.stringify({ type: 'network', message: '当前网络不可用' }));
  }, []);

  const { error } = useRequest(promiseService, {
    // onError里面throw error不会被ErrorBlock捕获
    onError(error) {
      console.log(error, '222');
      throw error;
    },
  });

  // 这种方式可以被ErrorBlock捕获，因为它属于render时异常
  if (error) {
    throw error;
  }

  /** 异步逻辑里的error不会被ErrorBlock捕获 */
  const handlePress = async () => {
    await errorFetch();
  };

  return (
    <View>
      <Text>异步逻辑出错不会被ErrorBlock捕获</Text>
      <Button title="测试异步逻辑出错" onPress={handlePress} />
    </View>
  );
}

function errorFetch() {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error('sorry we failed'));
    }, 2000);
  });
}

async function promiseService() {
  await sleep(1000);
  throw new Error(
    JSON.stringify({
      type: 'network',
    })
  );
}

function sleep(sleepTime: number) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true);
    }, sleepTime);
  });
}
